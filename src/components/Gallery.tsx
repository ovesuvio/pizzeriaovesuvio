import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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

const localImageModules = import.meta.glob('../../images/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' }) as Record<string, string>;
const localImageEntries = Object.entries(localImageModules)
  .map(([path, url]) => ({
    path,
    url,
    key: normalizeKey(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
  }))
  .filter((entry) => entry.key.length > 0)
  .sort((a, b) => a.path.localeCompare(b.path));

const localImagesByKey = new Map(localImageEntries.map((e) => [e.key, e.url]));
const localImages = localImageEntries.map((e) => e.url);

const getLocalImageForItem = (item: GalleryItem) => {
  const candidates = [item.title_de, item.title_it].map(normalizeKey).filter(Boolean);

  for (const candidate of candidates) {
    const exact = localImagesByKey.get(candidate);
    if (exact) return exact;
  }

  for (const candidate of candidates) {
    const partial = localImageEntries.find((e) => e.key.includes(candidate) || candidate.includes(e.key));
    if (partial) return partial.url;
  }

  return undefined;
};

export function Gallery() {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order');

    if (data) setItems(data);
  }

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
                src={getLocalImageForItem(item) ?? localImages[index] ?? item.image_url}
                alt={language === 'de' ? item.title_de : item.title_it}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {language === 'de' ? item.title_de : item.title_it}
                </h3>
                <p className="text-gray-600">
                  {language === 'de' ? item.description_de : item.description_it}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
