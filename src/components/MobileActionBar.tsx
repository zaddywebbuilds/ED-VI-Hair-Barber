import { Phone, Navigation, Calendar } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import WhatsAppIcon from './WhatsAppIcon';
import { whatsappUrl } from '../lib/whatsapp';

export default function MobileActionBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: '#1C0F0A',
        borderTop: '1px solid rgba(181,138,74,0.2)',
        height: '64px',
      }}
    >
      <a
        href={businessConfig.phoneLink}
        className="flex-1 flex flex-col items-center justify-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: '#F1E8D8' }}
      >
        <Phone size={18} style={{ color: '#B58A4A' }} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Appeler</span>
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: '#F1E8D8', borderLeft: '1px solid rgba(181,138,74,0.15)' }}
      >
        <WhatsAppIcon size={18} className="text-[#25D366]" />
        <span className="font-condensed text-[10px] uppercase tracking-wider">WhatsApp</span>
      </a>
      <a
        href={businessConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: '#F1E8D8', borderLeft: '1px solid rgba(181,138,74,0.15)', borderRight: '1px solid rgba(181,138,74,0.15)' }}
      >
        <Navigation size={18} style={{ color: '#B58A4A' }} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Itinéraire</span>
      </a>
      <a
        href="#/contact"
        className="flex-1 flex flex-col items-center justify-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: '#F1E8D8' }}
      >
        <Calendar size={18} style={{ color: '#B58A4A' }} />
        <span className="font-condensed text-[10px] uppercase tracking-wider">Rendez-vous</span>
      </a>
    </div>
  );
}
