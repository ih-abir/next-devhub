import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Hero from "@components/Hero";
import AboutIntro from "@components/AboutIntro";

import CMS from "@utils/CMS";

const HomeTodo = async () => {
  const {
    Title,
    Intro_text,
    Intro_blob,
  } = await CMS.get('homeTodo'),
    todos = await CMS.get('todos');

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />



      <AboutIntro />
    </>
  )
}

export default HomeTodo;