import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Menu } from './components/Menu';
import { News } from './components/News';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NewsAdmin } from './components/NewsAdmin';

function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#/admin');
  const posterUrl = new URL('../news/terrassen-eroeffnung.png', import.meta.url).href;

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (isAdmin) return <NewsAdmin />;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-4 pt-4 pb-8">
            <a href="#news" className="block">
              <img
                src={posterUrl}
                alt="Große Terrasseneröffnung"
                className="w-full max-h-[80vh] object-contain rounded-lg shadow"
                loading="eager"
              />
            </a>
          </div>
        </section>
        <Hero />
        <Gallery />
        <Menu />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
