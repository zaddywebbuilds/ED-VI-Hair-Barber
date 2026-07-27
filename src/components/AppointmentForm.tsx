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
  w-full bg-transparent border-b border-cream/20 focus:border-brass px-0 py-3
  font-sans text-cream text-sm outline-none transition-colors placeholder:text-steel/60
  focus:ring-0
`.trim();

const labelClass = 'block font-condensed text-[11px] tracking-[0.25em] uppercase text-steel mb-2';

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
    <section className="py-20 md:py-32" style={{ background: '#090909' }}>
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4">
          Formulaire
        </p>
        <h2 className="font-serif text-cream mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
          Demander un rendez-vous
        </h2>
        <p className="font-sans text-steel/70 text-sm mb-12">
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
              <CheckCircle size={48} className="text-brass mx-auto mb-4" />
              <h3 className="font-serif text-cream text-2xl mb-3">Demande envoyée.</h3>
              <p className="font-sans text-paper/60 text-sm">
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
              <AlertCircle size={40} className="text-burgundy mx-auto mb-4" />
              <p className="font-sans text-cream/80 text-sm mb-4">
                Une erreur est survenue. Appelez directement le{' '}
                <a href={businessConfig.phoneLink} className="text-brass">
                  {businessConfig.phoneDisplay}
                </a>.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-condensed text-xs tracking-widest uppercase text-steel hover:text-cream transition-colors"
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
                <label htmlFor="nom" className={labelClass}>Nom *</label>
                <input id="nom" {...register('nom')} placeholder="Votre nom" className={inputClass} />
                {errors.nom && <p className="text-burgundy text-xs mt-1 font-sans">{errors.nom.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="telephone" className={labelClass}>Téléphone *</label>
                <input id="telephone" {...register('telephone')} placeholder="06 XX XX XX XX" className={inputClass} type="tel" />
                {errors.telephone && <p className="text-burgundy text-xs mt-1 font-sans">{errors.telephone.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>Email (optionnel)</label>
                <input id="email" {...register('email')} placeholder="votre@email.com" className={inputClass} type="email" />
                {errors.email && <p className="text-burgundy text-xs mt-1 font-sans">{errors.email.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label htmlFor="prestation" className={labelClass}>Prestation *</label>
                <select
                  id="prestation"
                  {...register('prestation')}
                  className={inputClass + ' cursor-pointer'}
                  style={{ background: '#090909' }}
                >
                  <option value="coupe-homme">Coupe homme</option>
                  <option value="taille-barbe">Taille de barbe</option>
                  <option value="coupe-barbe">Coupe et barbe</option>
                  <option value="autre">Autre / Je ne sais pas encore</option>
                </select>
              </div>

              {/* Day */}
              <div>
                <label htmlFor="jour" className={labelClass}>Jour souhaité *</label>
                <select
                  id="jour"
                  {...register('jour')}
                  className={inputClass + ' cursor-pointer'}
                  style={{ background: '#090909' }}
                >
                  <option value="">Choisir un jour</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi matin</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.jour && <p className="text-burgundy text-xs mt-1 font-sans">{errors.jour.message}</p>}
              </div>

              {/* Time slot */}
              <div>
                <p className={labelClass}>Créneau préféré *</p>
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
                      <span className="font-condensed text-xs tracking-wider uppercase text-cream/70">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.creneau && <p className="text-burgundy text-xs mt-1 font-sans">{errors.creneau.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>Message (optionnel)</label>
                <textarea
                  id="message"
                  {...register('message')}
                  placeholder="Précisions, questions..."
                  rows={3}
                  className={inputClass + ' resize-none'}
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
                  <span className="font-sans text-steel/70 text-xs leading-relaxed">
                    J'accepte que mes informations soient transmises au salon dans le seul but de confirmer ce rendez-vous.
                    Elles ne seront pas utilisées à d'autres fins.{' '}
                    <Link to="/politique-de-confidentialite" className="text-brass hover:underline">
                      Politique de confidentialité
                    </Link>
                  </span>
                </label>
                {errors.consentement && (
                  <p className="text-burgundy text-xs mt-1 font-sans">{errors.consentement.message}</p>
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
        <div className="mt-10 pt-8 border-t border-cream/10 text-center">
          <p className="font-sans text-steel/60 text-sm mb-3">Vous préférez appeler ?</p>
          <a
            href={businessConfig.phoneLink}
            className="inline-flex items-center gap-2 font-condensed text-base tracking-wider text-brass hover:text-cream transition-colors"
          >
            <Phone size={16} />
            {businessConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
