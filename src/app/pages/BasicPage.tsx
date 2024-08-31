import Image from "next/image";
import Markdown from "react-markdown";
import Hero from "@components/Hero";
import ImageBase64 from "@components/ImageBase64";
import styles from "@styles/basic.module.scss";

interface BlobAttributes {
  url: string;
  alternativeText: string;
}

interface BasicPageProps {
  page: {
    Title: string;
    Intro_text: string;
    Intro_blob: { data: { attributes: BlobAttributes } };
    Block_blob?: { data: { attributes: BlobAttributes } };
    Block_title?: string;
    Block_text?: string;
  };
}

const BasicPage = async (props: BasicPageProps) => {
  const {
    Title,
    Intro_text,
    Intro_blob,
    Block_blob,
    Block_title: block_title,
    Block_text: block_text,
  } = props.page;
  
  const block_blob = Block_blob?.data?.attributes;

  return (
    <>
      <Hero Title={Title} Intro_text={Intro_text} Intro_blob={Intro_blob} />
      
      <div className="py-[75px]">
        {block_blob && (
          <div className="wrapper mx-auto px-8 xl:px-3 overflow-x-hidden">
            <div
              role="banner"
              className={[
                styles.detailsBannerImgContainer,
                "overflow-hidden w-full"
              ].join(' ')}
            >
              <Image
                className="w-full h-full object-cover"
                src={block_blob.url}
                alt={block_blob.alternativeText}
                width={1230}
                height={692}
                sizes="(min-width: 1280px) 1230px, calc(100vw - 64px)"
                placeholder="blur"
                blurDataURL={await ImageBase64(block_blob.url)}
              />
            </div>
          </div>
        )}

        <div className="wrapper overflow-x-hidden mx-auto px-8 xl:px-3 pt-[75px]">
          {block_title && (
            <h2
              className={[
                block_text && "mb-10",
                "text-[clamp(2.125rem,4vw+.3rem,3rem)] font-semibold",
              ].join(' ')}
            >
              {block_title}
            </h2>
          )}

          <div className="text-xl prose">
            <Markdown>{block_text}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicPage;