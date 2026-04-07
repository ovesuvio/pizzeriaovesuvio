import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MenuItem {
  id: string;
  category_id: string;
  name_de: string;
  name_it: string;
  description_de: string;
  description_it: string;
  price: number;
  image_url: string | null;
  available: boolean;
}

interface MenuCategory {
  id: string;
  name_de: string;
  name_it: string;
}

type MainCategoryId = 'pizza' | 'pasta' | 'salat' | 'dessert';

interface MainCategory {
  id: MainCategoryId;
  name_de: string;
  name_it: string;
}

const mainCategories: MainCategory[] = [
  { id: 'pizza', name_de: 'Pizza', name_it: 'Pizza' },
  { id: 'pasta', name_de: 'Pasta', name_it: 'Pasta' },
  { id: 'salat', name_de: 'Salat', name_it: 'Insalate' },
  { id: 'dessert', name_de: 'Dessert', name_it: 'Dessert' },
];

const subCategoriesByMain: Record<MainCategoryId, MenuCategory[]> = {
  pizza: [
    { id: 'classiche', name_de: 'Classiche', name_it: 'Classiche' },
    { id: 'speciali', name_de: 'Speciali', name_it: 'Speciali' },
    { id: 'piccanti', name_de: 'Piccanti', name_it: 'Piccanti' },
    { id: 'mare', name_de: 'Mare', name_it: 'Mare' },
  ],
  pasta: [
    { id: 'pasta-rigatoni', name_de: 'Rigatoni', name_it: 'Rigatoni' },
    { id: 'pasta-lasagne', name_de: 'Lasagne', name_it: 'Lasagne' },
    { id: 'pasta-spaghetti', name_de: 'Spaghetti', name_it: 'Spaghetti' },
    { id: 'pasta-tortellini', name_de: 'Tortellini', name_it: 'Tortellini' },
    { id: 'pasta-tagliatelle', name_de: 'Tagliatelle', name_it: 'Tagliatelle' },
    { id: 'pasta-gnocchi', name_de: 'Gnocchi', name_it: 'Gnocchi' },
  ],
  salat: [
    { id: 'salat-semplici', name_de: 'Semplici', name_it: 'Semplici' },
    { id: 'salat-speciali', name_de: 'Speciali', name_it: 'Speciali' },
  ],
  dessert: [],
};

const items: MenuItem[] = [
  {
    id: 'pizza-margherita',
    category_id: 'classiche',
    name_de: 'Margherita',
    name_it: 'Margherita',
    description_de: '-',
    description_it: '-',
    price: 9.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-salami',
    category_id: 'classiche',
    name_de: 'Salami',
    name_it: 'Salame',
    description_de: 'Salami',
    description_it: 'Salame',
    price: 10.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-prosciutto',
    category_id: 'classiche',
    name_de: 'Prosciutto',
    name_it: 'Prosciutto',
    description_de: 'Schinken',
    description_it: 'Prosciutto cotto',
    price: 10.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-funghi',
    category_id: 'classiche',
    name_de: 'Funghi',
    name_it: 'Funghi',
    description_de: 'Champignons',
    description_it: 'Funghi champignon',
    price: 10.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-hawaii',
    category_id: 'classiche',
    name_de: 'Hawaii',
    name_it: 'Hawaii',
    description_de: 'Schinken, Ananas',
    description_it: 'Prosciutto cotto, ananas',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-tonno',
    category_id: 'classiche',
    name_de: 'Tonno',
    name_it: 'Tonno',
    description_de: 'Thunfisch, Zwiebeln',
    description_it: 'Tonno, cipolle',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-quattro-formaggi',
    category_id: 'classiche',
    name_de: 'Quattro Formaggi',
    name_it: 'Quattro Formaggi',
    description_de: 'Vier Käsesorten',
    description_it: 'Quattro formaggi',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-portafoglio',
    category_id: 'speciali',
    name_de: 'Portafoglio',
    name_it: 'Portafoglio',
    description_de: 'Champignons, Schinken, Artischocken',
    description_it: 'Funghi champignon, prosciutto cotto, carciofi',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-venezia',
    category_id: 'speciali',
    name_de: 'Venezia',
    name_it: 'Venezia',
    description_de: 'Thunfisch, Zwiebeln, Champignons, Artischocken',
    description_it: 'Tonno, cipolle, funghi champignon, carciofi',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-capri',
    category_id: 'speciali',
    name_de: 'Capri',
    name_it: 'Capri',
    description_de: 'Salami, Paprika, Champignons',
    description_it: 'Salame, peperoni, funghi champignon',
    price: 11.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-sorrento',
    category_id: 'speciali',
    name_de: 'Sorrento',
    name_it: 'Sorrento',
    description_de: 'Salami, Schinken',
    description_it: 'Salame, prosciutto cotto',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-quattro-stagioni',
    category_id: 'speciali',
    name_de: 'Quattro Stagioni',
    name_it: 'Quattro Stagioni',
    description_de: 'Champignons, Paprika, Brokkoli, Knoblauch, Artischocken',
    description_it: 'Funghi champignon, peperoni, broccoli, aglio, carciofi',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-parma',
    category_id: 'speciali',
    name_de: 'Parma',
    name_it: 'Parma',
    description_de: 'Parmaschinken, Rucola, Parmesan',
    description_it: 'Prosciutto di Parma, rucola, parmigiano',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-capricciosa',
    category_id: 'speciali',
    name_de: 'Capricciosa',
    name_it: 'Capricciosa',
    description_de: 'Champignons, Salami, Schinken, Artischocken',
    description_it: 'Funghi champignon, salame, prosciutto cotto, carciofi',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-pompei',
    category_id: 'speciali',
    name_de: 'Pompei',
    name_it: 'Pompei',
    description_de: 'Oliven, Zwiebeln, Schinken, Artischocken',
    description_it: 'Olive, cipolle, prosciutto cotto, carciofi',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-jura',
    category_id: 'speciali',
    name_de: 'Jura',
    name_it: 'Jura',
    description_de: 'Champignons, Paprika, Salami, Oliven, Sardellen',
    description_it: 'Funghi champignon, peperoni, salame, olive, acciughe',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-ischia',
    category_id: 'piccanti',
    name_de: 'Ischia',
    name_it: 'Ischia',
    description_de: 'Salami, Peperoni, Scharf',
    description_it: 'Salame, peperoncino, piccante',
    price: 11.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-calabrese',
    category_id: 'piccanti',
    name_de: 'Calabrese',
    name_it: 'Calabrese',
    description_de: 'Champignons, Oliven, Zwiebeln, Artischocken, Salami, Pikant',
    description_it: 'Funghi champignon, olive, cipolle, carciofi, salame, piccante',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-gamberetti',
    category_id: 'mare',
    name_de: 'Gamberetti',
    name_it: 'Gamberetti',
    description_de: 'Shrimps, Knoblauch',
    description_it: 'Gamberetti, aglio',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pizza-mare',
    category_id: 'mare',
    name_de: 'Mare',
    name_it: 'Mare',
    description_de: 'Meeresfrüchte, Knoblauch',
    description_it: 'Frutti di mare, aglio',
    price: 13.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-napoli',
    category_id: 'pasta-rigatoni',
    name_de: 'Rigatoni / Spaghetti Napoli',
    name_it: 'Rigatoni / Spaghetti Napoli',
    description_de: 'mit Tomatensosse',
    description_it: 'con salsa di pomodoro',
    price: 11.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-bolognese',
    category_id: 'pasta-rigatoni',
    name_de: 'Rigatoni / Spaghetti Bolognese',
    name_it: 'Rigatoni / Spaghetti Bolognese',
    description_de: 'mit Hackfleischsosse',
    description_it: 'con ragù di carne',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-rigatoni-al-forno',
    category_id: 'pasta-rigatoni',
    name_de: 'Rigatoni al Forno',
    name_it: 'Rigatoni al Forno',
    description_de: 'Überbacken mit Bolognese',
    description_it: 'gratinati con ragù',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-rigatoni-jura',
    category_id: 'pasta-rigatoni',
    name_de: 'Rigatoni Jura',
    name_it: 'Rigatoni Jura',
    description_de: 'Schinken, Sahne, Käse',
    description_it: 'prosciutto cotto, panna, formaggio',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-lasagne-al-forno',
    category_id: 'pasta-lasagne',
    name_de: 'Lasagne al Forno',
    name_it: 'Lasagne al Forno',
    description_de: 'Überbacken mit Bolognese',
    description_it: 'gratinata con ragù',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-spaghetti-carbonara',
    category_id: 'pasta-spaghetti',
    name_de: 'Spaghetti Carbonara',
    name_it: 'Spaghetti Carbonara',
    description_de: 'Ei, Parmesan, Schinken, Sahne',
    description_it: 'uovo, parmigiano, prosciutto cotto, panna',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-spaghetti-marinara',
    category_id: 'pasta-spaghetti',
    name_de: 'Spaghetti Marinara',
    name_it: 'Spaghetti Marinara',
    description_de: 'Meeresfrüchte',
    description_it: 'frutti di mare',
    price: 14.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tortellini-panna',
    category_id: 'pasta-tortellini',
    name_de: 'Tortellini Panna',
    name_it: 'Tortellini Panna',
    description_de: 'Schinken, Sahne, Käse',
    description_it: 'prosciutto cotto, panna, formaggio',
    price: 12.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tortellini-al-forno',
    category_id: 'pasta-tortellini',
    name_de: 'Tortellini al Forno',
    name_it: 'Tortellini al Forno',
    description_de: 'Überbacken',
    description_it: 'gratinati',
    price: 12.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tagliatelle-salmone',
    category_id: 'pasta-tagliatelle',
    name_de: 'Tagliatelle Salmone',
    name_it: 'Tagliatelle Salmone',
    description_de: 'Lachs, Tomatensosse, Sahne',
    description_it: 'salmone, salsa di pomodoro, panna',
    price: 14.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tagliatelle-mare-monti',
    category_id: 'pasta-tagliatelle',
    name_de: 'Tagliatelle Mare Monti',
    name_it: 'Tagliatelle Mare Monti',
    description_de: 'Garnelen, Pilze, Tomatensosse',
    description_it: 'gamberetti, funghi, salsa di pomodoro',
    price: 14.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tagliatelle-funghi-porcini',
    category_id: 'pasta-tagliatelle',
    name_de: 'Tagliatelle Funghi Porcini',
    name_it: 'Tagliatelle Funghi Porcini',
    description_de: 'Steinpilze, Knoblauch',
    description_it: 'funghi porcini, aglio',
    price: 14.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-tagliatelle-salsiccia',
    category_id: 'pasta-tagliatelle',
    name_de: 'Tagliatelle Salsiccia',
    name_it: 'Tagliatelle Salsiccia',
    description_de: 'Ital. Bratwurst, Pilze, Kirschtomaten',
    description_it: 'salsiccia, funghi, pomodorini',
    price: 14.5,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-gnocchi-quattro-formaggi',
    category_id: 'pasta-gnocchi',
    name_de: 'Gnocchi Quattro Formaggi',
    name_it: 'Gnocchi Quattro Formaggi',
    description_de: 'Vier Käsesorten, Sahne',
    description_it: 'quattro formaggi, panna',
    price: 12.0,
    image_url: null,
    available: true,
  },
  {
    id: 'pasta-gnocchi-salmone',
    category_id: 'pasta-gnocchi',
    name_de: 'Gnocchi Salmone',
    name_it: 'Gnocchi Salmone',
    description_de: 'Spinat, Sahne, Käse',
    description_it: 'spinaci, panna, formaggio',
    price: 12.0,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-gruener-salat',
    category_id: 'salat-semplici',
    name_de: 'Grüner Salat',
    name_it: 'Insalata verde',
    description_de: '-',
    description_it: '-',
    price: 5.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-tomatensalat',
    category_id: 'salat-semplici',
    name_de: 'Tomatensalat',
    name_it: 'Insalata di pomodori',
    description_de: 'mit Zwiebeln',
    description_it: 'con cipolle',
    price: 7.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-caprese',
    category_id: 'salat-semplici',
    name_de: 'Salat Caprese',
    name_it: 'Insalata Caprese',
    description_de: 'mit Tomaten und Mozzarella',
    description_it: 'con pomodori e mozzarella',
    price: 9.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-beilagesalat',
    category_id: 'salat-semplici',
    name_de: 'Beilagesalat',
    name_it: 'Insalata di contorno',
    description_de: '-',
    description_it: '-',
    price: 5.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-gemischter-salat',
    category_id: 'salat-speciali',
    name_de: 'Gemischter Salat',
    name_it: 'Insalata mista',
    description_de: 'mit Tomaten, Zwiebeln, Gurken, Paprika und Oliven',
    description_it: 'con pomodori, cipolle, cetrioli, peperoni e olive',
    price: 9.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-italienischer-salat',
    category_id: 'salat-speciali',
    name_de: 'Italienischer Salat',
    name_it: 'Insalata italiana',
    description_de: 'mit Tomaten, Zwiebeln, Gurken, Paprika und Schinken',
    description_it: 'con pomodori, cipolle, cetrioli, peperoni e prosciutto cotto',
    price: 10.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-jura',
    category_id: 'salat-speciali',
    name_de: 'Salat Jura',
    name_it: 'Insalata Jura',
    description_de: 'mit Tomaten, Zwiebeln, Gurken, Eier, Paprika, Oliven, Schinken',
    description_it: 'con pomodori, cipolle, cetrioli, uova, peperoni, olive, prosciutto cotto',
    price: 13.5,
    image_url: null,
    available: true,
  },
  {
    id: 'salat-fitness',
    category_id: 'salat-speciali',
    name_de: 'Salat Fitness',
    name_it: 'Insalata Fitness',
    description_de: 'mit Tomaten, Zwiebeln, Gurken, Paprika, Mais und Putenstreifen',
    description_it: 'con pomodori, cipolle, cetrioli, peperoni, mais e straccetti di tacchino',
    price: 13.5,
    image_url: null,
    available: true,
  },
];

export function Menu() {
  const { language, t } = useLanguage();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategoryId>('pizza');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    subCategoriesByMain.pizza[0]?.id ?? '',
  );

  const subtitle =
    selectedMainCategory === 'pizza'
      ? t('Pizza 30 cm Ø', 'Pizza 30 cm Ø')
      : selectedMainCategory === 'pasta'
        ? t('Pasta', 'Pasta')
        : selectedMainCategory === 'salat'
          ? t('Salat', 'Insalate')
          : t('Dessert', 'Dessert');

  const filteredItems = selectedSubCategory
    ? items.filter((item) => item.available && item.category_id === selectedSubCategory)
    : [];

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          {t('Unsere Speisekarte', 'Il Nostro Menu')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('Frisch zubereitet mit den besten Zutaten', 'Preparato fresco con i migliori ingredienti')}
        </p>
        <p className="text-center text-gray-600 mb-10">
          {subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedMainCategory(category.id);
                setSelectedSubCategory(subCategoriesByMain[category.id][0]?.id ?? '');
              }}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedMainCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {language === 'de' ? category.name_de : category.name_it}
            </button>
          ))}
        </div>

        {subCategoriesByMain[selectedMainCategory].length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {subCategoriesByMain[selectedMainCategory].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedSubCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  selectedSubCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {language === 'de' ? category.name_de : category.name_it}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.length === 0 && (
            <div className="md:col-span-2 text-center text-gray-600">
              {t('Keine Elemente verfügbar', 'Nessun elemento disponibile')}
            </div>
          )}
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {language === 'de' ? item.name_de : item.name_it}
                </h3>
                <p className="text-gray-600 mb-3">
                  {language === 'de' ? item.description_de : item.description_it}
                </p>
              </div>
              <div className="ml-4">
                <span className="text-2xl font-bold text-red-600">
                  €{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
