import { useState } from 'react';
import localStorageService from './localStorageService';

export default function Signup({ onNavigate, onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'owner',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Créer l'objet utilisateur
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      userType: formData.userType,
      pets: [],
      createdAt: new Date().toISOString()
    };

    // Sauvegarder l'utilisateur
    const users = LocalStorageService.loadUsers();
    users.push(newUser);
    LocalStorageService.saveUsers(users);

    // Connexion automatique
    onLogin(newUser, formData.userType);
    onNavigate(formData.userType);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez la communauté PetPal</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Type d'utilisateur */}
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'owner' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: 'owner' }))}
            >
              <span className="type-icon">👤</span>
              <span className="type-label">Propriétaire</span>
            </button>
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'sitter' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: 'sitter' }))}
            >
              <span className="type-icon">🐾</span>
              <span className="type-label">Pet Sitter</span>
            </button>
          </div>

          {/* Grille de formulaire à 2 colonnes */}
          <div className="form-grid">
            {/* Nom complet */}
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Jean Dupont"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="jean@exemple.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Téléphone */}
            <div className="form-group">
              <label htmlFor="phone">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="06 12 34 56 78"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* Adresse */}
            <div className="form-group">
              <label htmlFor="address">Adresse *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="15 Rue de la Paix, Paris"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <label htmlFor="password">Mot de passe *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="••••••••"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirmer mot de passe */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Boutons */}
          <button type="submit" className="btn-primary btn-full">
            Créer mon compte
          </button>

          <div className="signup-footer">
            <p>Déjà inscrit ?</p>
            <button
              type="button"
              className="btn-link"
              onClick={() => onNavigate('login')}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .signup-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .signup-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 700px;
          padding: 40px;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .signup-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .signup-header p {
          color: #718096;
          margin: 0;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .user-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 8px;
        }

        .user-type-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-type-btn:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
        }

        .user-type-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
        }

        .type-icon {
          font-size: 32px;
        }

        .type-label {
          font-weight: 600;
          font-size: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-weight: 600;
          color: #2d3748;
          font-size: 14px;
        }

        .form-group input {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input.error {
          border-color: #fc8181;
        }

        .error-message {
          color: #e53e3e;
          font-size: 12px;
          margin-top: -2px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-full {
          width: 100%;
        }

        .signup-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }

        .signup-footer p {
          margin: 0;
          color: #718096;
          font-size: 14px;
        }

        .btn-link {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
        }

        .btn-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .signup-card {
            padding: 24px;
          }

          .signup-header h1 {
            font-size: 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .user-type-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}