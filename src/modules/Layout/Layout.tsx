import { ReactChild } from "react";
import SvgContact from "../../icons/SvgContact";
import SvgContrast from "../../icons/SvgContrast";
import SvgCv from "../../icons/SvgCv";
import SvgHome from "../../icons/SvgHome";
import SvgPortfolio from "../../icons/SvgPortfolio";
import SvgService from "../../icons/SvgService";
import Flex from "../../package/Flex/Flex";
import styles from "./layout.module.css";

type Props = {
  children: ReactChild;
};

const Layout = ({ children }: Props) => {
  const data = [
    {
      icon: <SvgHome />,
    },
    {
      icon: <SvgService />,
    },
    {
      icon: <SvgCv />,
    },
    {
      icon: <SvgPortfolio />,
    },
    {
      icon: <SvgContact />,
    },
  ];

  return (
    <Flex between row height={window.innerHeight}>
      <Flex flex={1} className={styles.scrollStyle}>{children}</Flex>
      <Flex center className={styles.overAll}>
        <SvgContrast className={styles.svgContrast} />
        {data.map((data, index) => {
          return (
            <div key={index.toString()} className={styles.listDiv}>
              {data.icon}
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Layout;
