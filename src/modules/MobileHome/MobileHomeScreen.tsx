import {useRef, useState} from 'react';
import SvgContact from '../../icons/SvgContact';
import SvgContrast from '../../icons/SvgContrast';
import SvgCv from '../../icons/SvgCv';
import SvgHome from '../../icons/SvgHome';
import SvgMenu from '../../icons/SvgMenu';
import SvgPortfolio from '../../icons/SvgPortfolio';
import SvgService from '../../icons/SvgService';
import Flex from '../../package/Flex/Flex';
import {GRAY_20, GRAY_50, PRIMARY, GRAY_70} from '../../utils/colors';
import {getLang} from '../../utils/constants';
import {useTheme} from '../../utils/helpers';
import Education from '../Home/Education';
import LeaveYourInfo from '../Home/LeaveYourInfo';
import {educationList, workList} from '../Home/mock';
import MyServices from '../Home/MyServices';
import SideNav from '../Home/SideNav';
import AboutMe from './AboutMe';
import styles from './mobilehomescreen.module.css';
import SideBar from './SideBar';

const MobileHomeScreen = () => {
  const [isMenu, setMenu] = useState(false);
  const section1Ref = useRef<any>();
  const section2Ref = useRef<any>();
  const section3Ref = useRef<any>();
  const section4Ref = useRef<any>();
  const section5Ref = useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const {EDUCATION, WORK_HISTORY} = getLang;

  const navHeader = [
    {
      headerRef: section1Ref,
      icon: (
        <SvgHome
          fill={activeIndex === 0 ? GRAY_20 : GRAY_50}
          circleFill={activeIndex === 0 ? PRIMARY : GRAY_70}
        />
      ),
      headerID: '#introCard__home',
      title: 'Home',
    },
    {
      headerRef: section2Ref,
      icon: (
        <SvgService
          fill={activeIndex === 1 ? GRAY_20 : GRAY_50}
          circleFill={activeIndex === 1 ? PRIMARY : GRAY_70}
        />
      ),
      headerID: '#myServices__home',
      title: 'My Service',
    },
    {
      headerRef: section3Ref,
      icon: (
        <SvgCv
          fill={activeIndex === 2 ? GRAY_20 : GRAY_50}
          circleFill={activeIndex === 2 ? PRIMARY : GRAY_70}
        />
      ),
      headerID: '#education__home',
      title: 'Education',
    },
    {
      headerRef: section4Ref,
      icon: (
        <SvgPortfolio
          fill={activeIndex === 3 ? GRAY_20 : GRAY_50}
          circleFill={activeIndex === 3 ? PRIMARY : GRAY_70}
        />
      ),
      headerID: '#workHistory__home',
      title: 'Work Experience',
    },
    {
      headerRef: section5Ref,
      icon: (
        <SvgContact
          fill={activeIndex === 4 ? GRAY_20 : GRAY_50}
          circleFill={activeIndex === 4 ? PRIMARY : GRAY_70}
        />
      ),
      headerID: '#leaveYourInfo__home',
      title: 'Contact',
    },
  ];

  const handleOpenMenu = () => setMenu(true);
  const handleCloseMenu = () => setMenu(false);

  return (
    <Flex>
      <SideBar
        setActiveIndex={setActiveIndex}
        close={handleCloseMenu}
        navHeader={navHeader}
        isMenu={isMenu}
      />

      <Flex row center between className={styles.svgMenuFlex}>
        <div
          style={{width: 'fit-content'}}
          ref={section1Ref}
          onClick={handleOpenMenu}
          id="introCard__home">
          <SvgMenu />
        </div>
        <div tabIndex={-1} onClick={useTheme}>
          <SvgContrast className={styles.svgContrast} />
        </div>
      </Flex>
      <AboutMe />
      <div className={styles.sideDiv}>
        <SideNav isMobile />
      </div>
      <div className={styles.sideDiv} ref={section2Ref} id="myServices__home">
        <MyServices isMobile />
      </div>
      <div className={styles.sideDiv} ref={section3Ref} id="education__home">
        <Education isMobile data={educationList} title={EDUCATION} />
      </div>
      <div className={styles.sideDiv} ref={section4Ref} id="workHistory__home">
        <Education isMobile data={workList} title={WORK_HISTORY} />
      </div>
      <div
        className={styles.sideDiv}
        ref={section5Ref}
        id="leaveYourInfo__home">
        <LeaveYourInfo isMobile />
      </div>
    </Flex>
  );
};

export default MobileHomeScreen;
