import { useState } from "react";

export default function OwnerDashboard({ onNavigate }) {
  const [activeBookings] = useState([
    { id: 1, sitter: "Marie Dubois", pet: "Max", date: "15-20 Nov", status: "Confirmé", avatar: "🐕" },
    { id: 2, sitter: "Lucas Martin", pet: "Luna", date: "22-25 Nov", status: "En attente", avatar: "🐱" }
  ]);

  const [favoriteSitters] = useState([
    { id: 1, name: "Sophie Laurent", rating: 4.9, reviews: 48, specialty: "Chiens", avatar: "👩" },
    { id: 2, name: "Thomas Petit", rating: 4.8, reviews: 35, specialty: "Chats", avatar: "👨" },
    { id: 3, name: "Emma Bernard", rating: 5.0, reviews: 62, specialty: "Multi-animaux", avatar: "👩‍🦰" }
  ]);

  return (
    <div className="dashboard-container">
      <div className="container">
        
        {/* Welcome Section */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Bienvenue, Jean! 👋</h1>
            <p>Gérez vos réservations et trouvez les meilleurs gardiens pour vos compagnons</p>
          </div>
          <button className="btn-primary" onClick={() => onNavigate("sitters")}>
            🔍 Trouver un Sitter
          </button>
         
          <button className="btn-ghost" onClick={() => onNavigate("profile")}>
            👤 Mon Profil
          </button>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card pink">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Réservations actives</p>
            </div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">🐾</div>
            <div className="stat-info">
              <h3>3</h3>
              <p>Animaux enregistrés</p>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Avis laissés</p>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="section">
          <div className="section-header">
            <h2>Réservations en cours</h2>
            <a className="view-all" onClick={() => onNavigate("bookings")}>Voir tout →</a>
          </div>
          <div className="bookings-list">
            {activeBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-left">
                  <div className="booking-avatar">{booking.avatar}</div>
                  <div className="booking-info">
                    <h4>{booking.pet}</h4>
                    <p>Gardien: {booking.sitter}</p>
                    <p className="booking-date">📆 {booking.date}</p>
                  </div>
                </div>
                <div className="booking-right">
                  <span className={`status-badge ${booking.status === 'Confirmé' ? 'confirmed' : 'pending'}`}>
                    {booking.status}
                  </span>
                  <button className="btn-ghost btn-sm">Détails</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Sitters */}
        <div className="section">
          <div className="section-header">
            <h2>Vos Sitters favoris</h2>
            <a className="view-all" onClick={() => onNavigate("sitters")}>Explorer →</a>
          </div>
          <div className="sitters-grid">
            {favoriteSitters.map(sitter => (
              <div key={sitter.id} className="sitter-card">
                <div className="sitter-avatar-large">{sitter.avatar}</div>
                <h4>{sitter.name}</h4>
                <div className="sitter-rating">
                  <span className="rating">⭐ {sitter.rating}</span>
                  <span className="reviews">({sitter.reviews} avis)</span>
                </div>
                <p className="sitter-specialty">{sitter.specialty}</p>
                <button className="btn-primary btn-sm">Réserver</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}