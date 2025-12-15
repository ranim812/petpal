import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import OwnerDashboard from "./components/OwnerDashboard";
import SitterDashboard from "./components/SitterDashboard";
import ProfileSettings from "./components/ProfileSettings";
import NotificationsCenter from "./components/NotificationsCenter";
import MessagesInterface from "./components/Messages";
import SitterSearch from "./components/SitterSearch";
import SitterProfile from "./components/SitterProfile";
import BookingRequest from "./components/BookingRequest";
import BookingList from "./components/BookingList";
import AddPet from "./components/AddPet";
import localStorageService from "./components/localStorageService";
import AuthService from "./components/AuthService";
import "./App.css";

import Header from "./components/Header";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Services from "./components/Services";

export default function App() {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("owner");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sitters, setSitters] = useState([]);
  const [profile, setProfile] = useState({});
  const [navigationParams, setNavigationParams] = useState({});

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    console.log('🚀 Initialisation de l\'application...');
    
    // Charger l'authentification
    const authData = localStorageService.loadAuth();
    setIsAuthenticated(authData.isAuthenticated);
    setUserType(authData.userType);
    
    // Charger l'utilisateur
    const userData = localStorageService.loadUser();
    setUser(userData);
    
    // Charger TOUTES les réservations (pas seulement celles de l'utilisateur)
    const allBookings = localStorageService.loadBookings();
    setBookings(allBookings);
    console.log(`📚 ${allBookings.length} réservation(s) chargée(s)`);
    
    // Charger les autres données
    setMessages(localStorageService.loadMessages());
    setNotifications(localStorageService.loadNotifications());
    setSitters(localStorageService.loadSitters());
    setProfile(localStorageService.loadProfile());
    
    // Debug
    localStorageService.debugStorage();
  }, []);

  // Sauvegarder l'authentification lorsqu'elle change
  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorageService.saveAuth({ isAuthenticated, userType });
    }
  }, [isAuthenticated, userType]);

  // Sauvegarder l'utilisateur lorsqu'il change
  useEffect(() => {
    if (user !== null) {
      localStorageService.saveUser(user);
    }
  }, [user]);

  // CRUCIAL: Sauvegarder les réservations à chaque modification
  useEffect(() => {
    if (bookings.length >= 0) {
      localStorageService.saveBookings(bookings);
      console.log(`💾 ${bookings.length} réservation(s) sauvegardée(s)`);
    }
  }, [bookings]);

  // Sauvegarder les messages
  useEffect(() => {
    if (messages.length >= 0) {
      localStorageService.saveMessages(messages);
    }
  }, [messages]);

  // Sauvegarder les notifications
  useEffect(() => {
    if (notifications.length >= 0) {
      localStorageService.saveNotifications(notifications);
    }
  }, [notifications]);

  // Sauvegarder les sitters
  useEffect(() => {
    if (sitters.length >= 0) {
      localStorageService.saveSitters(sitters);
    }
  }, [sitters]);

  // Sauvegarder le profil
  useEffect(() => {
    if (Object.keys(profile).length >= 0) {
      localStorageService.saveProfile(profile);
    }
  }, [profile]);

  const handleViewChange = (newView, params) => {
    console.log("🧭 Navigation vers:", newView, "avec params:", params);
    
    // Gérer les vues avec paramètres (ex: sitterprofile/1)
    if (typeof newView === 'string' && newView.includes('/')) {
      const [viewName, param] = newView.split('/');
      console.log("📍 Vue avec paramètres:", viewName, "ID:", param);
      setView({ name: viewName, param });
      if (params) {
        setNavigationParams(params);
      }
      return;
    }
    
    // Si navigation vers les tableaux de bord owner/sitter
    if (newView === "owner" || newView === "sitter") {
      setIsAuthenticated(true);
      setUserType(newView);
    }
    // Si navigation vers la page d'accueil depuis un état authentifié
    else if (newView === "home" && isAuthenticated) {
      handleLogout();
      return;
    }
    
    setView(newView);
    setNavigationParams(params || {});
  };

  const handleLogin = (userData, userType) => {
    console.log('🔐 Connexion de l\'utilisateur:', userData);
    
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userType);
    
    // Sauvegarder immédiatement
    localStorageService.saveUser(userData);
    localStorageService.saveAuth({ isAuthenticated: true, userType });
    
    // Charger les réservations de l'utilisateur
    const allBookings = localStorageService.loadBookings();
    setBookings(allBookings);
    
    console.log('✅ Connexion réussie');
  };

  const handleLogout = () => {
    console.log('🚪 Déconnexion...');
    
    setIsAuthenticated(false);
    setUserType("owner");
    setUser(null);
    
    // NE PAS vider les réservations, elles restent dans localStorage
    localStorageService.logout();
    
    setView("home");
    console.log('✅ Déconnexion réussie');
  };

  // Fonction pour mettre à jour les informations de l'utilisateur
  const updateUser = (updatedUserData) => {
    console.log('👤 Mise à jour de l\'utilisateur:', updatedUserData);
    
    setUser(updatedUserData);
    localStorageService.saveUser(updatedUserData);
    
    // Mettre aussi à jour dans la liste des utilisateurs
    const users = localStorageService.loadUsers();
    const updatedUsers = users.map(u => 
      u.id === updatedUserData.id ? updatedUserData : u
    );
    localStorageService.saveUsers(updatedUsers);
    
    console.log('✅ Utilisateur mis à jour');
  };

  // Fonction pour ajouter une réservation
  const addBooking = (newBooking) => {
    console.log('➕ Ajout d\'une nouvelle réservation:', newBooking);
    
    // S'assurer que la réservation a un ID unique
    if (!newBooking.id) {
      newBooking.id = Date.now() + Math.random();
    }
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    console.log('✅ Réservation ajoutée avec succès');
  };

  // Fonction pour mettre à jour une réservation
  const updateBooking = (bookingId, updatedData) => {
    console.log('📝 Mise à jour de la réservation:', bookingId, updatedData);
    
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, ...updatedData } : booking
    );
    setBookings(updatedBookings);
    
    console.log('✅ Réservation mise à jour');
  };

  // Rendu conditionnel basé sur la vue actuelle
  const renderView = () => {
    // Vues avec paramètres
    if (typeof view === 'object' && view.name) {
      switch (view.name) {
        case 'sitterprofile':
          return <SitterProfile onNavigate={handleViewChange} sitterId={view.param} />;
        case 'booking':
          return <BookingRequest 
            onNavigate={handleViewChange} 
            sitterId={view.param} 
            user={user}
            bookings={bookings}
            setBookings={setBookings}
            addBooking={addBooking}
            bookingData={navigationParams}
          />;
        case 'bookingdetails':
          return <BookingList 
            onNavigate={handleViewChange} 
            user={user}
            bookings={bookings}
            setBookings={setBookings}
            updateBooking={updateBooking}
            initialBookingId={view.param}
          />;
        default:
          return <Home onNavigate={handleViewChange} />;
      }
    }
    
    // Vues simples
    switch (view) {
      case "home":
        return <Home onNavigate={handleViewChange} />;
      case "login":
        return <Login onNavigate={handleViewChange} onLogin={handleLogin} />;
      case "signup":
        return <Signup onNavigate={handleViewChange} onLogin={handleLogin} />;
      case "owner":
        return <OwnerDashboard 
          onNavigate={handleViewChange} 
          user={user}
          bookings={bookings}
          updateUser={updateUser}
        />;
      case "sitter":
        return <SitterDashboard 
          onNavigate={handleViewChange} 
          user={user}
          bookings={bookings}
        />;
      case "profile":
        return <ProfileSettings 
          onNavigate={handleViewChange} 
          user={user}
          profile={profile}
          setProfile={setProfile}
          updateUser={updateUser}
        />;
      case "addpet":
        return <AddPet 
          onNavigate={handleViewChange} 
          user={user}
          updateUser={updateUser}
        />;
      case "bookings":
        return <BookingList 
          onNavigate={handleViewChange} 
          user={user}
          bookings={bookings}
          setBookings={setBookings}
          updateBooking={updateBooking}
        />;
      case "notifications":
        return (
          <NotificationsCenter 
            onNavigate={handleViewChange} 
            userType={userType}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case "messages":
        return (
          <MessagesInterface 
            onNavigate={handleViewChange} 
            userType={userType}
            messages={messages}
            setMessages={setMessages}
          />
        );
      case "services":
        return <Services onNavigate={handleViewChange} />;
      case "sitters":
        return <SitterSearch 
          onNavigate={handleViewChange} 
          sitters={sitters}
          setSitters={setSitters}
        />;
      default:
        return <Home onNavigate={handleViewChange} />;
    }
  };

  return (
    <>
      {/* En-tête conditionnel basé sur l'authentification */}
      {isAuthenticated ? (
        <AuthenticatedHeader 
          onNavigate={handleViewChange} 
          userType={userType} 
          onLogout={handleLogout}
        />
      ) : (
        <Header onNavigate={handleViewChange} />
      )}

      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        {renderView()}
      </Container>
    </>
  );
}