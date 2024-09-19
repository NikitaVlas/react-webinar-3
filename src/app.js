import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import CartModal from './components/cart-modal';
import PageLayout from './components/page-layout';

function App({ store }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;

  const callbacks = {
    // Добавляем товар в корзину
    onAddToCart: useCallback((item) => {
      setCart((prevCart) => ({
        ...prevCart,
        [item.code]: {
          ...item,
          quantity: (prevCart[item.code]?.quantity || 0) + 1,
        },
      }));
    }, []),

    // Удаляем товар из корзины
    onRemoveFromCart: useCallback((code) => {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[code];
        return newCart;
      });
    }, []),

    // Открываем и закрываем корзину
    onOpenCart: useCallback(() => setIsCartOpen(true), []),
    onCloseCart: useCallback(() => setIsCartOpen(false), []),
  };

  const totalQuantity = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onOpenCart={callbacks.onOpenCart}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && <CartModal cart={cart} onRemoveFromCart={callbacks.onRemoveFromCart} onClose={callbacks.onCloseCart} />}
    </PageLayout>
  );
}

export default App;
