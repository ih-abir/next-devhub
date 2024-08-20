import Image from "./components/Image.js";
import Meta from "./components/Meta.js";
import Type from "./components/Type.js";
import QA from "./components/QA.js";

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
          ${Meta}
        }
      }
    }
  }
`;

export default AccommodationsQuery;
