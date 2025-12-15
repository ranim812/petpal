import { useState, useEffect } from 'react';
import localStorageService from './localStorageService';

export default function BookingRequest({ 
  onNavigate, 
  sitterId, 
  user, 
  bookings, 
  setBookings, 
  bookingData 
}) {
  const [sitter, setSitter] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00',
    serviceType: 'overnight',
    specialNeeds: '',
    additionalInfo: ''
  });

  // Liste de sitters fictifs (identique à celle dans SitterProfile)
    const mockSitters = [
    {
      id: "1",
      name: "Marie Dubois",
      avatar: "👩",
      rating: 4.9,
      reviews: 48,
      distance: 1.2,
      price: 25,
      availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
      petTypes: ["Chiens", "Chats"],
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 25, unit: 'nuit' },
        { id: 'daycare', name: 'Garderie de jour', price: 20, unit: 'jour' },
        { id: 'visit', name: 'Visite à domicile', price: 15, unit: 'visite' },
        { id: 'walk', name: 'Promenade', price: 12, unit: 'promenade' }
      ],
      description: "Passionnée par les animaux, j'ai 5 ans d'expérience en pet sitting. Je suis formée aux premiers secours animaliers et j'offre un environnement sécurisé et aimant pour vos compagnons.",
      verified: true,
      joinedDate: "Janvier 2020",
      responseTime: "1 heure",
      address: "15 Rue des Fleurs, Paris 75001",
      reviewsList: [
        { 
          id: 1, 
          author: "Jean Dupont", 
          avatar: "👨", 
          rating: 5, 
          comment: "Marie a pris soin de mon labrador Max pendant une semaine. Elle a envoyé des photos quotidiennes et Max était très heureux à son retour.", 
          date: "15/10/2023",
          pet: "Max (Chien)"
        }
      ]
    },
    {
      id: "2",
      name: "Lucas Martin",
      avatar: "👨",
      rating: 4.8,
      reviews: 35,
      distance: 2.5,
      price: 30,
      availability: ["Lun", "Mer", "Ven", "Sam", "Dim"],
      petTypes: ["Chiens", "Oiseaux"],
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 30, unit: 'nuit' },
        { id: 'daycare', name: 'Garderie de jour', price: 22, unit: 'jour' },
        { id: 'visit', name: 'Visite à domicile', price: 18, unit: 'visite' },
        { id: 'walk', name: 'Promenade', price: 15, unit: 'promenade' }
      ],
      description: "Amoureux des animaux depuis mon enfance, je propose des services de garde pour chiens et oiseaux. J'ai une grande maison avec un jardin clôturé, parfait pour les grands chiens.",
      verified: true,
      joinedDate: "Mars 2021",
      responseTime: "2 heures",
      address: "8 Avenue des Arbres, Paris 75002",
      reviewsList: [
        { 
          id: 1, 
          author: "Claire Durand", 
          avatar: "👩", 
          rating: 5, 
          comment: "Lucas a pris soin de mon golden retriever pendant 10 jours. Il a été formidable et a envoyé des vidéos quotidiennes.", 
          date: "05/11/2023",
          pet: "Buddy (Chien)"
        }
      ]
    },
    {
      id: "3",
      name: "Sophie Laurent",
      avatar: "👩‍🦰",
      rating: 5.0,
      reviews: 62,
      distance: 0.8,
      price: 28,
      availability: ["Mar", "Jeu", "Sam", "Dim"],
      petTypes: ["Chiens", "Chats", "Lapins"],
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 28, unit: 'nuit' },
        { id: 'daycare', name: 'Garderie de jour', price: 24, unit: 'jour' },
        { id: 'visit', name: 'Visite à domicile', price: 20, unit: 'visite' },
        { id: 'walk', name: 'Promenade', price: 14, unit: 'promenade' }
      ],
      description: "Vétérinaire de formation, j'ai décidé de me consacrer entièrement au pet sitting. J'ai une grande expérience avec tous types d'animaux domestiques.",
      verified: true,
      joinedDate: "Juin 2019",
      responseTime: "30 minutes",
      address: "22 Boulevard des Animaux, Paris 75003",
      reviewsList: [
        { 
          id: 1, 
          author: "Emma Bernard", 
          avatar: "👩", 
          rating: 5, 
          comment: "Sophie a pris soin de mes trois chats pendant mes vacances. Elle est incroyable avec les animaux !", 
          date: "12/11/2023",
          pet: "Mimi, Fifi & Roux (Chats)"
        }
      ]
    },
    {
      id: "4",
      name: "Thomas Petit",
      avatar: "👨‍💼",
      rating: 4.7,
      reviews: 29,
      distance: 3.1,
      price: 22,
      availability: ["Lun", "Mar", "Jeu", "Sam"],
      petTypes: ["Chiens"],
      services: [
        { id: 'visit', name: 'Garde à domicile', price: 16, unit: 'visite' },
        { id: 'walk', name: 'Promenades', price: 10, unit: 'promenade' }
      ],
      description: "Passionné par les chiens, je propose des services de garde et de promenade. J'ai une expérience particulière avec les chiens de grande taille.",
      verified: false,
      joinedDate: "Octobre 2021",
      responseTime: "3 heures",
      address: "5 Rue des Pins, Paris 75004",
      reviewsList: [
        { 
          id: 1, 
          author: "François Dubois", 
          avatar: "👨", 
          rating: 4, 
          comment: "Thomas a promené mon berger allemand tous les jours pendant une semaine. Très satisfait.", 
          date: "20/11/2023",
          pet: "Max (Chien)"
        }
      ]
    },
    {
      id: "5",
      name: "Emma Bernard",
      avatar: "👩‍🦰",
      rating: 4.9,
      reviews: 41,
      distance: 1.8,
      price: 26,
      availability: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      petTypes: ["Chiens", "Chats", "Rongeurs"],
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 26, unit: 'nuit' },
        { id: 'daycare', name: 'Garderie de jour', price: 22, unit: 'jour' },
        { id: 'visit', name: 'Garde à domicile', price: 18, unit: 'visite' },
        { id: 'special', name: 'Soins spéciaux', price: 20, unit: 'visite' }
      ],
      description: "Éleveuse professionnelle, j'ai une grande expérience avec les chiens, chats et rongeurs. Mon logement est entièrement adapté pour accueillir différentes espèces.",
      verified: true,
      joinedDate: "Février 2020",
      responseTime: "1 heure",
      address: "12 Avenue des Petits Animaux, Paris 75005",
      reviewsList: [
        { 
          id: 1, 
          author: "Julie Martin", 
          avatar: "👩", 
          rating: 5, 
          comment: "Emma a pris soin de mes deux lapins et mon chat pendant 10 jours. Service exceptionnel !", 
          date: "18/11/2023",
          pet: "Luna, Pipo & Minou (Lapins, Chat)"
        }
      ]
    },
    {
      id: "6",
      name: "Antoine Lefebvre",
      avatar: "👨",
      rating: 4.6,
      reviews: 33,
      distance: 4.2,
      price: 20,
      availability: ["Mar", "Jeu", "Sam", "Dim"],
      petTypes: ["Chats", "Oiseaux"],
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 20, unit: 'nuit' },
        { id: 'visit', name: 'Garde à domicile', price: 14, unit: 'visite' }
      ],
      description: "Spécialiste des chats et oiseaux, j'aménagé mon espace pour accueillir ces animaux dans des conditions optimales.",
      verified: false,
      joinedDate: "Juillet 2022",
      responseTime: "4 heures",
      address: "9 Chemin des Oiseaux, Paris 75006",
      reviewsList: [
        { 
          id: 1, 
          author: "Sophie Durand", 
          avatar: "👩", 
          rating: 4, 
          comment: "Antoine a gardé mon perroquet pendant une semaine. Très bon service malgré un temps de réponse un peu long.", 
          date: "10/11/2023",
          pet: "Rio (Perroquet)"
        }
      ]
    }
  ];

  // Charger les données du sitter en fonction de l'ID
  useEffect(() => {
    console.log("Recherche du sitter avec ID:", sitterId);
    console.log("Type de l'ID:", typeof sitterId);
    
    // Vérifier si l'ID est valide
    if (!sitterId) {
      console.error("ID de sitter non fourni");
      setSitter(mockSitters[0]); // Utiliser le premier sitter par défaut
      return;
    }
    
    // Trouver le sitter correspondant à l'ID
    const foundSitter = mockSitters.find(s => s.id === sitterId.toString());
    console.log("Sitter trouvé:", foundSitter);
    
    if (foundSitter) {
      setSitter(foundSitter);
      
      // Définir le serviceType par défaut en fonction des services disponibles
      if (foundSitter.services.length > 0) {
        setBookingInfo(prev => ({
          ...prev,
          serviceType: foundSitter.services[0].id
        }));
      }
    } else {
      console.warn("Aucun sitter trouvé avec l'ID:", sitterId);
      setSitter(mockSitters[0]); // Utiliser le premier sitter par défaut
    }
  }, [sitterId]);

  // Charger les animaux de l'utilisateur depuis localStorage
  useEffect(() => {
    if (user && user.pets) {
      setUserPets(user.pets);
    } else {
      // Récupérer l'utilisateur depuis localStorage si non fourni
      const userData = LocalStorageService.loadUser();
      if (userData && userData.pets) {
        setUserPets(userData.pets);
      } else {
        // Données fictives si l'utilisateur n'a pas d'animaux
        const mockUserPets = [
          { id: 1, name: 'Max', type: 'Chien', breed: 'Labrador', age: 3, avatar: '🐕' },
          { id: 2, name: 'Luna', type: 'Chat', breed: 'Siamois', age: 2, avatar: '🐱' },
          { id: 3, name: 'Rocky', type: 'Chien', breed: 'Bulldog', age: 5, avatar: '🐕‍🦺' }
        ];
        setUserPets(mockUserPets);
      }
    }
  }, [user]);

  // Pré-remplir le formulaire avec les données de réservation si elles sont fournies
  useEffect(() => {
    if (bookingData) {
      setBookingInfo(prev => ({
        ...prev,
        startDate: bookingData.startDate || '',
        endDate: bookingData.endDate || ''
      }));
      
      if (bookingData.petId) {
        setSelectedPets([bookingData.petId]);
      }
    }
  }, [bookingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePetSelection = (petId) => {
    setSelectedPets(prev => {
      if (prev.includes(petId)) {
        return prev.filter(id => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!sitter || !bookingInfo.startDate || !bookingInfo.endDate) return 0;
    
    const service = sitter.services.find(s => s.id === bookingInfo.serviceType);
    if (!service) return 0;
    
    const start = new Date(bookingInfo.startDate);
    const end = new Date(bookingInfo.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return service.price * diffDays;
  };

  const submitBookingRequest = (e) => {
    e.preventDefault();
    
    // Vérifier que l'utilisateur est connecté
    if (!user || !user.id) {
      alert('Vous devez être connecté pour effectuer une réservation');
      onNavigate('login');
      return;
    }
    
    // Valider les champs
    if (!bookingInfo.startDate || !bookingInfo.endDate || selectedPets.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Créer une nouvelle réservation
    const newBooking = {
      id: Date.now(),
      sitterId: sitterId,
      sitterName: sitter.name,
      userId: user.id,
      userName: user.name,
      pets: selectedPets.map(id => userPets.find(pet => pet.id === id)),
      ...bookingInfo,
      status: 'pending', // pending, confirmed, cancelled
      createdAt: new Date().toISOString()
    };
    
    // Mettre à jour l'état des réservations
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    // Sauvegarder explicitement dans localStorage
    LocalStorageService.saveBookings(updatedBookings);
    
    // Sauvegarder les modifications
    console.log('Demande de réservation envoyée:', newBooking);
    
    alert('Demande de réservation envoyée avec succès!');
    
    // Rediriger vers le dashboard approprié
    const dashboardView = user.type === 'owner' ? 'owner' : 'sitter';
    console.log("Redirection vers le dashboard:", dashboardView);
    onNavigate(dashboardView);
  };

  if (!sitter) {
    return <div className="loading-container">Chargement...</div>;
  }

  return (
    <div className="booking-request-container">
      {/* Header */}
      <div className="booking-request-header">
        <div className="container booking-request-header-inner">
          <button className="back-button" onClick={() => onNavigate(`sitterprofile/${sitter.id}`)}>
            ← Retour
          </button>
          <h1 className="booking-request-title">Demande de réservation</h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-form-container">
          {/* Sitter Info */}
          <div className="sitter-summary">
            <div className="sitter-avatar">{sitter.avatar}</div>
            <div className="sitter-info">
              <h2>{sitter.name}</h2>
              <div className="sitter-rating">⭐ {sitter.rating}</div>
            </div>
          </div>

          <form onSubmit={submitBookingRequest} className="booking-form">
            {/* Service Selection */}
            <div className="form-section">
              <h3>Type de service</h3>
              <div className="service-options">
                {sitter.services.map(service => (
                  <div 
                    key={service.id}
                    className={`service-option ${bookingInfo.serviceType === service.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'serviceType', value: service.id } })}
                  >
                    <div className="service-name">{service.name}</div>
                    <div className="service-price">{service.price}€/{service.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="form-section">
              <h3>Dates</h3>
              <div className="date-inputs">
                <div className="date-input-group">
                  <label>Date de début</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingInfo.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="date-input-group">
                  <label>Date de fin</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingInfo.endDate}
                    onChange={handleInputChange}
                    min={bookingInfo.startDate}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Times */}
            <div className="form-section">
              <h3>Heures</h3>
              <div className="time-inputs">
                <div className="time-input-group">
                  <label>Heure de début</label>
                  <input
                    type="time"
                    name="startTime"
                    value={bookingInfo.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="time-input-group">
                  <label>Heure de fin</label>
                  <input
                    type="time"
                    name="endTime"
                    value={bookingInfo.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Pet Selection */}
            <div className="form-section">
              <h3>Sélectionnez vos animaux</h3>
              <div className="pets-selection">
                {userPets.map(pet => (
                  <div 
                    key={pet.id}
                    className={`pet-card ${selectedPets.includes(pet.id) ? 'selected' : ''}`}
                    onClick={() => togglePetSelection(pet.id)}
                  >
                    <div className="pet-avatar">{pet.avatar}</div>
                    <div className="pet-info">
                      <div className="pet-name">{pet.name}</div>
                      <div className="pet-details">{pet.type} • {pet.breed} • {pet.age} ans</div>
                    </div>
                    <div className="pet-selection-indicator">
                      {selectedPets.includes(pet.id) ? '✓' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Needs */}
            <div className="form-section">
              <h3>Besoins spéciaux</h3>
              <textarea
                name="specialNeeds"
                value={bookingInfo.specialNeeds}
                onChange={handleInputChange}
                placeholder="Médicaments, régime alimentaire, problèmes de santé, etc."
                rows={3}
              />
            </div>

            {/* Additional Info */}
            <div className="form-section">
              <h3>Informations complémentaires</h3>
              <textarea
                name="additionalInfo"
                value={bookingInfo.additionalInfo}
                onChange={handleInputChange}
                placeholder="Toute information utile pour le sitter"
                rows={3}
              />
            </div>

            {/* Summary */}
            <div className="booking-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-item">
                <span>Sitter:</span>
                <span>{sitter.name}</span>
              </div>
              <div className="summary-item">
                <span>Service:</span>
                <span>
                  {sitter.services.find(s => s.id === bookingInfo.serviceType)?.name}
                </span>
              </div>
              <div className="summary-item">
                <span>Dates:</span>
                <span>
                  {bookingInfo.startDate && bookingInfo.endDate 
                    ? `${bookingInfo.startDate} - ${bookingInfo.endDate}` 
                    : 'Non spécifiées'}
                </span>
              </div>
              <div className="summary-item">
                <span>Animaux:</span>
                <span>
                  {selectedPets.length > 0 
                    ? selectedPets.map(id => userPets.find(p => p.id === id)?.name).join(', ')
                    : 'Aucun sélectionné'}
                </span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>{calculateTotalPrice()}€</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="btn-primary submit-button"
              disabled={!bookingInfo.startDate || !bookingInfo.endDate || selectedPets.length === 0}
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .booking-request-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .booking-request-header {
          margin-bottom: 30px;
        }
        
        .booking-request-header-inner {
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
        
        .booking-request-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .booking-form-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .sitter-summary {
          display: flex;
          align-items: center;
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          margin-bottom: 25px;
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
        
        .sitter-info h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }
        
        .sitter-rating {
          color: #FFD700;
        }
        
        .booking-form {
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
        }
        
        .form-section {
          margin-bottom: 30px;
        }
        
        .form-section h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 15px 0;
          color: #333;
        }
        
        .service-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .service-option {
          border: 2px solid #eee;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .service-option:hover {
          border-color: rgba(181, 123, 255, 0.5);
        }
        
        .service-option.selected {
          border-color: var(--accent1);
          background: rgba(181, 123, 255, 0.05);
        }
        
        .service-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .service-price {
          color: var(--accent1);
          font-weight: 700;
        }
        
        .date-inputs, .time-inputs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .date-input-group, .time-input-group {
          display: flex;
          flex-direction: column;
        }
        
        .date-input-group label, .time-input-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        
        .date-input-group input, .time-input-group input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .pets-selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        
        .pet-card {
          border: 2px solid #eee;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .pet-card:hover {
          border-color: rgba(181, 123, 255, 0.5);
        }
        
        .pet-card.selected {
          border-color: var(--accent1);
          background: rgba(181, 123, 255, 0.05);
        }
        
        .pet-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 10px;
        }
        
        .pet-info {
          flex-grow: 1;
        }
        
        .pet-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .pet-details {
          font-size: 12px;
          color: #666;
        }
        
        .pet-selection-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        
        .pet-card:not(.selected) .pet-selection-indicator {
          background: #eee;
          color: transparent;
        }
        
        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          resize: vertical;
          font-family: inherit;
        }
        
        .booking-summary {
          background: rgba(181, 123, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .booking-summary h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 15px 0;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .summary-item.total {
          font-weight: 700;
          font-size: 18px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        
        .submit-button {
          width: 100%;
          padding: 15px;
          font-size: 16px;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          font-size: 18px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .service-options {
            grid-template-columns: 1fr;
          }
          
          .date-inputs, .time-inputs {
            grid-template-columns: 1fr;
          }
          
          .pets-selection {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}