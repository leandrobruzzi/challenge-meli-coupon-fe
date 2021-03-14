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
            <div>
                <div className="agradecimiento col-12 col-md-6">
                    <p>Gracias por elegirnos continuamente<br></br>Queremos recompensarte con un cupon por $500</p>
                </div>
            </div>
        </section>
    );   
}

export default CuponComponent;