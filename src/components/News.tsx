import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface NewsItem {
  id: string;
  title_de: string;
  title_it: string;
  content_de: string;
  content_it: string;
  image_url: string | null;
  published_at: string;
}

export function News() {
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6);

    if (data) {
      const updated = [...(data as NewsItem[])];
      const karaokeImageUrl = new URL('../../images/news-karaoke.svg', import.meta.url).href;
      if (updated[0]) {
        updated[0] = {
          ...updated[0],
          title_de: '🍴 Mittagseröffnung ab Mai',
          content_de:
            'Ab Mai öffnet das Restaurant O’ Vesuvio auch mittags! Freut euch auf neue, frische und sommerliche Spezialitäten. Die neuen Öffnungszeiten veröffentlichen wir bald.',
        };
      }
      if (updated[1]) {
        updated[1] = {
          ...updated[1],
          title_de: '🎤 Sing mit uns – Karaoke-Abende bald verfügbar',
          content_de:
            'Bald veröffentlichen wir die neuen Termine und Zeiten für unsere Karaoke-Abende! Kommt vorbei und habt Spaß beim Singen!',
          image_url: karaokeImageUrl,
        };
      }
      if (updated[2]) {
        updated[2] = {
          ...updated[2],
          title_de: '🎵 Bald: Live-Musik im O’ Vesuvio',
          content_de:
            'Wir planen aktuell tolle Abende mit Live-Musik! Die Termine geben wir in Kürze bekannt.',
          image_url: new URL('../../images/news-live-music.svg', import.meta.url).href,
        };
      }
      setNews(updated);
    }
  }

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
