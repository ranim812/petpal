export default function Home({ onNavigate }) {
  return (
    <div className="container">
      
      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <h1>Trouvez un gardien fiable pour votre animal</h1>
          <p>Réservez des pet sitters vérifiés pendant vos voyages.</p>

          <div style={{ display:"flex", justifyContent:"center", gap:"12px" }}>
            <button className="btn-primary" onClick={() => onNavigate("signup")}>
              Créer un compte
            </button>

            <button className="btn-ghost" onClick={() => onNavigate("login")}>
              Connexion
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-horizontal">

        <div className="feature-card">
          <div className="avatar-floating pink">🛡️</div>
          <h3>Pet Sitters Vérifiés</h3>
          <p>Des gardiens contrôlés, évalués et approuvés pour la sécurité de vos animaux.</p>
        </div>

        <div className="feature-card">
          <div className="avatar-floating blue">📍</div>
          <h3>Près de chez vous</h3>
          <p>Trouvez rapidement des gardiens proches de votre localisation.</p>
        </div>

        <div className="feature-card">
          <div className="avatar-floating purple">📅</div>
          <h3>Réservation simplifiée</h3>
          <p>Réservez, discutez et organisez le séjour en quelques secondes.</p>
        </div>

      </div>
    </div>
  );
}
