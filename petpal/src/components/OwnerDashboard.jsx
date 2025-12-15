import { useState, useEffect } from "react";

export default function OwnerDashboard({ onNavigate, user, bookings, updateUser }) {
  const [activeBookings, setActiveBookings] = useState([]);
  
  // CORRECTION: Utiliser les bons IDs qui correspondent au SitterProfile
  const [favoriteSitters] = useState([
    { id: "1", name: "Marie Dubois", rating: 4.9, reviews: 48, specialty: "Chiens & Chats", avatar: "👩" },
    { id: "3", name: "Sophie Laurent", rating: 5.0, reviews: 62, specialty: "Multi-animaux", avatar: "👩‍🦰" },
    { id: "5", name: "Emma Bernard", rating: 4.9, reviews: 41, specialty: "Chiens, Chats & Rongeurs", avatar: "👩‍🦰" }
  ]);

  // Filtrer les réservations actives (en attente ou confirmées) pour l'utilisateur connecté
  useEffect(() => {
    if (!user) return;
    
    const active = bookings.filter(booking => 
      (booking.status === 'pending' || booking.status === 'confirmed') && 
      booking.userId === user.id
    );
    setActiveBookings(active);
  }, [bookings, user]);

  const handleViewSitterProfile = (sitterId) => {
    console.log("Navigation vers le profil du sitter ID:", sitterId);
    onNavigate(`sitterprofile/${sitterId}`);
  };

  const handleContactSitter = (sitterId) => {
    onNavigate(`messages`);
  };

  const handleAddPet = () => {
    onNavigate('addpet');
  };

  const handleViewBookingDetails = (bookingId) => {
    onNavigate(`bookingdetails/${bookingId}`);
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        
        {/* Welcome Section */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Bienvenue, {user?.name?.split(' ')[0] || 'Utilisateur'}! 👋</h1>
            <p>Gérez vos réservations et trouvez les meilleurs gardiens pour vos compagnons</p>
          </div>
          <div className="welcome-actions">
            <button className="btn-primary" onClick={() => onNavigate("sitters")}>
              🔍 Trouver un Sitter
            </button>
            <button className="btn-secondary" onClick={handleAddPet}>
              ➕ Ajouter un animal
            </button>
          </div>
        </div>

        {/* User Pets Section */}
        {user?.pets && user.pets.length > 0 && (
          <div className="section">
            <div className="section-header">
              <h2>Mes Animaux</h2>
              <button className="btn-text" onClick={handleAddPet}>
                + Ajouter un animal
              </button>
            </div>
            <div className="pets-grid">
              {user.pets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-avatar">{pet.avatar}</div>
                  <div className="pet-info">
                    <h4 className="pet-name">{pet.name}</h4>
                    <p className="pet-details">{pet.type} • {pet.breed || 'Race non spécifiée'}</p>
                    {pet.age > 0 && <p className="pet-age">{pet.age} an{pet.age > 1 ? 's' : ''}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card pink">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{activeBookings.length}</h3>
              <p>Réservations actives</p>
            </div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">🐾</div>
            <div className="stat-info">
              <h3>{user?.pets?.length || 0}</h3>
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
            {activeBookings.length > 0 ? (
              activeBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-left">
                    <div className="booking-avatar">
                      {booking.pets && booking.pets.length > 0 ? booking.pets[0].avatar : '🐾'}
                    </div>
                    <div className="booking-info">
                      <h4>{booking.pets && booking.pets.length > 0 ? booking.pets[0].name : 'Animal'}</h4>
                      <p>Gardien: {booking.sitterName}</p>
                      <p className="booking-date">
                        📆 {new Date(booking.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(booking.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                  <div className="booking-right">
                    <span className={`status-badge ${booking.status === 'confirmed' ? 'confirmed' : 'pending'}`}>
                      {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                    <button 
                      className="btn-ghost btn-sm" 
                      onClick={() => handleViewBookingDetails(booking.id)}
                    >
                      Détails
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Vous n'avez aucune réservation active.</p>
                <button className="btn-primary" onClick={() => onNavigate("sitters")}>
                  Trouver un sitter
                </button>
              </div>
            )}
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
                <div className="sitter-actions">
                  <button 
                    className="btn-primary btn-sm" 
                    onClick={() => handleViewSitterProfile(sitter.id)}
                  >
                    Voir le profil
                  </button>
                  <button 
                    className="btn-ghost btn-sm"
                    onClick={() => handleContactSitter(sitter.id)}
                  >
                    💬 Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}