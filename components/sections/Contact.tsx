'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { profile } from '@/content/profile';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';

const schema = z.object({
  userName: z.string().min(3, 'At least 3 characters'),
  userEmail: z.string().email('Invalid email'),
  userContact: z.string().min(7, 'Invalid phone'),
  subject: z.string().min(3, 'Subject too short'),
  message: z.string().min(70, 'Tell me a bit more (70+ chars)'),
});

type FormValues = z.infer<typeof schema>;

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_vg6jcvw';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_glh81xg';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '4rq5oSnnD8QxN7rri';

function FloatingField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className={styles.fieldError}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function Toast({ toast, onClose }: { toast: { type: 'success' | 'error'; text: string } | null; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          className={styles.toast}
          data-type={toast.type}
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        >
          <span className={styles.toastIcon}>{toast.type === 'success' ? '✓' : '!'}</span>
          <span>{toast.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    try {
      emailjs.init({ publicKey: PUBLIC_KEY });
      initializedRef.current = true;
    } catch {}
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, values as unknown as Record<string, unknown>);
      setToast({ type: 'success', text: 'Message sent. I\'ll be in touch within 24 hours.' });
      reset();
    } catch {
      setToast({ type: 'error', text: 'Could not send. Please try again or email me directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <Reveal stagger className={styles.intro}>
          <motion.span className="section-kicker" variants={fadeUp}>
            06 / Contact
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>Let&apos;s build something</SplitText>
            <span className={styles.headingAccent}> exceptional.</span>
          </motion.h2>
          <motion.p className={styles.lede} variants={fadeUp}>
            Available for senior frontend roles, contract work, and advisory. Usually reply within
            24 hours.
          </motion.p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal stagger variants={staggerContainer} className={styles.info}>
            <motion.div className={styles.infoCard} variants={fadeUp} data-cursor-hover>
              <span className={styles.infoLabel}>Email</span>
              <a href={`mailto:${profile.social.email}`} className={styles.infoValue}>
                {profile.social.email}
              </a>
            </motion.div>
            <motion.div className={styles.infoCard} variants={fadeUp} data-cursor-hover>
              <span className={styles.infoLabel}>Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={styles.infoValue}>
                {profile.phone}
              </a>
            </motion.div>
            <motion.div className={styles.infoCard} variants={fadeUp} data-cursor-hover>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>
                {profile.address.city}, {profile.address.state}, {profile.address.country}
              </span>
            </motion.div>
            <motion.div className={styles.infoCard + ' ' + styles.infoSocials} variants={fadeUp}>
              <span className={styles.infoLabel}>Elsewhere</span>
              <div className={styles.infoSocialRow}>
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" data-cursor-hover>
                  GitHub
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-hover>
                  LinkedIn
                </a>
                <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor-hover>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </Reveal>

          <Reveal variants={fadeUp}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.row}>
                <FloatingField label="Name" error={errors.userName?.message}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    {...register('userName')}
                    data-cursor-hover
                  />
                </FloatingField>
                <FloatingField label="Email" error={errors.userEmail?.message}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder=" "
                    {...register('userEmail')}
                    data-cursor-hover
                  />
                </FloatingField>
              </div>
              <div className={styles.row}>
                <FloatingField label="Phone" error={errors.userContact?.message}>
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder=" "
                    {...register('userContact')}
                    data-cursor-hover
                  />
                </FloatingField>
                <FloatingField label="Subject" error={errors.subject?.message}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    {...register('subject')}
                    data-cursor-hover
                  />
                </FloatingField>
              </div>
              <FloatingField label="Message" error={errors.message?.message}>
                <textarea
                  className={styles.textarea}
                  rows={5}
                  placeholder=" "
                  {...register('message')}
                  data-cursor-hover
                />
              </FloatingField>

              <div className={styles.submitRow}>
                <span className={styles.submitNote}>
                  By submitting, you agree to be contacted at the email provided.
                </span>
                <MagneticButton
                  type="submit"
                  disabled={submitting}
                  label={submitting ? 'Sending…' : 'Send'}
                >
                  {submitting ? 'Sending…' : 'Send message'}
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
