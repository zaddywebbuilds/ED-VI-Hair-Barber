import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import MobileActionBar from './components/MobileActionBar';
import ScrollProgress from './components/ScrollProgress';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader onComplete={() => setLoading(false)} />;

  return (
    <HelmetProvider>
      <Router>
        <div className="relative">
          <ScrollProgress />
          <Navbar />
          <Suspense
            fallback={
              <div className="h-screen bg-carbon flex items-center justify-center">
                <span className="font-condensed text-brass tracking-widest text-sm uppercase">
                  Chargement…
                </span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prestations" element={<Services />} />
              <Route path="/le-salon" element={<About />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/politique-de-confidentialite" element={<Privacy />} />
            </Routes>
          </Suspense>
          <MobileActionBar />
        </div>
      </Router>
    </HelmetProvider>
  );
}
