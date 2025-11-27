import { useState } from "react";

export default function Services({ onNavigate }) {
  const [services] = useState([
    {
      id: 1,
      title: "Garde à domicile",
      icon: "🏠",
      description:
        "Un gardien vient chez vous pour s'occuper de votre animal dans son environnement familier.",
      features: [
        "Visites 1-3x par jour",
        "Nourriture & eau",
        "Jeux & promenades",
        "Photos quotidiennes",
      ],
      price: "À partir de 15€/visite",
      color: "pink",
    },
    {
      id: 2,
      title: "Garde chez le sitter",
      icon: "🏡",
      description:
        "Votre animal séjourne chez un gardien expérimenté pendant votre absence.",
      features: [
        "Surveillance 24/7",
        "Environnement sécurisé",
        "Attention personnalisée",
        "Mises à jour régulières",
      ],
      price: "À partir de 25€/nuit",
      color: "blue",
    },
    {
      id: 3,
      title: "Promenades",
      icon: "🚶",
      description:
        "Des promenades quotidiennes pour garder votre chien actif et heureux.",
      features: [
        "30-60 minutes",
        "Parcours adaptés",
        "Socialisation",
        "Exercice régulier",
      ],
      price: "À partir de 12€/promenade",
      color: "purple",
    },
    {
      id: 4,
      title: "Garderie de jour",
      icon: "☀️",
      description:
        "Votre animal passe la journée avec d'autres compagnons sous surveillance.",
      features: ["8h-18h", "Socialisation", "Activités & jeux", "Repas inclus"],
      price: "À partir de 20€/jour",
      color: "pink",
    },
    {
      id: 5,
      title: "Soins spéciaux",
      icon: "💊",
      description:
        "Administration de médicaments et soins pour animaux avec besoins particuliers.",
      features: [
        "Médicaments",
        "Régimes spéciaux",
        "Animaux seniors",
        "Suivi vétérinaire",
      ],
      price: "À partir de 18€/visite",
      color: "blue",
    },
    {
      id: 6,
      title: "Taxi animalier",
      icon: "🚗",
      description:
        "Transport sécurisé pour rendez-vous vétérinaire ou toilettage.",
      features: [
        "Véhicule adapté",
        "Sièges sécurisés",
        "Transport doux",
        "Disponible 7j/7",
      ],
      price: "À partir de 10€/trajet",
      color: "purple",
    },
  ]);

  const [aboutPoints] = useState([
    {
      icon: "🛡️",
      title: "Sitters vérifiés",
      description:
        "Tous nos gardiens sont contrôlés, formés et approuvés pour garantir la sécurité de vos animaux.",
    },
    {
      icon: "💚",
      title: "Passion & expérience",
      description:
        "Nos sitters sont des passionnés d'animaux avec plusieurs années d'expérience dans le pet sitting.",
    },
    {
      icon: "📱",
      title: "Suivi en temps réel",
      description:
        "Recevez des photos, vidéos et mises à jour quotidiennes sur votre compagnon.",
    },
    {
      icon: "💰",
      title: "Prix transparents",
      description:
        "Pas de frais cachés. Comparez les tarifs et choisissez le sitter qui vous convient.",
    },
    {
      icon: "🔒",
      title: "Assurance complète",
      description:
        "Tous les séjours sont couverts par notre assurance responsabilité civile professionnelle.",
    },
    {
      icon: "⭐",
      title: "Support 24/7",
      description:
        "Notre équipe est disponible à tout moment pour répondre à vos questions et préoccupations.",
    },
  ]);

  return (
    <div className="services-page">
      <div className="container">
        {/* Hero Section */}
        <div className="services-hero">
          <div className="services-hero-content">
            <h1>Nos Services 🐾</h1>
            <p>
              Des solutions complètes pour le bien-être de vos animaux de
              compagnie
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className={`service-card ${service.color}`}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>

              <div className="service-price">{service.price}</div>
              <button
                className="btn-primary btn-sm"
                onClick={() => onNavigate("sitters")}
              >
                Réserver maintenant
              </button>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="about-header">
            <h2>Pourquoi choisir PetPal? 🌟</h2>
            <p>La plateforme de confiance pour trouver le gardien parfait</p>
          </div>

          <div className="about-grid">
            {aboutPoints.map((point, index) => (
              <div key={index} className="about-card">
                <div className="about-icon">{point.icon}</div>
                <h4>{point.title}</h4>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Prêt à trouver le gardien idéal? 🎉</h2>
            <p>
              Rejoignez des milliers de propriétaires satisfaits qui font
              confiance à PetPal
            </p>
            <div className="cta-buttons">
              <button
                className="btn-primary"
                onClick={() => onNavigate("signup")}
              >
                Créer un compte
              </button>
              <button
                className="btn-ghost"
                onClick={() => onNavigate("sitters")}
              >
                Parcourir les sitters
              </button>
            </div>
          </div>
          <div className="cta-stats">
            <div className="cta-stat">
              <h3>10,000+</h3>
              <p>Animaux gardés</p>
            </div>
            <div className="cta-stat">
              <h3>500+</h3>
              <p>Sitters vérifiés</p>
            </div>
            <div className="cta-stat">
              <h3>4.9⭐</h3>
              <p>Note moyenne</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-page {
          min-height: 100vh;
          padding: 40px 0;
        }

        /* Services Hero */
        .services-hero {
          background: linear-gradient(135deg, rgba(181, 123, 255, 0.15), rgba(255, 132, 201, 0.15));
          border-radius: var(--radius);
          padding: 60px 40px;
          text-align: center;
          margin-bottom: 50px;
          box-shadow: var(--shadow);
          animation: slideIn 0.6s ease-out;
        }

        .services-hero-content h1 {
          font-size: 42px;
          font-weight: 800;
          color: var(--accent1);
          margin: 0 0 12px 0;
        }

        .services-hero-content p {
          font-size: 18px;
          color: #666;
          margin: 0;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 60px;
        }

        .service-card {
          background: white;
          border-radius: var(--radius);
          padding: 30px;
          box-shadow: var(--shadow);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 50px rgba(120, 80, 160, 0.15);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 20px;
          animation: float 3s ease-in-out infinite;
        }

        .service-card.pink .service-icon {
          background: rgba(255, 132, 201, 0.15);
        }

        .service-card.blue .service-icon {
          background: rgba(100, 150, 255, 0.15);
        }

        .service-card.purple .service-icon {
          background: rgba(181, 123, 255, 0.15);
        }

        .service-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0 0 12px 0;
          text-align: center;
        }

        .service-description {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          text-align: center;
          flex-grow: 1;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }

        .service-features li {
          color: #555;
          font-size: 14px;
          margin: 8px 0;
          padding-left: 0;
        }

        .service-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--accent1);
          text-align: center;
          margin-bottom: 16px;
        }

        .service-card button {
          width: 100%;
        }

        /* About Section */
        .about-section {
          margin-bottom: 60px;
        }

        .about-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .about-header h2 {
          font-size: 36px;
          font-weight: 800;
          color: var(--accent1);
          margin: 0 0 12px 0;
        }

        .about-header p {
          font-size: 18px;
          color: #666;
          margin: 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .about-card {
          background: white;
          border-radius: var(--radius);
          padding: 28px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: transform 0.3s;
        }

        .about-card:hover {
          transform: translateY(-4px);
        }

        .about-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .about-card h4 {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 12px 0;
        }

        .about-card p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, rgba(181, 123, 255, 0.1), rgba(255, 132, 201, 0.1));
          border-radius: var(--radius);
          padding: 50px 40px;
          box-shadow: var(--shadow);
        }

        .cta-content {
          text-align: center;
          margin-bottom: 40px;
        }

        .cta-content h2 {
          font-size: 32px;
          font-weight: 800;
          color: var(--accent1);
          margin: 0 0 12px 0;
        }

        .cta-content p {
          font-size: 16px;
          color: #666;
          margin: 0 0 24px 0;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .cta-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-stat {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(120, 80, 160, 0.08);
        }

        .cta-stat h3 {
          font-size: 32px;
          font-weight: 800;
          color: var(--accent1);
          margin: 0 0 8px 0;
        }

        .cta-stat p {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        /* Responsive */
        @media (max-width: 850px) {
          .services-grid,
          .about-grid,
          .cta-stats {
            grid-template-columns: 1fr;
          }

          .services-hero-content h1 {
            font-size: 32px;
          }

          .about-header h2 {
            font-size: 28px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-buttons button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
