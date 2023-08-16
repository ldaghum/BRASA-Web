import { faArrowRightToBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@interfaces";
import { COLORS } from "@util";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";

import styles from "./Navbar.module.css";
import brasa_logo from "/public/static/brasa-logo.png";

type Props = {
  isMobile: boolean;
  userLogged: User | undefined;
};

const Navbar: FC<Props> = ({ isMobile }) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  useEffect(() => {
    const body = document.body;
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        body.classList.remove(styles["scroll-up"]);
        return;
      }

      if (currentScroll > lastScroll && !body.classList.contains(styles["scroll-down"])) {
        body.classList.remove(styles["scroll-up"]);
        body.classList.add(styles["scroll-down"]);
      } else if (currentScroll < lastScroll && body.classList.contains(styles["scroll-down"])) {
        body.classList.remove(styles["scroll-down"]);
        body.classList.add(styles["scroll-up"]);
      }
      lastScroll = currentScroll;
    });
  });

  return (
    <header>
      {isMobile ? (
        // Mobile Navbar
        <nav className={styles["new-nav"]}>
          <div className="bg-gradient-to-r from-main-brasa-yellow via-main-brasa-green to-main-brasa-blue h-2"></div>
          <div className="bg-white h-[4.5rem] flex justify-between items-center px-8">
            <div className="px-[0.6rem]">
              <FontAwesomeIcon icon={faBars} color={COLORS.black} className="fa-2x min-w-fit" />
            </div>
            <div>
              <h1 className="font-medium text-black text-lg justify-self-center text-center">
                BRASA @ UCF
              </h1>
            </div>
            <div className="">
              <div
                className="text-base rounded-lg h-[3rem] w-[3rem] bg-main-brasa-blue text-center text-white hover:cursor-pointer font-medium"
                onClick={() => setShowLogin(false)}
              >
                <div className="flex justify-center items-center h-full">
                  <Link href="/sign-up">
                    <div className="flex flex-row items-center">
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        color={COLORS.white}
                        className="fa-xl min-w-fit"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        // Desktop Navbar
        <nav className="absolute pl-24 w-full">
          <div className="px-2 sm:px-4 pt-7 bg-transparent">
            <div className="container flex flex-row items-center justify-between mx-auto top-25">
              <div className="order-first w-full md:block md:w-auto">
                <Link href="/" className="flex items-center">
                  {/* <img src="/static/brasa-logo.png" className="md:h-28" alt="BRASA Logo" /> */}
                  <Image src={brasa_logo} sizes="100vw" alt="BRASA Logo" className="w-[90%]" />
                </Link>
              </div>

              <div className="order-last">
                <ul className="flex flex-row items-center p-4 pr-12 md:space-x-20 md:text-sm md:font-medium">
                  <li className="block py-2 pl-3 pr-4 md:p-0 hover:cursor-pointer font-bold text-base">
                    <Link href="/meet-the-board">E-Board</Link>
                  </li>
                  <li className="block py-2 pl-3 pr-4 md:p-0 hover:cursor-pointer font-bold text-base">
                    <Link href="/become-member">Become a Member</Link>
                  </li>
                  <li className="block py-2 pl-3 pr-4 md:p-0 hover:cursor-pointer font-bold text-base">
                    <Link href="#desktop-brasa-footer" scroll={false}>
                      Contact
                    </Link>
                  </li>

                  {showLogin ? (
                    <li
                      className="block mx-auto text-base rounded-full h-14 w-28 bg-blue-500 text-center text-white py-2 pl-3 pr-4 md:p-0 hover:cursor-pointer font-medium"
                      onClick={() => setShowLogin(false)}
                    >
                      <div className="flex justify-center items-center h-full">
                        <Link href="/">Log In</Link>
                      </div>
                    </li>
                  ) : (
                    // TODO - Add logged in profile design here
                    <li className="block mx-auto text-base rounded-full h-14 w-28 bg-blue-500 text-center text-white py-2 pl-3 pr-4 md:p-0 hover:cursor-pointer font-medium">
                      <Link href="/" onClick={() => setShowLogin(true)}>
                        PROFILE STUFF HERE
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
