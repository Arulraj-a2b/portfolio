import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import Layout from "../Layout/Layout";
import SideNav from "./SideNav";
import styles from "./homescreen.module.css";
import IntroCard from "./IntroCard";
import MyServices from "./MyServices";
import Education from "./Education";
import WorkHistory from "./WorkHistory";
import LeaveYourInfo from "./LeaveYourInfo";

const HomeScreen = () => {
  return (
    <Flex>
      <Layout>
        <Flex row>
          <SideNav />
          <Flex className={styles.home}>
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
