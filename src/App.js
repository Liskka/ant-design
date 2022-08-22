import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserPage from './pages/UserPage/UserPage';
import EditUserPage from './pages/EditUserPage/EditUserPage';
import CreateUserPage from './pages/CreateUserPage/CreateUserPage';
import PostPage from './pages/PostPage/PostPage';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/users" component={UsersPage} />
                <Route exact path="/createUser" component={CreateUserPage} />
                <Route exact path="/users/:id" component={UserPage} />
                <Route exact path="/users/:id/edit" component={EditUserPage} />
                <Route exact path="/posts" component={PostPage} />
            </Switch>
        </>
    );
}

export default App;
