import classNames from "classnames/bind";
import { ReactNode } from "react";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { getLang } from "../../utils/constants";
import { serviceList } from "./mock";
import styles from "./myservices.module.css";
const cx = classNames.bind(styles);

type serviceProps = {
  title: string;
  icon: ReactNode;
  des: string;
};

const ServiceCard = ({ title, icon, des }: serviceProps) => {
  return (
    <Flex center className={cx("cardOverAll")}>
      {icon}
      <Text className={styles.titleText} bold size={18}>
        {title}
      </Text>
      <Text color="gray">{des}</Text>
    </Flex>
  );
};

type Props = {
  isMobile?: boolean;
};
const MyServices = ({ isMobile }: Props) => {
  const { MY_SERVICE } = getLang;
  return (
    <Flex className={cx({ overAll: !isMobile, overAllMobile: isMobile })}>
      <Text
        size={isMobile ? 18 : 32}
        bold
        align={isMobile ? "start" : "center"}
        className={cx("myService", { myServiceIsMobile: isMobile })}
      >
        {MY_SERVICE}
      </Text>
      <Flex flex={1} row={!isMobile} wrap={!isMobile} middle center>
        {serviceList.map((list, index) => {
          return (
            <div
              key={index.toString()}
              style={{
                marginRight:
                  serviceList.length - 1 === index || isMobile ? 0 : 20,
                width: isMobile ? "75%" : "31.6%",
                marginBottom: serviceList.length - 1 === index ? 0 : 20,
              }}
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
