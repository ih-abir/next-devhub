import Image from "./components/Image.js";

const BoatsQuery = `
  {
    boats( pagination: { limit: -1 }) {
      data{
        attributes{
          Title
          Description
          Tripadvisor_link
          Homepage_link
          Book_link
          Logo ${Image}
          Boat_image ${Image}
          createdAt
        }
      }
    }
  }
`;

export default BoatsQuery;