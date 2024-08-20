import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.ASSETS_URL,
  ACCESS_TOKEN = process.env.ACCESS_TOKEN,
  API_TOKEN = process.env.Google_Api_Key;

const mapsDataUrlPrefix =
  "https://maps.googleapis.com/maps/api/place/details/json?place_id=";

function method(methodType) {
  return {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
}

const contentTypes = ["todos", "accommodations"],
  CMS_Boats = `/api/boats?populate=Departure`,
  CMS_Maps = `/api/google-maps-data`;

const placeIds = await Promise.all(
  contentTypes.map((name) =>
    fetch(`${CMS_ENDPOINT}/api/${name}`, method("GET"))
      .then((resp) => resp.json())
      .then((resp) =>
        resp.data.map(({ attributes }) => attributes?.google_place_id)
      )
  )
);

const boatPlaceIds = await fetch(CMS_ENDPOINT + CMS_Boats, method("GET"))
  .then((resp) => resp.json())
  .then((resp) =>
    resp.data.map(({ attributes }) =>
      attributes?.Departure.map((item) => item?.Ending_point_google_place_id)
    )
  );

const allPlaceIds = placeIds.concat(boatPlaceIds).flat().sort();

async function mapsData() {
  const googleData = await Promise.all(
    allPlaceIds.map((id) =>
      fetch(`${mapsDataUrlPrefix + id}&key=${API_TOKEN}`)
        .then((resp) => resp.json())
        .then((resp) => resp?.result)
    )
  );
  const filteredData = googleData.filter(Boolean),
    processedData = JSON.stringify(filteredData);

  if ( filteredData.length > 0 ) {
    await fetch(
      CMS_ENDPOINT + CMS_Maps,
      Object.assign(method("PUT"), {
        body: JSON.stringify({ data: { data: processedData } }),
      })
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
  } else {
    console.log("Failed to fetch new data ;(  Now using previously stored data")
  }
}

try {
  const date = new Date().toISOString().replace(/T.*/, "");
  const currentFile = await fetch(CMS_ENDPOINT + CMS_Maps, method("GET"))
    .then((resp) => resp.json())
    .then((resp) => resp.data.attributes);

  const updatedAt = currentFile.updatedAt.replace(/T.*/, ""),
    currentFilePlaceIds =
      currentFile.data !== null &&
      JSON.parse(currentFile.data)
        .map((id) => id?.place_id)
        .sort();

  const successlog = `\x1b[32mSuccessfully fetched and saved Google Maps data to the CMS \x1b[0m:)`;

  if (updatedAt !== date) {
    await mapsData();
    console.log(successlog);
  } else {
    const equalsCheck = (a, b) => {
      return JSON.stringify(a) !== JSON.stringify(b);
    };

    if (equalsCheck(allPlaceIds, currentFilePlaceIds)) {
      await mapsData();
      console.log(successlog);
    } else {
      console.log(`\x1b[32mFile already found in the CMS! \x1b[0m:)`);
    }
  }
} catch (err) {
  console.warn(err);
}