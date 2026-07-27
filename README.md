# ED-VI Hair Barber — Site Web

Site vitrine pour ED-VI Hair Barber, barbier et coiffeur homme à Clermont-Ferrand.
Hébergé sur GitHub Pages : https://zaddywebbuilds.github.io/ED-VI-Hair-Barber/

## Développement local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

## Déploiement GitHub Pages

```bash
npm run deploy
```

Ou manuellement :

```bash
npm run build
npx gh-pages -d dist -b gh-pages
```

## Configuration

### businessConfig.ts

Le fichier `src/data/businessConfig.ts` contient toutes les informations du salon.
Les champs à confirmer sont marqués `[À CONFIRMER]` :

- `email` — adresse email du salon
- `bookingUrl` — URL d'une plateforme de réservation si disponible
- `formspreeId` — ID Formspree pour le formulaire de contact
- `socialMedia` — comptes Instagram, Facebook, TikTok
- `openingHours` — vérifier les horaires avant mise en ligne
- `historicalDetails.verifiedByOwner` — passer à `true` après vérification

### Formspree (formulaire de contact)

1. Créez un compte sur https://formspree.io
2. Créez un nouveau formulaire
3. Copiez l'ID (ex: `xdkgnopq`)
4. Remplacez `REPLACE_WITH_YOUR_FORMSPREE_ID` dans `businessConfig.ts`

## Images

Les photos se trouvent dans `public/images/`. Pour remplacer une photo :

1. Nommez votre fichier `photo_XX.jpg` (avec le même numéro)
2. Copiez-le dans `public/images/`
3. Reconstruisez avec `npm run build`

## Activation de GitHub Pages

1. Allez dans **Settings** de votre dépôt GitHub
2. Section **Pages**
3. Source : **Deploy from a branch**
4. Branch : **gh-pages** / **(root)**
5. Sauvegardez

Le site sera disponible sur `https://zaddywebbuilds.github.io/ED-VI-Hair-Barber/`

## Domaine personnalisé (optionnel)

Pour utiliser un domaine personnalisé (ex: `ed-vi-barber.fr`) :

1. Créez un fichier `public/CNAME` avec votre domaine :
   ```
   ed-vi-barber.fr
   ```
2. Configurez vos DNS chez votre registrar
3. Redéployez
