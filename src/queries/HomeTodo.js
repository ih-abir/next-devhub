import Image from "./components/Image.js";
import Meta from "./components/Meta.js";

const HomeTodoQuery = `
  {
    homeTodo {
      data {
        attributes {
          Title
          Intro_text
          Intro_blob ${Image}
          createdAt
          updatedAt
          ${Meta}
        }
      }
    }
  }
`;

export default HomeTodoQuery;
