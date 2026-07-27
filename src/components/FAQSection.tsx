import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { faqs } from '../data/faqData';

function FAQItem({ faq, _index }: { faq: typeof faqs[number]; _index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #D9CBB8' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-sans text-sm md:text-base pr-4 transition-colors group-hover:opacity-70" style={{ color: '#1C0F0A' }}>
          {faq.question}
        </span>
        <span
          className="shrink-0 font-condensed text-xl w-6 text-center leading-none transition-transform duration-300"
          style={{ color: '#B58A4A', transform: open ? 'rotate(45deg)' : 'none' }}
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
            <p className="font-sans text-sm leading-relaxed pb-5 pr-10" style={{ color: '#5A4030' }}>
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
    <section className="py-14 md:py-20" style={{ background: '#FDF4E8' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref}>
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ color: '#B58A4A' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            FAQ
          </motion.p>
          <motion.h2
            className="font-serif mb-12"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#1C0F0A' }}
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
              <FAQItem key={i} faq={faq} _index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
