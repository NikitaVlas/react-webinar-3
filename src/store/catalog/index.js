import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load({ limit, skip }) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );

    return { count: json.result.count };
  }
}

export default Catalog;
