import React from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Main from "./Main";
import Footer from "./Footer";
import "../index.css";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CurrentCardContext } from "../context/CurrentUserContext";

export default function Homepage() {
  const [currentState, setCurrentState] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardInfo, setCardInfo] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    api
      .getCardsList()
      .then((response) => {
        setCards(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCards]);

  React.useEffect(() => {
    api
      .getCardsList()
      .then((response) => {
        setCards(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCards]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(cardInfo) {
    setCardInfo(true);
    setSelectedCard({
      name: cardInfo.name,
      link: cardInfo.link,
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setCardInfo(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentState._id);
    if (!isLiked) {
      api
        .getCardLike(card._id)
        .then((res) => {
          setCards(() =>
            cards.map((c) => {
              if (c._id === card._id) {
                return res;
              }
              return c;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((res) => {
          setCards(() =>
            cards.map((c) => {
              if (c._id === card._id) {
                return res;
              }
              return c;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(() => cards.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(userInfo) {
    api
      .editProfileInfo(userInfo)
      .then((res) => {
        closeAllPopups();
        setCurrentState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(avatar) {
    api
      .editProfileAvatar(avatar)
      .then((res) => {
        closeAllPopups();
        setCurrentState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(info) {
    api
      .createCard(info)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <CurrentUserContext.Provider value={currentState}>
        <CurrentCardContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onOpenFullImg={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            setCards={setCards}
          />
          <Footer />
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
          <PopupWithForm title="Вы уверены?" button="Да" />
          <ImagePopup
            card={cardInfo}
            onClose={closeAllPopups}
            cardInfo={selectedCard}
          />
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}
