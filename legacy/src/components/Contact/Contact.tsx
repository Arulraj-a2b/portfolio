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
import SvgGitUp from '../../icons/SvgGitUp';
import SvgLinkedIn from '../../icons/SvgLinkedIn';
import SvgWhatsApp from '../../icons/SvgWhatsApp';
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
        <div className={styles.grid}>
          {/* Form */}
          <motion.div
            className={styles.formCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              Leave us your info
            </motion.h2>
            <motion.form onSubmit={formik.handleSubmit} variants={fadeUp}>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    className={`${styles.input} ${formik.touched.userName && formik.errors.userName ? styles.inputError : ''}`}
                    placeholder="Name"
                  />
                  {formik.touched.userName && formik.errors.userName && (
                    <span className={styles.errorText}>{formik.errors.userName}</span>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="userEmail"
                    value={formik.values.userEmail}
                    onChange={formik.handleChange}
                    className={`${styles.input} ${formik.touched.userEmail && formik.errors.userEmail ? styles.inputError : ''}`}
                    placeholder="Email"
                  />
                  {formik.touched.userEmail && formik.errors.userEmail && (
                    <span className={styles.errorText}>{formik.errors.userEmail}</span>
                  )}
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="userContact"
                    value={formik.values.userContact}
                    onChange={formik.handleChange}
                    className={`${styles.input} ${formik.touched.userContact && formik.errors.userContact ? styles.inputError : ''}`}
                    placeholder="Phone"
                  />
                  {formik.touched.userContact && formik.errors.userContact && (
                    <span className={styles.errorText}>{formik.errors.userContact}</span>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    className={styles.input}
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  className={`${styles.textarea} ${formik.touched.message && formik.errors.message ? styles.inputError : ''}`}
                  placeholder="Message"
                  rows={4}
                />
                {formik.touched.message && formik.errors.message && (
                  <span className={styles.errorText}>{formik.errors.message}</span>
                )}
              </div>
              <motion.button
                type="submit"
                className={styles.submitBtn}
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

            {/* Social Links */}
            <motion.div className={styles.socialLinks} variants={fadeUp}>
              <a href="https://github.com/Arulraj-a2b" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <SvgGitUp />
              </a>
              <a href="https://www.linkedin.com/in/abofficial1997/" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <SvgLinkedIn />
              </a>
              <a href="https://wa.me/918189838485" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <SvgWhatsApp />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
