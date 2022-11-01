import { ReactNode } from "react";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { serviceList } from "./mock";
import styles from "./myservices.module.css";

type serviceProps = {
  title: string;
  icon: ReactNode;
  des: string;
};
const ServiceCard = ({ title, icon, des }: serviceProps) => {
  return (
    <Flex
      center
      className={styles.cardOverAll}
      width={(window.innerWidth - 660) / 3}
    >
      {icon}
      <Text className={styles.titleText} bold size={18}>
        {title}
      </Text>
      <Text color="gray">{des}</Text>
    </Flex>
  );
};

const MyServices = () => {
  return (
    <Flex className={styles.overAll}>
      <Text size={32} bold align="center" className={styles.myService}>
        My Services
      </Text>
      <Flex row wrap>
        {serviceList.map((list, index) => {
          return (
            <div
              style={{ marginRight: serviceList.length - 1 === index ? 0 : 20 }}
            >
              <ServiceCard title={list.title} des={list.des} icon={list.icon} />
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MyServices;
