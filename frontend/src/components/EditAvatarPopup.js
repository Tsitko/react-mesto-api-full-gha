import PopupWithForm from "./PopupWithForm";
import React, { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"avatar"}
      isOpen={isOpen}
      textTitle={`Обновить аватар`}
      textButton={`Сохранить`}
      onClose={onClose}
    >
      <input
        ref={avatarRef}
        id="avatar"
        className="form__input"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="avatar-error"
        className="form__validation-text avatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
