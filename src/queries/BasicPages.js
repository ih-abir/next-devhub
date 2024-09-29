import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

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
          createdAt
          updatedAt
          ${Meta}
        }
      }
    }
  }
`;

export default BasicPagesQuery;
