import { useLanguage } from '../contexts/LanguageContext';

interface GalleryItem {
  id: string;
  image_url: string;
  title_de: string;
  title_it: string;
  description_de: string;
  description_it: string;
}

const normalizeKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const excludedImageKeys = new Set(['karaoke-images', 'hero-bg', 'live-music', 'news-mittag']);

const localImageModules = import.meta.glob('../../images/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' }) as Record<string, string>;
const localImageEntries = Object.entries(localImageModules)
  .map(([path, url]) => ({
    path,
    url,
    key: normalizeKey(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
  }))
  .filter((entry) => entry.key.length > 0 && !excludedImageKeys.has(entry.key))
  .sort((a, b) => a.path.localeCompare(b.path));

const localImagesByKey = new Map(localImageEntries.map((e) => [e.key, e.url]));
const localImages = localImageEntries.map((e) => e.url);

const humanizeTitle = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function Gallery() {
  const { language, t } = useLanguage();
  const items: GalleryItem[] = localImageEntries.map((entry) => {
    const base = entry.path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? entry.key;
    const title = humanizeTitle(base);
    return {
      id: entry.key,
      image_url: entry.url,
      title_de: title,
      title_it: title,
      description_de: '',
      description_it: '',
    };
  });

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          {t('Unsere Spezialitäten', 'Le Nostre Specialità')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('Entdecken Sie unsere köstlichen italienischen Gerichte', 'Scopri i nostri deliziosi piatti italiani')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img
                src={localImagesByKey.get(normalizeKey(item.title_de)) ?? localImages[index] ?? item.image_url}
                alt={language === 'de' ? item.title_de : item.title_it}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {language === 'de' ? item.title_de : item.title_it}
                </h3>
                {(language === 'de' ? item.description_de : item.description_it) && (
                  <p className="text-gray-600">{language === 'de' ? item.description_de : item.description_it}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
