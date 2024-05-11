// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
import style from './App.css';

const database = {
  productList: [
    {id: 1, name: 'ноутбук'},
    {id: 2, name: 'смартфон'},
    {id: 3, name: 'планшет'}
  ],
  
  products: {
    1: {id: 1, name: 'ноутбук', price: 99900, amount: 6},
    2: {id: 2, name: 'смартфон', price: 19900, amount: 15},
    3: {id: 3, name: 'планшет', price: 30000, amount: 9}
  }
};

const LOADING_TIMEOUT = 1000;

const fetchProductList = () => database.productList;

const fetchProduct = (id) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(database.products[id]);
  }, 300);
});

const MainPage = () => <div>Контент главной страницы</div>;

const Catalog = () => (
  <div> 
    <h3>Каталог товаров</h3>
    <ul>
      {fetchProductList().map(({ id, name }) => (
        <li key={id}>
          <NavLink to={`product/${id}`}>{name}</NavLink>
        </li>
      ))}
    </ul> 
    <Outlet />
  </div>
);

const ProductNotFound = () => <div>Такой товар не существует</div>;

const ProductLoadError = () => (
  <div>Ошибка загрузки товара, попробуйте еще раз позднее</div>
);

const Product = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        navigate('/product-load-error',{replace: true});
      }
    }, LOADING_TIMEOUT);

    fetchProduct(params.id).then((loadedProduct) => {
      setProduct(loadedProduct);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, [params.id, navigate, isLoading]);

  if (!product && !isLoading) {
    return <ProductNotFound />;
  }

  if (!product) {
    return <div>Загрузка...</div>; // Или другой индикатор загрузки
  }

  const { name, price, amount } = product;
  return (
    <div>
      <h3>Товар - {name}</h3>
      <div>Цена: {price}</div>
      <div>Количество: {amount}</div>
    </div>
  );
};

const Contacts = () => <div>Контент контактов</div>;

const NotFound = () => <div>Извините, но такая страница не существует</div>;

const ExtendedLink = ({ to, children }) => (
  <NavLink to={to}> 
    {({ isActive }) => isActive 
      ? (
        <>
          <span>{children}</span>
          <span>*</span>
        </>
      ) 
      : (children)
    }  
  </NavLink>
);

const App = () => {
  return (
    <Router>
      <div className={style.app}>
        <div>
          <h3>Меню</h3>
          <ul>
            <li>
              <ExtendedLink to="/">Главная</ExtendedLink>
            </li>
            <li>
              <ExtendedLink to="/catalog">Каталог</ExtendedLink>
            </li>
            <li>
              <ExtendedLink to="/contacts">Контакты</ExtendedLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<Catalog />}>
            <Route path="product/:id" element={<Product />} />
          </Route>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/product-load-error" element={<ProductLoadError />} />
          <Route path="/product-not-exist" element={<ProductNotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to = "/404" replace ={true}/> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


