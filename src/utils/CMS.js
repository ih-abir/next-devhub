import fs from "fs";
import path from "path";

async function importAllQueries() {
  const queryDir = path.join(process.cwd(), "src", "queries");
  const files = fs.readdirSync(queryDir).filter(file => file.endsWith(".js"));

  const queries = {};

  for (const file of files) {
    const queryName = file.replace('.js', '');
    const queryModule = await import(`@/queries/${file}`);
    queries[queryName] = queryModule.default;
  }

  return queries;
}

const queryModules = await importAllQueries();

const queryRegex = /^\s*{(.*)}\s*$/s;

const fullQuery =
  "{" +
  Object.keys(queryModules)
    .map((key) => {
      const query = queryModules[key];
      const [, queryContent] = queryRegex.exec(query);
      return queryContent;
    })
    .join("") +
  "}";

async function fetchData(cache = null) {
  try {
    const fetchedData = await fetch(process.env.DB_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: fullQuery,
      }),
      ...(cache)
    }).then(res => res.json());

    return fetchedData;
  } catch (error) {
    console.error("Failed to fetch data from CMS:", error);
    return null;
  }
}

const CMS = {
  async get(contentType, cache = {}) {
    const { data } = await fetchData(cache);

    const content = (
      contentType === "all" 
        ? data
        : data[contentType]
    )

    return content;
  },
};

export default CMS;