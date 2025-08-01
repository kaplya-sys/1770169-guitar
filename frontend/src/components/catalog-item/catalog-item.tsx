import {Link} from 'react-router-dom';

import {Guitar} from '@1770169-guitar/types';
import {getImagesPath} from '@1770169-guitar/helpers';

type CatalogItemProps = {
  guitar: Guitar;
  onRemoveClick: (id: string) => void;
}

export const CatalogItem = ({guitar, onRemoveClick}: CatalogItemProps) => {
  const {image, image2x} = getImagesPath(guitar.image)

  return (
  <li className="catalog-item">
    <div className="catalog-item__data">
      <img
        src={image}
        srcSet={`${image2x} 2x`}
        width="36"
        height="93"
        alt={guitar.title}
      />
      <div className="catalog-item__data-wrapper">
        <Link className="link" to={`${guitar.id}`}>
          <p className="catalog-item__data-title">{guitar.title}</p>
        </Link>
        <br/>
        <p className="catalog-item__data-date">{`Дата добавления ${guitar.date}`}</p>
        <p className="catalog-item__data-price">{`${guitar.price} ₽`}</p>
      </div>
    </div>
    <div className="catalog-item__buttons">
      <Link
        className="button button--small button--black-border"
        to={`${guitar.id}/edit`}
        aria-label="Редактировать товар"
      >
        Редактировать
      </Link>
      <button
        className="button button--small button--black-border"
        type="button"
        aria-label="Удалить товар"
        onClick={() => onRemoveClick(guitar.id as string)}
      >
        Удалить
      </button>
    </div>
  </li>
);
}
