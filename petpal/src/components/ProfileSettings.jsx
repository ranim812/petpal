import React, { useState } from 'react';

const ProfileSettings = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    bookings: true,
    messages: true,
    promotions: false
  });

  const ToggleSwitch = ({ checked, onChange }) => (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        className="toggle-input" 
      />
      <span className="toggle-slider"></span>
    </label>
  );

  return (
    <div className="profile-settings-container">
      {/* Header */}
      <div className="profile-header">
        <div className="container profile-header-inner">
          <button className="back-button" onClick={() => onNavigate('home')}>
            ← Retour
          </button>
          <h1 className="profile-title">Mon Profil</h1>
          <button className="save-button">
            💾 Sauvegarder
          </button>
        </div>
      </div>

      <div className="container profile-content">
        {/* Profile Photo */}
        <div className="profile-photo-section">
          <div className="profile-photo-container">
            <div className="profile-photo">
              👤
            </div>
            <button className="photo-edit-button">
              📷
            </button>
          </div>
          <button className="change-photo-text">Changer la photo</button>
        </div>

        {/* Personal Information */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">👤</span>
            <h2>Informations Personnelles</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input 
              type="text" 
              defaultValue="Marie" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nom</label>
            <input 
              type="text" 
              defaultValue="Durand" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <div className="input-with-badge">
              <input 
                type="email" 
                defaultValue="marie@email.com" 
                className="form-input"
              />
              <span className="verified-badge">✓ Vérifié</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Numéro de téléphone</label>
            <input 
              type="tel" 
              defaultValue="+216 XX XXX XXX" 
              className="form-input"
            />
          </div>
        </div>

        {/* Security */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🔒</span>
            <h2>Sécurité</h2>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-title">Mot de passe</p>
              <p className="setting-description">••••••••••••</p>
            </div>
            <button className="setting-action">Modifier →</button>
          </div>

          <div className="setting-item with-border">
            <div className="setting-info">
              <p className="setting-title">Authentification à deux facteurs</p>
              <p className="setting-description">Sécurité renforcée</p>
            </div>
            <ToggleSwitch 
              checked={false} 
              onChange={() => {}} 
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🌐</span>
            <h2>Préférences</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">Langue 🌐</label>
            <select className="form-input">
              <option>Français</option>
              <option>English</option>
              <option>العربية</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Devise 💰</label>
            <select className="form-input">
              <option>EUR (€)</option>
              <option>USD ($)</option>
              <option>TND (د.ت)</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🔔</span>
            <h2>Notifications</h2>
          </div>
          
          {Object.entries({
            email: 'Notifications par email',
            push: 'Notifications push',
            sms: 'Notifications SMS',
            bookings: 'Confirmations de réservation',
            messages: 'Messages',
            promotions: 'Promotions et actualités'
          }).map(([key, label]) => (
            <div key={key} className="setting-item">
              <span className="notification-label">{label}</span>
              <ToggleSwitch 
                checked={notifications[key]}
                onChange={() => setNotifications({...notifications, [key]: !notifications[key]})}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="actions-section">
          <button className="btn-logout">
            <span className="btn-icon">🚪</span>
            Se déconnecter
          </button>
          
          <button className="btn-delete">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;