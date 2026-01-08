import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { Banner } from '@/components/Banner';
import { contactUsVariants } from '@/variants/contact-us.variants';
import { cn } from '@/lib/cn';

type ContactUsFormValues = {
  message: string;
  name: string;
  email: string;
};

type ContactUsFormErrors = Partial<Record<keyof ContactUsFormValues, string>>;

type ContactUsSubmission = ContactUsFormValues & {
  id: string;
  submittedAt: string;
};

const CONTACT_US_SUBMISSIONS_KEY = 'rlp:contact-us-submissions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactUsFormValues): ContactUsFormErrors {
  const errors: ContactUsFormErrors = {};

  const message = values.message.trim();
  const name = values.name.trim();
  const email = values.email.trim();

  if (!message) errors.message = 'Please enter your message.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.';

  return errors;
}

function safeReadSubmissions(): ContactUsSubmission[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(CONTACT_US_SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ContactUsSubmission[]) : [];
  } catch {
    return [];
  }
}

function safeWriteSubmissions(submissions: ContactUsSubmission[]) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      CONTACT_US_SUBMISSIONS_KEY,
      JSON.stringify(submissions.slice(0, 50)),
    );
  } catch {
    // ignore quota / access errors
  }
}

const ContactUsPage: React.FC = () => {
  const styles = contactUsVariants();

  const initialValues = useMemo<ContactUsFormValues>(
    () => ({ message: '', name: '', email: '' }),
    [],
  );

  const [values, setValues] = useState<ContactUsFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactUsFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<ContactUsSubmission | null>(null);

  const isSuccess = Boolean(lastSubmission);

  const onChange =
    (field: keyof ContactUsFormValues) =>
    (
      e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const nextValue = e.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const submission: ContactUsSubmission = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      submittedAt: new Date().toISOString(),
      message: values.message.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
    };

    const existing = safeReadSubmissions();
    safeWriteSubmissions([submission, ...existing]);

    setLastSubmission(submission);
    setValues(initialValues);
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Ride Like a Pro</title>
        <meta
          name="description"
          content="Get in touch with Ride Like a Pro."
        />
      </Head>

      <Layout activePage="/contact-us">
        <div className={styles.container()}>
          <Banner
            title="BE THE NEXT STAGE"
            label="Giro d'Italia Ride Like A Pro"
            breadcrumb={[
              { label: 'HOME', href: '/' },
              { label: 'BE THE NEXT STAGE' },
            ]}
            backgroundImage="/images/common/banner.webp"
            backgroundAlt="Be the next stage"
            height="lg"
          />
          <main className={styles.main()}>
            <div className={styles.formWrap()}>
              {isSuccess ? (
                <div className={styles.successBox()} role="status" aria-live="polite">
                  <div className={styles.successTitle()}>Submitted successfully</div>
                  <div className={styles.successText()}>
                    Thanks, {lastSubmission?.name}. We saved your message locally and will
                    reach out at {lastSubmission?.email}.
                  </div>
                </div>
              ) : null}

              <form className={styles.form()} onSubmit={onSubmit} noValidate>
                <div>
                  <label className={styles.label()} htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className={cn(
                      styles.textarea(),
                      errors.message && 'border-red-500 focus:ring-red-500',
                    )}
                    placeholder="Enter your message"
                    value={values.message}
                    onChange={onChange('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message ? (
                    <div id="message-error" className={styles.errorText()}>
                      {errors.message}
                    </div>
                  ) : null}
                </div>

                <div className={styles.twoCol()}>
                  <div>
                    <label className={styles.label()} htmlFor="name">
                      Name*
                    </label>
                    <input
                      id="name"
                      className={cn(
                        styles.input(),
                        errors.name && 'border-red-500 focus:ring-red-500',
                      )}
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={onChange('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name ? (
                      <div id="name-error" className={styles.errorText()}>
                        {errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className={styles.label()} htmlFor="email">
                      Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={cn(
                        styles.input(),
                        errors.email && 'border-red-500 focus:ring-red-500',
                      )}
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={onChange('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email ? (
                      <div id="email-error" className={styles.errorText()}>
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className={styles.buttonRow()}>
                  <button className={styles.button()} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ContactUsPage;


