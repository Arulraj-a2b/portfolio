import { ReactNode } from "react";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { screenWidth } from "../../utils/constants";
import { serviceList } from "./mock";
import styles from "./myservices.module.css";

type serviceProps = {
  title: string;
  icon: ReactNode;
  des: string;
};
const ServiceCard = ({ title, icon, des }: serviceProps) => {
  return (
    <Flex center className={styles.cardOverAll} width={(screenWidth - 700) / 3}>
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
    <Flex className={styles.overAll} id={"myServices__home"}>
      <Text size={32} bold align="center" className={styles.myService}>
        My Services
      </Text>
      <Flex row wrap middle>
        {serviceList.map((list, index) => {
          return (
            <div
              key={index.toString()}
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
