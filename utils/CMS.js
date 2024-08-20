import fs from "fs";

function importAll(r) {
  let queries = {};
  r.keys().forEach((item) => {
    queries[item.replace('./', '')] = r(item);
  });
  return queries;
}

const queryModules = importAll(require.context('@queries', false, /\.js$/));


const queryRegex = /^\s*{(.*)}\s*$/s;

// const fullQuery =
//   `"{
    
//           homepage {
//             data {
//               attributes {
//                 Title
//                 Title_tag
//                 Intro_text
//                 Intro_button_text
//                 Intro_button_link
//                 Intro_blob_place_text
//                 Todo_title
//                 Todo_intro_txt
//                 Todo_intro_button_text
//                 Todo_intro_button_link
//                 Todo_button_text_1
//                 Todo_button_text_2
//                 Todo_button_text_3
//                 Accomodation_title
//                 Accomodation_button_text
//                 Accomodation_button_link
//                 Boat_title
//                 Boat_intro_text
//                 Boat_intro_button_text
//                 Boat_intro_button_link
//                 Instagram_title
//                 Geo_latitude
//                 Geo_longitude
//               }
//             }
//           }
        
// }"`;

const fullQuery =
  "{" +
  Object.keys(queryModules)
    .map((key) => {
      const query = queryModules[key].default;

      const [, queryContent] = queryRegex.exec(query);

      return queryContent;
    })
    .join("") +
  "}";


const { data } = await fetch(process.env.DB_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: fullQuery,
  }),
})
  .then((res) => res.json())
  .catch((error) => {
    console.error("Failed to fetch data from CMS:", error);
    return null;
  });


const CMS = {
  get: (contentType) => {
    const content = data?.[contentType === "all" ? 'data' : contentType]?.data;

    return Array.isArray(content) 
      ? content.map(({ attributes }) => attributes) 
      : content?.attributes 
      || null; // Ensure a fallback value if content is undefined
  },
};


// console.log(data.todos)
export default CMS;
