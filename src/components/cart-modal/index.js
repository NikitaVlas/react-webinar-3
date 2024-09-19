import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartModal({ cart, onRemoveFromCart, onClose }) {
  const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="CartModal-background" onClick={onClose}></div>
      <div className="CartModal">
        <div className="CartModal-header">
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className="CartModal-content">
          {Object.values(cart).map(item => (
            <div key={item.code} className="CartModal-item">
              <div>
                <span>{item.code}</span>
                <span className="CartModal-item-title">{item.title}</span>
              </div>
              <div className="CartModal-item-block">
                <span className="CartModal-item-price">{item.price} ₽</span>
                <span className="CartModal-item-quantity">{item.quantity} шт</span>
                <button onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
        <div className="CartModal-footer">
          <span>Итого: {totalPrice} ₽</span>
        </div>
      </div>
    </>
  );
}

CartModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
