// ============================================
// SitterDashboard.jsx
// ============================================
import { useState } from "react";

export default function SitterDashboard({ onNavigate }) {
  const [upcomingBookings] = useState([
    { id: 1, owner: "Pierre Durand", pet: "Charlie", type: "Chien", date: "18-20 Nov", time: "14h00", avatar: "🐕" },
    { id: 2, owner: "Claire Moreau", pet: "Mimi", type: "Chat", date: "22-24 Nov", time: "09h00", avatar: "🐱" }
  ]);

  const [requests] = useState([
    { id: 1, owner: "Julie Rousseau", pet: "Rocky", type: "Chien", date: "25-27 Nov", avatar: "🐕‍🦺" }
  ]);

  return (
    <div className="dashboard-container">
      <div className="container">
        
        {/* Welcome Section */}
        <div className="welcome-banner sitter-banner">
          <div className="welcome-content">
            <h1>Bonjour, Marie! 🌟</h1>
            <p>Gérez vos gardes et développez votre activité de pet sitting</p>
          </div>
          <button className="btn-primary" onClick={() => onNavigate("calendar")}>
            📆 Mon Calendrier
          </button>
          
          <button className="btn-ghost" onClick={() => onNavigate("profile")}>
            👤 Mon Profil
          </button>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card pink">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>850€</h3>
              <p>Revenus ce mois</p>
            </div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>7</h3>
              <p>Gardes ce mois</p>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.9</h3>
              <p>Note moyenne</p>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {requests.length > 0 && (
          <div className="section">
            <div className="section-header">
              <h2>Demandes en attente</h2>
              <span className="badge-count">{requests.length}</span>
            </div>
            <div className="requests-list">
              {requests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-left">
                    <div className="request-avatar">{request.avatar}</div>
                    <div className="request-info">
                      <h4>{request.pet} ({request.type})</h4>
                      <p>Propriétaire: {request.owner}</p>
                      <p className="request-date">📆 {request.date}</p>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="btn-primary btn-sm">✓ Accepter</button>
                    <button className="btn-ghost btn-sm">✗ Refuser</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Bookings */}
        <div className="section">
          <div className="section-header">
            <h2>Prochaines gardes</h2>
            <a className="view-all" onClick={() => onNavigate("bookings")}>Voir tout →</a>
          </div>
          <div className="bookings-list">
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="booking-card sitter-booking">
                <div className="booking-left">
                  <div className="booking-avatar">{booking.avatar}</div>
                  <div className="booking-info">
                    <h4>{booking.pet} ({booking.type})</h4>
                    <p>Propriétaire: {booking.owner}</p>
                    <p className="booking-date">📆 {booking.date} • ⏰ {booking.time}</p>
                  </div>
                </div>
                <div className="booking-right">
                  <button className="btn-primary btn-sm">Voir détails</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Section */}
        <div className="section">
          <div className="section-header">
            <h2>Votre Performance</h2>
          </div>
          <div className="performance-grid">
            <div className="performance-card">
              <div className="perf-icon">🎯</div>
              <h3>95%</h3>
              <p>Taux d'acceptation</p>
            </div>
            <div className="performance-card">
              <div className="perf-icon">⚡</div>
              <h3>2h</h3>
              <p>Temps de réponse moyen</p>
            </div>
            <div className="performance-card">
              <div className="perf-icon">🏆</div>
              <h3>48</h3>
              <p>Avis positifs</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}