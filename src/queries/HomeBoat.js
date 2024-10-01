import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

const HomeBoatQuery = `
  {
    homeBoat {
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

export default HomeBoatQuery;
