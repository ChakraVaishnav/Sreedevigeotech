import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';

const services = [
  'Geo-technical Investigation',
  'Laboratory Testing',
  'Topographical and Contour',
  'Geo-physical Investigations',
  'Hydrographic Survey',
  'Pile Foundation',
];

// TODO: replace with the owner's actual WhatsApp number (country code, digits only)
const WHATSAPP_NUMBER = '919000000000';

export default function Contact() {
  usePageMeta({
    title: 'Contact Us | Sreedevigeotech — Get a Geotechnical Consultation',
    description:
      'Get a tailored geotechnical consultation for your infrastructure project. Call, email or WhatsApp Sree Devi Engineering Enterprises, Hyderabad — Mon-Sat 9 AM to 7 PM.',
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: services[0],
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const buildMessage = (data) => {
    const lines = [
      '*New Project Enquiry — Sreedevigeotech Website*',
      '',
      `*Name:* ${data.name}`,
      data.company ? `*Company:* ${data.company}` : null,
      `*Email:* ${data.email}`,
      data.phone ? `*Phone:* ${data.phone}` : null,
      `*Service Required:* ${data.service}`,
      data.location ? `*Project Location:* ${data.location}` : null,
      '',
      '*Message:*',
      data.message || '-',
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = buildMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Opens WhatsApp (app on mobile, web.whatsapp.com on desktop) with the
    // message pre-filled — the user just presses Send there.
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              as="h1"
              eyebrow="CONTACT"
              title="Let's Start a Conversation"
              subtitle="Share your project details and our team will respond with the right geotechnical solution."
            />
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  We collaborate with infrastructure developers, EPC contractors, and government agencies to deliver safe
                  and reliable foundation recommendations. Reach out for a tailored consultation.
                </p>
                <div className="grid gap-4">
                  <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
                    <MapPin className="text-gold" />
                    <div>
                      <h4 className="font-display text-lg">Address</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Hyderabad, Telangana, India</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
                    <Phone className="text-gold" />
                    <div>
                      <h4 className="font-display text-lg">Phone</h4>
                      <p className="text-sm text-[var(--text-secondary)]">+91 90000 00000</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
                    <Mail className="text-gold" />
                    <div>
                      <h4 className="font-display text-lg">Email</h4>
                      <p className="text-sm text-[var(--text-secondary)]">info@sreedevigeotech.com</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
                    <Clock className="text-gold" />
                    <div>
                      <h4 className="font-display text-lg">Working Hours</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    >
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="location"
                      placeholder="Project Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <button type="submit" className="btn-gold w-full py-3 rounded-full font-semibold" data-cursor="link">
                    {submitted ? 'Opening WhatsApp…' : 'Send Message via WhatsApp'}
                  </button>
                  {submitted ? (
                    <p className="text-sm text-gold">
                      WhatsApp is opening with your details pre-filled — just press Send there to deliver your message.
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)]">
              <iframe
                title="Sreedevigeotech Location"
                src="https://maps.google.com/maps?q=Hyderabad%2C%20India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                className="w-full h-80"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
