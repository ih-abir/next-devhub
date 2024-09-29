import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";
import Type from "@/queries/components/Type";
import QA from "@/queries/components/QA";

const TodosQuery = `
  {
    todos( pagination: { limit: -1 }) {
      data{
        attributes{
          Title
          Description
          Intro_blob ${Image}
          Block_blob ${Image}
          google_place_id
          
          createdAt
          updatedAt
          ${Meta}
        }
      }
    }
  }
`;

export default TodosQuery;
