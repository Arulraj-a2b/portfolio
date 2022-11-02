import classNames from "classnames/bind";
import { CSSProperties, useState } from "react";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import styles from "./inputtext.module.css";
import { keyBoardProps } from "./inputTextTypes";

const cx = classNames.bind(styles);
type Props = {
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: (a: any) => void;
  maxLength?: number;
  minLength?: number;
  onKeyPress?: (a: any) => void;
  keyboardType?: keyBoardProps;
  style?: CSSProperties;
};

const InputText = ({
  placeholder,
  className,
  label,
  required,
  value,
  disabled,
  keyboardType,
  onChange,
  onKeyPress,
  maxLength,
  minLength,
  style,
}: Props) => {
  const inputClassName = cx(className, styles.common);
  const handleFocus = () => {
    // setFocus(true);
  };
  const handleBlur = () => {
    // setFocus(false);
  };

  return (
    <LabelWrapper label={label} required={required}>
        <input
          maxLength={maxLength}
          minLength={minLength}
          onKeyPress={onKeyPress}
          disabled={disabled}
          type={keyboardType}
          onChange={onChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={styles.common}
          style={style}
        />
    </LabelWrapper>
  );
};

export default InputText;
