import React from 'react';
import './css/cupon.css';

const CuponComponent = () => {
    return(
        <section>
            <div className="row justify-content-center">
                <div className="regalo col-12 col-md-6">
                    <img src="/Regalo.png"></img>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="agradecimiento col-12 col-md-6">
                    <p>Gracias por elegirnos continuamente<br></br>Queremos recompensarte con un cupon por $500</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="titulo-productos col-12 col-md-6">
                    <p>Lo podras canjear por los siguientes productos</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="row justify-content-between">
                        <div className="productos col-12 col-md-6">
                            prod1
                        </div>
                        <div className="productos col-12 col-md-6">
                            prod2
                        </div>
                        <div className="productos col-12 col-md-6">
                            prod3
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );   
}

export default CuponComponent;