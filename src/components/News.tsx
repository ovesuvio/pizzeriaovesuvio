import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const normalizeKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const localNewsImageModules = import.meta.glob('../../news/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' }) as Record<string, string>;
const localNewsImagesByKey = new Map(
  Object.entries(localNewsImageModules)
    .map(([path, url]) => ({
      key: normalizeKey(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
      url,
    }))
    .filter((entry) => entry.key.length > 0)
    .map((entry) => [entry.key, entry.url]),
);

interface NewsItem {
  id: string;
  title_de: string;
  title_it: string;
  content_de: string;
  content_it: string;
  image_key?: string | null;
  image_url: string | null;
  published_at: string;
}

const defaultPublishedAt = new Date().toISOString();

const defaultNews: NewsItem[] = [
  {
    id: 'news-1',
    title_de: '🍴 Mittagseröffnung ab Mai',
    title_it: '🍴 Apertura pranzo da maggio',
    content_de:
      'Ab Mai öffnet das Restaurant O’ Vesuvio auch mittags! Freut euch auf neue, frische und sommerliche Spezialitäten. Die neuen Öffnungszeiten veröffentlichen wir bald.',
    content_it:
      'Da maggio il ristorante O’ Vesuvio apre anche a pranzo! Vi aspettano nuove specialità fresche e estive. Pubblicheremo presto i nuovi orari di apertura.',
    image_key: 'news-mittag',
    image_url: null,
    published_at: defaultPublishedAt,
  },
  {
    id: 'news-2',
    title_de: '🎤 Sing mit uns – Karaoke-Abende bald verfügbar',
    title_it: '🎤 Karaoke presto disponibile',
    content_de:
      'Bald veröffentlichen wir die neuen Termine und Zeiten für unsere Karaoke-Abende! Kommt vorbei und habt Spaß beim Singen!',
    content_it:
      'Presto pubblicheremo le nuove date e gli orari per le nostre serate karaoke! Passa a divertirti cantando!',
    image_key: 'karaoke-images',
    image_url: null,
    published_at: defaultPublishedAt,
  },
  {
    id: 'news-3',
    title_de: '🎵 Bald: Live-Musik im O’ Vesuvio',
    title_it: '🎵 Presto: musica dal vivo',
    content_de: 'Wir planen aktuell tolle Abende mit Live-Musik! Die Termine geben wir in Kürze bekannt.',
    content_it: 'Stiamo organizzando fantastiche serate con musica dal vivo! Annunceremo presto le date.',
    image_key: 'live-music',
    image_url: null,
    published_at: defaultPublishedAt,
  },
];

const withResolvedImages = (items: NewsItem[]) =>
  items.map((item) => {
    const published_at =
      typeof item.published_at === 'string' && item.published_at.trim().length > 0 ? item.published_at : defaultPublishedAt;
    const candidateKeys = [item.image_key]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      .map((value) => normalizeKey(value));

    const image_url = candidateKeys.map((key) => localNewsImagesByKey.get(key)).find(Boolean) ?? null;
    return { ...item, published_at, image_url };
  });

export function News() {
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>(withResolvedImages(defaultNews));

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) return;
        const json = (await response.json()) as { items?: unknown };
        if (!json.items || !Array.isArray(json.items)) return;
        const items = json.items.filter((item): item is NewsItem => Boolean(item && typeof item === 'object'));
        if (!cancelled) setNews(withResolvedImages(items));
      } catch (err) {
        void err;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'de' ? 'de-DE' : 'it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          {t('Neuigkeiten', 'Novità')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('Bleiben Sie auf dem Laufenden', 'Rimani aggiornato')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={language === 'de' ? item.title_de : item.title_it}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(item.published_at)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {language === 'de' ? item.title_de : item.title_it}
                </h3>
                <p className="text-gray-600">
                  {language === 'de' ? item.content_de : item.content_it}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
