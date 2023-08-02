import SuccessIcon from "../images/SuccessIcon.svg";
import FailIcon from "../images/FailIcon.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

function InfoToolTip(props) {
  const navigate = useNavigate();
  function handleClose(e) {
    e.preventDefault();
    props.onClose();
    if (props.isSuccess) {
      navigate("/", { replace: true });
    }
  }
  return (
    <div
      id="infoToolTip"
      className={`popup popup__tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__content">
        {props.isSuccess ? (
          <>
            <img
              src={`${SuccessIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          type="button"
          className="popup__escape-button"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
