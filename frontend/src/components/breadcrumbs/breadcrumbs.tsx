import {Link, RouteObject, useMatches} from 'react-router-dom';

type BreadcrumbsProps = {
  elementClassName?: string;
}

type Breadcrumb = {
  id: string;
  path: string;
  name: string;
}

export type RouteObjectWithBreadcrumb = RouteObject & {
  handle?: {
    breadcrumb: string;
  };
  children?: RouteObjectWithBreadcrumb[];
};


export const Breadcrumbs = ({elementClassName = ''}: BreadcrumbsProps) => {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => Boolean(match.handle))
    .map((match) => (
      {
        id: crypto.randomUUID(),
        path: match.pathname,
        name: match.handle
      } as Breadcrumb
    ));

  return (
    <ul className={`breadcrumbs ${elementClassName}`}>
      {breadcrumbs.map((breadcrumb) => (
        <li className="breadcrumbs__item" key={breadcrumb.id}>
          <Link className="link" to={breadcrumb.path}>{breadcrumb.name}</Link>
        </li>
      ))}
    </ul>
  );
};
