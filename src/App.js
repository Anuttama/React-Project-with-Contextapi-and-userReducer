
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Route path='/' exact>
          <Home />
        </Route>

      </div>
      <div>
        <Route path='/cart' exact>
          <Cart />
        </Route>

      </div>
    </Router>
  );
}

export default App;
