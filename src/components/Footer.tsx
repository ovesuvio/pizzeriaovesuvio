import { Pizza, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Pizza className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold">O'Vesuvio</h3>
            </div>
            <p className="text-gray-400">
              {t('Authentische neapolitanische Küche im Herzen von Göppingen', 'Autentica cucina napoletana nel cuore di Göppingen')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Öffnungszeiten', 'Orari di apertura')}</h4>
            <p className="text-gray-400">{t('Mittwoch - Sonntag', 'Mercoledì - Domenica')}</p>
            <p className="text-gray-400">17:00 - 22:00</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Folgen Sie uns', 'Seguici')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/o_vesuvio_manzen_gp/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 O'Vesuvio. {t('Alle Rechte vorbehalten.', 'Tutti i diritti riservati.')}</p>
        </div>
      </div>
    </footer>
  );
}
