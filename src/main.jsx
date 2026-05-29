import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookOpen, FileText, Menu, X } from "lucide-react";
import "./styles.css";

const episodes = [
  {
    id: "piloto-1",
    label: "Piloto ultracorto #1",
    title: "El Comité",
    pages: 11,
    status: "Disponible",
    description: "Cuatro páginas. Una sede. Una puerta que se cierra y una organización que aprende a sobrevivir dentro del ruido.",
  },
  {
    id: "piloto-2",
    label: "Próximamente",
    title: "La llamada",
    pages: 0,
    status: "En desarrollo",
    description: "Un teléfono vibra en una mesa institucional. Nadie pregunta quién llama. Todos lo saben.",
  },
];

const comicPages = [
  { number: 1, title: "Página 1", caption: "Madrid, 1 de octubre de 2016. Sede federal del PSOE.", image: "/pages/el-comite-01.png" },
  { number: 2, title: "Página 2", caption: "Llegan los protagonistas. Cada saludo es un mensaje.", image: "/pages/el-comite-02.png" },
  { number: 3, title: "Página 3", caption: "Los pasillos son la verdadera sala de máquinas.", image: "/pages/el-comite-03.png" },
  { number: 4, title: "Página 4", caption: "Entra. La puerta se cierra. El ruido desaparece.", image: "/pages/el-comite-04.png" },
  { number: 5, title: "Página 5", caption: "La reunión continúa. Cada silencio ocupa más que una intervención.", image: "/pages/el-comite-05.png" },
  { number: 6, title: "Página 6", caption: "Las posiciones se endurecen. Nadie quiere ser el primero en ceder.", image: "/pages/el-comite-06.png" },
  { number: 7, title: "Página 7", caption: "Fuera, el relato empieza a tomar forma antes de que haya una salida.", image: "/pages/el-comite-07.png" },
  { number: 8, title: "Página 8", caption: "La arquitectura institucional convierte cada espera en una amenaza.", image: "/pages/el-comite-08.png" },
  { number: 9, title: "Página 9", caption: "Los gestos mínimos pesan más que las frases oficiales.", image: "/pages/el-comite-09.png" },
  { number: 10, title: "Página 10", caption: "La noche avanza. La organización busca una forma de seguir en pie.", image: "/pages/el-comite-10.png" },
  { number: 11, title: "Página 11", caption: "El comité termina, pero la supervivencia apenas empieza.", image: "/pages/el-comite-11.png" },
];

const navItems = [
  { id: "home", label: "Portada" },
  { id: "reader", label: "Leer" },
  { id: "episodes", label: "Episodios" },
  { id: "extras", label: "Contexto" },
];

function ComicImagePage({ page, fullscreen }) {
  return (
    <figure className={fullscreen ? "comic-frame comic-frame-fullscreen" : "comic-frame"}>
      <img src={page.image} alt={`Manual de Supervivencia - El Comité - ${page.title}`} draggable="false" />
    </figure>
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
      <div className="background" />
      <div className="noise" />

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

      <main className={isFullscreenReader ? "main main-fullscreen" : "main"}>
        {activeSection === "home" && (
          <section className="home">
            <div className="home-panel">
              <p className="kicker">Piloto ultracorto #1 · El Comité</p>
              <h1>El poder no cae. Cambia de manos.</h1>
              <p className="home-text">
                Una novela gráfica digital de suspense político-institucional. Episodios breves,
                lectura inmersiva y una interfaz diseñada para que cada página respire como una escena cerrada.
              </p>
              <div className="home-actions">
                <button className="primary-button" onClick={() => goTo("reader")}>Leer episodio</button>
                <button className="ghost-button" onClick={() => goTo("extras")}>Ver contexto</button>
              </div>
              <div className="editorial-note">
                Obra de ficción dramatizada inspirada en hechos públicos. Algunas escenas y diálogos han sido adaptados con fines narrativos.
              </div>
            </div>

            <button className="cover-preview" onClick={() => goTo("reader")} aria-label="Abrir lector">
              <ComicImagePage page={comicPages[0]} />
              <span>Abrir lector</span>
            </button>
          </section>
        )}

        {activeSection === "reader" && (
          <section className={isFullscreenReader ? "reader reader-fullscreen" : "reader"}>
            <div className="reader-topbar">
              <div>
                <p>El Comité</p>
                <h2>{page.title}</h2>
              </div>

              <div className="reader-topbar-actions">
                <span>{progress}</span>
                <button onClick={() => setIsFullscreenReader(!isFullscreenReader)}>
                  {isFullscreenReader ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  {isFullscreenReader ? "Salir" : "Pantalla completa"}
                </button>
              </div>
            </div>

            <div className={isFullscreenReader ? "reader-stage fullscreen-stage" : "reader-stage"}>
              <button className="reader-arrow reader-arrow-left" onClick={prevPage} disabled={pageIndex === 0} aria-label="Página anterior">
                <ChevronLeft size={40} />
              </button>

              <ComicImagePage page={page} fullscreen={isFullscreenReader} />

              <button className="reader-arrow reader-arrow-right" onClick={nextPage} disabled={pageIndex === comicPages.length - 1} aria-label="Página siguiente">
                <ChevronRight size={40} />
              </button>
            </div>

            <div className="reader-footer">
              <p>{page.caption}</p>
              <div className="dots">
                {comicPages.map((p, index) => (
                  <button key={p.number} onClick={() => setPageIndex(index)} className={index === pageIndex ? "dot active" : "dot"} aria-label={`Ir a página ${p.number}`} />
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "episodes" && (
          <section className="content-section">
            <div className="section-title">
              <p>Índice editorial</p>
              <h2>Episodios</h2>
            </div>

            <div className="episode-grid">
              {episodes.map((episode, index) => (
                <article className="episode-card" key={episode.id}>
                  <div className="episode-meta">
                    <span>{episode.label}</span>
                    <small>{episode.status}</small>
                  </div>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <div className="episode-bottom">
                    <span>{episode.pages || "—"} páginas</span>
                    <button disabled={index !== 0} onClick={() => goTo("reader")}>Leer</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "extras" && (
          <section className="extras">
            <article className="info-card">
              <FileText />
              <p>Aviso editorial</p>
              <h2>Ficción dramatizada</h2>
              <span>
                Obra de ficción dramatizada inspirada en hechos públicos. Algunas escenas y diálogos han sido adaptados con fines narrativos.
              </span>
            </article>

            <article className="info-card">
              <BookOpen />
              <p>Contexto y extras</p>
              <h2>Material complementario</h2>
              <div className="extras-list">
                {["Cronología pública", "Notas de guion", "Mapa de personajes", "Galería de portadas"].map((item) => (
                  <div key={item}>
                    <strong>{item}</strong>
                    <span>Espacio preparado para ampliar el universo editorial del episodio.</span>
                  </div>
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
