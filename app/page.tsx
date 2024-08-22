import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import AboutIntro from "@components/AboutIntro";
import Hero from "@components/Hero";

import styles from '@styles/home.module.scss';
import TodoTxtBg from "@images/todoTxtBg.svg";
import PlaybtnIcon from "@images/playbtn.svg";
import PlaybtnWIcon from "@images/playbtnW.svg";
import CompanySecBg from "@images/homeCompanySecBg.svg";

import CMS from "@utils/CMS";

function sortFunction(a: any, b: any) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}

function getId(string: string) {
  const id = string
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .slice(0, 2)
    .join("-");
  return id;
}

const Homepage = async () => {
  const page = await CMS.get('homepage'),
    todos = await CMS.get('todos'),
    accommodationsData = await CMS.get('accommodations'),
    boatsData = await CMS.get('boats');
    // console.log(boats)

    const accommodations = accommodationsData
      .slice(0, 6)
      .sort(sortFunction),
      boats = boatsData.sort(sortFunction);

  return (
    <>
      <Hero 
        Title={page.Title}
        Title_tag={page.Title_tag}
        Intro_text={page.Intro_text}
        Intro_button_text={page.Intro_button_text}
        Intro_button_link={page.Intro_button_link}
        Intro_blob={page.Intro_blob}
        Intro_blob_place_text={page.Intro_blob_place_text}
      />

      <section id={getId(page.Todo_title)} className="bg-lightGreen overflow-x-hidden w-full">
        <div className="wrapper w-full mx-auto flex flex-wrap justify-center px-8 lg:px-0 py-[75px]">
          <div className={`relative sm:px-4 sm:min-w-[655px] ${styles.homeTodoCol1}`}>
            {todos.map(
              (
                {
                  Title,
                  Description,
                  Intro_blob: {
                    data: { attributes: blob },
                  },
                  Meta: { URL_slug },
                }: any,
                idx: number
              ) => {
                return (
                  <div
                    key={idx}
                    className={[
                      idx === 1
                        ? "sm:absolute order-2 sm:top-52 mb-11 sm:mb-6 sm:mr-6 sm:ml-20 xl:mb-0 sm:my-auto"
                        : idx === 0
                        ? "order-1 mb-11 sm:ml-6 sm:mb-6"
                        : "order-3 mb-16 sm:ml-6 sm:mb-6"
                    ].join(' ')}
                  >
                    <div
                      className={[
                        "hidden sm:block absolute z-10 roboto text-[13rem] font-medium text-viridian/40",
                        idx === 0
                          ? "-top-[118px] right-[232px]"
                          : idx === 1
                          ? "inset-0 -left-[86px]"
                          : "right-[231px] -bottom-2"
                      ].join(' ')}
                    >
                      {idx + 1}
                    </div>
                    <div
                      className={[
                        "relative overflow-hidden z-20 p-3.5 mx-auto max-w-[258px]",
                        "sm:min-h-[410px] bg-white rounded-[23px] shadow1",
                        idx === 1 ? "sm:mr-auto sm:ml-0" : "sm:mr-0 sm:ml-auto"
                      ].join(' ')}
                    >
                      <div className="overflow-hidden max-h-[167px] aspect-[2.3/1.67] rounded-lg">
                        <Link href={`/${page.Todo_intro_button_link}/${URL_slug}/`}>
                          <Image
                            className="w-full h-full object-cover"
                            src={blob?.url}
                            width={230}
                            height={167}
                            alt={blob.alternativeText}
                          />
                        </Link>
                      </div>
                      <div className="pl-2.5">
                        <div className="py-3 text-[19px] font-extrabold leading-[106%] text-primary">
                          <Link href={`/${page.Todo_intro_button_link}/${URL_slug}/`}>{Title}</Link>
                        </div>
                        <div className="overflow-hidden prose mb-4 text-[15px] leading-[130%] line-clamp-6">
                          <Markdown>{Description.split("\n")[0]}</Markdown>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Link
                          href={`/${page.Todo_intro_button_link}/${URL_slug}/`}
                          className={[
                            "inline-flex items-center justify-center py-1 px-3 font-medium",
                            "text-white sm:min-w-[166px] sm:min-h-[35px] bg-primary rounded-[100px]",
                          ].join(' ')}
                        >
                          {idx === 0
                            ? page.Todo_button_text_1
                            : idx === 1
                            ? page.Todo_button_text_2
                            : page.Todo_button_text_3}
                          <div className="h-3.5 ml-2.5">
                            <Image className="w-full h-full" src={PlaybtnWIcon} alt=""/>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className={`relative flex items-center justify-center ${styles.homeTodoCol2}`}>
            <div className={`absolute z-10 ${styles.homeTodoTxtBg}`}>
              <Image className="w-full h-full" src={TodoTxtBg} alt=""/>
            </div>
            <div className="w-full -mt-24 sm:-mt-32 md:-mt-40 xl:-mt-36 relative z-20">
              <div
                className={[
                  "w-full px-0 sm:pl-12 md:pl-14 lg:pl-14 xl:pl-16",
                  "sm:pr-5 lg:pr-2 xl:pr-0 mx-auto md:max-w-[612px]",
                ].join(' ')}
              >
                <h2 className="norican text-[clamp(3rem,6vw+.15rem,3.5rem)]">
                  {page.Todo_title}
                </h2>
                <div className="text-xl leading-8 lg:my-7 xl:my-9 mb-4 prose line-clamp-[7]">
                  <Markdown>{page.Todo_intro_txt}</Markdown>
                </div>
                <Link
                  href={`/${page.Todo_intro_button_link}/`}
                  className={[
                    "inline-flex items-center justify-center px-5 mt-9 lg:mt-8 min-h-[41px]",
                    "roboto text-[15px] font-medium tracking-[0.1px] text-black2 rounded-full bg-downy",
                  ].join(' ')}
                >
                  {page.Todo_intro_button_text}

                  <div className="h-3.5 ml-2.5">
                    <Image className="w-full h-full" src={PlaybtnIcon} alt="" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id={getId(page.Accomodation_title)}
        className="wrapper overflow-x-hidden py-10 mx-auto"
      >
        <h2 className="px-8 mx-auto text-[clamp(2.375rem,6vw+.15rem,3.725rem)] text-center">
          {page.Accomodation_title}
        </h2>

        <div
          role="list"
          className={[
            "grid grid-cols-[repeat(auto-fit,minmax(0,270px))]",
            "lg:grid-cols-3 gap-[35px] justify-center px-8 xl:px-3 mt-16",
          ].join(' ')}
        >
          {accommodations.map(
            (
              {
                Title,
                Intro_blob: {
                  data: { attributes: blob },
                },
                Meta: { URL_slug },
              }: any,
              idx: number
            ) => {
              return (
                <div
                  key={idx}
                  className="flex justify-center items-center w-full"
                  role="listitem"
                  aria-label={Title}
                >
                  <div className="relative overflow-hidden aspect-[3.8/4.8] rounded-3xl">
                    <Link href={`/${page.Accomodation_button_link}/${URL_slug}/`}>
                      <div className="w-full h-full">
                        <Image
                          className="w-full h-full object-cover z-10"
                          src={blob?.url}
                          alt={blob.alternativeText}
                          width={386}
                          height={488}
                          sizes="(min-width: 1280px) 386px, (min-width: 1024px) 297px, 270px"
                        />
                      </div>

                      <div
                        className={[
                          "px-2 py-5 absolute right-0 z-20 w-[clamp(182px,20vw+10px,277px)]",
                          "roboto-serif text-center rounded-l-[15px] bg-white/75",
                          styles.AccommoCardTxt
                        ].join(' ')}
                      >
                        {Title}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="flex justify-center pt-1">
          <Link
            href={`/${page.Accomodation_button_link}/`}
            className={[
              "inline-flex items-center justify-center py-1.5 px-3.5",
              "mt-9 lg:mt-14 text-lg font-medium bg-downy rounded-full",
            ].join(' ')}
          >
            {page.Accomodation_button_text}
            <div className="h-3.5 ml-2.5">
              <Image className="w-full h-full" src={PlaybtnIcon} alt=""/>
            </div>
          </Link>
        </div>
      </section>

        {
          boats.length > 1 && (
            <section id={getId(page.Boat_title)} className="bg-lightGreen overflow-hidden">
              <div className="wrapper flex flex-wrap justify-center overflow-x-hidden py-10 companySec">
                <div className="order-2 md:order-1 w-full md:w-1/2 lg:w-5/12 px-8 xl:px-3 flex items-center my-auto my-16">
                  <div className="companyContentContainer">
                    <h2 className="text-[clamp(2.4rem,6vw+.15rem,3.8rem)] leading-[100%] font-semibold">
                      {page.Boat_title}
                    </h2>
                    <div className="py-10 md:py-12 lg:py-14 xl:py-16 text-xl font-medium leading-8 prose">
                      <Markdown>{page.Boat_intro_text}</Markdown>
                    </div>
                    <Link
                      href={`/${page.Boat_intro_button_link}/`}
                      className="inline-flex items-center justify-center py-1.5 px-5 mt-3 text-lg font-medium bg-downy rounded-full"
                    >
                      {page.Boat_intro_button_text}
                      <div className="h-3.5 ml-2.5">
                        <Image className="w-full h-full" src={PlaybtnIcon} alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="relative order-1 md:order-2 flex justify-center items-center w-full sm:w-2/3 md:w-1/2 lg:w-7/12 px-8 xl:px-3 xl:pl-14 mb-16 md:my-16">
                  <Image className="w-full h-full" src={CompanySecBg} alt="" />
                  <div className="flex flex-wrap justify-center items-center absolute inset-0 z-20">
                    <div className="-mt-10 sm:-mt-20">
                      {boats.slice(0, 3).map((data: any, idx: number) => (
                        <div
                          key={idx}
                          className={`${
                            idx === 1 ? 'flex justify-end ml-6 lg:ml-20' : 'flex justify-start'
                          } gap-7 md:gap-x-6 lg:gap-x-12 xl:gap-x-16`}
                        >
                          {boats.splice(0, 2).map(({ Title, Logo: { data: { attributes: logo } } }: any, idx: number) => (
                            <Link
                              key={idx}
                              href={`/${page.Boat_intro_button_link}/#${Title.replace(/\s+/g, '-').toLowerCase()}`}
                              aria-label={Title}
                            >
                              <div className={[
                                  "overflow-hidden inline-flex items-center justify-center",
                                  "p-2 sm:p-3 md:px- mt-7 sm:mt-10 lg:mt-14 xl:mt-16 bg-white rounded-full",
                                  styles.companyImgContainer
                                ].join(' ')}
                              > 
                                <div className="h-full w-full">
                                  <Image
                                    className="w-full h-full object-contain"
                                    src={logo.url}
                                    width={logo.width}
                                    height={logo.height}
                                    sizes="(min-width: 1200px) 186px, (min-width: 768px) 100px, 121px"
                                    alt={logo.alternativeText}
                                  />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }

      <AboutIntro />
    </>
  );
}

export default Homepage;