import classNames from "classnames/bind";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { isEmpty } from "../../utils/validators";
import styles from "./education.module.css";

const cx = classNames.bind(styles);

type listProps = {
  data: {
    collegeName: string;
    date: string;
    course: string;
    position: string;
    des: {
        data: string[];
        url: string;
    }[];
}[];
  isMobile?: boolean;
};

export const EducationList = ({ data, isMobile }: listProps) => {
  return (
    <Flex
      className={cx({ cardOverAll: !isMobile, cardOverAllMobile: isMobile })}
    >
      {data.map((list, index) => {
        return (
          <Flex key={index.toString()}>
            <Flex row>
              <Flex flex={5}>
                <Text size={isMobile ? 14 : 18} bold>
                  {list.course}
                </Text>
              </Flex>
              <Flex flex={7}>
                <Text bold size={isMobile ? 14 : 18}>
                  {list.collegeName}
                </Text>
              </Flex>
            </Flex>
            <Flex row start className={styles.studentFlex}>
              <Flex flex={5} row={!isMobile} center={!isMobile}>
                <Text color="gray" size={isMobile ? 14 : 16}>
                  {list.position}
                </Text>
                <Text
                  size={isMobile ? 10 : 14}
                  className={cx("dateStyle", {
                    dateMarginLeft: !isMobile,
                    dateMarginTop: isMobile,
                  })}
                >
                  {list.date}
                </Text>
              </Flex>
              <Flex flex={7}>
                {list.des.map((desList, index1) => {
                  return (
                    <Flex key={index1.toString()}>
                      {desList.data?.map((dataList, index2) => {
                        return (
                          <Text
                            key={index2.toString()}
                            color="gray"
                            size={isMobile ? 14 : 16}
                            className={cx({
                              desList: desList.data.length - 1 !== index1,
                            })}
                          >
                            {dataList}
                          </Text>
                        );
                      })}
                      {!isEmpty(desList.url) && (
                        <a
                          href={desList.url}
                          style={{ textDecoration: "none", marginTop: 8 }}
                          target="_blank"
                        >
                          <Text color="link">{desList.url}</Text>
                        </a>
                      )}
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
            {data.length - 1 !== index && (
              <div className={styles.borderBottom} />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

type Props = {
  isMobile?: boolean;
  title: string;
  data: any[];
};
const Education = ({ isMobile, title, data }: Props) => {
  return (
    <Flex className={cx({ overAll: !isMobile, overAllMobile: isMobile })}>
      <Text
        size={isMobile ? 18 : 32}
        bold
        align={isMobile ? "start" : "center"}
      >
        {title}
      </Text>
      <EducationList data={data} isMobile={isMobile} />
    </Flex>
  );
};

export default Education;
