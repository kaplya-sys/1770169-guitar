import {useState, MouseEvent, ChangeEvent, useEffect} from 'react';
import {Outlet, useMatch, useNavigate} from 'react-router-dom';
import classNames from 'classnames';

import {Breadcrumbs} from '../../components/breadcrumbs';
import {Catalog} from '../../components/catalog';
import {Pagination} from '../../components/pagination';
import {AppRoute, Filter, GuitarString, GuitarType, Sort, SortDirection} from '../../libs/shared/types';
import {GUITAR_TYPE_SPECIFICATION, GUITAR_STRING_SPECIFICATION, GUITAR_TYPE_NAMES, GUITAR_STRINGS_NAMES} from '../../libs/shared/constant';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getGuitarsAction, removeGuitarAction, selectGuitars} from '../../store';

export const Products = () => {
  const [filter, setFilter] = useState<Filter>({
    types: [],
    strings: [],
  });
  const [sort, setSort] = useState<Sort>({
    date: SortDirection.Up
  });
  const currentSortType = Object.keys(sort)[0] as keyof Sort;
  const isProductsRoot = useMatch(AppRoute.Products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const paginatedGuitars = useAppSelector(selectGuitars);

  useEffect(() => {
    dispatch(getGuitarsAction({query: {...filter, ...sort}}))
  }, [filter, sort]);

  const handleAddProduct = () => navigate(AppRoute.AddProduct);
  const handlePageChange = (evt: MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    dispatch(getGuitarsAction({query: {...filter, ...sort, page}}))
  };
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked, dataset} = evt.target;

    setFilter((prevState) => {
      if (checked) {
        return ({
            ...prevState,
            [dataset.name as keyof Filter]: [...prevState[dataset.name as keyof Filter], name]
          });
      } else {
        return ({
          ...prevState,
          [dataset.name as keyof Filter]: prevState[dataset.name as keyof Filter].filter((item) => item !== name)
        });
      }
    });
  };
  const handleClearClick = () => setFilter((prevState) => ({...prevState, types: [], strings: []}));
  const handleSortDirectionClick = (direction: SortDirection) => {
    setSort((prevState) => ({...prevState, [currentSortType]: direction}));
  };
  const handleRemoveClick = (id: string) => {
    dispatch(removeGuitarAction({id}))
  };

  return (
    isProductsRoot ?
      <section className="product-list">
        <div className="container" >
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs/>
          <div className="catalog">
            <form className="catalog-filter" action="#" method="post">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                {Object.values(GuitarType).map((item) => {
                  let isDisabled = true;

                  if (filter.strings.length) {
                    const guitarStrings = new Set(filter.strings.flatMap((type) => GUITAR_STRING_SPECIFICATION[type as GuitarString]));
                    isDisabled = [...guitarStrings].includes(item);
                  }

                  return (
                    <div className="form-checkbox catalog-filter__block-item" key={item}>
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        data-name='types'
                        id={item}
                        name={item}
                        onChange={handleInputChange}
                        disabled={!isDisabled}
                      />
                      <label htmlFor={item}>{GUITAR_TYPE_NAMES[item]}</label>
                    </div>
                  );
                })}
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                {Object.values(GuitarString).map((item) => {
                  let isDisabled = true;

                  if (filter.types.length) {
                    const guitarTypes = new Set(filter.types.flatMap((type) => GUITAR_TYPE_SPECIFICATION[type as GuitarType]));
                    isDisabled = [...guitarTypes].includes(item);
                  }

                  return (
                    <div className="form-checkbox catalog-filter__block-item" key={item}>
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        data-name='strings'
                        id={`${item}-strings`}
                        name={item}
                        onChange={handleInputChange}
                        disabled={!isDisabled}
                      />
                      <label htmlFor={`${item}-strings`}>{GUITAR_STRINGS_NAMES[item]}</label>
                    </div>
                  );
                })}
              </fieldset>
              <button
                className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
                onClick={handleClearClick}
              >
                Очистить
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={classNames('catalog-sort__type-button', {'catalog-sort__type-button--active': sort.date})}
                  aria-label="по дате"
                  onClick={() => setSort({date: SortDirection.Up})}
                >
                  по дате
                </button>
                <button
                  className={classNames('catalog-sort__type-button', {'catalog-sort__type-button--active': sort.price})}
                  aria-label="по цене"
                  onClick={() => setSort({price: SortDirection.Up})}
                >
                  по цене
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={classNames(
                    'catalog-sort__order-button catalog-sort__order-button--up',
                    {'catalog-sort__order-button--active': sort[currentSortType] === SortDirection.Up}
                  )}
                  aria-label="По возрастанию"
                  onClick={() => handleSortDirectionClick(SortDirection.Up)}
                >
                </button>
                <button
                  className={classNames(
                    'catalog-sort__order-button catalog-sort__order-button--down',
                    {'catalog-sort__order-button--active': sort[currentSortType] === SortDirection.Down}
                  )}
                  aria-label="По убыванию"
                  onClick={() => handleSortDirectionClick(SortDirection.Down)}
                >
                </button>
              </div>
            </div>
            <div className="catalog-cards">
              <Catalog guitars={paginatedGuitars.entities} onRemoveClick={handleRemoveClick}/>
            </div>
          </div>
          <button
            className="button product-list__button button--red button--big"
            onClick={handleAddProduct}
          >
            Добавить новый товар
          </button>
          <Pagination
            currentPage={paginatedGuitars.currentPage}
            totalPages={paginatedGuitars.totalPages}
            onPageChange={handlePageChange}
          />
        </div >
      </section > :
      <Outlet/>
  );
};
