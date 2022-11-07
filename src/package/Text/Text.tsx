import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./text.module.css";
import {
  textColorsType,
  textAlignType,
  textTransform,
  textSize,
} from "./textTypes";

const defaultProps = {
  tag: "span",
  color: "primary",
};

type Props = {
  tag: any;
  children: ReactNode;
  className?: string;
  size?: textSize;
  color?: textColorsType;
  bold?: boolean;
  align?: textAlignType;
  transform?: textTransform;
} & typeof defaultProps;

const cx = classNames.bind(styles);

const Text = ({
  tag: Element,
  children,
  className,
  size = 14,
  color,
  bold,
  align,
  transform,
}: Props) => {
  const textClassName = cx(
    {
      [`color-${color}`]: color,
      bold,
      [`text-${align}`]: align,
      [`transform-${transform}`]: transform,
      [`text-${size}`]: size,
    },
    className,
    styles.common
  );
  return <Element className={textClassName}>{children}</Element>;
};

Text.defaultProps = defaultProps;

export default Text;
