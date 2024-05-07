import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';
import styles from './App.css';

const fetchProductList =()=>[
  {id: 1, name: 'ноутбук'},
  {id: 2, name: 'смартфон'},
  {id: 3, name: 'планшет'},
]

const fetchProduct =(id)=>({
  1: {id: 1, name: 'ноутбук',price:99900,amount:6},
  2: {id: 2, name: 'смартфон',price:19900,amount:15},
  3: {id: 3, name: 'планшет',price:30000,amount:9},
})[id];
  

const MainPage = () => <div>Контент главной страницы</div>;
const Catalog = () => (
<div> 
  <h3>Каталог товаров</h3>
  <ul>
  
    {fetchProductList().map(({id,name})=>(
      <li key ={id}>
<Link to ={`product/${id}`}> {name} </Link>
      </li>
    ))}
  </ul> 
  <Outlet/>
</div>
);
const Product = ()=> {
  const params = useParams ();
  const {name, price, amount} = fetchProduct(params.id);
return (
<div>
  <h3>Товар - {name} </h3>
  <div>Цена: {price}</div>
  <div>Количество: {amount}</div>
</div>
)};
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
          <Route path="product/:id" element={<Product />} />
            </Route>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

