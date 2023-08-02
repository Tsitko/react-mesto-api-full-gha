export const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__validation-text_visible",
};

export const data = {
  baseUrl: "https://api.mesto-russia.nomoreparties.co",
  headers: {
   // authorization: "2f741d91-5f99-4a03-b207-7e63a8ddfd00",
    "Content-Type": "application/json",
  },
};
