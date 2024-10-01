import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

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
