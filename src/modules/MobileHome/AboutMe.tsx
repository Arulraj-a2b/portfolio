import Flex from '../../package/Flex/Flex';
import Text from '../../package/Text/Text';
import {getLang} from '../../utils/constants';
import styles from './aboutme.module.css';

const AboutMe = () => {
  const {I_AM_NAME} = getLang;
  return (
    <Flex center className={styles.profileCard}>
      <img
        className={styles.imageStyle}
        src={require('../../images/profile2.png')}
      />
      <Flex center middle bottom className={styles.nameFlex}>
        <Flex center className={styles.cardStyle}>
          <Text size={16} className={styles.helloText}>
            Hello!
          </Text>
          <Text bold size={24} className={styles.textDefaultWhite}>
            {I_AM_NAME}
          </Text>
          <Text color="theme" bold size={30}>
            Software{' '}
            <Text className={styles.textDefaultWhite} bold size={24}>
              Engineer
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutMe;
