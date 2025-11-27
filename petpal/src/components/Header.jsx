export default function Header({ onNavigate }) {
  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* logo + PetPal */}
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
          <div className="logo">🐶</div>
          <span className="brand-title">PetPal</span>
        </div>

        {/* NAV - Simplified for unauthenticated users */}
        <nav className="nav">
          <a onClick={() => onNavigate("home")} className="nav-item">
            <span className="emoji">🏠</span> Accueil
          </a>
          <a onClick={() => onNavigate("services")} className="nav-item">
            <span className="emoji">🛎️</span> Services
          </a>
          <a onClick={() => onNavigate("sitters")} className="nav-item">
            <span className="emoji">🐾</span> Sitters
          </a>
          <a onClick={() => onNavigate("login")} className="nav-item">
            <span className="emoji">🔑</span> Connexion
          </a>
          <a onClick={() => onNavigate("signup")} className="nav-item">
            <span className="emoji">📝</span> Inscription
          </a>
        </nav>

      </div>
    </header>
  );
}