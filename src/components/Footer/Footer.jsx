import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Beranda",
    link: "/#",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div id="footer" className="dark:bg-gray-950"> 
    <div className="dark:bg-gray-950">
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
            >
              MITRA OPTICAL
            </a>
            {
              <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3">
                Tempat terbaik untuk menemukan kacamata bergaya dan lensa berkualitas tinggi. <br />
Kami membantu Anda melihat dunia dengan lebih jelas dan percaya diri.
              </p>
            }
            {
              <p className="text-gray-500 mt-4">
                Dibuat dengan ❤️ oleh Tim Mitra Optical
              </p>
            }
            {
              <a
                href="https://www.instagram.com/mitra_mobileoptical/"
                target="_blank"
                className="inline-block bg-primary/90 text-white py-2 px-4 mt-4 text-sm rounded-full"
              >
                Kunjungi Instagram kami
              </a>
            }
          </div>

          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* second col links */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl font-bold sm:text-left mb-3">Alamat</h1>
              <div>
                {
                  <div className="flex items-center gap-3">
                    <FaLocationArrow />
                    <p>Novaldy Katiandagho</p>
                  </div>
                }
                {
                  <div className="flex items-center gap-3 mt-6">
                    <FaMobileAlt />
                    <p>+62 822-6158-5820</p>
                  </div>
                }

                <div className="flex items-center gap-3 mt-6">
                  <a
                    href="https://www.instagram.com/mitra_mobileoptical/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1CfFTFEjct/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-3xl hover:text-primary duration-200" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kashif-hussain64/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
