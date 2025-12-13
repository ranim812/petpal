// src/services/localStorageService.js

const STORAGE_KEYS = {
  USER: 'petpal_user',
  AUTH: 'petpal_auth',
  BOOKINGS: 'petpal_bookings',
  MESSAGES: 'petpal_messages',
  NOTIFICATIONS: 'petpal_notifications',
  SITTERS: 'petpal_sitters',
  PROFILE: 'petpal_profile',
  USERS: 'petpal_users'
};

class LocalStorageService {
  // Sauvegarder des données
  static save(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`✅ Données sauvegardées pour ${key}:`, data);
    } catch (error) {
      console.error(`❌ Erreur lors de la sauvegarde des données pour ${key}:`, error);
    }
  }

  // Charger des données
  static load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        console.log(`✅ Données chargées pour ${key}:`, parsed);
        return parsed;
      }
      console.log(`ℹ️ Aucune donnée trouvée pour ${key}, utilisation de la valeur par défaut`);
      return defaultValue;
    } catch (error) {
      console.error(`❌ Erreur lors du chargement des données pour ${key}:`, error);
      return defaultValue;
    }
  }

  // Supprimer des données
  static remove(key) {
    try {
      localStorage.removeItem(key);
      console.log(`✅ Données supprimées pour ${key}`);
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression des données pour ${key}:`, error);
    }
  }

  // Vider tout le stockage
  static clear() {
    try {
      localStorage.clear();
      console.log('✅ Stockage vidé complètement');
    } catch (error) {
      console.error('❌ Erreur lors du vidage du stockage:', error);
    }
  }

  // Sauvegarder l'utilisateur
  static saveUser(user) {
    this.save(STORAGE_KEYS.USER, user);
  }

  // Charger l'utilisateur
  static loadUser() {
    return this.load(STORAGE_KEYS.USER, null);
  }

  // Sauvegarder l'état d'authentification
  static saveAuth(authData) {
    this.save(STORAGE_KEYS.AUTH, authData);
  }

  // Charger l'état d'authentification
  static loadAuth() {
    return this.load(STORAGE_KEYS.AUTH, { isAuthenticated: false, userType: 'owner' });
  }

  // Sauvegarder les réservations - AMÉLIORATION
  static saveBookings(bookings) {
    if (!Array.isArray(bookings)) {
      console.error('❌ saveBookings: les données doivent être un tableau');
      return;
    }
    this.save(STORAGE_KEYS.BOOKINGS, bookings);
  }

  // Charger les réservations - AMÉLIORATION
  static loadBookings() {
    const bookings = this.load(STORAGE_KEYS.BOOKINGS, []);
    return Array.isArray(bookings) ? bookings : [];
  }

  // Sauvegarder les messages
  static saveMessages(messages) {
    this.save(STORAGE_KEYS.MESSAGES, messages);
  }

  // Charger les messages
  static loadMessages() {
    return this.load(STORAGE_KEYS.MESSAGES, []);
  }

  // Sauvegarder les notifications
  static saveNotifications(notifications) {
    this.save(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // Charger les notifications
  static loadNotifications() {
    return this.load(STORAGE_KEYS.NOTIFICATIONS, []);
  }

  // Sauvegarder les sitters
  static saveSitters(sitters) {
    this.save(STORAGE_KEYS.SITTERS, sitters);
  }

  // Charger les sitters
  static loadSitters() {
    return this.load(STORAGE_KEYS.SITTERS, []);
  }

  // Sauvegarder le profil
  static saveProfile(profile) {
    this.save(STORAGE_KEYS.PROFILE, profile);
  }

  // Charger le profil
  static loadProfile() {
    return this.load(STORAGE_KEYS.PROFILE, {});
  }

  // Sauvegarder tous les utilisateurs
  static saveUsers(users) {
    this.save(STORAGE_KEYS.USERS, users);
  }

  // Charger tous les utilisateurs
  static loadUsers() {
    return this.load(STORAGE_KEYS.USERS, []);
  }

  // Ajouter une réservation - AMÉLIORATION
  static addBooking(booking) {
    const allBookings = this.loadBookings();
    
    // S'assurer que l'ID est unique
    if (!booking.id) {
      booking.id = Date.now() + Math.random();
    }
    
    allBookings.push(booking);
    this.saveBookings(allBookings);
    console.log('✅ Réservation ajoutée:', booking);
    return booking;
  }

  // Récupérer les réservations d'un utilisateur - AMÉLIORATION
  static getBookingsForUser(userId) {
    const allBookings = this.loadBookings();
    const userBookings = allBookings.filter(booking => booking.userId === userId);
    console.log(`✅ ${userBookings.length} réservation(s) trouvée(s) pour l'utilisateur ${userId}`);
    return userBookings;
  }

  // Mettre à jour une réservation - AMÉLIORATION
  static updateBooking(bookingId, updatedData) {
    const allBookings = this.loadBookings();
    const index = allBookings.findIndex(b => b.id === bookingId);
    
    if (index !== -1) {
      allBookings[index] = { ...allBookings[index], ...updatedData };
      this.saveBookings(allBookings);
      console.log('✅ Réservation mise à jour:', allBookings[index]);
      return allBookings[index];
    } else {
      console.error(`❌ Réservation avec l'ID ${bookingId} non trouvée`);
      return null;
    }
  }

  // Supprimer une réservation - NOUVELLE FONCTION
  static deleteBooking(bookingId) {
    const allBookings = this.loadBookings();
    const filteredBookings = allBookings.filter(b => b.id !== bookingId);
    
    if (filteredBookings.length < allBookings.length) {
      this.saveBookings(filteredBookings);
      console.log(`✅ Réservation ${bookingId} supprimée`);
      return true;
    } else {
      console.error(`❌ Réservation avec l'ID ${bookingId} non trouvée`);
      return false;
    }
  }

  // Déconnexion - AMÉLIORATION
  static logout() {
    console.log('🚪 Déconnexion en cours...');
    this.remove(STORAGE_KEYS.USER);
    this.remove(STORAGE_KEYS.AUTH);
    // On garde les réservations, messages, etc. pour une prochaine connexion
    console.log('✅ Déconnexion terminée (réservations conservées)');
  }

  // Fonction utilitaire pour déboguer le stockage
  static debugStorage() {
    console.log('=== DEBUG LOCALSTORAGE ===');
    console.log('User:', this.loadUser());
    console.log('Auth:', this.loadAuth());
    console.log('Bookings:', this.loadBookings());
    console.log('Messages:', this.loadMessages());
    console.log('Notifications:', this.loadNotifications());
    console.log('=========================');
  }
}

export default LocalStorageService;