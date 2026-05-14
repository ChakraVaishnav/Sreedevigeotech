import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function AnimatedCard({ children, delay = 0, className = '' }) {
  const { ref, controls, variants } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, boxShadow: '0 22px 45px rgba(10, 14, 26, 0.45)' }}
      className={`glass-card rounded-2xl p-6 border border-[var(--border-subtle)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
