import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const urlRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }

  useEffect(() => {
    urlRef.current.value = " ";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateAvatar={onUpdateAvatar}
      onSubmit={handleSubmit}
    >
      <input
        id="input-link-avatar"
        className="popup__input popup__input_type_link-avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required=""
        ref={urlRef}
      />
      <span id="input-link-avatar-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
