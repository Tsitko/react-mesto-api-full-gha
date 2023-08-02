import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

const AddPlacePopup = ({ isOpen, onClose, onAddNewPlace }) => {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewPlace({
      place,
      link,
    });
  };

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"add"}
      isOpen={isOpen}
      textTitle={`Новое место`}
      textButton={`Создать`}
      onClose={onClose}
    >
      <input
        value={place}
        onChange={handleChangePlace}
        id="photoName"
        className="form__input form__input-photo-name"
        name="photoName"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__validation-text photoName-error"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        id="link"
        className="form__input form__input-photo-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__validation-text link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
