function PopupWithForm({ name, isOpen, onSubmit, submit, onClose, title, children }) {
  return (
    <div
      className={`popup popup_theme_${name} ${
        isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__submit">
            {submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
