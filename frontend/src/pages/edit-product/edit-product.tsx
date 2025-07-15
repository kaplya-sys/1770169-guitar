import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';

import {Breadcrumbs} from '../../components/breadcrumbs';
import {CreateGuitar, GuitarString, GuitarType} from '../../libs/shared/types';
import {DATE_FORMAT, GUITAR_STRINGS_NAMES, GUITAR_TYPE_NAMES} from '../../libs/shared/constant';
import {formattingNumber, setDefaultFormat, validateFields} from '../../libs/shared/helpers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectGuitar, updateGuitarAction} from '../../store';

export const EditProduct = () => {
  const guitarsData = useAppSelector(selectGuitar);
  const [data, setData] = useState<CreateGuitar>({
    title: guitarsData.title,
    article: guitarsData.article,
    type: guitarsData.type,
    description: guitarsData.description,
    stringCount: guitarsData.stringCount,
    price: guitarsData.price.toString(),
    image: null,
    date: dayjs(guitarsData.date).format(DATE_FORMAT)
  });
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [error, setError] = useState<Partial<Record<keyof CreateGuitar, string>>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (evt.target instanceof HTMLInputElement && evt.target.files?.length) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setData((prevState) => ({...prevState, image: file}));
    }
    const {name, value} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
  };
  const handleAddImageClick = () => fileRef.current?.click();
  const handleRemoveImageClick = () => {
    setData((prevState) => ({...prevState, image: null}));
    setSelectedImage('');
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newError = validateFields(data);

    if (!newError) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('article', data.article);
      formData.append('type', data.type);
      formData.append('description', data.description);
      formData.append('price', setDefaultFormat(data.price));
      formData.append('date', dayjs(data.date).toISOString());

      if (data.image) {
        formData.append('file', data.image);
      }
      dispatch(updateGuitarAction({formData, id: guitarsData.id}))
    } else {
      setError(newError);
    }
  };

  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">{data.title}</h1>
        <Breadcrumbs/>
        <form className="edit-item__form" action="#" method="get" onSubmit={handleFormSubmit}>
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                {selectedImage &&
                  <img
                    className="edit-item-image__image"
                    src={selectedImage}
                    srcSet={`${selectedImage} 2x`}
                    width="133"
                    height="332"
                    alt={data.title}
                  />}
              </div>
              <input
                className="visually-hidden"
                ref={fileRef}
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleInputChange}
              />
              <div className="edit-item-image__btn-wrap">
                <button
                  className="button button--small button--black-border edit-item-image__btn"
                  onClick={handleAddImageClick}
                >
                  Заменить
                </button>
                <button
                  className="button button--small button--black-border edit-item-image__btn"
                  onClick={handleRemoveImageClick}
                >
                  Удалить
                </button>
              </div>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              {Object.values(GuitarType).map((item) => (
                <>
                  <input
                    type="radio"
                    id={`guitar-${item}`}
                    name="type"
                    value={item}
                    checked={data.type === item}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`guitar-${item}`}>{GUITAR_TYPE_NAMES[item]}</label>
                </>
              ))}
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Количество струн</span>
              {Object.values(GuitarString).map((item) => (
                <>
                  <input
                    type="radio"
                    id={`string-qty-${item}`}
                    name="stringCount"
                    value={item}
                    checked={data.stringCount === item}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`string-qty-${item}`}>{GUITAR_STRINGS_NAMES[item]}</label>
                </>
              ))}
            </div>
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Дата добавления товара</span>
                <input
                  type="text"
                  name="date"
                  value={data.date}
                  placeholder="Дата в формате 00.00.0000"
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
              <p>{error.date}</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Наименование товара</span>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  placeholder="Наименование"
                />
              </label>
              <p>{error.title}</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label>
                <span>Цена товара</span>
                <input
                  type="text"
                  name="price"
                  value={formattingNumber(data.price)}
                  onChange={handleInputChange}
                  placeholder="Цена в формате 00 000"
                />
              </label>
              <p>{error.price}</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Артикул товара</span>
                <input
                  type="text"
                  name="article"
                  value={data.article}
                  onChange={handleInputChange}
                  placeholder="Артикул товара"
                />
              </label>
              <p>{error.article}</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label>
                <span>Описание товара</span>
                <textarea
                  name="description"
                  value={data.description}
                  placeholder=""
                  onChange={handleInputChange}
                >
                </textarea>
              </label>
              <p>{error.description}</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button
              className="button button--small edit-item__form-button"
              type="submit"
            >
              Сохранить изменения
            </button>
            <button
              className="button button--small edit-item__form-button"
              type="button"
              onClick={() => navigate('/products')}
            >
              Вернуться к списку товаров
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
