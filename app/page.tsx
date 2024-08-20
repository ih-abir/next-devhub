import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import AboutIntro from "@components/AboutIntro";
import Hero from "@components/Hero";

import styles from '@styles/home.module.scss';
import TodoTxtBg from "@images/todoTxtBg.svg";
import PlaybtnIcon from "@images/playbtn.svg";
import PlaybtnWIcon from "@images/playbtnW.svg";

import CMS from "@utils/CMS";

function sortFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}

function getId(string) {
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
    accommodations = await CMS.get('accommodations');

    // console.log(accommodations)

    const posts = accommodations
      .slice(0, 6)
      .sort(sortFunction);

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
                },
                idx
              ) => {
                return (
                  <div
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
                            width={240}
                            height="240"
                            aspectRatio={blob.width + `:` + blob.height}
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
                            <Image className="w-full h-full" src={PlaybtnWIcon} />
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
              <Image className="w-full h-full" src={TodoTxtBg} />
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
                    <Image className="w-full h-full" src={PlaybtnIcon} />
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
          {posts.map(
            ({
              Title,
              Intro_blob: {
                data: { attributes: blob },
              },
              Meta: { URL_slug },
            }) => {
              return (
                <div
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
                          sizes="(max-width: 1023px) 100vw, 470px"
                          format="webp"
                          width="200"
                          height="200"
                          alt={blob.alternativeText}
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
              <Image className="w-full h-full" src={PlaybtnIcon} />
            </div>
          </Link>
        </div>
      </section>

      <AboutIntro />
    </>
  );
}

export default Homepage;