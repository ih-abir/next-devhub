import Hero from "@components/Hero";
import BoatCard from "@components/BoatCard";

interface BlobAttributes {
  url: string;
  alternativeText: string;
}

interface HomeBoatProps {
  page: {
    Title: string;
    Intro_text: string;
    Intro_blob: { data: { attributes: BlobAttributes } };
    posts: Record<string, any>;
    googleMapsData: Record<string, any>;
  };
}

const HomeBoat = async (props: HomeBoatProps) => {
  const {
    Title,
    Intro_text,
    Intro_blob,
    posts,
    googleMapsData,
  } = props.page;

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