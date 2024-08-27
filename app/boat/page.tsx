import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Hero from "@components/Hero";
import BoatCard from "@components/BoatCard";
import AboutIntro from "@components/AboutIntro";

import CMS from "@utils/CMS";

const HomeBoat = async () => {
  const {
    Title,
    Intro_text,
    Intro_blob,
  } = await CMS.get('homeBoat'),
    posts = await CMS.get('boats');

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />

      <div
        className="wrapper mx-auto flex flex-wrap gap-16 px-8 xl:px-3 py-10"
        role="list"
      >
        {posts.map((post: any, index: number) => (
            <BoatCard key={index} {...post} />
          ))}
      </div>
    </>
  )
}

export default HomeBoat;