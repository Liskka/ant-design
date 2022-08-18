import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserPage from './pages/UserPage/UserPage';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/users" component={UsersPage} />
                <Route exact path="/users/:id" component={UserPage} />
            </Switch>
        </>
    );
}

export default App;
