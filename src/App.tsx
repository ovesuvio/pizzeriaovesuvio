import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Menu } from './components/Menu';
import { News } from './components/News';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
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
