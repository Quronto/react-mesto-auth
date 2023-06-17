function InfoTooltip({ isOpen, onClose,icon, text  }) {
  return (
    <div
      className={`popup_theme_register popup ${
        isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button"
          onClick={onClose}
        />
        <img className="popup__icon" src={icon} alt={text} />
        <h2 className="popup__text">{text}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
