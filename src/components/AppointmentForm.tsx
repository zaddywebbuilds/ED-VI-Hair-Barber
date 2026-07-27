import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';

const schema = z.object({
  nom: z.string().min(2, 'Veuillez indiquer votre nom'),
  telephone: z.string().min(10, 'Numéro de téléphone requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  prestation: z.enum(['coupe-homme', 'taille-barbe', 'coupe-barbe', 'autre']),
  jour: z.string().min(1, 'Veuillez choisir un jour'),
  creneau: z.enum(['matin', 'apres-midi', 'flexible']),
  message: z.string().optional(),
  consentement: z.literal(true, { errorMap: () => ({ message: 'Votre consentement est requis' }) }),
});

type FormValues = z.infer<typeof schema>;

const inputClass = `
  w-full bg-transparent px-0 py-3
  font-sans text-sm outline-none transition-colors
  focus:ring-0
`.trim();

const labelClass = 'block font-condensed text-[11px] tracking-[0.25em] uppercase mb-2';

export default function AppointmentForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${businessConfig.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-32" style={{ background: '#F5EDE0' }}>
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: '#B58A4A' }}>
          Formulaire
        </p>
        <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#1C0F0A' }}>
          Demander un rendez-vous
        </h2>
        <p className="font-sans text-sm mb-12" style={{ color: '#5A4030' }}>
          Votre demande sera examinée et ED-VI vous recontactera pour confirmer le rendez-vous.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#B58A4A' }} />
              <h3 className="font-serif text-2xl mb-3" style={{ color: '#1C0F0A' }}>Demande envoyée.</h3>
              <p className="font-sans text-sm" style={{ color: '#5A4030' }}>
                ED-VI vous recontactera pour confirmer le rendez-vous.
              </p>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <AlertCircle size={40} className="mx-auto mb-4" style={{ color: '#681F2B' }} />
              <p className="font-sans text-sm mb-4" style={{ color: '#5A4030' }}>
                Une erreur est survenue. Appelez directement le{' '}
                <a href={businessConfig.phoneLink} style={{ color: '#B58A4A' }}>
                  {businessConfig.phoneDisplay}
                </a>.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-condensed text-xs tracking-widest uppercase transition-colors"
                style={{ color: '#5A4030' }}
              >
                Réessayer
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Name */}
              <div>
                <label htmlFor="nom" className={labelClass} style={{ color: '#5A4030' }}>Nom *</label>
                <input id="nom" {...register('nom')} placeholder="Votre nom" className={inputClass} style={{ color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }} />
                {errors.nom && <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.nom.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="telephone" className={labelClass} style={{ color: '#5A4030' }}>Téléphone *</label>
                <input id="telephone" {...register('telephone')} placeholder="06 XX XX XX XX" className={inputClass} type="tel" style={{ color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }} />
                {errors.telephone && <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.telephone.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass} style={{ color: '#5A4030' }}>Email (optionnel)</label>
                <input id="email" {...register('email')} placeholder="votre@email.com" className={inputClass} type="email" style={{ color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }} />
                {errors.email && <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.email.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label htmlFor="prestation" className={labelClass} style={{ color: '#5A4030' }}>Prestation *</label>
                <select
                  id="prestation"
                  {...register('prestation')}
                  className={inputClass + ' cursor-pointer'}
                  style={{ background: '#F5EDE0', color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }}
                >
                  <option value="coupe-homme">Coupe homme</option>
                  <option value="taille-barbe">Taille de barbe</option>
                  <option value="coupe-barbe">Coupe et barbe</option>
                  <option value="autre">Autre / Je ne sais pas encore</option>
                </select>
              </div>

              {/* Day */}
              <div>
                <label htmlFor="jour" className={labelClass} style={{ color: '#5A4030' }}>Jour souhaité *</label>
                <select
                  id="jour"
                  {...register('jour')}
                  className={inputClass + ' cursor-pointer'}
                  style={{ background: '#F5EDE0', color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }}
                >
                  <option value="">Choisir un jour</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi matin</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.jour && <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.jour.message}</p>}
              </div>

              {/* Time slot */}
              <div>
                <p className={labelClass} style={{ color: '#5A4030' }}>Créneau préféré *</p>
                <div className="flex gap-4 mt-2">
                  {[
                    { val: 'matin', label: 'Matin' },
                    { val: 'apres-midi', label: 'Après-midi' },
                    { val: 'flexible', label: 'Flexible' },
                  ].map(({ val, label }) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register('creneau')}
                        value={val}
                        className="accent-brass"
                      />
                      <span className="font-condensed text-xs tracking-wider uppercase" style={{ color: '#5A4030' }}>{label}</span>
                    </label>
                  ))}
                </div>
                {errors.creneau && <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.creneau.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass} style={{ color: '#5A4030' }}>Message (optionnel)</label>
                <textarea
                  id="message"
                  {...register('message')}
                  placeholder="Précisions, questions..."
                  rows={3}
                  className={inputClass + ' resize-none'}
                  style={{ color: '#1C0F0A', borderBottom: '1px solid rgba(28,15,10,0.2)' }}
                />
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consentement')}
                    className="mt-0.5 accent-brass shrink-0"
                  />
                  <span className="font-sans text-xs leading-relaxed" style={{ color: '#5A4030' }}>
                    J'accepte que mes informations soient transmises au salon dans le seul but de confirmer ce rendez-vous.
                    Elles ne seront pas utilisées à d'autres fins.{' '}
                    <Link to="/politique-de-confidentialite" className="hover:underline" style={{ color: '#B58A4A' }}>
                      Politique de confidentialité
                    </Link>
                  </span>
                </label>
                {errors.consentement && (
                  <p className="text-xs mt-1 font-sans" style={{ color: '#681F2B' }}>{errors.consentement.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 font-condensed text-sm tracking-[0.2em] uppercase text-cream transition-all hover:brightness-110 disabled:opacity-60"
                style={{ background: '#681F2B' }}
              >
                {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Phone alternative */}
        <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid rgba(28,15,10,0.1)' }}>
          <p className="font-sans text-sm mb-3" style={{ color: '#858585' }}>Vous préférez appeler ?</p>
          <a
            href={businessConfig.phoneLink}
            className="inline-flex items-center gap-2 font-condensed text-base tracking-wider transition-colors hover:opacity-70"
            style={{ color: '#B58A4A' }}
          >
            <Phone size={16} />
            {businessConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
