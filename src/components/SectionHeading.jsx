import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function SectionHeading({ eyebrow, title, subtitle, center = false, as: Tag = 'h2' }) {
  const { ref, controls, variants } = useScrollAnimation();

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`mb-10 ${center ? 'text-center' : 'text-left'}`}
    >
      {eyebrow ? (
        <p className="font-condensed uppercase tracking-[0.3em] text-gold text-sm">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      <motion.span
        initial="hidden"
        animate={controls}
        variants={underlineVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`section-divider mt-4 block ${center ? 'mx-auto' : ''}`}
        style={{ transformOrigin: center ? 'center' : 'left' }}
      />
      {subtitle ? (
        <p
          className={`mt-4 text-[var(--text-secondary)] ${
            center ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
