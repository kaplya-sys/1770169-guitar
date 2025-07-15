import {CatalogItem} from '../catalog-item';
import {Guitar} from '../../libs/shared/types';

type CatalogProps = {
  guitars: Guitar[];
  onRemoveClick: (id: string) => void;
}

export const Catalog = ({guitars, onRemoveClick}: CatalogProps) => (
  <ul className="catalog-cards__list">
    {guitars.map((guitar) => <CatalogItem key={guitar.id} guitar={guitar} onRemoveClick={onRemoveClick}/>)}
  </ul>
);
