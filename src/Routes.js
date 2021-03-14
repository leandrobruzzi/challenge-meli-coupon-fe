import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CouponPage from './pages/CouponPage';

const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={CouponPage} />
            <Route exact path='/*' component={CouponPage} />
        </Switch>
    );
}

export default Routes