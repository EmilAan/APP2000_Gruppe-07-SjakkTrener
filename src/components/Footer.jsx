//Footer er laget av Philip
import React from "react";
import SocialLogo from "social-logos";
import { Link } from "react-router-dom";

// Dette er en footer som alltid ligger helt på bunnen i nettsiden, som inneholder eventuelle lenker og sosiale medier.
function Footer() {
  const socials = {
    facebookLink: "https://facebook.com",
    tiktokLink: "https://tiktok.com",
    twitterLink: "https://twitter.com",
    instagramLink: "https://instagram.com",
    youtubeLink: "https://youtube.com",
  };

  return (
    <footer className="my-2 mt-auto border-t-2 bg-gray-50 text-center">
      <div className="mx-auto max-w-2xl px-2">
        {/* primary footer*/}
        <div className="flex flex-col justify-between py-4 space-y-6 tracking-widest md:flex-row">
          <div>
            <p className=" text-gray-700 hover:text-gray-900"></p>
          </div>

          <div>
            <Link
              to="/info"
              className="py-5 px-1 text-gray-700 hover:text-gray-900"
            >
              Informasjon
            </Link>
          </div>

          <div>
            <Link
              to="/contact"
              className="py-5 px-1 text-gray-700 hover:text-gray-900"
            >
              Kontakt Oss
            </Link>
          </div>

          <div>
            <Link
              to="/terms"
              className="py-5 px-1 text-gray-700 hover:text-gray-900"
            >
              Vilkår for bruk
            </Link>
          </div>

          <div>
            <Link
              to="/privacy"
              className="py-5 px-1 text-gray-700 hover:text-gray-900"
            >
              Personvernerklæring
            </Link>
          </div>
        </div>

        <div className="flex justify-evenly border-b-2 border-gray-200 px-20 py-4 md:flex-row">
          <a href={socials.facebookLink} className="w-6 ">
            <SocialLogo icon="facebook" />
          </a>

          <a href={socials.tiktokLink} className="w-6">
            <SocialLogo icon="tiktok" />
          </a>

          <a href={socials.twitterLink} className="w-6">
            <SocialLogo icon="twitter" />
          </a>

          <a href={socials.instagramLink} className="w-6">
            <SocialLogo icon="instagram" />
          </a>

          <a href={socials.youtubeLink} className="w-6">
            <SocialLogo icon="youtube" />
          </a>
        </div>
        <div>
          <p className=" my-2 text-xs text-gray-700/75">
            ©2023 Sjakktrener | Gruppe 7
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
