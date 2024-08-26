import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import Hero from "@components/Hero";
import PlaybtnIcon from "@images/playbtn.svg";
import styles from '@styles/default-card.module.scss';

type BlobAttributes = {
  url: string;
  alternativeText: string;
};

type PageProps = {
  Title: string;
  Description: string;
  Intro_blob: Record<string, any>;
  Block_blob?: { data: { attributes: BlobAttributes } };
  Book_link: string;
  Meta: { URL_slug: string };
};

const PostDetails = async(props: PageProps) => {

  const {
    Title,
    Description: description,
    Intro_blob,
    Block_blob: { data: { attributes: block_blob } },
    Book_link,
    Meta: { URL_slug: slug_url },
  } = props;

  const [intro_text] = description.split("\n"),
    block_description = description.replace(intro_text, "");

  return (
    <>
      <Hero 
        Title={Title}
        Intro_text={intro_text}
        Intro_blob={Intro_blob}
        link={Book_link}
        btnText="Book Now"
      />

      <div className="wrapper mx-auto px-8 xl:px-3 py-10 pb-20 overflow-x-hidden">
        {block_blob && (
          <div
            role="banner"
            className="overflow-hidden mb-10 aspect-[16/9] w-full rounded-[24px]"
          >
            <Image
              className="w-full h-full object-cover"
              src={block_blob.url}
              alt={block_blob.alternativeText}
              width={1230}
              height={692}
              sizes="(min-width: 1280px) 1230px, clac(100vw - 64px)"
              priority
            />
          </div>
        )}

        <div className="text-xl prose markdown">
          <Markdown>{block_description}</Markdown>
          {Book_link && (
            <div className="flex">
              <Link
                href={Book_link}
                className="px-6 py-2 text-base font-medium text-white rounded-full bg-primary shadow1"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>

        {/*{question && (
          <div className="pt-20">
            {question.map(({ Question, Answer, Blob }) => {
              const blob = Blob?.data.attributes;

              return (
                <div key={Question} className="mb-[60px]">
                  <h3
                    id={Question.toLowerCase().replace(" ", "-")}
                    className="text-2xl font-bold"
                  >
                    {Question}
                  </h3>

                  <div className="text-xl prose markdown my-[30px]">
                    <Markdown>{Answer}</Markdown>
                  </div>

                  {blob && (
                    <div className="overflow-hidden w-full max-w-[600px] rounded-[24px]">
                      <Image
                        className="w-full h-full object-cover"
                        src={blob.url}
                        alt={blob.alternativeText}
                        width={blob.width}
                        height={blob.height}
                        sizes="(max-width: 425px) 100vw, 600px"
                        priority
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}*/}
      </div>

      {/*<div className="wrapper flex flex-wrap mx-auto">
        <div className="hidden lg:flex w-1/12 flex items-center justify-center my-auto z-10">
          <div className="relative flex items-center -mt-10">
            <div className="absolute lg:right-5 xl:right-10 z-10 w-[clamp(200px,50vw+25px,1250px)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 833.4 788.3">
                <path
                  d="M267.4,49.9C121.5,114.2,84.1,276.1,45.2,406.3,7,534.3-38.8,682.7,56.5,756.4c91.9,71.1,259,6.2,401.9-30.5,120.6-31.1,254.3-61.8,329-157.4,72-92.1,46.2-193.8,12.1-279-28.4-71.1-109-220-184.6-254.1C501.6-15.6,408.2-12.1,267.4,49.9Z"
                  fill="#4a9471"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper relative z-20 overflow-x-hidden mx-auto px-8 xl:px-3 pb-20">
        <h2 className="pb-3 lg:pb-5 font-semibold text-[clamp(1.95rem,3vw+0.3rem,2.8rem)]">
          Other {pageType === "todoDetails" ? "things to do" : "accommodations"}
        </h2>

        <DefaultCardLayout posts={posts.slice(0, 3)} googleMapsData={googleMapsData} />

        <div className="flex justify-center items-center mt-16">
          <a
            href={pageType === "todoDetails" ? "/todo/" : "/accommodation/"}
            className="inline-flex items-center justify-center py-1.5 px-5 mt-3 text-lg font-medium rounded-full bg-downy"
          >
            See All {pageType === "todoDetails" ? "Things To Do" : "Accommodations"}
            <div className="h-3.5 ml-2.5">
              <Image className="w-full h-full" src={PlaybtnIcon} alt="" />
            </div>
          </a>
        </div>
      </div>*/}
    </>
  );
};

export default PostDetails;
