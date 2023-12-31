import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
    if (props.isSuccess) {
      navigate("/sign-in", { replace: true });
    }
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={email || ""}
          onChange={handleEmailChange}
          autoComplete="off"
        ></input>
        <input
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={password || ""}
          onChange={handlePasswordChange}
          autoComplete="off"
        ></input>

        <button
          className="auth__form-submit-btn auth__form-submit-btn_reg"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup_text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__signup_link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
