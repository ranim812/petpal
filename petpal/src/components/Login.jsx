import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Login({ onNavigate }) {
  const [userType, setUserType] = useState("owner"); // "owner" or "sitter"

  return (
    <div className="page-container">
      <div className="auth-card">

        <div className="avatar-floating">🔒</div>

        <h2>Connexion</h2>

        {/* User Type Selection */}
        <div className="user-type-selection">
          <div 
            className={`user-type-option ${userType === 'owner' ? 'active' : ''}`}
            onClick={() => setUserType('owner')}
          >
            <div className="user-type-icon">👤</div>
            <span>Propriétaire</span>
          </div>
          <div 
            className={`user-type-option ${userType === 'sitter' ? 'active' : ''}`}
            onClick={() => setUserType('sitter')}
          >
            <div className="user-type-icon">🐾</div>
            <span>Pet Sitter</span>
          </div>
        </div>

        <Form>
          <input type="email" placeholder="Adresse e-mail" />
          <input type="password" placeholder="Mot de passe" />

          <Button 
            className="btn-primary mt-3" 
            onClick={() => onNavigate(userType)} // Navigate to respective dashboard
          >
            Se connecter
          </Button>
        </Form>

        <p className="text-center mt-3">
          Pas encore de compte ?{" "}
          <span className="link" onClick={() => onNavigate("signup")}>
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
}