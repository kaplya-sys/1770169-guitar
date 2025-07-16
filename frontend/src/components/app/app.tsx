import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import {PrivateRoute} from '../../components/private-route';
import {Products} from '../../pages/products';
import {SignUp} from '../../pages/sign-up';
import {SignIn} from '../../pages/sign-in';
import {Product} from '../../pages/product';
import {AddProduct} from '../../pages/add-product/add-product';
import {EditProduct} from '../../pages/edit-product/edit-product';
import {NotFound} from '../../pages/not-found';
import {BREADCRUMBS_NAMES} from '../../libs/shared/constant';
import {AppRoute} from '../../libs/shared/types';
import {Layout} from '../../components/layout';

export const App = () => {
  const isAuthenticated = true;

  return (
    <HelmetProvider>
      <Routes>
        <Route element={<Layout/>}>
          <Route path={AppRoute.SignIn} element={<SignIn/>} handle={BREADCRUMBS_NAMES.login}/>
          <Route path={AppRoute.SignUp} element={<SignUp/>} handle={BREADCRUMBS_NAMES.registration}/>
          <Route path={AppRoute.Products} element={<PrivateRoute><Products/></PrivateRoute>} handle={BREADCRUMBS_NAMES.products}>
            <Route path={AppRoute.Product} element={<Product/>} handle={BREADCRUMBS_NAMES.product}/>
            <Route path={AppRoute.AddProduct} element={<AddProduct/>} handle={BREADCRUMBS_NAMES.newProduct}/>
            <Route path={AppRoute.EditProduct} element={<EditProduct/>} handle={BREADCRUMBS_NAMES.editProduct}/>
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFound/>}/>
        </Route>
      </Routes>
    </HelmetProvider>
  );
};
