import {MouseEvent, useState} from 'react';
import classNames from 'classnames';

import {Breadcrumbs} from '../../components/breadcrumbs';
import {GUITAR_TYPE_NAMES} from '../../libs/shared/constant';
import {ProductDetail} from '../../libs/shared/types';
import { useAppSelector } from '../../hooks';
import { selectGuitar } from '../../store';

export const ProductCard = () => {
  const [viewDescription, setViewDescription] = useState<boolean>(false);
  const guitar = useAppSelector(selectGuitar);

  const handleToggleClick = (evt: MouseEvent<HTMLAnchorElement>, type: ProductDetail) => {
    evt.preventDefault();

    if (type === ProductDetail.Specifications) {
      setViewDescription(false);
      return;
    }
    setViewDescription(true);
  };

  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Товар</h1>
      <Breadcrumbs elementClassName='page-content__breadcrumbs'/>
      <section className="">
        <div className="product-container">
          <img
            className="product-container__img"
            src={`img/content/${guitar.image}`}
            srcSet={`img/content/${guitar.image}@2x.png 2x`}
            width="90"
            height="235"
            alt={guitar.title}
          />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{guitar.title}</h2>
            <br/>
            <br/>
            <div className="tabs">
              <a
                className="button button--medium tabs__button"
                href="#characteristics"
                onClick={(evt: MouseEvent<HTMLAnchorElement>) => handleToggleClick(evt, ProductDetail.Specifications)}
              >
                Характеристики
              </a>
              <a
                className="button button--black-border button--medium tabs__button"
                href="#description"
                onClick={(evt: MouseEvent<HTMLAnchorElement>) => handleToggleClick(evt, ProductDetail.Description)}
              >
                Описание
              </a>
              <div className="tabs__content" id="characteristics">
                <table className={classNames('tabs__table', {'hidden': viewDescription})}>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{guitar.article}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{GUITAR_TYPE_NAMES[guitar.type]}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{guitar.stringCount}</td>
                  </tr>
                </table>
                <p className={classNames('tabs__product-description', {'hidden': !viewDescription})}>{guitar.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
