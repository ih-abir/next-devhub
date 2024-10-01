import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

const HomepageQuery = `
  {
    homepage {
      data {
        attributes {
          Title
          Title_tag
          Intro_text
          Intro_button_text
          Intro_button_link
          Intro_blob ${Image}
          Intro_blob_place_text
          Todo_title
          Todo_intro_txt
          Todo_intro_button_text
          Todo_intro_button_link
          Todo_button_text_1
          Todo_button_text_2
          Todo_button_text_3
          
          Accomodation_title
          Accomodation_button_text
          Accomodation_button_link
          
          Boat_title
          Boat_intro_text
          Boat_intro_button_text
          Boat_intro_button_link
          
          Instagram_title
          Instagram_button_text
          
          Geo_latitude
          Geo_longitude
          createdAt
          updatedAt
          ${Meta}
        }
      }
    }
  }
`;

export default HomepageQuery;
