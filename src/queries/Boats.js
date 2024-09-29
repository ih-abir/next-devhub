import Image from "@/queries/components/Image";

const BoatsQuery = `
  {
    boats(pagination: { limit: -1 }) {
      data{
        attributes{
          Title
          Description
          Tripadvisor_link
          Homepage_link
          Book_link
          Logo ${Image}
          Boat_image ${Image}
          Departure{
            Starting_point_name
            Ending_point_name
            Starting_point_google_place_id
            Ending_point_google_place_id
            IDR_price_one_way_adult
            IDR_price_return_adult
            IDR_price_one_way_child
            IDR_price_return_child
            Price_child_age_range
            Time{
              Departure_time
              Return_time
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export default BoatsQuery;