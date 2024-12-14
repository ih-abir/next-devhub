import Image from "@/queries/components/Image";

const Menu = `
  {
    Title
    Url
  }
`;

const GenericElementQuery = `
  {
    genericElement{
      OpenGraph_default ${Image}
      
      Footer_copyright
      Footer_image ${Image}
      Footer_image_sm ${Image}
      Nav_menu ${Menu}
      Footer_menu ${Menu}
      About_intro_title
      About_intro_text
      About_intro_blob ${Image}
      About_intro_button_text
      About_intro_button_link
    }
  }
`;

export default GenericElementQuery;
