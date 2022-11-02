import { ReactChild, useState } from "react";
import SvgContact from "../../icons/SvgContact";
import SvgContrast from "../../icons/SvgContrast";
import SvgCv from "../../icons/SvgCv";
import SvgHome from "../../icons/SvgHome";
import SvgPortfolio from "../../icons/SvgPortfolio";
import SvgService from "../../icons/SvgService";
import Flex from "../../package/Flex/Flex";
import { GRAY_20, GRAY_50, GRAY_70, PRIMARY } from "../../utils/colors";
import { screenHeight } from "../../utils/constants";
import { isEmpty } from "../../utils/validators";
import styles from "./layout.module.css";

type Props = {
  children: ReactChild;
};

const Layout = ({ children }: Props) => {
  const [isHome, setHome] = useState("");

  const data = [
    {
      icon: (
        <SvgHome
          fill={
            isEmpty(isHome) || isHome === "#introCard__home" ? GRAY_20 : GRAY_50
          }
          circleFill={
            isEmpty(isHome) || isHome === "#introCard__home" ? PRIMARY : GRAY_70
          }
        />
      ),
      link: "#introCard__home",
    },
    {
      icon: (
        <SvgService
          fill={isHome === "#myServices__home" ? GRAY_20 : GRAY_50}
          circleFill={isHome === "#myServices__home" ? PRIMARY : GRAY_70}
        />
      ),
      link: "#myServices__home",
    },
    {
      icon: (
        <SvgCv
          fill={isHome === "#education__home" ? GRAY_20 : GRAY_50}
          circleFill={isHome === "#education__home" ? PRIMARY : GRAY_70}
        />
      ),
      link: "#education__home",
    },
    {
      icon: (
        <SvgPortfolio
          fill={isHome === "#workHistory__home" ? GRAY_20 : GRAY_50}
          circleFill={isHome === "#workHistory__home" ? PRIMARY : GRAY_70}
        />
      ),
      link: "#workHistory__home",
    },
    {
      icon: (
        <SvgContact
          fill={isHome === "#leaveYourInfo__home" ? GRAY_20 : GRAY_50}
          circleFill={isHome === "#leaveYourInfo__home" ? PRIMARY : GRAY_70}
        />
      ),
      link: "#leaveYourInfo__home",
    },
  ];

  return (
    <Flex between row height={screenHeight}>
      <Flex flex={1}>{children}</Flex>
      <Flex center className={styles.overAll}>
        <SvgContrast className={styles.svgContrast} />
        {data.map((data, index) => {
          return (
            <a key={index.toString()} href={data.link} onClick={() => setHome(data.link)}>
              <div  className={styles.listDiv}>
                {data.icon}
              </div>
            </a>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Layout;
