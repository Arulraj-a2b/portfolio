import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { useState } from "react";
import SvgCounty from "../../icons/SvgCounty";
import Button from "../../package/Button/Button";
import ErrorMessage from "../../package/ErrorMessage/ErrorMessage";
import Flex from "../../package/Flex/Flex";
import InputText from "../../package/InputText/InputText";
import LabelWrapper from "../../package/LabelWrapper/LabelWrapper";
import Loader from "../../package/Loader/Loader";
import { isEmpty } from "../../package/PackageUtils/validators";
import Text from "../../package/Text/Text";
import {
  INVALID_EMAIL_ENTERED,
  THIS_FIELD_REQUIRED,
} from "../../utils/constants";
import { isValidEmail } from "../../utils/validators";
import styles from "./leaveyourinfo.module.css";
import { contactList } from "./mock";

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
const LeaveYourInfo = () => {
  const [isLoader, setLoader] = useState(false);

  const handleValidation = (values: formType) => {
    const errors: Partial<formType> = {};
    if (isEmpty(values.userName)) {
      errors.userName = THIS_FIELD_REQUIRED;
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
      .send(
        "service_vg6jcvw",
        "template_glh81xg",
        templateParams,
        "4rq5oSnnD8QxN7rri"
      )
      .then(
        (response) => {
          setLoader(false);
          // console.log("SUCCESS!", response.status, response.text);
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
      <Flex row className={styles.overAll}>
        <Flex flex={7}>
          <Text size={32} bold>
            Leave us your info
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
              Send Message
            </Button>
          </Flex>
        </Flex>
        <Flex flex={5} className={styles.contactFlex}>
          <Text size={32} bold>
            Contact information
          </Text>
          <div style={{ marginTop: 50 }}>
            {contactList.map((data, index) => (
              <Flex
                className={
                  contactList.length - 1 === index
                    ? styles.countryCard
                    : styles.countryCard1
                }
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
                    <Text size={18}>{dataList.title}:</Text>

                    {dataList.value.includes("https:") ? (
                      <a className={styles.atag} href={dataList.value} target="_blank">
                        {dataList.value}
                      </a>
                    ) : (
                      <Text size={16} color="gray">
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
