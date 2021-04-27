import React from 'react';
 import {
      BrowserRouter as Router,
      Route,
      Switch
  } from 'react-router-dom';
import SignUpPage from "../SignUp/signUp"
import SignInPage from '../SignIn/signIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodayPicture from '../Picture/todayPicture'
import './App.css';
import { Provider } from 'react-redux';
import store from '../../components/Store/Store'
import * as ROUTES from '../../constants/routes';
import HistoryPicture from '../Picture/historyPictures'

const App = () => (
      <Router>
      <Provider store={store}>

  <Switch>
        
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.TODAY_PICTURE} component={TodayPicture} />
            <Route path={ROUTES.HISTORY_PICTURE} component={HistoryPicture} />

            </Switch>
      </Provider>
      </Router>
);

export default App;
