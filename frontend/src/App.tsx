import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import "./App.css";
import logo from "./assets/logo.svg";
import logoWhite from "./assets/logo_white.png";

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  nextUpdate: string[];
  lastUpdate: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Titulo",
    description: "Descrição",
    progress: 100,
    nextUpdate: [
      "Próxima atualização.",
      "Próxima atualização.",
      "Próxima atualização.",
      "Próxima atualização.",
    ],
    lastUpdate: "Última atualização.",
  },
  {
    id: 2,
    name: "Titulo",
    description: "Descrição",
    progress: 51,
    nextUpdate: [
      "Próxima atualização.",
      "Próxima atualização.",
      "Próxima atualização.",
      "Próxima atualização.",
    ],
    lastUpdate: "",
  },
  {
    id: 3,
    name: "Titulo",
    description: "Descrição",
    progress: 100,
    nextUpdate: [""],
    lastUpdate: "",
  },
  {
    id: 4,
    name: "Titulo",
    description: "Descrição",
    progress: 30,
    nextUpdate: [""],
    lastUpdate: "",
  },
];

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleCardExpansion = (projectId: number) => {
    // Parâmetro tipado
    setExpandedCard(expandedCard === projectId ? null : projectId);
  };

  const getProgressColor = (progress: number) => {
    if (isDarkTheme) {
      if (progress >= 100) return "#50fa7b"; // Dracula green
      if (progress >= 50) return "#f1fa8c"; // Dracula yellow
      return "#ffb86c"; // Dracula orange
    } else {
      if (progress >= 100) return "#059669"; // Green-600
      if (progress >= 50) return "#16a34a"; // Green-600
      return "#65a30d"; // Lime-600
    }
  };

  const getStatusText = (progress: number) => {
    if (progress >= 100) return "Concluído";
    if (progress >= 50) return "Em Andamento";
    return "Iniciado";
  };

  return (
    <div className={`app ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* Logo e Nome da Empresa */}
          <div className="logo-section">
            <div className="logotipo">
              <img src={isDarkTheme ? logoWhite : logo} alt="DIME" />
            </div>
          </div>

          {/* Toggle de Tema */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Alternar tema"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        {/* Título da Página */}
        <div className="page-title">
          <h2>TI - NOVO CD</h2>
          <p>Acompanhe o progresso dos processos do novo CD DIME</p>
        </div>

        {/* Lista de Projetos */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Cabeçalho do Projeto */}
              <div className="project-header">
                <div className="project-title-row">
                  <h3 className="project-name">{project.name}</h3>
                  <button
                    onClick={() => toggleCardExpansion(project.id)}
                    className="expand-button"
                  >
                    {expandedCard === project.id
                      ? "Menos detalhes"
                      : "Mais detalhes"}
                  </button>
                </div>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Barra de Progresso */}
              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progresso</span>
                  <span className="progress-percentage">
                    {project.progress}%
                  </span>
                </div>

                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress),
                    }}
                  >
                    <div className="progress-shine" />
                  </div>
                </div>
              </div>

              {/* Status do Projeto */}
              <div className="project-footer">
                <span
                  className={`status-badge ${
                    project.progress >= 100
                      ? "status-completed"
                      : project.progress >= 50
                      ? "status-progress"
                      : "status-started"
                  }`}
                >
                  {getStatusText(project.progress)}
                </span>

                <span className="last-updated">Atualizado recentemente</span>
              </div>
              {expandedCard === project.id && (
                <div className="project-details">
                  <div className="detail-section">
                    <h4>Próximas Atualizações</h4>
                    <ul>
                      {project.nextUpdate.map(
                        (update, index) =>
                          update && <li key={index}>{update}</li>
                      )}
                    </ul>
                  </div>
                  {project.lastUpdate && (
                    <div className="detail-section">
                      <h4>Última Atualização</h4>
                      <p>{project.lastUpdate}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Estatísticas Resumidas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{projects.length}</div>
            <div className="stat-label">Total de Projetos</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {Math.round(
                projects.reduce((acc, p) => acc + p.progress, 0) /
                  projects.length
              )}
              %
            </div>
            <div className="stat-label">Progresso Médio</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {projects.filter((p) => p.progress >= 80).length}
            </div>
            <div className="stat-label">Quase Concluídos</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 DIME - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
