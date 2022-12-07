import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import Premium from './pages/Premium';
import Add from './pages/mission';
import Selection from './pages/selection';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <NavLink className="content" exact activeClassName="active" to="/">Home</NavLink>
          <NavLink className="content" activeClassName="active" to="/premium">Premium</NavLink>
          <NavLink className="content" activeClassName="active" to="/mission">Add</NavLink>
          <NavLink className="content" activeClassName="active" to="/mission/selection">Selection</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/premium"element={<Premium/>}></Route>
          <Route path="/mission"element={<Add/>}></Route>
          <Route path="/mission/selection"element={<Selection/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;