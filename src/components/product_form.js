import { useEffect, useRef, useState } from "react"
import "../css/SQLForm.css"
import Axios from 'axios'

function ProductForm(){
    const [model, setModel] = useState("");
    const [manufacture, setManufacture] = useState("");
    const [type, setType] = useState("PC");
    const [productList, setProductList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    
    //sort 
    const sortModel = useRef(true);
    const sortManufacture = useRef(false);
    const sortType = useRef(false);

    useEffect(() => {
        getProduts();
    },[])

    function getProduts(){
        Axios.get('http://localhost:3001/products').then((res)=> {
            setProductList(res.data);
        });
    }

    function sendButton(){
        const data = {
            model:model,
            manufacture:manufacture,
            type:type
        }

        Axios.post('http://localhost:3001/store_product_info',data).then((res) => {
                if(res.data === "Inserted"){
                    getProduts()
                } else {
                    respondError(res.data)
                }
            }
        )
    }

    function deleteProduct(model){
        Axios.delete(`http://localhost:3001/delete_product/${model}`).then((res) => {
            if(res.data === "deleted"){
                getProduts()
            } else {
                respondError(res.data)
            }
        })
    }

    function respondError(error){
        setErrMessage(error);
        setShowError(true);

        setTimeout(() => {
            setShowError(false);
        }, 5000);
    }

    function sortByModel(){

        if(sortModel.current){
            let temp = [...productList].sort((b,a) => sortList(a,b,'Model'))
            setProductList(temp)
            sortModel.current = false
        } else {
            let temp = [...productList].sort((a,b) => sortList(a,b,'Model'))
            setProductList(temp)
            sortModel.current = true
        }

        sortManufacture.current = false;
        sortType.current = false
        
    }

    function sortByManufacture(){

        if(sortManufacture.current){
            let temp = [...productList].sort((b,a) => sortList(a,b,'Manufacture'))
            setProductList(temp)
            sortManufacture.current = false
        } else {
            let temp = [...productList].sort((a,b) => sortList(a,b,'Manufacture'))
            setProductList(temp)
            sortManufacture.current = true
        }

        sortModel.current = false;
        sortType.current = false
        
    }

    function sortByType(){

        if(sortType.current){
            let temp = [...productList].sort((b,a) => sortList(a,b,'Type'))
            setProductList(temp)
            sortType.current = false
        } else {
            let temp = [...productList].sort((a,b) => sortList(a,b,'Type'))
            setProductList(temp)
            sortType.current = true
        }

        sortManufacture.current = false;
        sortModel.current = false
        
    }
    

    function sortList(a,b,obj){
        let tempA = a[obj].toUpperCase();
        let tempB = b[obj].toUpperCase();

        return (tempA > tempB) ? 1 : ((tempB > tempA) ? -1 : 0 )
    }
    
    return(
        <div className="form">
            
           <div className="formBox">
                <div className="labelForm">
                    <label>Model: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="text"
                    onChange={(event) => {setModel(event.target.value)}}
                    ></input>
                </div>
           </div>

           <div className="formBox">
                <div className="labelForm">
                    <label>Manufacture: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}} 
                    type="text"
                    onChange={(event) => {setManufacture(event.target.value)}}
                    ></input>
                </div>
           </div>
           <div className="formBox">
                <div className="labelForm">
                    <label>Input: </label>
                </div>
                <div className="inputForm">
                    <select style={{width:"100%"}} onChange={(event) => {setType(event.target.value)}} value={type}>
                        <option value="PC">PC</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Printer">Printer</option>
                    </select>
                </div>
           </div>

           <div>
               <button onClick={sendButton} className="sendButton">
                   <p>Submit</p>
               </button>
           </div>

           {showError ? <p className="errMessage">{errMessage}</p> : null}

            <table className="dataTable">
                <tbody>
                    <tr>
                        <th onClick={() => sortByModel()}><p>Model</p></th>
                        <th onClick={() => sortByManufacture()} ><p>Manufacture</p></th>
                        <th onClick={() => sortByType()}><p>Type</p></th>
                        <th><p>Delete</p></th>
                    </tr>
                </tbody>
            
                {productList.map((val,key) => {

                return(
                    <tbody key = {key}>
                        <tr>
                            <td><p>{val.Model}</p></td>
                            <td><p>{val.Manufacture}</p></td>
                            <td><p>{val.Type}</p></td>
                            <td className="deleteColumn">
                                <button onClick={() => {deleteProduct(val.Model)}} className="deleteButton">
                                    <p>Delete</p>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
            })}

            </table>
        </div>
    )
}

export {ProductForm}