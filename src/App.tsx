import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

// Ленивая загрузка 
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path="" element={<Home/>} />
        {/* Корзина */}
        <Route path="cart" element={
          <Suspense fallback={<div>Загрузка корзины...</div>}>
            <Cart/>
          </Suspense>
          } 
        />
        {/* Отдельно взятая пицца */}
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Загрузка пиццы...</div>}>
            <FullPizza/>
          </Suspense>
        } 
        />
        {/* Не найдено */}
        <Route path="*" element={
          <Suspense fallback={<div>Загрузка страницы...</div>}>
            <NotFound/>
          </Suspense>
        } 
        />
      </Route>
    </Routes>
  );
}

export default App;
