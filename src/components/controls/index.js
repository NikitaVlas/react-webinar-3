import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({ title, totalQuantity, totalPrice, onOpenCart }) {
  return (
    <div className="Controls">
      <h1>{title}</h1>
      <div className="CartSummary">
        <span>В корзине:</span>
        <span className="CartSummary-count"> {totalQuantity === 0 ? "пусто"
          : ` ${totalQuantity} ${plural(totalQuantity, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          } )} / ${totalPrice} ₽`}</span>

        <button onClick={onOpenCart}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);
