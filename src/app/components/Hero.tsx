import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import HeaderTxtBg from "@images/txtBg.svg";
import locationIcon from "@images/location.svg";

import styles from '@styles/hero.module.scss';
import ClipPathSVG from "@components/ClipPathSVG";
import ImageBase64 from "@components/ImageBase64";

interface Blob {
  url: string;
  alternativeText: string;
}

interface HeroProps {
  Title: string;
  Title_tag?: string;
  Intro_text: string;
  Intro_button_text?: string;
  Intro_button_link?: string;
  Intro_blob?: { data: { attributes: Blob } };
  Intro_blob_place_text?: string;
}

const Hero = async (props: HeroProps) => {
  const {
    Title: title,
    Title_tag: title_tag,
    Intro_text: intro_text,
    Intro_button_text: btnText,
    Intro_button_link: link,
    Intro_blob: intro_blob,
    Intro_blob_place_text: blob_place_text,
  } = props;

	const blob = intro_blob?.data?.attributes;

	return (
		<div className="overflow-hidden pb-10">
		  <div
		    className={[
		      "wrapper1 z-30 mx-auto grid justify-center",
		      blob ? `sm:grid-cols-2 ${styles.headerContainer}` : "py-[8vw]",
		    ].join(' ')}
		  >
		    <div
		      className="z-30 order-2 sm:order-1 px-8 xl:px-3 mx-auto my-auto col-span-2 sm:col-span-1"
		    >
		      <div
		        className={blob
		          ? `${styles.headerContentContainer} bg-white/80
		          		lg:bg-transparent rounded-[35px] lg:rounded-none`
		          : "max-w-[1024px] text-center"}
		      >
		        {
		          title_tag && (
		            <div
		              className={[
		                "roboto-serif text-[clamp(1.475rem,3vw+.15rem,2.225rem)]",
		                "font-extrabold leading-[104%] text-primary",
		              ].join(' ')}
		            >
		              {title_tag}
		            </div>
		          )
		        }

		        <div
		          className={[
		            "flex",
		            blob
		              ? "w-full xl:w-9/12 2xl:w-8/12 lg:pr-5"
		              : "justify-center",
		          ].join(' ')}
		        >
		          <div className="relative overflow-hidden">
		            <Image
		              className="absolute inset-x-0 top-3 sm:top-0 z-10 h-auto sm:h-full w-full"
		              src={HeaderTxtBg}
		              alt=""
		              priority
		            />
		            <h1
		              className={[
		                "relative z-[15] py-2.5 norican text-[clamp(2.25rem,6vw+.15rem,3.5rem)]",
		                "leading-[115%] min-w-[clamp(100px,55vw+5px,290px)]",
		              ].join(' ')}
		            >
		              {title}
		            </h1>
		          </div>
		        </div>
		        <div
		          className="text-xl leading-8 lg:pr-5 mb-4 prose sm:line-clamp-[7] xl:line-clamp-[9]"
		        >
		          <Markdown>{intro_text}</Markdown>
		        </div>
		        {
		          link && (
		            <Link
		              href={link}
		              className="inline-flex px-6 py-2 text-base font-medium text-white rounded-[100px] bg-primary shadow1"
		            >
		              {btnText}
		            </Link>
		          )
		        }
		      </div>
		    </div>

		    {
		      blob && (
		        <div className="order-1 sm:order-2 col-span-2 sm:col-span-1">
		          <ClipPathSVG
		            id="heroImgFrame"
		            path="M1,0 V0.759 c-0.096,0.111,-0.209,0.219,-0.362,0.238 c-0.167,0.021,-0.32,-0.083,-0.438,-0.193 S-0.012,0.555,0.002,0.403 C0.015,0.26,0.14,0.151,0.268,0.068 C0.33,0.027,0.4,0.009,0.474,0"
		          />
		          <ClipPathSVG
		            id="heroImgFrame-sm"
		            path="M1,0 V0.725 c-0.113,0.127,-0.248,0.25,-0.429,0.272 c-0.016,0.002,-0.031,0.003,-0.047,0.003 h-0.009 l-0.015,-0.001 c-0.17,-0.008,-0.326,-0.112,-0.449,-0.223 Q0.025,0.753,0,0.728 V0"
		          />

		          {/*Image Desktop View*/}
		          <div className="hidden sm:block absolute right-0 top-0">
		            <div className="relative">
		              <div className="bg-primary/50" style={{ clipPath: "url(#heroImgFrame)" }}>
		                <div className={styles.heroCurve}>
		                  <Image
		                    className="w-full h-full object-cover"
		                    src={blob?.url}
		                    alt={blob?.alternativeText}
		                    width={534}
		                    height={534}
		                    sizes="(min-width: 1440px) 534px, (min-width: 640px) 500px, 100vw"
		                    placeholder="blur"
		                    blurDataURL={await ImageBase64(blob?.url)}
		                    priority
		                  />
		                </div>
		              </div>

		              {/* Desktop View Image Location Name*/}

		              {blob_place_text && (
		                <div className="hidden lg:block absolute bottom-[15%]">
		                  <div className="flex max-w-[350px] h-[80px] rounded-xl shadow1">
		                    <div className="bg-white2 flex items-center justify-center min-w-[220px] p-5 rounded-l-xl">
		                      <div className="text-lg line-clamp-2">
		                        {blob_place_text}
		                      </div>
		                    </div>

		                    <div className="bg-primary flex items-center justify-center w-[80px] rounded-r-xl">
		                      <div className="w-auto h-[22px]">
		                        <Image className="w-full h-full" src={locationIcon} alt=""priority/>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              )}
		            </div>
		          </div>

		          {/*Image Mobile View*/}

		          <div
		            className="block sm:hidden absolute right-0 top-0"
		            style={{ clipPath: "url(#heroImgFrame-sm)"}}
		          >
		            <div className="relative bg-primary/50">
		              <div className={styles.heroCurve}>
		                <Image
		                  className="w-full h-full object-cover"
		                  src={blob?.url}
		                  alt={blob?.alternativeText}
		                  fill
		                  priority
		                />
		              </div>
		            </div>
		          </div>
		        </div>
		      )
		    }
		  </div>
		</div>
	)
}

export default Hero;