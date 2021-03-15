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
    
    const [montoGastado, setMontoGastado] = useState(475);

    const [ids, setIds] = useState("");
    const handleChangeIds = (e) => setIds(e.target.value);

    const [monto, setMonto] = useState("");
    const handleChangeMonto = (e) => setMonto(e.target.value);
      
    async function calculateCoupon(){
        try{
            console.log("Calculando cupon...");
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
            console.log(e);
        }
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
                    <p>Gracias por elegirnos continuamente<br></br>Queremos recompensarte con un cupon por $500</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="titulo-productos col-12 col-md-6">
                    <p>Lo podras canjear por los siguientes productos</p>
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
                    <span>Ingresá los ids de productos separados por coma para realizar tu simulacion</span>
                </div>
                <div className="col-12 col-md-8">
                    <textarea placeholder="MLA-656039997,MLA-839687279,MLA-821267729" value={ids} onChange={handleChangeIds}>

                    </textarea>
                </div>
                <div className="valor-cupon col-12 col-md-8">
                    <span>Valor del cupon</span><input type="text" placeholder="600" value={monto} onChange={handleChangeMonto}/>
                </div>
                <div className="btn-calcular-cupon col-12 col-md-8">
                    <button type="button" className="btn btn-primary" onClick={calculateCoupon}>Calcular cupon</button>
                </div>
            </div>
            
        </section>
    );   
}

export default CuponComponent;