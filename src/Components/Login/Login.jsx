import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye } from "react-icons/fa"; // Adicionei FaEye para o ícone de senha
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validação simples (substitua por API)
    if (username === "admin@exemplo.com" && password === "123") {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      navigate("/dashboard");
    } else {
      setError("E-mail ou senha inválidos!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="banner">
        {/* Banner com imagem de fundo, texto e tom roxo */}
        <div className="banner-content">
          <h2>Bem-vindo de volta!</h2>
          <p>Faça login para acessar o painel de controle</p>
        </div>
      </div>
      <div className="form-container">
        <div className="login-wrapper">
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <input
                type="email"
                placeholder="E-mail"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye
                className="icon eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="recall-forget">
              <label>
                <input type="checkbox" />
                Lembrar de mim
              </label>
              <a href="#">Esqueceu sua senha?</a>
            </div>
            <button type="submit">Entrar</button>
            <div className="signup-link">
              <p>
                Não tem uma conta? <a href="#">Registrar</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;