import { BrowserRouter as Router, Routes, Route, NavLink, Outlet, useParams, useMatch } from 'react-router-dom';
import style from './App.css';

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
<NavLink to ={`product/${id}`}> {name} </NavLink>
      </li>
    ))}
  </ul> 
  <Outlet/>
</div>
);
const ProductNotFound = () => <div>Такой товар не существует</div>;

const Product = ()=> {
  const params = useParams ();
const urlMatchData = useMatch('/catalog/:type/:id');
console.log(urlMatchData);

  const product = fetchProduct(params.id);
  if(!product){
return <ProductNotFound/>;
  }
  const {name, price, amount} =product;
return (
<div>
  <h3>Товар - {name} </h3>
  <div>Цена: {price}</div>
  <div>Количество: {amount}</div>
</div>
)};
const Contacts = () => <div>Контент контактов</div>;
const NotFound = () => <div>Страница не существует</div>;

const ExtendedLink=({to ,children})=> (
<NavLink to={to}> 
{({ isActive }) => isActive 
? (<>
<span>{children}</span>
<span>*</span>
</> )
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
            <ExtendedLink to="/"> Главная</ExtendedLink>
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
          <Route path="/catalog" element={<Catalog />} >
          <Route path="product/:id" element={<Product />} />
          <Route path="service/:id" element={<Product />} />
            </Route>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


