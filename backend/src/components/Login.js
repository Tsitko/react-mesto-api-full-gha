import React from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
    if (props.isSuccess) {
      navigate("/", { replace: true });
    }
  }

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleEmailChange}
            className="auth__form-input"
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email || ""}
            autoComplete="off"
          ></input>
          <input
            onChange={handlePasswordChange}
            className="auth__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            value={password || ""}
            autoComplete="off"
          ></input>

          <button className="auth__form-submit-btn" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
