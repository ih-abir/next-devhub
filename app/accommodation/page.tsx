import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Hero from "@components/Hero";
import AboutIntro from "@components/AboutIntro";

import CMS from "@utils/CMS";

const HomeAccommodation = async () => {
  const {
    Title,
    Intro_text,
    Intro_blob,
  } = await CMS.get('homeAccommodation'),
    accommodations = await CMS.get('accommodations');

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />



      <AboutIntro />
    </>
  )
}

export default HomeAccommodation;