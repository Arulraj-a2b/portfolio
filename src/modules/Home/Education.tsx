import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import styles from "./education.module.css";
import { educationList } from "./mock";

type Props = {
  data: {
    collegeName: string;
    date: string;
    course: string;
    des: string[];
  }[];
};

export const EducationList = ({ data }: Props) => {
  return (
    <Flex className={styles.cardOverAll}>
      {data.map((list, index) => {
        return (
          <Flex>
            <Flex row center>
              <Flex flex={5}>
                <Text size={18}>{list.course}</Text>
              </Flex>
              <Flex flex={7}>
                <Text size={18}>{list.collegeName}</Text>
              </Flex>
            </Flex>
            <Flex row start className={styles.studentFlex}>
              <Flex flex={5} row center>
                <Text color="gray" size={16}>
                  Student
                </Text>
                <Text className={styles.dateStyle}>{list.date}</Text>
              </Flex>
              <Flex flex={7}>
                {list.des.map((desList, index) => (
                  <Text color="gray" size={16} key={index.toString()}>
                    {desList}
                  </Text>
                ))}
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
const Education = () => {
  return (
    <Flex className={styles.overAll}>
      <Text size={32} bold align="center">
        Education
      </Text>
      <EducationList data={educationList} />
    </Flex>
  );
};

export default Education;
