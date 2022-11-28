import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { getLang } from "../../utils/constants";
import styles from "./aboutme.module.css";

const AboutMe = () => {
  const { I_AM_NAME } = getLang;
  return (
    <Flex>
      <Flex center className={styles.profileCard}>
        <img
          className={styles.imageStyle}
          src={require("../../images/profile2.png")}
        />
        <Flex center middle bottom className={styles.nameFlex}>
          <Flex center className={styles.cardStyle}>
            <Text size={16} className={styles.helloText}>
              Hello!
            </Text>
            <Text bold size={24}>
              {I_AM_NAME}
            </Text>
            <Text color="theme" bold size={30}>
              Senior Software{" "}
              <Text bold size={24} color="primary">
                Engineer
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutMe;
