import classNames from "classnames/bind";
import { animated, useSpring } from "react-spring";
import { useEffect } from "react";
import SvgCloseWindow from "../../icons/SvgCloseWindow";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { nearestIndex } from "../Layout/Layout";
import styles from "./sidebar.module.css";

const cx = classNames.bind(styles);

type Props = {
  close: () => void;
  navHeader: {
    headerRef: React.MutableRefObject<any>;
    icon: JSX.Element;
    headerID: string;
    title: string;
  }[];
  setActiveIndex: (a: number) => void;
  isMenu: boolean;
};

const SideBar = ({ close, navHeader, setActiveIndex, isMenu }: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      var index = nearestIndex(
        window.scrollY,
        navHeader,
        0,
        navHeader.length - 1
      );
      setActiveIndex(index);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { x } = useSpring({
    opacity: isMenu ? 1 : 0,
    x: isMenu ? 0 : 100,
  });
  return (
    <animated.div
      style={{
        transform: x.interpolate((x) => `translate3d(${x * -1}%,0,0)`),
      }}
      className={cx('overAll')}
    >
      <Flex className={styles.cardStyle}>
        <Flex end>
          <SvgCloseWindow onClick={close} />
        </Flex>
        {navHeader.map((list, index) => {
          return (
            <a
              key={index.toString()}
              href={list.headerID}
              className={styles.aTag}
              onClick={close}
            >
              <Flex row center>
                {list.icon}
                <Text className={styles.listTitle}>{list.title}</Text>
              </Flex>
            </a>
          );
        })}
      </Flex>
    </animated.div>
  );
};

export default SideBar;
