import classNames from "classnames/bind";
import SvgExtraSkill from "../../icons/SvgExtraSkill";
import SvgGitUp from "../../icons/SvgGitUp";
import SvgLinkedIn from "../../icons/SvgLinkedIn";
import Button from "../../package/Button/Button";
import Flex from "../../package/Flex/Flex";
import Text from "../../package/Text/Text";
import { getLang, screenHeight } from "../../utils/constants";
import { addressList, extraSkill, languagesList, skillList } from "./mock";
import styles from "./sidenav.module.css";

const cx = classNames.bind(styles);
type Props = {
  isMobile?: boolean;
};
const SideNav = ({ isMobile }: Props) => {
  const { INTRO, I_AM_NAME, LANGUAGES, SKILLS, EXTRA_SKILLS, DOWNLOAD_CV } =
    getLang;
  return (
    <Flex
      className={cx({ overAll: !isMobile, overAllMobile: isMobile })}
      height={isMobile ? "" : screenHeight - 70}
    >
      {!isMobile ? (
        <Flex center>
          <img
            className={styles.profile}
            alt="Profile"
            src={require("../../images/profile.png")}
          />
          <Text size={20} bold className={styles.name}>
            {I_AM_NAME}
          </Text>
          <Text bold color="gray">
            Senior Software Engineering
          </Text>
          <Flex row middle center className={styles.svgContainer}>
            <SvgGitUp />
            <div style={{ margin: "0 16px", marginTop: 3 }}>
              <SvgLinkedIn />
            </div>
          </Flex>
        </Flex>
      ) : (
        <Flex>
          <Text bold size={18}>
            About Me
          </Text>
          <Text align="justify" className={styles.des} size={16} color="gray">
            {INTRO}
          </Text>
        </Flex>
      )}
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
            <Text
              size={16}
              color={list.value === "Available" ? "success" : "primary"}
            >
              {list.value}
            </Text>
          </Flex>
        );
      })}
      <div style={{ paddingTop: 16 }} className={styles.borderBottom} />
      <Text size={18} bold className={styles.languageText}>
        {LANGUAGES}
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
      <Text bold size={18} className={styles.languageText}>
        {SKILLS}
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
      <Text bold size={18} className={styles.languageText}>
        {EXTRA_SKILLS}
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
      <Flex start={isMobile}>
        <Button className={styles.btnStyle}>{DOWNLOAD_CV}</Button>
      </Flex>
    </Flex>
  );
};

export default SideNav;
