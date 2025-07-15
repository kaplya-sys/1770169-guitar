import {MouseEvent} from 'react';
import classnames from 'classnames';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (evt: MouseEvent<HTMLAnchorElement>, page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => (
  <div className="pagination product-list__pagination">
    <ul className="pagination__list">
      {
        currentPage > 1 &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a className="link pagination__page-link" href="#">Назад</a>
          </li>
      }
      {Array.from({length: totalPages}, (_, index) => ({id: index + 1})).map((page) => (
        <li className={classnames('pagination__page', {'pagination__page--active': currentPage === page.id})} key={page.id}>
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => onPageChange(evt, page.id)}
          >
            {page.id}
          </a>
        </li>
      ))}
      {
        totalPages !== currentPage &&
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href="#">Далее</a>
          </li>
      }
    </ul>
  </div>
);
