import Image from "./components/Image.js";
import Meta from "./components/Meta.js";

const HomeBoatQuery = `
  {
    homeBoat {
      data {
        attributes {
          Title
          Intro_text
          Intro_blob ${Image}
          ${Meta}
        }
      }
    }
  }
`;

export default HomeBoatQuery;
