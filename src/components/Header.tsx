import { Pizza, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Pizza className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">O'Vesuvio</h1>
              <p className="text-sm text-gray-600">Authentische Neapolitanische Küche</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-red-600 transition">
              {t('Galerie', 'Galleria')}
            </button>
            <button onClick={() => scrollToSection('menu')} className="text-gray-700 hover:text-red-600 transition">
              {t('Menü', 'Menu')}
            </button>
            <button onClick={() => scrollToSection('news')} className="text-gray-700 hover:text-red-600 transition">
              {t('Neuigkeiten', 'Novità')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 transition">
              {t('Kontakt', 'Contatto')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
            >
              {t('Tisch reservieren', 'Prenota un tavolo')}
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <button
              onClick={() => setLanguage('de')}
              className={`px-3 py-1 rounded ${language === 'de' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-3 py-1 rounded ${language === 'it' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              IT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
