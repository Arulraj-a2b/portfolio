import { memo } from "react";
import classNames from "classnames/bind";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import styles from "./labelwarpper.module.css";
import { isEmpty } from "../PackageUtils/validators";

const cx = classNames.bind(styles);
type Props = {
  required?: boolean;
  children?: import("react").ReactNode;
  label?: string;
};

const LabelWrapper = ({ required, children, label }: Props) => {
  return !isEmpty(label) ? (
    <Flex className={cx("overAll")}>
      <Flex row className={cx("labelConatiner")}>
        <Text color={"gray"} className={cx("labelText")}>
          {label}
        </Text>
        {required && <Text color={"theme"}>*</Text>}
      </Flex>
      {children}
    </Flex>
  ) : (
    <>{children}</>
  );
};

export default memo(
  LabelWrapper,
  (prevProps: Props, nextProps: Props) =>
    prevProps.children === nextProps.children
);
