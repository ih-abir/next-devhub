import Image from "@/queries/components/Image";
import Meta from "@/queries/components/Meta";

const HomeAccommodationQuery = `
  {
    homeAccommodation {
      Title
      Intro_text
      Intro_blob ${Image}
      createdAt
      updatedAt
      ${Meta}
    }
  }
`;

export default HomeAccommodationQuery;
