import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Signup({ onNavigate }) {
  const [userType, setUserType] = useState("owner"); // "owner" or "sitter"

  return (
    <div className="page-container">
      <div className="auth-card">

        <div className="avatar-floating">🐾</div>

        <h2>Créer un compte</h2>

        {/* User Type Selection */}
        <div className="user-type-selection">
          <div 
            className={`user-type-option ${userType === 'owner' ? 'active' : ''}`}
            onClick={() => setUserType('owner')}
          >
            <div className="user-type-icon">👤</div>
            <span>Propriétaire</span>
            <p className="user-type-description">Je cherche un pet sitter</p>
          </div>
          <div 
            className={`user-type-option ${userType === 'sitter' ? 'active' : ''}`}
            onClick={() => setUserType('sitter')}
          >
            <div className="user-type-icon">🐾</div>
            <span>Pet Sitter</span>
            <p className="user-type-description">Je garde des animaux</p>
          </div>
        </div>

        <Form>
          <div className="form-row">
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Nom" />
          </div>

          <input type="email" placeholder="Adresse e-mail" />
          <input type="tel" placeholder="Numéro de téléphone" />
          <input type="password" placeholder="Mot de passe" />

          <Button 
            className="btn-primary mt-3"
            onClick={() => onNavigate(userType)} // Navigate to respective dashboard
          >
            S'inscrire
          </Button>
        </Form>

        <p className="text-center mt-3">
          Déjà inscrit ?{" "}
          <span className="link" onClick={() => onNavigate("login")}>
            Connexion
          </span>
        </p>
      </div>
    </div>
  );
}