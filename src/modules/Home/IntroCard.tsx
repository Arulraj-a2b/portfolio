import Button from "../../package/Button/Button";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { screenWidth } from "../../utils/constants";
import styles from "./introcard.module.css";

const IntroCard = () => {
  return (
    <div id={"introCard__home"} className={styles.overAll}>
      <Flex
        row
        between
        width={screenWidth - 660}
        className={styles.profileCard}
      >
        <Flex className={styles.nameFlex}>
          <Text bold size={40}>
            I’m Arulraj
          </Text>
          <Text color="theme" bold size={48}>
            Senior Software{" "}
            <Text bold size={40} color="primary">
              Engineer
            </Text>
          </Text>
          <Text className={styles.des} size={16} color="gray">
            Hi, I am Arulraj currently, I am working as a Senior Software
            Engineer with Squash Apps on website development and app
            development. I have more than 2 years of experience in React js,
            React Native, Angular, Redux, Typescript, and Javascript and I have
            worked on cross-browser compatibility
          </Text>
          <Button className={styles.hireBtn}>Hire Me</Button>
        </Flex>
        <img
          className={styles.profile}
          alt="Profile"
          src={require("../../images/profile2.png")}
        />
      </Flex>
    </div>
  );
};

export default IntroCard;
