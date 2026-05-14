import { motion } from 'framer-motion';
import { Activity, Compass, Gem, ShieldCheck } from 'lucide-react';
import { aboutImages, heroImages } from '../utils/imageImports';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../hooks/useCountUp';

const values = [
  {
    title: 'Integrity First',
    description: 'Accurate reporting and transparent recommendations for every stakeholder.',
    icon: ShieldCheck,
  },
  {
    title: 'Engineering Excellence',
    description: 'Rigorous analysis backed by advanced instruments and certified labs.',
    icon: Gem,
  },
  {
    title: 'Field Precision',
    description: 'On-site teams that deliver actionable insights, not just data.',
    icon: Compass,
  },
  {
    title: 'Reliable Partnership',
    description: 'Responsive collaboration from investigation to construction.',
    icon: Activity,
  },
];

const differentiators = [
  {
    title: 'Advanced Equipment and Technology',
    text: 'We deploy modern drilling rigs, geophysical systems, and automated lab equipment to capture precise data in every soil layer.',
    imageIndex: 1,
  },
  {
    title: 'Expert Multi-disciplinary Team',
    text: 'Certified geotechnical engineers, geologists, and surveyors collaborate to solve complex ground challenges quickly.',
    imageIndex: 2,
  },
  {
    title: 'End-to-End Project Support',
    text: 'From feasibility studies to foundation recommendations, we stay aligned with your project team at every milestone.',
    imageIndex: 3,
  },
];

const stats = [
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Years of Experience', value: 15, suffix: '+' },
  { label: 'Happy Clients', value: 200, suffix: '+' },
  { label: 'Expert Engineers', value: 50, suffix: '+' },
];

function StatCard({ value, label, suffix, inView }) {
  const count = useCountUp(value, inView);

  return (
    <div className="glass-card rounded-2xl px-6 py-6 text-center">
      <div className="font-display text-3xl text-gold">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const heroImage = aboutImages[0] || heroImages[0];
  const mosaicImages = [...aboutImages, ...heroImages].slice(0, 4);

  const storyMotion = useScrollAnimation();
  const valuesMotion = useScrollAnimation({
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    },
  });
  const valueItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const whyMotion = useScrollAnimation({
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    },
  });

  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="relative min-h-[60vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
          />
          <div className="absolute inset-0 overlay-light" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <p className="font-condensed uppercase tracking-[0.3em] text-gold text-sm">Home / About</p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">About Sreedevigeotech</h1>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              ref={storyMotion.ref}
              initial="hidden"
              animate={storyMotion.controls}
              variants={storyMotion.variants}
            >
              <SectionHeading
                eyebrow="OUR STORY"
                title="Engineering Confidence Beneath Every Structure"
                subtitle="Founded with a vision to transform how geotechnical intelligence drives construction in India, Sreedevigeotech has grown from a specialized investigation firm into a full-service geotechnical partner for infrastructure projects across the nation. Our team of certified engineers, geologists, and surveyors bring decades of hands-on experience to every soil, every stratum, and every structure."
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {mosaicImages.map((image, index) => (
                <div key={image || index} className="rounded-2xl overflow-hidden">
                  <img src={image} alt="Sreedevigeotech field work" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          ref={valuesMotion.ref}
          initial="hidden"
          animate={valuesMotion.controls}
          variants={valuesMotion.variants}
          className="py-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="OUR VALUES"
              title="Built on Precision, Driven by Trust"
              subtitle="Every project is guided by a commitment to accuracy, integrity, and partnership."
              center
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={valueItem}
                    className="glass-card rounded-2xl p-6"
                  >
                    <Icon className="text-gold" />
                    <h3 className="mt-4 font-display text-lg">{value.title}</h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={whyMotion.ref}
          initial="hidden"
          animate={whyMotion.controls}
          variants={whyMotion.variants}
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="WHY CHOOSE US"
              title="A Geotechnical Partner You Can Trust"
              subtitle="Our teams combine field expertise, advanced technology, and clear communication to keep projects safe and on schedule."
            />
            <div className="space-y-12">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className={`grid gap-8 items-center lg:grid-cols-[1fr_1fr] ${
                    index % 2 === 1 ? 'lg:[&>div]:order-2' : ''
                  }`}
                >
                  <div>
                    <h3 className="font-display text-2xl">{item.title}</h3>
                    <p className="mt-4 text-[var(--text-secondary)]">{item.text}</p>
                  </div>
                  <div className="rounded-3xl overflow-hidden border border-[var(--border-subtle)]">
                    <img
                      src={aboutImages[item.imageIndex] || heroImages[item.imageIndex]}
                      alt={item.title}
                      className="w-full h-[320px] object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="OUR IMPACT"
              title="Numbers That Reflect Our Commitment"
              subtitle="Trusted by clients across India for reliable geotechnical data and engineering support."
              center
            />
            <div ref={statsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="LEADERSHIP"
              title="People Behind the Precision"
              subtitle="A dedicated team of specialists guiding every investigation and report."
              center
            />
            <div className="grid gap-6 md:grid-cols-3">
              {['Chief Geotechnical Engineer', 'Head of Survey', 'Lab Operations Lead'].map((role) => (
                <div key={role} className="glass-card rounded-2xl p-6 text-center">
                  <div className="h-24 w-24 rounded-full bg-[rgba(31,111,120,0.2)] mx-auto" />
                  <h4 className="mt-4 font-display text-lg">{role}</h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">Name to be added</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
