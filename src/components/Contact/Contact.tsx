import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import { useState } from 'react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import {
  EMAIL_KEY,
  EMAIL_SERVICE_KEY,
  getLang,
  INVALID_EMAIL_ENTERED,
  TEMPLATE_KEY,
  THIS_FIELD_REQUIRED,
} from '../../utils/constants';
import { isValidEmail } from '../../utils/validators';
import { isEmpty } from '../../package/PackageUtils/validators';
import { contactList } from '../../modules/Home/mock';
import styles from './Contact.module.css';

type FormType = {
  userName: string;
  userEmail: string;
  userContact: string;
  subject: string;
  message: string;
};

const initialValues: FormType = {
  userName: '',
  userEmail: '',
  userContact: '',
  subject: '',
  message: '',
};

const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div
    className={`${styles.toast} ${type === 'success' ? styles.toastSuccess : styles.toastError}`}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    transition={{ type: 'spring', damping: 20 }}
  >
    <span>{message}</span>
    <button className={styles.toastClose} onClick={onClose}>&times;</button>
  </motion.div>
);

const FloatingInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  error,
  touched,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}) => (
  <div className={styles.inputGroup}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${value ? styles.inputFilled : ''} ${touched && error ? styles.inputError : ''}`}
      placeholder=" "
    />
    <label className={styles.floatingLabel}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    <AnimatePresence>
      {touched && error && (
        <motion.span
          className={styles.errorText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

const Contact = () => {
  const [isLoading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleValidation = (values: FormType) => {
    const errors: Partial<FormType> = {};
    if (isEmpty(values.userName)) {
      errors.userName = THIS_FIELD_REQUIRED;
    } else if (values.userName.length < 3) {
      errors.userName = 'Invalid name';
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
      errors.message = 'Message should be at least 70 characters.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
    validate: handleValidation,
  });

  const handleSubmit = (values: FormType) => {
    setLoading(true);
    const templateParams: any = {
      userName: values.userName,
      userEmail: values.userEmail,
      userContact: values.userContact,
      subject: values.subject,
      message: values.message,
    };
    emailjs.send(EMAIL_SERVICE_KEY, TEMPLATE_KEY, templateParams, EMAIL_KEY).then(
      (response) => {
        setLoading(false);
        if (response.text === 'OK') {
          formik.resetForm();
          showToast('Message sent successfully!', 'success');
        } else {
          showToast(response.text, 'error');
        }
      },
      (err) => {
        setLoading(false);
        console.log('FAILED...', err);
        showToast('Failed to send message. Please try again.', 'error');
      },
    );
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.sectionTitle}>{getLang.LEAVE_INFO}</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.grid}>
          {/* Form */}
          <motion.div
            className={styles.formCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.form onSubmit={formik.handleSubmit} variants={fadeUp}>
              <FloatingInput
                label="Your Full Name"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                required
                error={formik.errors.userName}
                touched={formik.touched.userName}
              />
              <FloatingInput
                label="Your Email"
                name="userEmail"
                type="email"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                required
                error={formik.errors.userEmail}
                touched={formik.touched.userEmail}
              />
              <FloatingInput
                label="Phone"
                name="userContact"
                type="tel"
                value={formik.values.userContact}
                onChange={formik.handleChange}
                required
                error={formik.errors.userContact}
                touched={formik.touched.userContact}
              />
              <FloatingInput
                label="Subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
              />
              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  className={`${styles.textarea} ${formik.values.message ? styles.inputFilled : ''} ${
                    formik.touched.message && formik.errors.message ? styles.inputError : ''
                  }`}
                  placeholder=" "
                  rows={5}
                />
                <label className={styles.floatingLabel}>
                  Your Message<span className={styles.required}>*</span>
                </label>
                <AnimatePresence>
                  {formik.touched.message && formik.errors.message && (
                    <motion.span
                      className={styles.errorText}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {formik.errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-glow)' }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.spinner} />
                ) : (
                  getLang.SEND_MESSAGE
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className={styles.infoCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h3 className={styles.infoTitle} variants={fadeUp}>
              {getLang.CONTACT_INFO}
            </motion.h3>
            {contactList.map((data, index) => (
              <motion.div key={index} className={styles.infoCard} variants={fadeUp}>
                <div className={styles.infoIcon}>{data.icon}</div>
                <div className={styles.infoDetails}>
                  {data.list.map((item, i) => (
                    <div key={i} className={styles.infoRow}>
                      <span className={styles.infoLabel}>{item.title}</span>
                      {item.value.includes('https:') ? (
                        <a href={item.value} target="_blank" rel="noreferrer" className={styles.infoLink}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.infoValue}>{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
