'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { profile } from '@/content/profile';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Toast, type ToastState } from '@/components/ui/Toast';
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { fadeUp, inView, stagger } from '@/lib/motion';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().email('Enter a valid email'),
  subject: z.string().trim().min(3, 'Add a short subject'),
  message: z.string().trim().min(20, 'Tell me a little more (20+ characters)'),
  company: z.string().max(0).optional(), // honeypot
});
type Values = z.infer<typeof schema>;

const EMAILJS = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
};

export function Contact() {
  const [toast, setToast] = useState<ToastState>(null);
  const dismiss = useCallback(() => setToast(null), []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: 'onSubmit', reValidateMode: 'onChange' });

  const err = (m?: string) => (submitCount > 0 ? m : undefined);

  const onSubmit = async (v: Values) => {
    if (v.company) return;
    if (!EMAILJS.service || !EMAILJS.template || !EMAILJS.key) {
      window.location.assign(`mailto:${profile.social.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`)}`);
      return;
    }
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(EMAILJS.service, EMAILJS.template, { from_name: v.name, from_email: v.email, subject: v.subject, message: v.message }, { publicKey: EMAILJS.key });
      setToast({ kind: 'success', message: 'Message sent. I will reply within a day.' });
      reset();
    } catch {
      setToast({ kind: 'error', message: 'Could not send. Email me directly instead.' });
    }
  };

  const info = [
    { icon: MailIcon, label: 'Email', value: profile.social.email, href: `mailto:${profile.social.email}` },
    { icon: PhoneIcon, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneRaw}` },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat on WhatsApp', href: profile.social.whatsapp },
    { icon: PinIcon, label: 'Location', value: `${profile.address.city}, ${profile.address.country} · ${profile.address.timezone}` },
  ];

  return (
    <Section id="contact">
      <div className="glass px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <SectionHeading number="07" eyebrow="Contact" title="Let's build something fast" lead="Senior frontend roles, platform work, design systems. Tell me what you are building." />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {info.map((i) => (
              <motion.div key={i.label} variants={fadeUp} className="glass-2 p-4 flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                  <i.icon width={18} height={18} />
                </span>
                <div className="min-w-0">
                  <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">{i.label}</p>
                  {i.href ? (
                    <a href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[14.5px] break-words hover:text-accent-2 underline-offset-4 hover:underline">
                      {i.value}
                    </a>
                  ) : (
                    <p className="text-[14.5px]">{i.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="glass-2 p-4 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <span className="h-2.5 w-2.5 rounded-full bg-success pulse-dot" aria-hidden="true" />
              <span className="text-[14px]">{profile.availability}</span>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid gap-4 sm:grid-cols-2"
          >
            <FormField id="name" label="Your name" autoComplete="name" error={err(errors.name?.message)} {...register('name')} />
            <FormField id="email" label="Email" type="email" autoComplete="email" inputMode="email" error={err(errors.email?.message)} {...register('email')} />
            <div className="sm:col-span-2">
              <FormField id="subject" label="Subject" error={err(errors.subject?.message)} {...register('subject')} />
            </div>
            <div className="sm:col-span-2">
              <FormField as="textarea" id="message" label="Message" error={err(errors.message?.message)} {...register('message')} />
            </div>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4">
              <p className="text-[12.5px] text-muted">Or email {profile.social.email}</p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
      <Toast toast={toast} onDismiss={dismiss} />
    </Section>
  );
}
