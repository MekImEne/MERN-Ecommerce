import React , {useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn , getInitalData} from './actions'
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=> {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    //dispatch(getAllCategory()); 
    // deplace to App to render categories in the tab of Products too    
    dispatch(getInitalData());
  }, [] );

  return (
    <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute  path="/category" component={Category} />
          <PrivateRoute  path="/products" component={Products} />
          <PrivateRoute  path="/orders" component={Orders} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
