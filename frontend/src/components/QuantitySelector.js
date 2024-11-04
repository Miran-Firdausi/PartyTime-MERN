import React from 'react';

const QuantitySelector = ({ qtystyles, quantity, onDecrement, onIncrement, onClick }) => {
  return (
    <div className={qtystyles.quantitySelector}>
      <button className={qtystyles.minus} onClick={onDecrement}>-</button>
      <button className={qtystyles.qty} onClick={onClick}>{quantity}</button>
      <button className={qtystyles.plus} onClick={onIncrement}>+</button>
    </div>
  );
};

export default QuantitySelector;
