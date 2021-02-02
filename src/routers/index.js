import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LayoutHistory from '../component/LayoutHistory';

const Routers = props => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <LayoutHistory />
                    </Route>

                </Switch>
            </Router>
        </div>
    )
}

export default Routers
