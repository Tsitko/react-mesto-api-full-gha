const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <div className={`element-popup popup ${card.name ? "popup_opened" : ""}`}>
      <div className="element-popup__image-container">
        <button
          aria-label="закрыть добавление фото"
          className="popup__escape-button"
          type="button"
          name="elementClose"
          onClick={onClose}
        />
        <img src={card.img} alt={card.name} className="element-popup__image" />
        <p className="element-popup__caption">{card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
