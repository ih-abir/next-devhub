import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

const HomepageQuery = `
  {
    homepage {
      Title
      Title_tag
      Intro_text
      Intro_button_text
      Intro_button_link
      Intro_blob ${Image}
      Intro_blob_place_text
      Block_title
      Block_intro_text
      Block_button_text
      Block_button_link
      Block_todo1_button_text
      Block_todo2_button_text
      Block_todo3_button_text
      Block_todos {
        Title
        Description
        Intro_blob ${Image}
        ${Meta}
      }
      Block2_title
      Block2_button_text
      Block2_button_link
      Block2_accommodations {
        Title
        Description
        Intro_blob ${Image}
        ${Meta}
      }
      Block3_title
      Block3_title_tag
      Block3_blob ${Image}
      Block4_title
      Block4_intro_text
      Block4_button_text
      Block4_button_link
      
      
      createdAt
      updatedAt
      ${Meta}
    }
  }
`;

export default HomepageQuery;
