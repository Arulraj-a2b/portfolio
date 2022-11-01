import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import Layout from "../Layout/Layout";
import SideNav from "./SideNav";

const HomeScreen = () => {
  return (
    <Flex>
      <Layout>
        <SideNav />
      </Layout>
    </Flex>
  );
};

export default HomeScreen;
