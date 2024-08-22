import Link from "next/link";
import Image from 'next/image';
import CameraIcon from "@images/camera.svg";
import Brand from "@images/nusa-ceningan-io-logo.svg";

import styles from "@styles/footer.module.scss";
import ClipPathSVG from "@components/ClipPathSVG";

interface MenuItem {
  Title: string;
  Title_url: string;
}

interface BlobAttributes {
  url: string;
  alternativeText?: string;
}

interface FooterProps {
  menu: MenuItem[];
  Instagram_link?: string;
  copyright: string;
  background: BlobAttributes;
  BlobAttributes: BlobAttributes;
}

const Footer = async ({genericElement}: {genericElement: FooterProps}) => {

  const {
    Footer_menu: menu,
    Instagram_link,
    Footer_copyright: copyright,
    Footer_image: {
      data: { attributes: background },
    },
    Footer_image_sm: {
      data: { attributes: backgroundSm },
    },
  } = genericElement;

  return (
    <>
      <ClipPathSVG
        id="footer-bg-curve"
        path="M0,0.202 C0.482,0.163,0.813,-0.286,1,0.297 V1 H0"
      />
      <ClipPathSVG
        id="footer-bg-curve-sm"
        path="M1,0.198 V1 H0 V0.014 C0.089,0.006,0.174,0.001,0.255,0 h0.077 C0.582,0.004,0.795,0.053,1,0.198"
      />

      <footer className="relative block w-full mt-auto">
        <div
          className={`relative overflow-hidden bg-lightGreen bg-no-repeat bg-cover ${styles.footer}`}
          role="contentinfo"
        >
          <div className="absolute w-screen h-full z-10">
            {background?.url && (
              <Image
                className="hidden sm:block w-full h-full object-cover"
                src={background.url}
                width={1440}
                height={385.33}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 1440px, 2050px"
                alt={background?.alternativeText || ''}
              />
            )}
            {backgroundSm?.url && (
              <Image
                className="block sm:hidden w-full h-full object-cover"
                src={backgroundSm.url}
                width={639}
                height={360.33}
                sizes="(max-width: 425px) 100vw, (max-width: 639px) 639px"
                alt={backgroundSm?.alternativeText || ''}
              />
            )}
          </div>
          <div className="relative z-20 pt-16 md:pt-36">
            <div className="wrapper flex flex-wrap justify-center md:justify-start items-center my-auto px-8 xl:px-3 sm:py-2">
              <div className="w-full md:w-auto my-auto mb-16 md:mb-0">
                <Link href="/" aria-label="home">
                  <div className="mx-auto my-auto w-[121px]">
                    <Image src={Brand} alt="Brand" width={121} height={121} />
                  </div>
                </Link>
              </div>
              <div
                className={[
                  "md:ml-16 my-auto flex flex-wrap gap-4 md:gap-8 items-center roboto-serif",
                  "text-[clamp(.9rem,3vw+.02rem,1.25rem)] font-semibold xs:font-medium text-greenpea", 
                  styles.footerLinkContainer
                ].join(' ')}
              >
                {menu.map(({ Title, Title_url }) => (
                  <Link
                    key={Title_url}
                    href={Title_url === '/' ? '/' : `/${Title_url}/`}
                    className="z-10 relative inline-block py-[3px] px-0.5"
                  >
                    {Title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center mt-11 py-[5px] bg-viridian/25">
              <Link href={Instagram_link} aria-label="Instagram">
                <div className="w-full h-[clamp(33px,4vw+1.5px,50px)]">
                  <Image src={CameraIcon} alt="Instagram" width={50} height={50} />
                </div>
              </Link>
            </div>
            <div className="wrapper px-8 xl:px-3 py-3">
              <p className="roboto text-[clamp(.75rem,1.5vw+.1rem,1rem)] font-bold text-greenpea text-center">
                © {`${new Date().getFullYear()} ` + copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
