import { useState } from "react";

export default function SitterSearch({ onNavigate }) {
  const [filters, setFilters] = useState({
    location: "",
    petType: "",
    service: "",
    availability: "",
    priceRange: [0, 100]
  });

  const [sitters] = useState([
    {
      id: "1", // Garder comme string
      name: "Marie Dubois",
      avatar: "👩",
      rating: 4.9,
      reviews: 48,
      distance: 1.2,
      price: 25,
      availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
      petTypes: ["Chiens", "Chats"],
      services: ["Garde à domicile", "Garde chez le sitter", "Promenades"],
      verified: true,
      responseTime: "1 heure"
    },
    {
      id: "2", // Garder comme string
      name: "Lucas Martin",
      avatar: "👨",
      rating: 4.8,
      reviews: 35,
      distance: 2.5,
      price: 30,
      availability: ["Lun", "Mer", "Ven", "Sam", "Dim"],
      petTypes: ["Chiens", "Oiseaux"],
      services: ["Garde à domicile", "Garde chez le sitter", "Promenades"],
      verified: true,
      responseTime: "2 heures"
    },
    {
      id: "3", // Garder comme string
      name: "Sophie Laurent",
      avatar: "👩‍🦰",
      rating: 5.0,
      reviews: 62,
      distance: 0.8,
      price: 28,
      availability: ["Mar", "Jeu", "Sam", "Dim"],
      petTypes: ["Chiens", "Chats", "Lapins"],
      services: ["Garde à domicile", "Garde chez le sitter", "Promenades"],
      verified: true,
      responseTime: "30 minutes"
    },
    {
      id: "4", // Garder comme string
      name: "Thomas Petit",
      avatar: "👨‍💼",
      rating: 4.7,
      reviews: 29,
      distance: 3.1,
      price: 22,
      availability: ["Lun", "Mar", "Jeu", "Ven"],
      petTypes: ["Chiens"],
      services: ["Garde à domicile", "Promenades"],
      verified: false,
      responseTime: "3 heures"
    },
    {
      id: "5", // Garder comme string
      name: "Emma Bernard",
      avatar: "👩‍🦰",
      rating: 4.9,
      reviews: 41,
      distance: 1.8,
      price: 26,
      availability: ["Mer", "Jeu", "Ven", "Sam", "Dim"],
      petTypes: ["Chiens", "Chats", "Rongeurs"],
      services: ["Garde à domicile", "Garde chez le sitter", "Promenades"],
      verified: true,
      responseTime: "1 heure"
    },
    {
      id: "6", // Garder comme string
      name: "Antoine Lefebvre",
      avatar: "👨",
      rating: 4.6,
      reviews: 33,
      distance: 4.2,
      price: 20,
      availability: ["Lun", "Mar", "Mer", "Jeu"],
      petTypes: ["Chats", "Oiseaux"],
      services: ["Garde à domicile", "Garde chez le sitter"],
      verified: false,
      responseTime: "4 heures"
    }
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const viewSitterProfile = (sitterId) => {
    console.log("Navigation vers le profil du sitter avec ID:", sitterId);
    console.log("Type de l'ID:", typeof sitterId);
    onNavigate(`sitterprofile/${sitterId}`);
  };

  const filteredSitters = sitters.filter(sitter => {
    return (
      (!filters.location || sitter.distance <= parseFloat(filters.location)) &&
      (!filters.petType || sitter.petTypes.includes(filters.petType)) &&
      (!filters.service || sitter.services.includes(filters.service)) &&
      (!filters.availability || sitter.availability.includes(filters.availability)) &&
      sitter.price >= filters.priceRange[0] &&
      sitter.price <= filters.priceRange[1]
    );
  });

  return (
    <div className="sitter-search-container">
      {/* Header */}
      <div className="sitter-search-header">
        <div className="container sitter-search-header-inner">
          <button className="back-button" onClick={() => onNavigate("home")}>
            ← Retour
          </button>
          <h1 className="sitter-search-title">Trouver un Pet Sitter</h1>
        </div>
      </div>

      <div className="container">
        {/* Search Filters */}
        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Localisation (km)</label>
              <input
                type="number"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="filter-input"
                placeholder="Distance max"
                min="0"
                max="50"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Type d'animal</label>
              <select
                name="petType"
                value={filters.petType}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Tous les animaux</option>
                <option value="Chiens">Chiens</option>
                <option value="Chats">Chats</option>
                <option value="Oiseaux">Oiseaux</option>
                <option value="Lapins">Lapins</option>
                <option value="Rongeurs">Rongeurs</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Service</label>
              <select
                name="service"
                value={filters.service}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Tous les services</option>
                <option value="Garde à domicile">Garde à domicile</option>
                <option value="Garde chez le sitter">Garde chez le sitter</option>
                <option value="Promenades">Promenades</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Disponibilité</label>
              <select
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Tous les jours</option>
                <option value="Lun">Lundi</option>
                <option value="Mar">Mardi</option>
                <option value="Mer">Mercredi</option>
                <option value="Jeu">Jeudi</option>
                <option value="Ven">Vendredi</option>
                <option value="Sam">Samedi</option>
                <option value="Dim">Dimanche</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Prix (€/nuit)</label>
              <div className="price-range">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                  }))}
                  className="price-input"
                  min="0"
                  max="100"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                  }))}
                  className="price-input"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2 className="results-title">
            {filteredSitters.length} Pet Sitters disponibles
          </h2>
          <div className="sort-options">
            <select className="sort-select">
              <option>Trier par: Pertinence</option>
              <option>Prix: croissant</option>
              <option>Prix: décroissant</option>
              <option>Note: la plus haute</option>
              <option>Distance: la plus proche</option>
            </select>
          </div>
        </div>

        {/* Sitters Grid */}
        <div className="sitters-grid">
          {filteredSitters.length > 0 ? (
            filteredSitters.map(sitter => (
              <div key={sitter.id} className="sitter-card">
                <div className="sitter-header">
                  <div className="sitter-avatar">{sitter.avatar}</div>
                  <div className="sitter-info">
                    <h3 className="sitter-name">{sitter.name}</h3>
                    <div className="sitter-rating">
                      <span className="rating">⭐ {sitter.rating}</span>
                      <span className="reviews">({sitter.reviews} avis)</span>
                    </div>
                    <div className="sitter-distance">📍 {sitter.distance} km</div>
                  </div>
                  {sitter.verified && (
                    <div className="verified-badge">✓ Vérifié</div>
                  )}
                </div>

                <div className="sitter-details">
                  <div className="sitter-meta">
                    <div className="meta-item">
                      <span className="meta-icon">⏱️</span>
                      <span>{sitter.responseTime}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">💰</span>
                      <span>{sitter.price}€/nuit</span>
                    </div>
                  </div>

                  <div className="sitter-pets">
                    {sitter.petTypes.map((pet, index) => (
                      <span key={index} className="pet-tag">{pet}</span>
                    ))}
                  </div>

                  <div className="sitter-services">
                    {sitter.services.slice(0, 2).map((service, index) => (
                      <span key={index} className="service-tag">{service}</span>
                    ))}
                    {sitter.services.length > 2 && (
                      <span className="service-tag more">+{sitter.services.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="sitter-actions">
                  <button 
                    className="btn-primary btn-sm" 
                    onClick={() => viewSitterProfile(sitter.id)}
                  >
                    Voir le profil
                  </button>
                  <button className="btn-ghost btn-sm">
                    💬 Contacter
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>Aucun résultat trouvé</h3>
              <p>Essayez de modifier vos filtres pour trouver plus de pet sitters.</p>
              <button 
                className="btn-secondary"
                onClick={() => setFilters({
                  location: "",
                  petType: "",
                  service: "",
                  availability: "",
                  priceRange: [0, 100]
                })}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sitter-search-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .sitter-search-header {
          margin-bottom: 30px;
        }
        
        .sitter-search-header-inner {
          display: flex;
          align-items: center;
          padding: 15px 0;
        }
        
        .back-button {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          margin-right: 15px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
        }
        
        .sitter-search-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .filters-card {
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
          margin-bottom: 30px;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        
        .filter-input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .price-range {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .price-input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .results-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        
        .sort-select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background: white;
        }
        
        .sitters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }
        
        .sitter-card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .sitter-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .sitter-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .sitter-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .sitter-info {
          flex-grow: 1;
        }
        
        .sitter-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }
        
        .sitter-rating {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .rating {
          font-weight: 600;
          margin-right: 5px;
        }
        
        .reviews {
          color: #666;
          font-size: 14px;
        }
        
        .sitter-distance {
          color: #666;
          font-size: 14px;
        }
        
        .verified-badge {
          background: #4CAF50;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .sitter-details {
          padding: 20px;
        }
        
        .sitter-meta {
          display: flex;
          margin-bottom: 15px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          margin-right: 15px;
          color: #666;
          font-size: 14px;
        }
        
        .meta-icon {
          margin-right: 5px;
        }
        
        .sitter-pets {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .pet-tag {
          display: inline-block;
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        
        .sitter-services {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .service-tag {
          display: inline-block;
          background: rgba(100, 150, 255, 0.1);
          color: #6496ff;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        
        .service-tag.more {
          background: rgba(0, 0, 0, 0.05);
          color: #666;
        }
        
        .sitter-actions {
          display: flex;
          padding: 15px 20px;
          border-top: 1px solid #f0f0f0;
          gap: 10px;
        }
        
        .btn-sm {
          padding: 8px 12px;
          font-size: 14px;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          grid-column: 1 / -1;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        
        .empty-state h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px 0;
        }
        
        .empty-state p {
          color: #666;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .sitters-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}