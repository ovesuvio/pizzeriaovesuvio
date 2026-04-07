import { Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const heroBackgroundModules = import.meta.glob('../../images/hero-bg*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' }) as Record<string, string>;
const heroBackgroundUrl = Object.entries(heroBackgroundModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)[0];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[50vh] py-10 flex items-center justify-center">
      {heroBackgroundUrl && (
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${heroBackgroundUrl})` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-800/75 to-sky-600/70"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-3 text-2xl md:text-4xl lg:text-5xl font-semibold uppercase text-sky-200 drop-shadow opacity-95">
          <span className="typewriter">Ristorante Pizzeria</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-lg">O'Vesuvio</h1>
        <p className="text-2xl md:text-3xl mb-8 font-light">
          {t('Authentische Neapolitanische Küche', 'Autentica Cucina Napoletana')}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6" />
            <span>Manzenstraße 60, 73037 Göppingen</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-6 h-6" />
            <a href="tel:07161811727" className="hover:underline">07161 811727</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="#contact"
            className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition inline-flex items-center justify-center"
          >
            {t('Tisch reservieren', 'Prenota un tavolo')}
          </a>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 inline-block">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{t('Öffnungszeiten', 'Orari di apertura')}</span>
            </div>
            <p className="text-sm">{t('Mi-So: 17:00 - 22:00', 'Mer-Dom: 17:00 - 22:00')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
