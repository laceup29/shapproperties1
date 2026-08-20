/* ============================================
   SHARP PROPERTIES — CONTACT FORM
   ============================================ */

const ContactForm = {
  form: null,
  submitBtn: null,

  init() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  async handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: this.form.querySelector('[name="name"]').value.trim(),
      email: this.form.querySelector('[name="email"]').value.trim(),
      phone: this.form.querySelector('[name="phone"]').value.trim(),
      service: this.form.querySelector('[name="service"]').value.trim(),
      message: this.form.querySelector('[name="message"]').value.trim()
    };

    // Client-side validation
    const errors = this.validate(formData);
    if (errors.length) {
      this.showError(errors[0]);
      return;
    }

    this.setLoading(true);
    this.clearMessages();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        this.showSuccess(data.message);
        this.form.reset();
      } else {
        this.showError(data.message || 'Please check your information and try again.');
      }
    } catch (error) {
      this.showError('Unable to connect to the server. Please try again later.');
    } finally {
      this.setLoading(false);
    }
  },

  validate(data) {
    const errors = [];
    if (!data.name) errors.push('Please enter your name.');
    if (!data.email) errors.push('Please enter your email.');
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.push('Please enter a valid email address.');
    if (!data.phone) errors.push('Please enter your phone number.');
    if (!data.service) errors.push('Please select a service.');
    if (!data.message) errors.push('Please enter your message.');
    return errors;
  },

  showError(msg) {
    let el = this.form.querySelector('.form-error-msg');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-error-msg';
      this.form.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
  },

  showSuccess(msg) {
    let el = this.form.querySelector('.form-success');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-success';
      this.form.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
  },

  clearMessages() {
    const existing = this.form.querySelectorAll('.form-error-msg, .form-success');
    existing.forEach(el => el.remove());
  },

  setLoading(loading) {
    if (this.submitBtn) {
      this.submitBtn.disabled = loading;
      this.submitBtn.textContent = loading ? 'SENDING...' : 'SEND INQUIRY →';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => ContactForm.init());
