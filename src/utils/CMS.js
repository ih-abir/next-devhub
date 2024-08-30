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
    const format = (data) =>
      Array.isArray(data)
        ? data.map(({ attributes }) => attributes)
        : data?.attributes || data;

    const content = data?.[contentType === "all" ? data : contentType]?.data;

    return contentType === "all"
      ? Object.fromEntries(
          Object.entries(data).map(([key, { data }]) => [key, format(data)])
        )
      : format(content);
  },
};

export default CMS;
