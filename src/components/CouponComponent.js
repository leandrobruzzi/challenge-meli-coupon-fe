import React from 'react';
import './css/cupon.css';
import axios from 'axios';
import { URL_BASE_BE, URL_BASE_API_MELI } from '../Constant'
const { useState } = React;

const CuponComponent = () => {

    const [items, setItems] = useState([
        {
            imageURL: 'https://http2.mlstatic.com/D_NQ_NP_938540-MLA43515542917_092020-O.webp',
            valor: 350
        },
        {
            imageURL: 'https://http2.mlstatic.com/D_Q_NP_840942-MLA40352270195_012020-AB.webp',
            valor: 125
        }
    ]); 
    
    const [descripcionError, setDescripcionError] = useState("");

    const [montoGastado, setMontoGastado] = useState(475);

    const [ids, setIds] = useState("");
    const handleChangeIds = (e) => setIds(e.target.value);

    const [monto, setMonto] = useState("");
    const handleChangeMonto = (e) => setMonto(e.target.value);

    const [disabledButton, setDisabledButton] = useState(false);
      
    async function calculateCoupon(){
        setDisabledButton(true);
        try{
            setDescripcionError("");
            console.log("Calculando cupon...");

            if(monto === ""){
                throw new Error("ERROR_VALUE_NOT_VOID"); 
            }
            if(Number.isNaN(Number(monto))){
                throw new Error("ERROR_VALUE_NOT_NUMERIC"); 
            }

            let newIds = ids.replaceAll(" ","").replaceAll("-","");
            setIds(newIds);
            console.log("Ids: " + newIds);
            console.log("Monto: " + monto);
            
            let objectRequest = {
                item_ids: newIds.split(","),
                amount: monto
            };

            let response = await axios.post(`${URL_BASE_BE}/coupon`, objectRequest);
            console.log(response);
            let newItems = [];
            for (let i = 0; i < response.data.item_ids.length; i++) {
                const itemId = response.data.item_ids[i];
                let responseApiMeli = await axios.get(`${URL_BASE_API_MELI}/items/${itemId}`);
                console.log(responseApiMeli.data);
                newItems.push({
                    imageURL: responseApiMeli.data.pictures[0].secure_url,
                    valor: responseApiMeli.data.base_price
                });
            }

            setMontoGastado(response.data.total);
            setItems(newItems);         
        }catch(e){
            if(e.response != null && e.response.status === 404){
                setDescripcionError("El monto del cupón tiene que ser suficiente para comprar al menos un producto.");
            }else{
                if(e.message === "ERROR_VALUE_NOT_NUMERIC"){
                    setDescripcionError("El valor del cupón tiene que ser numérico.");
                } else if (e.message === "ERROR_VALUE_NOT_VOID"){
                    setDescripcionError("El valor del cupón no puede estar vacío.");
                } else{
                    setDescripcionError("Ups algo salió mal. Inténtelo nuevamente en unos minutos.");
                }
            }
        }
        setDisabledButton(false);
    }

    return(
        <section>
            <div className="row justify-content-center">
                <div className="regalo col-12 col-md-6">
                    <img src="/Regalo.png" alt="regalo"></img>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="agradecimiento col-12 col-md-6">
                    <p>Gracias por elegirnos continuamente<br></br>Queremos recompensarte con un cupón por ${monto}</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="titulo-productos col-12 col-md-6">
                    <p>Lo podrás canjear por los siguientes productos</p>
                    <p>Monto Gastado <span className="monto-gastado">${montoGastado}</span></p>
                </div>
            </div>
            <div className="container-products row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="row"> 
                        <div className="col-12">
                            <div className="row">
                                {
                                    items.length !== 0 && items.map((item, index )=> (
                                        <div key={index} className="prod col-11 col-md-5">
                                            <div className="row">
                                                <div className="col-12 prod-img img-uno">
                                                    <img src={item.imageURL} alt="item"></img>
                                                </div>
                                            </div>
                                            <div className="row prod-precio align-items-center">
                                                <div className="col-12">
                                                    <span>${item.valor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="simulador" className="row justify-content-center">
                <div className="descrip-ids col-12 col-md-8">
                    <span>Ingresá los ids de productos separados por coma para realizar tu simulación</span>
                </div>
                <div className="col-12 col-md-8">
                    <textarea placeholder="MLA-656039997,MLA-839687279,MLA-821267729" value={ids} onChange={handleChangeIds}>

                    </textarea>
                </div>
                <div className="valor-cupon col-12 col-md-8">
                    <span>Valor del cupón</span><input type="text" placeholder="600" value={monto} onChange={handleChangeMonto}/>
                </div>
                <div className="btn-calcular-cupon col-12 col-md-8">
                    <p>{descripcionError}</p>
                    { !disabledButton && 
                        <button className="btn btn-primary" type="button" onClick={calculateCoupon}>Calcular cupón</button>
                    }
                    { disabledButton && 
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Calculando...
                        </button>
                    }
                </div>
            </div>
            
        </section>
    );   
}

export default CuponComponent;