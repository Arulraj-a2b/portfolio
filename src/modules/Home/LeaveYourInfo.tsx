import Button from "../../package/Button/Button";
import Flex from "../../package/Flex/Flex";
import InputText from "../../package/InputText/InputText";
import LabelWrapper from "../../package/LabelWrapper/LabelWrapper";
import Text from "../../package/Text/Text";
import styles from "./leaveyourinfo.module.css";

const LeaveYourInfo = () => {
  return (
    <Flex row className={styles.overAll}>
      <Flex flex={7}>
        <Text size={32} bold>
          Leave us your info
        </Text>
        <Flex flex={1} className={styles.infoCard}>
          <InputText label="Your Full Name" required />
          <div className={styles.emailInput}>
            <InputText label="Your Email" required />
          </div>
          <InputText label="Subject" />
          <div className={styles.emailInput}>
            <LabelWrapper label="Your Message" required>
              <textarea className={styles.textarea} />
            </LabelWrapper>
          </div>
          <Button className={styles.sendBtn}>Send Message</Button>
        </Flex>
      </Flex>
      <Flex flex={5}>
        <Text size={32} bold>
          Leave us your info
        </Text>
      </Flex>
    </Flex>
  );
};

export default LeaveYourInfo;
