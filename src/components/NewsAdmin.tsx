import { useEffect, useMemo, useState } from 'react';

type NewsItem = {
  id: string;
  title_de: string;
  title_it: string;
  content_de: string;
  content_it: string;
  image_key?: string | null;
  published_at?: string;
};

const STORAGE_KEY = 'ovesuvio_admin_password';

const emptyItem = (): NewsItem => ({
  id: `news-${Date.now()}`,
  title_de: '',
  title_it: '',
  content_de: '',
  content_it: '',
  image_key: null,
  published_at: new Date().toISOString(),
});

export function NewsAdmin() {
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setPassword(stored);
  }, []);

  const canSave = useMemo(() => {
    if (!password.trim()) return false;
    if (items.length === 0) return false;
    return items.every(
      (item) =>
        item.title_de.trim() &&
        item.title_it.trim() &&
        item.content_de.trim() &&
        item.content_it.trim() &&
        item.id.trim(),
    );
  }, [items, password]);

  const load = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      const json = (await response.json()) as { items?: unknown };
      if (!response.ok || !Array.isArray(json.items)) {
        setError('Impossibile caricare le news.');
        return;
      }
      const parsed = json.items.filter((item): item is NewsItem => Boolean(item && typeof item === 'object'));
      setItems(parsed);
    } catch {
      setError('Impossibile caricare le news.');
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setError('');
    setSuccess('');
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setError('Inserisci la password admin.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': trimmedPassword,
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        setError('Salvataggio non riuscito. Controlla password e configurazione.');
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, trimmedPassword);
      setSuccess('Salvato.');
    } catch {
      setError('Salvataggio non riuscito.');
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index: number, patch: Partial<NewsItem>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const moveItem = (from: number, to: number) => {
    setItems((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const copy = [...prev];
      const [picked] = copy.splice(from, 1);
      copy.splice(to, 0, picked);
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Admin News</h1>
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 underline"
            onClick={() => {
              window.location.hash = '';
              window.location.href = window.location.pathname + window.location.search + '#';
            }}
          >
            Torna al sito
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password admin</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Inserisci password"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Carico…' : 'Carica news'}
            </button>
            <button
              type="button"
              onClick={() => setItems((prev) => [...prev, emptyItem()])}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Aggiungi news
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!canSave || saving}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvo…' : 'Salva'}
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Immagine: inserisci il nome del file nella cartella <span className="font-semibold">/news</span> senza estensione (es. <span className="font-semibold">live-music</span>).
          </div>

          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="p-3 bg-green-50 text-green-700 rounded-lg">{success}</div>}
        </div>

        <div className="mt-8 space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">News {index + 1}</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                  >
                    Su
                  </button>
                  <button
                    type="button"
                    className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === items.length - 1}
                  >
                    Giù
                  </button>
                  <button
                    type="button"
                    className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => removeItem(index)}
                  >
                    Elimina
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titolo (DE)</label>
                  <input
                    value={item.title_de}
                    onChange={(e) => updateItem(index, { title_de: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titolo (IT)</label>
                  <input
                    value={item.title_it}
                    onChange={(e) => updateItem(index, { title_it: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testo (DE)</label>
                  <textarea
                    rows={4}
                    value={item.content_de}
                    onChange={(e) => updateItem(index, { content_de: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testo (IT)</label>
                  <textarea
                    rows={4}
                    value={item.content_it}
                    onChange={(e) => updateItem(index, { content_it: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image key</label>
                  <input
                    value={item.image_key ?? ''}
                    onChange={(e) => updateItem(index, { image_key: e.target.value.trim() ? e.target.value : null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="es. terrassen-eroeffnung"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Published at (ISO)</label>
                  <input
                    value={item.published_at ?? ''}
                    onChange={(e) => updateItem(index, { published_at: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="2026-04-27T10:00:00.000Z"
                  />
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-sm text-gray-600">
              Nessuna news caricata. Premi <span className="font-semibold">Carica news</span> oppure <span className="font-semibold">Aggiungi news</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

