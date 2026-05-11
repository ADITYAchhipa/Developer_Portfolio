import { useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import styles from './ContactSection.module.css';

function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (value.trim().length > 100) return 'Name must be at most 100 characters';
      return '';
    case 'email': {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
      return '';
    }
    case 'subject':
      if (!value.trim()) return 'Subject is required';
      if (value.trim().length < 2) return 'Subject must be at least 2 characters';
      if (value.trim().length > 200) return 'Subject must be at most 200 characters';
      return '';
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.trim().length > 5000) return 'Message must be at most 5000 characters';
      return '';
    default:
      return '';
  }
}

function validateForm(formData) {
  const errors = {};
  for (const field of ['name', 'email', 'subject', 'message']) {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = encodeURIComponent(formData.subject.trim());
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`
    );
    window.open(
      `mailto:adityachhipa.dev@gmail.com?subject=${subject}&body=${body}`,
      '_self'
    );

    setSuccessMessage('Opening your email client...');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  return (
    <section id="contact" className={styles.contact} aria-label="Contact">
      <div className={styles.container}>
        <ScrollReveal animation="fadeUp">
          <h2 className={styles.heading}>Get In Touch</h2>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={100}>
          <p className={styles.intro}>
            Have a project in mind or want to collaborate? Drop me a message and
            I&apos;ll get back to you as soon as possible.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={200}>
        <div className={styles.formCard}>
          {successMessage && (
            <p className={styles.successMessage} role="status">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className={styles.errorMessage} role="alert">
              {errorMessage}
            </p>
          )}

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span id="contact-name-error" className={styles.errorText} role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span id="contact-email-error" className={styles.errorText} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="contact-subject" className={styles.label}>
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <span id="contact-subject-error" className={styles.errorText} role="alert">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="contact-message" className={styles.label}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <span id="contact-message-error" className={styles.errorText} role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              Send Message
            </button>
          </form>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { validateField, validateForm };
export default ContactSection;
