import {HashRouter as Router, Switch,Link,Route} from 'react-router-dom';
import {useState} from 'react';
import {Home} from './Home';
import {Register} from './Register';

function App() {

  let [isClosed,toggleChange]=useState(false);

  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg">
          <h2>Get Xp
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#top"
            aria-controls="top"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={()=>toggleChange(!isClosed)}
          >
            <span className={isClosed ? "menuOpen" : "menuClose"}></span>
            <span className={isClosed ? "menuOpen" : "menuClose"}></span>
            <span className={isClosed ? "menuOpen" : "menuClose"}></span>
          </button>
          <div className="collapse navbar-collapse" id="top">
            <ul className="navbar-nav ml-auto">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/signUp">
                <li>Register</li>
              </Link>
            </ul>
          </div>
        </h2>
        </nav>
          

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signUp">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
