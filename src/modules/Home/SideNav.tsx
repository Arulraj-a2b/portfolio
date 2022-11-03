import SvgExtraSkill from "../../icons/SvgExtraSkill";
import SvgGitUp from "../../icons/SvgGitUp";
import SvgLinkedIn from "../../icons/SvgLinkedIn";
import Button from "../../package/Button/Button";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { screenHeight } from "../../utils/constants";
import { addressList, extraSkill, languagesList, skillList } from "./mock";
import styles from "./sidenav.module.css";

const SideNav = () => {
  return (
    <Flex className={styles.overAll} height={screenHeight-70}>
      <Flex center>
        <img
          className={styles.profile}
          alt="Profile"
          src={require("../../images/profile.jpg")}
        />
        <Text size={20} bold className={styles.name}>
          Arulraj V
        </Text>
        <Text bold color="gray">
          Software Engineering
        </Text>
        <Flex row middle center className={styles.svgContainer}>
          <SvgGitUp />
          <div style={{ margin: "0 16px", marginTop: 3 }}>
            <SvgLinkedIn />
          </div>
        </Flex>
      </Flex>
      <div className={styles.borderBottom} style={{ marginBottom: 20 }} />
      {addressList.map((list, index) => {
        return (
          <Flex
            row
            center
            between
            key={index.toString()}
            className={styles.addressList}
          >
            <Flex center middle className={styles.ageText}>
              <Text size={16}>{list.title}:</Text>
            </Flex>
            <Text size={16}>{list.value}</Text>
          </Flex>
        );
      })}
      <div style={{ paddingTop: 16 }} className={styles.borderBottom} />
      <Text size={18} className={styles.languageText}>
        Skills
      </Text>
      {languagesList.map((list, index) => {
        return (
          <Flex className={styles.addressList} key={index.toString()}>
            <Flex row center between className={styles.titleFlex}>
              <Text color="gray" size={16}>
                {list.title}
              </Text>
              <Text color="gray" size={16}>
                {list.value}
              </Text>
            </Flex>
            <div className={styles.progressBorder}>
              <div
                style={{ width: list.value }}
                className={styles.progressColor}
              />
            </div>
          </Flex>
        );
      })}
      <div style={{ paddingTop: 16 }} className={styles.borderBottom} />
      <Text size={18} className={styles.languageText}>
        Skills
      </Text>
      {skillList.map((list, index) => {
        return (
          <Flex className={styles.addressList} key={index.toString()}>
            <Flex row center between className={styles.titleFlex}>
              <Text color="gray" size={16}>
                {list.title}
              </Text>
              <Text color="gray" size={16}>
                {list.value}
              </Text>
            </Flex>
            <div className={styles.progressBorder}>
              <div
                style={{ width: list.value }}
                className={styles.progressColor}
              />
            </div>
          </Flex>
        );
      })}
      <div style={{ paddingTop: 16 }} className={styles.borderBottom} />
      <Text size={18} className={styles.languageText}>
        Extra Skills
      </Text>
      {extraSkill.map((list, index) => {
        return (
          <Flex
            row
            center
            className={styles.addressList}
            key={index.toString()}
          >
            <div style={{ marginRight: 8 }}>
              <SvgExtraSkill />
            </div>
            <Text color="gray" size={16}>
              {list.title}
            </Text>
          </Flex>
        );
      })}
      <div style={{ paddingTop: 16 }} className={styles.borderBottom} />

      <Button className={styles.btnStyle}>Download cv</Button>
    </Flex>
  );
};

export default SideNav;
