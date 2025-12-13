import { useState, useEffect } from "react";

export default function BookingsList({ onNavigate, user, bookings, setBookings }) {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filtrer les réservations selon l'onglet actif
  const currentBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedBooking(null);
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      );
      setBookings(updatedBookings);
      closeDetails();
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="bookings-list-container">
      {/* Header */}
      <div className="bookings-header">
        <div className="container bookings-header-inner">
          <button className="back-button" onClick={() => onNavigate("owner")}>
            ← Retour
          </button>
          <h1 className="bookings-title">Mes réservations</h1>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-value">{currentBookings.length}</div>
            <div className="stat-label">Réservations actives</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{user?.pets?.length || 0}</div>
            <div className="stat-label">Animaux enregistrés</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">Avis laissés</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bookings-tabs">
          <button 
            className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Réservations en cours
          </button>
          <button 
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Réservations passées
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list-section">
          <h2 className="section-title">
            {activeTab === 'current' ? 'Réservations en cours' : 'Réservations passées'}
          </h2>
          
          {activeTab === 'current' && currentBookings.length === 0 && (
            <div className="empty-state">
              <p>Vous n'avez aucune réservation en cours.</p>
              <button 
                className="btn-primary"
                onClick={() => onNavigate('sitters')}
              >
                Trouver un sitter
              </button>
            </div>
          )}
          
          {activeTab === 'past' && pastBookings.length === 0 && (
            <div className="empty-state">
              <p>Vous n'avez aucune réservation passée.</p>
            </div>
          )}
          
          <div className="bookings-list">
            {(activeTab === 'current' ? currentBookings : pastBookings).map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-pet-info">
                  <div className="pet-avatar">
                    {booking.pets && booking.pets.length > 0 ? booking.pets[0].avatar : '🐾'}
                  </div>
                  <div className="pet-details">
                    <div className="pet-name">
                      {booking.pets && booking.pets.length > 0 ? booking.pets[0].name : 'Animal'}
                    </div>
                    <div className="booking-dates">
                      {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                    </div>
                  </div>
                </div>
                
                <div className="booking-sitter-info">
                  <div className="sitter-name">{booking.sitterName}</div>
                  <div className={`booking-status ${getStatusClass(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </div>
                </div>
                
                <button 
                  className="btn-details"
                  onClick={() => viewBookingDetails(booking)}
                >
                  Détails
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="booking-details-modal">
          <div className="modal-overlay" onClick={closeDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Détails de la réservation</h2>
              <button className="close-button" onClick={closeDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Informations sur la réservation</h3>
                <div className="detail-row">
                  <span className="detail-label">Statut:</span>
                  <span className={`detail-value ${getStatusClass(selectedBooking.status)}`}>
                    {getStatusText(selectedBooking.status)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Service:</span>
                  <span className="detail-value">
                    {selectedBooking.serviceType === 'overnight' ? 'Garde chez le sitter' : 
                     selectedBooking.serviceType === 'daycare' ? 'Garderie de jour' :
                     selectedBooking.serviceType === 'visit' ? 'Visite à domicile' :
                     selectedBooking.serviceType === 'walk' ? 'Promenade' : selectedBooking.serviceType}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Dates:</span>
                  <span className="detail-value">
                    {new Date(selectedBooking.startDate).toLocaleDateString('fr-FR')} - {new Date(selectedBooking.endDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Heures:</span>
                  <span className="detail-value">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </span>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Sitter</h3>
                <div className="sitter-detail-info">
                  <div className="sitter-avatar">{selectedBooking.sitterName.charAt(0)}</div>
                  <div className="sitter-detail-name">{selectedBooking.sitterName}</div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Animaux</h3>
                <div className="pets-detail-list">
                  {selectedBooking.pets && selectedBooking.pets.map(pet => (
                    <div key={pet.id} className="pet-detail-item">
                      <div className="pet-detail-avatar">{pet.avatar}</div>
                      <div className="pet-detail-info">
                        <div className="pet-detail-name">{pet.name}</div>
                        <div className="pet-detail-type">{pet.type} • {pet.breed}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedBooking.specialNeeds && (
                <div className="detail-section">
                  <h3>Besoins spéciaux</h3>
                  <p className="detail-text">{selectedBooking.specialNeeds}</p>
                </div>
              )}
              
              {selectedBooking.additionalInfo && (
                <div className="detail-section">
                  <h3>Informations complémentaires</h3>
                  <p className="detail-text">{selectedBooking.additionalInfo}</p>
                </div>
              )}
              
              <div className="detail-section">
                <h3>Prix</h3>
                <div className="price-detail">
                  <div className="price-row">
                    <span>Prix par nuit:</span>
                    <span>{selectedBooking.sitterPrice || 25}€</span>
                  </div>
                  <div className="price-row">
                    <span>Nombre de nuits:</span>
                    <span>
                      {Math.ceil((new Date(selectedBooking.endDate) - new Date(selectedBooking.startDate)) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="price-row total">
                    <span>Total:</span>
                    <span>
                      {Math.ceil((new Date(selectedBooking.endDate) - new Date(selectedBooking.startDate)) / (1000 * 60 * 60 * 24)) * (selectedBooking.sitterPrice || 25)}€
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                <button 
                  className="btn-cancel"
                  onClick={() => cancelBooking(selectedBooking.id)}
                >
                  Annuler la réservation
                </button>
              )}
              <button className="btn-primary" onClick={closeDetails}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bookings-list-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .bookings-header {
          margin-bottom: 30px;
        }
        
        .bookings-header-inner {
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
        }
        
        .bookings-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          text-align: center;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--accent1);
          margin-bottom: 5px;
        }
        
        .stat-label {
          color: #666;
        }
        
        .bookings-tabs {
          display: flex;
          border-bottom: 1px solid #eee;
          margin-bottom: 25px;
        }
        
        .tab-button {
          background: none;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          position: relative;
        }
        
        .tab-button.active {
          color: var(--accent1);
        }
        
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent1);
        }
        
        .bookings-list-section {
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 20px 0;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 0;
          color: #666;
        }
        
        .empty-state p {
          margin-bottom: 20px;
        }
        
        .bookings-list {
          display: grid;
          gap: 15px;
        }
        
        .booking-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #eee;
        }
        
        .booking-pet-info {
          display: flex;
          align-items: center;
          flex-grow: 1;
        }
        
        .pet-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .pet-details {
          display: flex;
          flex-direction: column;
        }
        
        .pet-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .booking-dates {
          color: #666;
          font-size: 14px;
        }
        
        .booking-sitter-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-right: 15px;
        }
        
        .sitter-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .booking-status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-confirmed {
          background: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
        }
        
        .status-pending {
          background: rgba(255, 152, 0, 0.1);
          color: #FF9800;
        }
        
        .status-cancelled {
          background: rgba(244, 67, 54, 0.1);
          color: #F44336;
        }
        
        .status-completed {
          background: rgba(33, 150, 243, 0.1);
          color: #2196F3;
        }
        
        .btn-details {
          background: none;
          border: 1px solid var(--accent1);
          color: var(--accent1);
          border-radius: 6px;
          padding: 8px 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-details:hover {
          background: rgba(181, 123, 255, 0.1);
        }
        
        .booking-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
          position: relative;
          background: white;
          border-radius: var(--radius);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .detail-section {
          margin-bottom: 25px;
        }
        
        .detail-section h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 15px 0;
          color: #333;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .detail-label {
          color: #666;
        }
        
        .detail-value {
          font-weight: 600;
        }
        
        .sitter-detail-info {
          display: flex;
          align-items: center;
        }
        
        .sitter-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .sitter-detail-name {
          font-weight: 600;
        }
        
        .pets-detail-list {
          display: grid;
          gap: 15px;
        }
        
        .pet-detail-item {
          display: flex;
          align-items: center;
        }
        
        .pet-detail-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .pet-detail-info {
          display: flex;
          flex-direction: column;
        }
        
        .pet-detail-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .pet-detail-type {
          color: #666;
          font-size: 14px;
        }
        
        .detail-text {
          color: #555;
          line-height: 1.5;
          margin: 0;
        }
        
        .price-detail {
          background: rgba(181, 123, 255, 0.05);
          border-radius: 8px;
          padding: 15px;
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .price-row.total {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
          font-weight: 700;
          font-size: 18px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .btn-cancel {
          background: none;
          border: 1px solid #F44336;
          color: #F44336;
          border-radius: 6px;
          padding: 10px 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-cancel:hover {
          background: rgba(244, 67, 54, 0.1);
        }
        
        @media (max-width: 768px) {
          .stats-cards {
            grid-template-columns: 1fr;
          }
          
          .booking-card {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .booking-sitter-info {
            align-items: flex-start;
            margin: 10px 0;
          }
          
          .btn-details {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}