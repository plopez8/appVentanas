/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/Admin';
import HomeLayout from 'layouts/Home';
import LoginView from './Login';

function App() {
  console.log("App");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [type, setType] = useState('');

    useEffect(() => {}, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
                  {isAuthenticated ? (
        <Switch>
          <Route
            path="/private"
            render={(props) => <AdminLayout userType={type} setAuthenticated={setAuthenticated} {...props} />} // Pasamos el valor de type como prop
          />
          <Redirect from="/" to="/private/obra" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" render={(props) => <LoginView setAuthenticated={setAuthenticated} setType={setType} {...props} />} /> {/* Pasamos setAuthenticated como prop a LoginView */}
          <Route path="/private" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/login" />
        </Switch>
      )}
        </>
    );
}

export default App;
