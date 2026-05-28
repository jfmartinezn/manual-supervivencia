import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronLeft, ChevronRight, BookOpen, FileText, Menu, X } from "lucide-react";
import "./styles.css";

const episodes = [
  {
    id: "piloto-1",
    label: "Piloto ultracorto #1",
    title: "El Comité",
    pages: 4,
    status: "Disponible",
    description:
      "Una reunión contenida, cuatro páginas, una puerta cerrada y demasiadas versiones de la misma verdad.",
  },
  {
    id: "piloto-2",
    label: "Próximamente",
    title: "La llamada",
    pages: 0,
    status: "En desarrollo",
    description:
      "Un teléfono vibra en una mesa institucional. Nadie pregunta quién llama. Todos lo saben.",
  },
];

const comicPages = [
  { number: 1, title: "Página 1", caption: "Madrid, 1 de octubre de 2016. Sede federal del PSOE.", image: "/pages/el-comite-01.png" },
  { number: 2, title: "Página 2", caption: "Llegan los protagonistas. Cada saludo es un mensaje.", image: "/pages/el-comite-02.png" },
  { number: 3, title: "Página 3", caption: "Los pasillos son la verdadera sala de máquinas.", image: "/pages/el-comite-03.png" },
  { number: 4, title: "Página 4", caption: "Entra. La puerta se cierra. El ruido desaparece.", image: "/pages/el-comite-04.png" },
];

const navItems = [
  { id: "home", label: "Portada" },
  { id: "episodes", label: "Episodios" },
  { id: "reader", label: "Lector" },
  { id: "extras", label: "Contexto" },
];

function ComicImagePage({ page, fullscreen }) {
  return (
    <div className={fullscreen ? "comic-page comic-page-fullscreen" : "comic-page"}>
      <img src={page.image} alt={`Manual de Supervivencia - El Comité - ${page.title}`} draggable="false" />
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [pageIndex, setPageIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFullscreenReader, setIsFullscreenReader] = useState(false);

  const page = comicPages[pageIndex];
  const progress = useMemo(() => `${pageIndex + 1}/${comicPages.length}`, [pageIndex]);

  const goTo = (section) => {
    setActiveSection(section);
    setMobileOpen(false);
    setIsFullscreenReader(false);
  };

  const nextPage = () => setPageIndex((current) => Math.min(current + 1, comicPages.length - 1));
  const prevPage = () => setPageIndex((current) => Math.max(current - 1, 0));

  return (
    <div className="app">
      <div className="background"></div>
      <div className="grid-bg"></div>

      {!isFullscreenReader && (
        <header className="site-header">
          <button className="brand" onClick={() => goTo("home")}>
            <span>Novela gráfica digital</span>
            <strong>Manual de Supervivencia</strong>
          </button>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)} className={activeSection === item.id ? "active" : ""}>
                {item.label}
              </button>
            ))}
          </nav>

          <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {mobileOpen && (
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => goTo(item.id)} className={activeSection === item.id ? "active" : ""}>
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </header>
      )}

      <main className={isFullscreenReader ? "main fullscreen-main" : "main"}>
        {activeSection === "home" && (
          <section className="home-section">
            <div className="home-copy">
              <div className="eyebrow">Piloto ultracorto #1 · El Comité</div>
              <h1>El poder no cae. Cambia de manos.</h1>
              <p>
                Un lector digital sobrio para una serie política de ficción dramatizada: episodios breves,
                páginas centradas y una interfaz invisible que deja respirar la tensión institucional.
              </p>
              <div className="actions">
                <button className="primary-button" onClick={() => goTo("reader")}>Abrir lector</button>
                <button className="secondary-button" onClick={() => goTo("episodes")}>Ver episodios</button>
              </div>
            </div>
            <div className="home-preview"><ComicImagePage page={comicPages[0]} /></div>
          </section>
        )}

        {activeSection === "episodes" && (
          <section className="content-section">
            <div className="section-header"><span>Índice editorial</span><h2>Episodios</h2></div>
            <div className="episode-grid">
              {episodes.map((episode, index) => (
                <article className="card" key={episode.id}>
                  <div className="card-top"><span>{episode.label}</span><small>{episode.status}</small></div>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <div className="card-bottom"><span>{episode.pages || "—"} páginas</span><button disabled={index !== 0} onClick={() => goTo("reader")}>Leer</button></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "reader" && (
          <section className={isFullscreenReader ? "reader reader-fullscreen" : "reader"}>
            <div className="reader-header">
              <div><span>Lector de cómic</span><h2>El Comité</h2></div>
              <div className="reader-controls-top">
                <div className="page-count">Página {progress}</div>
                <button onClick={() => setIsFullscreenReader(!isFullscreenReader)}>{isFullscreenReader ? "Salir de pantalla completa" : "Pantalla completa"}</button>
              </div>
            </div>

            <div className={isFullscreenReader ? "gallery-stage fullscreen-stage" : "gallery-stage"}>
              <button className="gallery-arrow gallery-arrow-left" onClick={prevPage} disabled={pageIndex === 0} aria-label="Página anterior"><ChevronLeft size={36} /></button>
              <ComicImagePage page={page} fullscreen={isFullscreenReader} />
              <button className="gallery-arrow gallery-arrow-right" onClick={nextPage} disabled={pageIndex === comicPages.length - 1} aria-label="Página siguiente"><ChevronRight size={36} /></button>
            </div>

            <div className="dots">
              {comicPages.map((p, index) => (
                <button key={p.number} onClick={() => setPageIndex(index)} className={index === pageIndex ? "dot active" : "dot"} aria-label={`Ir a página ${p.number}`} />
              ))}
            </div>
          </section>
        )}

        {activeSection === "extras" && (
          <section className="extras-grid">
            <article className="card large-card">
              <FileText />
              <span>Aviso editorial</span>
              <h2>Ficción dramatizada</h2>
              <p>Obra de ficción dramatizada inspirada en hechos públicos. Algunas escenas y diálogos han sido adaptados con fines narrativos.</p>
            </article>
            <article className="card large-card">
              <BookOpen />
              <span>Contexto y extras</span>
              <h2>Material complementario</h2>
              <div className="extras-modules">
                {["Cronología pública", "Notas de guion", "Mapa de personajes", "Galería de portadas"].map((item) => (
                  <div key={item}><strong>{item}</strong><p>Módulo preparado para ampliar el universo editorial sin saturar el lector.</p></div>
                ))}
              </div>
            </article>
          </section>
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
