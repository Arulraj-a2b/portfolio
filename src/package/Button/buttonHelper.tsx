import { textColorsType } from "../Text/textTypes";

type buttonTypes = "primary" | "secondary" | "link" | "tertiary";
export const buttonHelper = (types?: buttonTypes, disabled?: boolean) => {
  let textColor: textColorsType = "primary";
  if (types === "primary") {
    textColor = "primary";
  } else if (types === "secondary") {
    textColor = "theme";
  } else if (types === "link") {
    textColor = "link";
  }

  if (disabled && types === "secondary") {
    textColor = "theme";
  } else if (disabled && types !== "secondary") {
    textColor = "white";
  }

  return { textColor };
};
