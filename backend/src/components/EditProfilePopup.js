import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name={"edit"}
      textTitle={`Редактировать профиль`}
      textButton={`Сохранить`}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        id="name"
        className="form__input form__input-name"
        name="name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__validation-text name-error"></span>
      <input
        value={about}
        onChange={handleChangeAbout}
        id="about"
        className="form__input form__input-caption"
        name="about"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="form__validation-text about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
