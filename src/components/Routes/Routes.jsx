import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import HomePage from '../../pages/HomePage/HomePage';
import MessagePage from '../../pages/MessagePage/MessagePage';
import NewMessage from '../../pages/NewMessage/NewMessage';

const Routes = (props) => {
    return ( 
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path='/dashboard' component={DashboardPage} />
                <Route path='/messages' exact component={MessagePage} />
                <Route path='/newmessage' exact component={NewMessage} />
            </Switch>
        </Router>
     );
}
 
export default Routes;