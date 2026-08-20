/* ============================================
   SHARP PROPERTIES — CONTACT FORM
   WhatsApp Integration
   ============================================ */

const WHATSAPP_NUMBER = '923321738817';

const ContactForm = {
  form: null,
  submitBtn: null,

  init() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: this.form.querySelector('[name="name"]').value.trim(),
      email: this.form.querySelector('[name="email"]').value.trim(),
      phone: this.form.querySelector('[name="phone"]').value.trim(),
      service: this.form.querySelector('[name="service"]').value.trim(),
      message: this.form.querySelector('[name="message"]').value.trim()
    };

    const errors = this.validate(formData);
    if (errors.length) {
      this.showError(errors[0]);
      return;
    }

    this.clearMessages();
    this.openWhatsApp(formData);
    this.form.reset();
    this.showSuccess('Redirecting to WhatsApp...');
  },

  openWhatsApp(data) {
    const serviceLabels = {
      'general-contracting': 'General Contracting',
      'renovation-remodeling': 'Renovation & Remodeling',
      'design-build': 'Design & Build',
      'infrastructure-development': 'Infrastructure Development',
      'security-safety': 'Security & Safety',
      'other': 'Other'
    };

    const serviceLabel = serviceLabels[data.service] || data.service;

    const msg = [
      '*New Inquiry — Sharp Properties*',
      '',
      `*Name:* ${data.name}`,
      `*Email:* ${data.email}`,
      `*Phone:* ${data.phone}`,
      `*Service:* ${serviceLabel}`,
      '',
      '*Project Details:*',
      data.message
    ].join('%0A');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, '_blank');
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
  }
};

document.addEventListener('DOMContentLoaded', () => ContactForm.init());
