import { useContext } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom'; // Удалите BrowserRouter здесь
import ItemDetail from "../components/item-detail/item-detail";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
