import Button from "../../package/Button/Button";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { getLang } from "../../utils/constants";
import styles from "./introcard.module.css";

const IntroCard = () => {
  const { I_AM_NAME, INTRO, HIRE_ME } = getLang;

  return (
    <Flex flex={1} className={styles.overAll}>
      <div className={styles.backgroundColor}>
      <Flex row between className={styles.profileCard}>
        <Flex className={styles.nameFlex}>
          <Text bold size={40} className={styles.textSize}>
            {I_AM_NAME}
          </Text>
          <Text color="theme" bold size={48} className={styles.textSize}>
            Senior Software{" "}
            <Text bold size={40} color="primary" className={styles.textSize}>
              Engineer
            </Text>
          </Text>
          <Text align="justify" className={styles.des} size={16} color="gray">
            {INTRO}
          </Text>
          <a href="#leaveYourInfo__home">
            <Button className={styles.hireBtn}>{HIRE_ME}</Button>
          </a>
        </Flex>
        <img
          className={styles.profile}
          alt="Profile"
          src={require("../../images/profile2.png")}
        />
      </Flex>
      </div>
    </Flex>
  );
};

export default IntroCard;
