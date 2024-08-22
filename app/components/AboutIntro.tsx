import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import CMS from "@utils/CMS";
import ClipPathSVG from "@components/ClipPathSVG";

import PlaybtnIcon from "@images/playbtn.svg";
import HomeAboutBg from "@images/homeAboutBg.svg";

interface BlobAttributes {
  url: string;
  alternativeText?: string;
}

interface AboutIntroProps {
  About_intro_title: string;
  About_intro_text: string;
  About_intro_button_text: string;
  About_intro_button_link: string;
  About_intro_blob: {
    data: {
      attributes: BlobAttributes;
    };
  };
}

const AboutIntro = async () => {
  const genericElement = await CMS.get('genericElement');

  const {
    About_intro_title: title,
    About_intro_text: intro_text,
    About_intro_button_text: button_text,
    About_intro_button_link: button_link,
    About_intro_blob: {
      data: { attributes: blob },
    },
  }: AboutIntroProps = genericElement;

  return (
    <div
      className="wrapper overflow-x-hidden mx-auto flex flex-wrap justify-center items-center md:justify-start py-20 md:py-32"
    >
      <div className="w-full md:w-1/2 lg:w-7/12 px-8 xl:px-3 pb-12 md:pb-0">
        <div className="relative">
          <div className="z-[5] w-full max-w-[640px] h-full opacity-80">
            <Image 
              className="w-full h-full" 
              src={HomeAboutBg}
              alt=""
            />
          </div>
          <ClipPathSVG
            id="about-intro-curve"
            path="M0.996,0.361 c0.032,0.132,-0.135,0.227,-0.229,0.338 C0.67,0.812,0.616,0.979,0.454,0.998 C0.286,1,0.139,0.902,0.048,0.782 C-0.03,0.679,0.007,0.553,0.024,0.43 C0.044,0.284,0.003,0.099,0.153,0.024 s0.32,0.043,0.476,0.106 C0.774,0.188,0.963,0.226,0.996,0.361"
          />

          <div
            className="absolute right-0 -top-[35px] md:top-0 bottom-0 z-10 flex w-full max-w-[640px] h-full"
            style={{ clipPath: "url(#about-intro-curve)" }}
          >
            <div className="w-full h-full">
              <Image
                className="w-full h-full object-cover"
                src={blob?.url}
                width={640}
                height={705}
                sizes="(min-width: 1280px) 640px, (min-width: 768px) 320px, calc(100vw-64px)"
                alt={blob.alternativeText}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full md:w-1/2 lg:w-5/12 flex items-center justify-center md:justify-start"
      >
        <div className="px-8 xl:px-3 md:ml-8 lg:ml-8 xl:ml-16">
          <a href={`/${button_link}/`}>
            <h2
              className="roboto-serif text-[clamp(2.375rem,6vw+.15rem,3.725rem)] font-medium md:font-normal leading-[3.7rem]"
            >
              {title}
            </h2>

            <div className="text-xl leading-8 my-[54px] prose">
              <Markdown>{intro_text}</Markdown>
            </div>
          </a>
          <Link
            href={`/${button_link}/`}
            className={[
              "inline-flex items-center justify-center px-5 min-h-[41px] roboto",
              "text-[15px] font-medium tracking-[0.1px] text-black2 rounded-full bg-downy",
            ].join(' ')}
          >
            {button_text || "More Details"}
            <div className="h-3.5 ml-2.5">
              <Image className="w-full h-full" src={PlaybtnIcon} alt=""/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutIntro;