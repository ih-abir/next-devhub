import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import Hero from "@components/Hero";
import AboutIntro from "@components/AboutIntro";
import DefaultCard from "@components/DefaultCard";

interface BlobAttributes {
  url: string;
  alternativeText: string;
}

interface HomePostsProps {
  page: {
    type: string;
    Title: string;
    Intro_text: string;
    Intro_blob: { data: { attributes: BlobAttributes } };
    posts: Record<string, any>;
  };
}

const HomePosts = async (props: HomePostsProps) => {
  const {
    type,
    Title,
    Intro_text,
    Intro_blob,
    posts,
  } = props.page;

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />

      <div className="wrapper overflow-x-hidden px-8 xl:px-3 py-36 mx-auto">
        <div
          role="list"
          className="grid grid-cols-[repeat(auto-fit,minmax(0,280px))] lg:grid-cols-3 gap-[35px] justify-center"
        >
          {posts?.map((post: any, index: number) => (
            <DefaultCard key={index} type={type} {...post} />
          ))}
        </div>
      </div>

      <AboutIntro />
    </>
  )
}

export default HomePosts;