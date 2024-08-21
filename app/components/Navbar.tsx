import Link from 'next/link';
import Image from "next/image";
import getConfig from 'next/config';
import { usePathname } from 'next/navigation';

import styles from '@styles/navbar.module.scss';
import CameraIcon from "@images/camera.svg";
import Brand from "@images/nusa-ceningan-io-logo.svg";

import CMS from "@utils/CMS";

const { publicRuntimeConfig } = getConfig();
const domain = publicRuntimeConfig.siteOrigin;

const Navbar = async () => {
  const genericElement = await CMS.get('genericElement');

  const { Nav_menu: menu, Instagram_link } = genericElement;

  const url = "/";

  return (
    <nav className="relative z-40 flex pt-3 navbar">
      <div
        className={[
          "wrapper inline-flex flex-wrap md:flex-nowrap justify-center my-auto",
          "px-5 sm:px-8 xl:px-3 sm:py-1 md:py-2 ",
          styles.navbarContent
        ].join(' ')}
      >
        <div className="my-auto">
          <Link href={domain} aria-label="home">
            <Image
              className="w-full h-9 md:h-10 my-auto invert md:invert-0 brightness-0 md:brightness-100"
              src={Brand}
              alt="Brand-icon"
            />
          </Link>
        </div>
        <div
          className={[
            "flex flex-wrap md:flex-nowrap items-center justify-center ml-auto my-auto roboto",
            "text-sm md:font-[550] tracking-[0.03em] text-white md:text-black no-underline",
            styles.navMenu
          ].join(' ')}
        >
          <div className={`flex mr-auto my-auto ${styles.navMenuItem}`}>
            {
              menu.slice(0, 3).map(({ Title, Title_url }, idx) => (
                <div key={idx} className={idx === 0 ? "hidden lg:block" : ""}>
                  <Link
                    href={Title_url === "/" ? "/" : `/${Title_url}/`}
                    className={[
                      "relative inline-block whitespace-nowrap",
                      styles.navItem,
                      url === Title_url ? styles.navActive : styles.navAnimation,
                    ].join(' ')}
                  >
                    {Title}
                  </Link>
                </div>
              ))
            }
          </div>
          <div className={`${styles.navMenuItem} flex my-auto text-center sm:text-left`}>
            {
              menu.slice(3, 5).map(({ Title, Title_url }, idx) => (
                <div key={idx}>
                  <Link
                    href={Title_url === "/" ? "/" : `/${Title_url}/`}
                    className={[
                      "relative inline-block whitespace-nowrap",
                      styles.navItem,
                      url === Title_url ? styles.navActive : styles.navAnimation,
                    ].join(' ')}
                  >
                    {Title}
                  </Link>
                </div>
              ))
            }
          </div>
        </div>

        <div
          className={[
            "inline-flex gap-4 lg:gap-8 justify-center items-center",
            "my-auto w-full md:w-auto mt-1.5 sm:my-auto",
          ].join(' ')}
        >
          <div className="relative grow">
            {/*<Search />*/}
          </div>

          <Link href={Instagram_link} aria-label="Instagram" className="flex-none">
            <div className="h-[clamp(28px,4vw+1.4px,33px)]">
              <Image className="w-full h-full" src={CameraIcon} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
