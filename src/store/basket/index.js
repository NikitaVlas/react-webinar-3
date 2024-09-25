import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 }; // Увеличиваем количество товара
      }
      sum += result.price * result.amount; // Подсчет суммы
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге
      const item = this.store.getState().catalog.list.find(item => item._id === _id);

      // Проверка, существует ли товар
      if (!item) {
        console.error('Товар не найден в каталоге'); // Логируем ошибку, если товар не найден
        return; // Выходим из функции, если товар не найден
      }

      list.push({ ...item, amount: 1 }); // Добавляем товар в корзину
      sum += item.price; // Добавляем к сумме
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
