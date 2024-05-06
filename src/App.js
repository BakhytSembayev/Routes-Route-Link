import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import styles from './App.css';

const fetchProductList =()=>[
  {id: 1, name: 'ноутбук'},
  {id: 2, name: 'смартфон'},
  {id: 3, name: 'планшет'},
]
const MainPage = () => <div>Контент главной страницы</div>;
const Catalog = () => (
<div> 
  <h3>Каталог товаров</h3>
  <ul>
  
    {fetchProductList().map(({id,name})=>(
      <li key ={id}>
<Link to ="product"> {name} </Link>
      </li>
    ))}
  </ul> 
  <Outlet/>
</div>
);
const Product = ()=> <div>Контент страницы товара</div>;
const Contacts = () => <div>Контент контактов</div>;

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <div>
          <h3>Меню</h3>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<Catalog />} >
          <Route path="product" element={<Product />} />
            </Route>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

