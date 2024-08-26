import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Hero from "@components/Hero";
import DefaultCard from "@components/DefaultCard";
import AboutIntro from "@components/AboutIntro";

import CMS from "@utils/CMS";

const HomeAccommodation = async () => {
  const {
    Title,
    Intro_text,
    Intro_blob,
  } = await CMS.get('homeAccommodation'),
    posts = await CMS.get('accommodations');

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />

      <div className="wrapper overflow-x-hidden px-8 xl:px-3 py-36 mx-auto">
        <div
          role="list"
          className="grid grid-cols-[repeat(auto-fit,minmax(0,280px))] lg:grid-cols-3 gap-[35px] justify-center"
        >
          {posts.map((post: any, index: number) => (
            <DefaultCard key={index} type="accommodationDetails" {...post} />
          ))}
        </div>
      </div>

      <AboutIntro />
    </>
  )
}

export default HomeAccommodation;