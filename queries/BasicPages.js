import Image from "./components/Image.js";
import Meta from "./components/Meta.js";

const BasicPagesQuery = `
  {
    basicPages{
      data{
        attributes{
          Title
          Intro_text
          Intro_blob ${Image}
          Block_blob ${Image}
          Images(sort: "createdAt:desc", pagination: { limit: -1 }) ${Image}
          Block_title
          Block_text
          ${Meta}
        }
      }
    }
  }
`;

export default BasicPagesQuery;
