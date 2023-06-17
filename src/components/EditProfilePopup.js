import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      job: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      submit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateUser={onUpdateUser}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="input-name-error" className="popup__error" />
      <input
        id="input-job"
        className="popup__input popup__input_type_job"
        type="text"
        name="job"
        placeholder="О себе"
        required=""
        minLength={2}
        maxLength={200}
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span id="input-job-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
