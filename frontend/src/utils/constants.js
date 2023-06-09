export const popups = Array.from(document.querySelectorAll('.pop-up'));
export const popupCards = document.querySelector('.pop-up_cards');
export const buttonEditProfile = document.querySelector('.profile__edit-btn');
// export const formProfile = document.forms.formProfile;
// export const inputName = formProfile.querySelector('#pop-up__name');
// export const inputText = formProfile.querySelector('#pop-up__text');
export const titleProfile = document.querySelector('.profile__title');
export const iconProfile = document.querySelector('.profile__photo');
export const subtitleProfile = document.querySelector('.profile__subtitle');
export const popupProfile = document.querySelector('.pop-up_profile');
export const popupEditAvatar = document.querySelector('.pop-up_profile-edit');
export const profileBtnEditAva = document.querySelector('.profile__pen');
export const popupFullCards = document.querySelector('.pop-up_cards');

export const cardsList = document.querySelector('.cards__list');
export const cardsListSelector = '.cards__list';
export const inputTitle = document.querySelector('#pop-up__title');
export const inputLink = document.querySelector('#pop-up__link-ava');
export const cardsFullImg = document.querySelector('.pop-up__card-full-img');
export const cardsFullTitle = document.querySelector('.pop-up__card-full-title'); 

 // Форма добавления карточки

export const profileAddBtn = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.pop-up_add');
export const popupDeleteCard = document.querySelector('.pop-up_delete-card');
export const confirmBtn = document.querySelector('.pop-up__confirm-btn');
export const formAddCard = document.forms.formAdd;
export const formEditAva = document.forms.formEditAva;
// export const formSubmitButton = formAddCard.querySelector('.pop-up__button');

export const objUserInfo = {userName: '#pop-up__name', userInfo: '#pop-up__text'};
export const objAva = {userAvatar: '#pop-up__link-ava'}

export const configValidation = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  errorClass: 'pop-up__span-error',
  inputErrorClass: 'pop-up__input_type_error',
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    'Authorization' : '9be9cc24-8f1f-4506-ba7e-99001911a764',
    'Content-Type': 'application/json'
  }
}

export default apiConfig;

