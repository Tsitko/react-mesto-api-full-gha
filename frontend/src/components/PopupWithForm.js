const PopupWithForm = ({
  name,
  isOpen,
  textTitle,
  textButton,
  onClose,
  children,
  onSubmit,
}) => (
  <div id={`popup-${name}`} className={isOpen ? "popup popup_opened" : "popup"}>
    <div className={`popup__form-container`}>
      <button
        id={`${name}_close`}
        onClick={onClose}
        className="popup__escape-button"
        type="button"
      ></button>
      <form
        className="form"
        name={`${name}_form`}
        id={`${name}_form`}
        noValidate
      >
        <h2 className="popup__form-title">{`${textTitle}`}</h2>
        {children}
        <button className="form__save-button" type="submit" onClick={onSubmit}>
          {`${textButton}`}
        </button>
      </form>
    </div>
  </div>
);

export default PopupWithForm;
