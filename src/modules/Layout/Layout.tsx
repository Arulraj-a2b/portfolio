import {ReactChild, useEffect} from 'react';
import SvgContrast from '../../icons/SvgContrast';
import Flex from '../../package/Flex/Flex';
import {useTheme} from '../../utils/helpers';
import styles from './layout.module.css';

export const nearestIndex: any = (
  currentPosition: number,
  sectionPositionArray: any[],
  startIndex: number,
  endIndex: number,
) => {
  if (startIndex === endIndex) return startIndex;
  else if (startIndex === endIndex - 1) {
    if (
      Math.abs(
        sectionPositionArray[startIndex].headerRef.current.offsetTop -
          currentPosition,
      ) <
      Math.abs(
        sectionPositionArray[endIndex].headerRef.current.offsetTop -
          currentPosition,
      )
    )
      return startIndex;
    else return endIndex;
  } else {
    var nextNearest = ~~((startIndex + endIndex) / 2);
    var a = Math.abs(
      sectionPositionArray[nextNearest].headerRef.current.offsetTop -
        currentPosition,
    );
    var b = Math.abs(
      sectionPositionArray[nextNearest + 1].headerRef.current.offsetTop -
        currentPosition,
    );
    if (a < b) {
      return nearestIndex(
        currentPosition,
        sectionPositionArray,
        startIndex,
        nextNearest,
      );
    } else {
      return nearestIndex(
        currentPosition,
        sectionPositionArray,
        nextNearest,
        endIndex,
      );
    }
  }
};

type Props = {
  children: ReactChild;
  navHeader: {
    headerRef: React.MutableRefObject<any>;
    headerID: string;
    icon: JSX.Element;
  }[];
  setActiveIndex: (a: number) => void;
};

const Layout = ({children, navHeader, setActiveIndex}: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      var index = nearestIndex(
        window.scrollY,
        navHeader,
        0,
        navHeader.length - 1,
      );
      setActiveIndex(index);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex between row className={styles.overAll}>
      <Flex flex={1}>{children}</Flex>
      <div className={styles.sideDiv} />
      <Flex center className={styles.sideNav}>
        <div tabIndex={-1} onClick={useTheme}>
          <SvgContrast className={styles.svgContrast} />
        </div>
        {navHeader.map((data, index) => {
          return (
            <a key={index.toString()} href={data.headerID}>
              <div className={styles.listDiv}>{data.icon}</div>
            </a>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Layout;
