
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import CouponComponent from '../components/CouponComponent';

const CouponPage = () => {
    return(
        <section className="container-fluid">
            <HeaderComponent />
            <CouponComponent />
        </section>
    );   
}

export default CouponPage;