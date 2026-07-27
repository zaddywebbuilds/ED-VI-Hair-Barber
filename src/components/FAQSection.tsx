import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { faqs } from '../data/faqData';

function FAQItem({ faq, index }: { faq: typeof faqs[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-sans text-cream text-sm md:text-base pr-4 group-hover:text-brass transition-colors">
          {faq.question}
        </span>
        <span
          className="shrink-0 font-condensed text-brass text-xl w-6 text-center leading-none transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-sans text-paper/70 text-sm leading-relaxed pb-5 pr-10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32" style={{ background: '#161514' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref}>
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            FAQ
          </motion.p>
          <motion.h2
            className="font-serif text-cream mb-12"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Questions fréquentes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
