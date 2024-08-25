import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import PlaybtnIcon from "@images/playbtn.svg";
import styles from '@styles/default-card.module.scss';

interface BlobAttributes {
  url: string;
  alternativeText: string;
}

interface DefaultCardProps {
  Title: string;
  Description: string;
  Intro_blob: {data : {attributes: BlobAttributes}};
  Book_link: string;
  google_place_id?: string;
  Meta: { URL_slug: string };
}

const DefaultCard = async ( props: DefaultCardProps ) => {

  const {
    Title: title,
    Description: description,
    Intro_blob: { data: { attributes: blob } },
    Book_link,
    google_place_id,
    Meta: { URL_slug: slug }
  } = props;

  const [intro_text] = description.split("\n");

  return (
    <div
      role="listitem"
      aria-label={title}
      className={`${styles.defaultCard} bg-white overflow-hidden rounded-[24px]`}
    >
      <div className={`${styles.defaultCardImgContainer} overflow-hidden`}>
        <Link href={`/${slug}/`} className="cursor-pointer">
          <div className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              src={blob?.url}
              alt={blob?.alternativeText}
              width={386}
              height={308}
              sizes={[
                "(min-width: 1440px) 386px, (min-width: 1024px) 296px",
                "(min-width: 345px) 280px, calc(100vw - 64px)"
              ].join(',')}
            />
          </div>
        </Link>
      </div>
      <div className="px-4 pt-4 pb-5 lg:pb-8">
        <div className="mb-2 text-xl font-bold text-greenpea">
          <Link href={`/${slug}/`} className="cursor-pointer">
            {title}
          </Link>
        </div>
        <div className="prose mb-2 leading-[120%] line-clamp-3">
          <Markdown>{intro_text}</Markdown>
        </div>
        {/*<div className="flex items-center gap-1 md:gap-2.5">
          <div className="stars-outer flex my-auto text-sm sm:text-base">
            <div
              className="stars-inner flex text-sm sm:text-base"
              style={{ width: `${googleData?.rating * 20}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="sm:text-[17px] font-semibold">{googleData?.rating}</div>
            <div className="text-[13px] font-medium">({googleData?.user_ratings_total})</div>
          </div>
        </div>*/}
        {Book_link && (
          <div className="flex items-center mt-5">
            <Link
              href={`/${slug}/`}
              className={[
                "bg-downy flex items-center px-5 py-2 roboto",
                "text-xs lg:text-sm font-medium cursor-pointer rounded-full"
              ].join(' ')}
            >
              Discover
              <div className="h-3.5 ml-2.5">
                <Image className="w-full h-full" src={PlaybtnIcon} alt="" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DefaultCard;
