import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{ background: '#F1E8D8' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Scissors SVG */}
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left blade */}
          <motion.path
            d="M8 40 L28 20"
            stroke="#B58A4A"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Right blade */}
          <motion.path
            d="M40 40 L28 20"
            stroke="#B58A4A"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.15 }}
          />
          {/* Handle left */}
          <motion.path
            d="M8 40 C4 44 4 48 8 48 C12 48 14 44 12 40"
            stroke="#B58A4A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          {/* Handle right */}
          <motion.path
            d="M40 40 C44 44 44 48 40 48 C36 48 34 44 36 40"
            stroke="#B58A4A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          {/* Pivot */}
          <motion.circle
            cx="28"
            cy="20"
            r="2"
            fill="#B58A4A"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 }}
          />
        </motion.svg>

        {/* ED-VI Title */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif text-5xl tracking-[0.2em]"
            style={{ color: '#1C0F0A' }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            ED—VI
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-condensed text-xs tracking-[0.4em] uppercase mt-4"
          style={{ color: '#5A4030' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Précision en cours.
        </motion.p>

        {/* Reveal panels */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom', background: '#F1E8D8', zIndex: 201 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
