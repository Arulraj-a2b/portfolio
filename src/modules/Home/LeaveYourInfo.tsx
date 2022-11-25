import emailjs from "@emailjs/browser";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "../../package/Button/Button";
import ErrorMessage from "../../package/ErrorMessage/ErrorMessage";
import Flex from "../../package/Flex/Flex";
import InputText from "../../package/InputText/InputText";
import LabelWrapper from "../../package/LabelWrapper/LabelWrapper";
import Loader from "../../package/Loader/Loader";
import { isEmpty } from "../../package/PackageUtils/validators";
import Text from "../../package/Text/Text";
import {
  EMAIL_KEY,
  EMAIL_SERVICE_KEY,
  getLang,
  INVALID_EMAIL_ENTERED,
  TEMPLATE_KEY,
  THIS_FIELD_REQUIRED,
} from "../../utils/constants";
import { isValidEmail } from "../../utils/validators";
import styles from "./leaveyourinfo.module.css";
import { contactList } from "./mock";

const cx = classNames.bind(styles);

type formType = {
  userName: string;
  userEmail: string;
  userContact: string;
  subject: string;
  message: string;
};

const initialValues = {
  userName: "",
  userEmail: "",
  userContact: "",
  subject: "",
  message: "",
};

type Props = {
  isMobile?: boolean;
};

const LeaveYourInfo = ({ isMobile }: Props) => {
  const [isLoader, setLoader] = useState(false);

  const { LEAVE_INFO, SEND_MESSAGE, CONTACT_INFO } = getLang;

  const handleValidation = (values: formType) => {
    const errors: Partial<formType> = {};
    if (isEmpty(values.userName)) {
      errors.userName = THIS_FIELD_REQUIRED;
    } else if (values.userName.length < 3) {
      errors.userName = "Invalid name";
    }
    if (isEmpty(values.userEmail)) {
      errors.userEmail = THIS_FIELD_REQUIRED;
    } else if (!isValidEmail(values.userEmail)) {
      errors.userEmail = INVALID_EMAIL_ENTERED;
    }
    if (isEmpty(values.userContact)) {
      errors.userContact = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.message)) {
      errors.message = THIS_FIELD_REQUIRED;
    } else if (values.message.length < 70) {
      errors.message = "Text length should contain at least 70 characters.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (value) => handleSubmit(value),
    validate: handleValidation,
  });

  const handleSubmit = (values: formType) => {
    setLoader(true);
    var templateParams: any = {
      userName: values.userName,
      userEmail: values.userEmail,
      userContact: values.userContact,
      subject: values.subject,
      message: values.message,
    };
    emailjs
      .send(EMAIL_SERVICE_KEY, TEMPLATE_KEY, templateParams, EMAIL_KEY)
      .then(
        (response) => {
          setLoader(false);
          if (response.text === "OK") {
            formik.resetForm();
          } else {
            alert(response.text);
          }
        },
        (err) => {
          setLoader(false);
          console.log("FAILED...", err);
          alert(err);
        }
      );
  };

  return (
    <>
      {isLoader && <Loader />}
      <Flex
        row={!isMobile}
        className={cx({ overAll: !isMobile, overAllMobile: isMobile })}
      >
        <Flex flex={isMobile ? 1 : 7}>
          <Text size={isMobile ? 18 : 32} bold className={styles.titleText}>
            {LEAVE_INFO}
          </Text>
          <Flex flex={1} className={styles.infoCard}>
            <InputText
              value={formik.values.userName}
              label="Your Full Name"
              required
              onChange={formik.handleChange("userName")}
            />
            <ErrorMessage
              name="userName"
              touched={formik.touched}
              errors={formik.errors}
            />
            <div className={styles.emailInput}>
              <InputText
                value={formik.values.userEmail}
                label="Your Email"
                required
                onChange={formik.handleChange("userEmail")}
              />
              <ErrorMessage
                name="userEmail"
                touched={formik.touched}
                errors={formik.errors}
              />
            </div>
            <InputText
              value={formik.values.userContact}
              label="Phone"
              required
              onChange={formik.handleChange("userContact")}
            />
            <ErrorMessage
              name="userContact"
              touched={formik.touched}
              errors={formik.errors}
            />
            <div className={styles.emailInput}>
              <InputText
                value={formik.values.subject}
                label="Subject"
                onChange={formik.handleChange("subject")}
              />
            </div>
            <LabelWrapper label="Your Message" required>
              <textarea
                value={formik.values.message}
                className={styles.textarea}
                onChange={formik.handleChange("message")}
              />
              <ErrorMessage
                name="message"
                touched={formik.touched}
                errors={formik.errors}
              />
            </LabelWrapper>
            <Button onClick={formik.handleSubmit} className={styles.sendBtn}>
              {SEND_MESSAGE}
            </Button>
          </Flex>
        </Flex>
        <Flex
          flex={isMobile ? 1 : 5}
          className={cx({ contactFlex: !isMobile, contactMarginTop: isMobile })}
        >
          <Text size={isMobile ? 18 : 32} bold className={styles.titleText}>
            {CONTACT_INFO}
          </Text>
          <div style={{ marginTop: 40 }}>
            {contactList.map((data, index) => (
              <Flex
                className={cx("countryCard", {
                  countryCardMarginBottom: contactList.length - 1 !== index,
                  countryCard1: !isMobile,
                  countryCardMobile: isMobile,
                })}
                key={index.toString()}
              >
                <Flex center className={styles.svgCountry}>
                  {data.icon}
                </Flex>
                {data.list.map((dataList, index1) => (
                  <Flex
                    row
                    center
                    between
                    key={index1.toString()}
                    className={styles.dataList}
                  >
                    <Text size={isMobile ? 14 : 18}>{dataList.title}:</Text>

                    {dataList.value.includes("https:") ? (
                      <a
                        style={{ fontSize: isMobile ? 12 : 16 }}
                        className={styles.atag}
                        href={dataList.value}
                        target="_blank"
                      >
                        {dataList.value}
                      </a>
                    ) : (
                      <Text size={isMobile ? 12 : 16} color="gray">
                        {dataList.value}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Flex>
            ))}
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default LeaveYourInfo;
