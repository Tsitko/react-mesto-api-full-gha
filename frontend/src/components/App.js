import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import profileImage from "../images/image.jpg";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const isAnyPopupOpened =
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isEditProfilePopupOpen ||
    isImagePopupOpen; // Константа, указывающая на то, что хотя бы один попап открыт

  useEffect(() => {
    const handleCloseByEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }; // Функция закрытия на esc

    if (isAnyPopupOpened) {
      // Если хотя бы один попап открыт
      document.addEventListener("keydown", handleCloseByEsc); // Вешаем обработчик

      return () => document.removeEventListener("keydown", handleCloseByEsc); // Возвращаем функцию очистки эффекта
    }
  }, [isAnyPopupOpened]);

  const [currentUser, setCurrentUser] = useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: profileImage,
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    img: "",
  });

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log("1 Ошибка ===> ", err);
      });
  }, []);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard({
      name: "",
      img: "",
    });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick({ card }) {
    setImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      img: card.link,
    });
  }

  function handleCardLikeDislike({ likes, id }) {
    const isLiked = likes.some((i) => {
      return i._id === currentUser._id;
    });
    const method = isLiked ? "DELETE" : "PUT";
    api
      .changeLikeCardStatus(id, method)
      .then((newCard) => {
        if (cards.data){
          setCards((cards) => cards.data.map((c) => (c._id === id ? newCard : c)));
        } else{
          setCards((cards) => cards.map((c) => (c._id === id ? newCard : c)));
        }
        
      })
      .catch((err) => {
        console.log("2 Ошибка ===> ", err);
      });
  }

  function handleCardDelete({ id }) {
    api
      .deleteCard(id)
      .then((newCard) => {
        let newArrCards = [];
        if(cards.data){
          newArrCards = cards.data.filter((c) => c._id !== id);
        } else{
          newArrCards = cards.filter((c) => c._id !== id);
        }
        setCards(newArrCards);
      })
      .catch((err) => {
        console.log("3 Ошибка ===> ", err);
      });
  }

  function handleUpdaterUser(e) {
    api
      .setUserInfo(e)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("4 Ошибка ===> ", err);
      });
  }

  function handleUpdateAvatar(e) {
    api
      .changeAvatar(e)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("5 Ошибка ===> ", err);
      });
  }

  function handleAddPlaceSubmit(e) {
    api
      .addNewCard({
        photoName: e.place,
        link: e.link,
      })
      .then((res) => {
        let cardsData = cards;
        let resData = res;
        if(cards.data){
          cardsData = cards.data;
        }
        if(res.data){
          resData = res.data;
        }
        setCards([resData, ...cardsData]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("6 Ошибка ===> ", err);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
      })
      .catch((err) => {
        if (err === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setIsSuccess(true);
        setInfoToolTipPopupOpen(true);
        setEmail(email);
      })
      .catch((err) => {
        if (err === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setIsSuccess(false);
        setInfoToolTipPopupOpen(true);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, []);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLikeDislike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLoginSubmit} isSuccess={isSuccess} />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                isSuccess={isSuccess}
              />
            }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdaterUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
