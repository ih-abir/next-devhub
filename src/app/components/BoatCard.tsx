import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import PlaybtnIcon from "@images/playbtn.svg";
import GIcon from "@images/G.svg";
import TripadvisorIcon from "@images/tripadvisor.svg";
import styles from "@styles/boat-card.module.scss";

interface BlobAttributes {
  url: string;
  alternativeText: string;
}

interface DepartureTimeAttributes {
  Departure_time?: string;
  Return_time?: string;
}

interface GoogleReviewAttributes {
  profile_photo_url: string;
  author_name: string;
  text: string;
  rating: number;
}

interface GoogleDataAttributes {
  rating: number;
  user_ratings_total: number;
  place_id: string; 
  reviews: GoogleReviewAttributes[];
}

interface DepartureAttributes {
  Starting_point_name: string;
  Ending_point_name: string;
  Starting_point_google_place_id: string;
  Ending_point_google_place_id: string;
  IDR_price_one_way_adult: string;
  IDR_price_return_adult: string;
  IDR_price_one_way_child: string;
  IDR_price_return_child: string;
  Price_child_age_range: string;
  Time: DepartureTimeAttributes;
}

interface BoatCardProps {
  Title: string;
  Description: string;
  Logo: {data : {attributes: BlobAttributes}};
  Boat_image: {data : {attributes: BlobAttributes}};
  Homepage_link?: string;
  Book_link?: string;
  Tripadvisor_link?: string;
  Departure: DepartureAttributes[];
  googleMapsData: GoogleDataAttributes[];
}

const BoatCard = async ( props: BoatCardProps ) => {

  const {
    Title: title,
    Description: description,
    Logo: { data: { attributes: logo } },
    Boat_image: {data : {attributes: blob } },
    Homepage_link,
    Book_link,
    Tripadvisor_link,
    Departure: departure,
    googleMapsData,
  } = props;

  const mapsUrlPrefix =
    "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=",
    googleReviewPrefix = "https://search.google.com/local/reviews?placeid=";

  const [googleData] = googleMapsData?.filter(
    ({ place_id }) => place_id === departure[0]?.Ending_point_google_place_id
  );

  const reviews = googleData?.reviews
    .filter((review: { rating: number }) => review.rating >= 4)
    .sort((a: { rating: number }, b: { rating: number }) => b.rating - a.rating);


  const boat_time = departure.flatMap(({ Time }) => Time),
    boat_Departure = boat_time
      ?.map(({ Departure_time }) => Departure_time)
      .filter((x) => x),
    boat_Return = boat_time
      ?.map(({ Return_time }) => Return_time)
      .filter((x) => x);

  function hourFormat(timeString: string): string {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + "." + minute;
  }

  function formatTime(timeString: string): string {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return hour < 12 ? "\xa0AM" : "\xa0PM";
  }

  return (
    <div
      role="listitem"
      aria-label={title}
      className={[
        styles.boatCard,
        "p-[30px] w-full rounded-3xl bg-white"
      ].join(' ')}
      id={title.replaceAll(" ", "-").toLowerCase()}
    >
      <div className="w-full flex items-center">
        <div
          className={[
            styles.boatLogoContainer,
            "overflow-hidden bg-white rounded-full p-1 shadow1 flex-none"
          ].join(' ')}
        >
          <Image
            className="w-full h-full object-contain"
            src={logo.url}
            alt={logo.alternativeText}
            width={44}
            height={44}
            sizes="(min-width: 1280px) 44px, (min-width: 1024px) 35px, 28px"
          />
        </div>
        <h2 className="text-xl font-medium pl-4">{title}</h2>
      </div>

      <div className="grid lg:grid-cols-11 gap-10 lg:gap-12 my-8">
        <div className="lg:col-span-5">
          <div 
            className={[
              styles.boatImgContainer,
              "overflow-hidden w-full rounded-2xl"
            ].join(' ')}
          >
            <Image
              className="w-full h-full object-cover z-10"
              src={blob?.url}
              alt={blob.alternativeText}
              width={506}
              height={379.50}
              sizes="(min-width: 1280px) 506px, (min-width: 1024px) 386px, calc(100vw - 124px)"
            />
          </div>
        </div>
        <div className="lg:col-span-6 grid content-between">
          {
            boat_Departure?.length > 0 && boat_Return?.length > 0 && (
              <div className="w-full sm:w-4/5 md:w-full grid grid-cols-5 gap-x-2.5 gap-y-3 mb-8">
                {departure.map((item: DepartureAttributes, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="col-span-2">
                      <div className={[styles.boatCardTxt, "font-bold"].join(' ')}>
                        Trips
                      </div>
                    </div>
                    <div className="col-auto text-center">
                      <div className={[styles.boatCardTxt, "font-bold"].join(' ')}>
                        Time:
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className={[styles.boatCardTxt, "font-bold pl-4"].join(' ')}>
                        Price:
                      </div>
                    </div>

                    {boat_Departure?.length > 0 && (
                      <>
                        <div className="col-span-2">
                          <div className="flex flex-wrap">
                            <Link
                              href={
                                mapsUrlPrefix + item.Starting_point_google_place_id
                              }
                              className={[
                                styles.boatCardTxt,
                                "block font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              {item.Starting_point_name}
                            </Link>
                            <span className="mx-2 text-lg font-extrabold leading-4">
                              &#8640;
                            </span>
                            <Link
                              href={
                                mapsUrlPrefix + item.Ending_point_google_place_id
                              }
                              className={[
                                styles.boatCardTxt,
                                "block font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              {item.Ending_point_name}
                            </Link>
                          </div>
                        </div>

                        <div className="col-auto justify-center items-center text-center">
                          {item.Time.Departure_time && (
                            <div className={[styles.timeTxt, "leading-[175%]"].join(' ')}>
                              {hourFormat(item.Time.Departure_time)}
                              {formatTime(item.Time.Departure_time)}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">
                          <div>
                            <div 
                              className={[
                                styles.boatCardTxt,
                                "flex flex-wrap font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              IDR {item.IDR_price_one_way_adult} (adult)
                            </div>
                            <div 
                              className={[
                                styles.boatCardTxt,
                                "flex flex-wrap font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              IDR {item.IDR_price_one_way_child}(
                              {item.Price_child_age_range
                                ? item.Price_child_age_range + `\xa0years`
                                : `child`}
                              )
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {boat_Return?.length > 0 && (
                      <>
                        <div className="col-span-2">
                          <div className="flex flex-wrap">
                            <Link
                              href={
                                mapsUrlPrefix + item.Starting_point_google_place_id
                              }
                              className={[
                                styles.boatCardTxt,
                                "block font-medium leading-[175%]"
                              ].join(' ')}
                            >
                              {item.Starting_point_name}
                            </Link>
                            <span className="mx-2 text-lg font-extrabold leading-4">
                              &#8637;
                            </span>
                            <Link
                              href={
                                mapsUrlPrefix + item.Ending_point_google_place_id
                              }
                              className={[
                                styles.boatCardTxt,
                                "block font-medium leading-[175%]"
                              ].join(' ')}
                            >
                              {item.Ending_point_name}
                            </Link>
                          </div>
                        </div>
                        <div className="col-auto justify-center items-center text-center">
                          {item.Time.Return_time && (
                            <div className={[styles.timeTxt, "leading-[175%]"].join(' ')}>
                              {hourFormat(item.Time.Return_time)}
                              {formatTime(item.Time.Return_time)}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">
                          <div>
                            <div
                              className={[
                                styles.boatCardTxt,
                                "flex flex-wrap font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              IDR {item.IDR_price_return_adult} (adult)
                            </div>
                            <div
                              className={[
                                styles.boatCardTxt,
                                "flex flex-wrap font-medium leading-[160%]"
                              ].join(' ')}
                            >
                              IDR {item.IDR_price_return_child}(
                              {item.Price_child_age_range
                                ? item.Price_child_age_range + `\xa0years`
                                : `child`}
                              )
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )
          }

          <div className="w-full">
            {
              reviews?.slice(0, 1).map((review: GoogleReviewAttributes) => (
                <React.Fragment key={0}>
                  <div 
                    className={[
                      styles.boatCardTxt,
                      "w-full mb-6 font-bold leading-[175%]"
                    ].join(' ')}
                  >
                    Reviews:
                  </div>

                  <div className="flex flex-wrap items-center">
                    <div 
                      className={[
                        styles.boatCardImgContainer,
                        "overflow-hidden mr-2.5 rounded-full"
                      ].join(' ')}
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={review.profile_photo_url}
                        width={36}
                        height={36}
                        sizes="(min-width: 640px) 36px, 27px"
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 pb-0.5">
                        <div className="h-2.5 w-2.5">
                          <Image className="w-full h-full" src={GIcon} alt="" />
                        </div>

                        <div className={[styles.starsOuter, "my-auto"].join(' ')}>
                          <div
                            className={styles.starsInner}
                            style={{ width:`${review.rating * 20}%`}}
                          ></div>
                        </div>
                      </div>

                      <div 
                        className={[
                          styles.boatCardTxt,
                          "font-bold capitalize leading-[175%]"
                        ].join(' ')}
                      >
                        {review.author_name}
                      </div>
                    </div>
                  </div>

                  <div className="roboto text-sm line-clamp-5 my-5">{review.text}</div>
                </React.Fragment>
              ))
            }

            {
              googleData && (
                <div className="flex flex-wrap gap-4 md:gap-10">
                  <div className="flex items-center gap-1 md:gap-2.5">
                    <Link
                      href={
                        googleReviewPrefix +
                        departure[0]?.Starting_point_google_place_id
                      }
                    >
                      <div className="h-5 md:h-6 w-5 md:w-6">
                        <abbr title="Google maps link">
                          <Image className="w-full h-full" src={GIcon} alt="" />
                        </abbr>
                      </div>
                    </Link>
                    <div
                      className={[
                        "bg-viridian2 flex items-center justify-center",
                        "px-4 py-0.5 gap-x-1.5 md:gap-x-3 rounded-full",
                        "font-[clamp(0.5rem,1.1vw+.1rem,0.8125rem)] font-medium",
                      ].join(' ')}
                    >
                      <span className="text-base font-bold text-yellow">&#9733;</span>
                      {googleData?.rating}
                    </div>
                    <div className="text-[10px] font-semibold">
                      ({googleData?.user_ratings_total})
                    </div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2.5">
                    {
                      Tripadvisor_link && (
                        <Link href={Tripadvisor_link}>
                          <div className="h-5 md:h-6 w-5 md:w-6">
                            <abbr title="Tripadvisor link">
                              <Image className="w-full h-full" src={TripadvisorIcon} alt="" />
                            </abbr>
                          </div>
                        </Link>
                      )
                    }
                  </div>
                </div>
              )
            }

            <div
              className="flex flex-wrap items-center lg:justify-between gap-3 sm:gap-x-10 mt-14"
            >
              {
                Homepage_link && (
                  <Link
                    href={Homepage_link}
                    className={[
                      "flex font-semibold leading-4",
                      "capitalize color-green-pea underline-animated"
                    ].join(' ')}
                  >
                    Visit Site
                  </Link>
                )
              }

              {
                Book_link && (
                  <Link
                    href={Book_link}
                    className={[
                      "inline-flex items-center justify-center",
                      "py-1.5 px-5 font-medium rounded-full bg-downy"
                    ].join(' ')}
                  >
                    Book now
                    <div className="h-3.5 ml-2.5">
                      <Image className="w-full h-full" src={PlaybtnIcon} alt=""/>
                    </div>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoatCard;
