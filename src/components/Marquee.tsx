const items = [
  'Coupe homme',
  'Taille de barbe',
  'Contours nets',
  'Dégradé américain',
  'Rasage traditionnel',
  'Conseil personnalisé',
  'Un client à la fois',
  'Sur rendez-vous',
];

// Bandeau défilant — ancre visuelle entre deux sections claires.
export default function Marquee() {
  const row = [...items, ...items]; // dupliqué pour une boucle sans couture

  return (
    <div className="relative overflow-hidden py-5" style={{ background: '#2A1F1A' }}>
      <div className="marquee-track">
        {row.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span
              className="font-serif italic whitespace-nowrap px-7"
              style={{ fontSize: 'clamp(20px, 2.4vw, 34px)', color: '#FDF4E8' }}
            >
              {item}
            </span>
            <span
              className="shrink-0 rounded-full"
              style={{ width: 5, height: 5, background: '#C9A961' }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Dégradés latéraux pour adoucir les bords */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #2A1F1A 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #2A1F1A 0%, transparent 100%)' }}
      />
    </div>
  );
}
