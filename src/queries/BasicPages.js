import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

const BasicPagesQuery = `
  {
    basicPages {
      Title
      Intro_text
      Intro_blob ${Image}
      Block_blob ${Image} 
      Block_title
      Block_text
      createdAt
      updatedAt
      ${Meta}
    }
  }
`;

export default BasicPagesQuery;
