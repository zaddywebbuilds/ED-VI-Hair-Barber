import { motion } from 'framer-motion';

const labels = [
  { text: "COUPE HOMME", color: "rgba(241,232,216,0.7)", top: "12%", left: "5%" },
  { text: "BARBE", color: "#B58A4A", top: "25%", right: "8%" },
  { text: "CONSEIL", color: "rgba(133,133,133,0.8)", top: "40%", left: "2%" },
  { text: "PRÉCISION", color: "rgba(241,232,216,0.5)", bottom: "35%", right: "5%" },
  { text: "SUR RENDEZ-VOUS", color: "#B58A4A", bottom: "20%", left: "3%" },
  { text: "FINITIONS", color: "rgba(241,232,216,0.6)", top: "65%", right: "10%" },
  { text: "STYLE", color: "rgba(133,133,133,0.7)", top: "55%", left: "0%" },
  { text: "CARACTÈRE", color: "rgba(241,232,216,0.4)", bottom: "45%", right: "2%" },
];

export default function FloatingLabels() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {labels.map((label, i) => (
        <motion.span
          key={label.text}
          className="absolute font-condensed tracking-[0.2em] uppercase"
          style={{
            fontSize: '11px',
            color: label.color,
            borderLeft: `1px solid #B58A4A`,
            paddingLeft: '8px',
            top: label.top,
            left: label.left,
            right: label.right,
            bottom: label.bottom,
            whiteSpace: 'nowrap',
          }}
          animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {label.text}
        </motion.span>
      ))}
    </div>
  );
}
