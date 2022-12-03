import Flex from '../../package/Flex/Flex';
import Layout from '../Layout/Layout';
import SideNav from './SideNav';
import styles from './homescreen.module.css';
import IntroCard from './IntroCard';
import MyServices from './MyServices';
import Education from './Education';
import LeaveYourInfo from './LeaveYourInfo';
import {useRef, useState} from 'react';
import SvgHome from '../../icons/SvgHome';
import SvgContact from '../../icons/SvgContact';
import SvgCv from '../../icons/SvgCv';
import SvgPortfolio from '../../icons/SvgPortfolio';
import SvgService from '../../icons/SvgService';
import {GRAY_20, GRAY_50, PRIMARY, GRAY_70} from '../../utils/colors';
import {getLang} from '../../utils/constants';
import {educationList, workList} from './mock';

const HomeScreen = () => {
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
    },
  ];

  return (
    <Layout navHeader={navHeader} setActiveIndex={setActiveIndex}>
      <Flex row>
        <SideNav />
        <div className={styles.sideDiv} />
        <Flex flex={1} className={styles.home}>
          <div ref={section1Ref} id="introCard__home">
            <IntroCard />
          </div>
          <div ref={section2Ref} id="myServices__home">
            <MyServices />
          </div>
          <div ref={section3Ref} id="education__home">
            <Education data={educationList} title={EDUCATION} />
          </div>
          <div ref={section4Ref} id="workHistory__home">
            <Education data={workList} title={WORK_HISTORY} />{' '}
          </div>
          <div ref={section5Ref} id="leaveYourInfo__home">
            <LeaveYourInfo />
          </div>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomeScreen;
