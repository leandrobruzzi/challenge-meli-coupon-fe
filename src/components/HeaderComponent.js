import React from 'react';
import './css/header.css';

const HeaderComponent = () => {
    return(
        <header className="row justify-content-center align-items-center">
            <div className="container-logo">
                <img src="/logo-meli.jpg" alt="Logo"></img>
            </div>
            <div className="container-titulo">
                <span>Simulador Cupon de regalo</span>
            </div>
        </header>
    );   
}

export default HeaderComponent;