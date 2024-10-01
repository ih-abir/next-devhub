import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";
import Type from "@/queries/components/Type";
import QA from "@/queries/components/QA";

const AccommodationsQuery = `
  {
    accommodations( pagination: { limit: -1 }) {
      data{
        attributes{
          Title
          Description
          Intro_blob ${Image}
          Block_blob ${Image}
          google_place_id
          Book_link
          
          createdAt
          updatedAt
          ${Meta}
        }
      }
    }
  }
`;

export default AccommodationsQuery;
