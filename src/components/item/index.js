import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      props.onAdd(props.item._id);
    },
    onNavigate: e => {
      e.stopPropagation();
      navigate(`/item/${props.item._id}`);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={callbacks.onNavigate}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
