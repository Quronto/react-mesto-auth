import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import success from "../images/SucccessReg.png";
import failure from "../images/CloseReg.png";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipIcon, setInfoTooltipIcon] = useState("");

  const navigate = useNavigate();

  function onLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setInfoTooltipIcon(failure);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoTooltipIcon(success);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setInfoTooltipIcon(failure);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function checkTocken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          alert(`Произошла ошибка ${err}`);
        });
    }
  }

  useEffect(() => {
    checkTocken();
  }, []);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail(null);
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          alert(`Произошла ошибка ${err}`);
        });
    }
  }

  function handleUpdateUser(profileData) {
    api
      .sendUserData(profileData)
      .then((card) => {
        setCurrentUser(card);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .sendAvatarData(avatarLink)
      .then((avatarUrl) => {
        setCurrentUser(avatarUrl);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardId(card)
      .then(() => {
        setCards((item) => item.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Header text="Регистрация" link="/sign-up" />
                <Login onLogin={onLogin} title="Вход" textSubmit="Войти" />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header text="Войти" link="/sign-in" />
                <Register
                  onRegister={onRegister}
                  title="Регистрация"
                  textSubmit="Зарегистрироваться"
                  paragraph="Уже зарегистрированы?"
                />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header
                  text="Выйти"
                  email={email}
                  link="/sign-in"
                  onSignOut={onSignOut}
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                />
                <Footer title="©2023 Mesto Russia" />
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title="Вы уверены, что хотите удалить карточку?"
          name="delete"
          submit="Да"
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip
          icon={infoTooltipIcon}
          text={infoTooltipText}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
