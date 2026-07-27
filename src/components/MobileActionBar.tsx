import { Phone, Navigation, Calendar } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';

export default function MobileActionBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: '#161514',
        borderTop: '1px solid rgba(241,232,216,0.1)',
        height: '64px',
      }}
    >
      <a
        href={businessConfig.phoneLink}
        className="flex-1 flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-brass transition-colors"
      >
        <Phone size={18} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Appeler</span>
      </a>
      <a
        href={businessConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-brass transition-colors border-x border-cream/10"
      >
        <Navigation size={18} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Itinéraire</span>
      </a>
      <a
        href="#/contact"
        className="flex-1 flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-brass transition-colors"
      >
        <Calendar size={18} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Rendez-vous</span>
      </a>
    </div>
  );
}
