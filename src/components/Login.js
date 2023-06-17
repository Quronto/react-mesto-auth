import React, { useState } from "react";

function Login({ onLogin, title, textSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="login__button button" type="submit">
          {textSubmit}
        </button>
      </form>
    </section>
  );
}

export default Login;
