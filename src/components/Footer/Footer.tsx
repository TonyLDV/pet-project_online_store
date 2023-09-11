import React from "react";
import styles from "./Footer.module.scss";
import GitHub from "../../icons/GitHub";
import LinkedIn from "../../icons/LinkedIn";
import Telegram from "../../icons/Telegram";

const footerInfo = [
  { id: 1, title: "Продукти" },
  { id: 2, title: "Підтримка" },
  { id: 3, title: "Інформація" },
];

const socialMedia = [
  {
    id: 0,
    title: "GitHub",
    img: <GitHub />,
    link: "https://github.com/TonyLDV",
  },
  {
    id: 1,
    title: "Telegram",
    img: <Telegram />,
    link: "https://t.me/TonyLDV",
  },
  {
    id: 2,
    title: "LinkedIn",
    img: <LinkedIn />,
    link: "",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.optionsContainer}>
          {footerInfo.map(({ title, id }) => (
            <button key={id} type="button">
              {title}
            </button>
          ))}
        </div>

        <div className={styles.linksContainer}>
          {socialMedia.map(({ id, img, link }) => (
            <div key={id}>
              <a href={link} target={"_blank"}>
                {img}
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
