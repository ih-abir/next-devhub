import Hero from "@components/Hero";
import BoatCard from "@components/BoatCard";

import CMS from "@utils/CMS";

const HomeBoat = async () => {
  const {
    Title,
    Intro_text,
    Intro_blob,
  } = await CMS.get('homeBoat'),
    posts = await CMS.get('boats'),
    mapsData = await CMS.get('googleMapsData'),
    googleMapsData = JSON.parse(mapsData.data);

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />

      <div
        className="wrapper mx-auto flex flex-wrap gap-16 px-8 xl:px-3 py-10"
        role="list"
      >
        {posts.map((post: any, index: number) => (
          <BoatCard key={index} googleMapsData={googleMapsData} {...post} />
        ))}
      </div>
    </>
  )
}

export default HomeBoat;