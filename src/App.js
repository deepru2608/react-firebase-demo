import './App.css';
import Header from './Header';
import './firebase/config';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
