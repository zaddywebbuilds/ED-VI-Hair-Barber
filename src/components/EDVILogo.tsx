interface EDVILogoProps {
  variant?: 'full' | 'monogram' | 'circle';
  color?: string;
  size?: number;
}

export default function EDVILogo({ variant = 'full', color = '#F1E8D8', size = 40 }: EDVILogoProps) {
  if (variant === 'monogram') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="20"
          y="28"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="22"
          fontWeight="600"
          fill={color}
        >
          ED
        </text>
        <line x1="4" y1="21" x2="36" y2="21" stroke="#B58A4A" strokeWidth="0.8" />
      </svg>
    );
  }

  if (variant === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="37" stroke={color} strokeWidth="1" />
        <circle cx="40" cy="40" r="32" stroke="#B58A4A" strokeWidth="0.5" />
        <text x="40" y="38" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="600" fill={color}>ED·VI</text>
        <text x="40" y="50" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="6" letterSpacing="3" fill="#B58A4A">HAIR BARBER</text>
        <text x="40" y="62" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="4.5" letterSpacing="2" fill={color} opacity="0.6">CLERMONT-FERRAND</text>
      </svg>
    );
  }

  // full variant
  return (
    <svg width={size * 3} height={size} viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="36" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="36" fontWeight="500" fill={color}>ED</text>
      <line x1="0" y1="24" x2="160" y2="24" stroke="#B58A4A" strokeWidth="0.8" opacity="0.6" />
      <text x="74" y="36" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="36" fontWeight="500" fill={color}>VI</text>
      <text x="0" y="46" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="4" fill="#B58A4A">HAIR BARBER</text>
    </svg>
  );
}
