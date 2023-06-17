function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_theme_picture ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_overlay">
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <button
          type="button"
          className="popup__close button popup__close_type_picture"
          onClick={onClose}
        />
        <h2 className="popup__paragraph">{card ? card.name : ""}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
