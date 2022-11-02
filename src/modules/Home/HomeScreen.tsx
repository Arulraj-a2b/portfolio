import Flex from "../../package/Flex/Flex";
import Layout from "../Layout/Layout";
import SideNav from "./SideNav";
import styles from "./homescreen.module.css";
import IntroCard from "./IntroCard";
import MyServices from "./MyServices";
import Education from "./Education";
import WorkHistory from "./WorkHistory";
import LeaveYourInfo from "./LeaveYourInfo";
import { screenHeight } from "../../utils/constants";

const HomeScreen = () => {
  return (
    <Flex>
      <Layout>
        <Flex row>
          <div className={styles.sidDiv} style={{ height: screenHeight }}>
            <SideNav />
          </div>
          <Flex className={styles.home} height={screenHeight}>
            <IntroCard />
            <MyServices />
            <Education />
            <WorkHistory />
            <LeaveYourInfo />
          </Flex>
        </Flex>
      </Layout>
    </Flex>
  );
};

export default HomeScreen;
