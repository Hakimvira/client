import { useEffect, useState } from "react"
import "../css/SQLForm.css"
import Axios from 'axios'

function PrinterForm(){
    const [printerid, setPrinterID] = useState(null);
    const [model, setModel] = useState(null);
    const [colour, setColour] = useState(null);
    const [type, setType] = useState(null);
    const [price, setPrice] = useState(null);

    const [printerList, setPrinterList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    useEffect(() => {
        getPrinters();
    },[])
    
    function getPrinters(){
        Axios.get('http://localhost:3001/printer').then((res)=> {
            setPrinterList(res.data);
        });
    }

    function sendButton(){
        const data = {
            printerid:printerid,
            model:model,
            colour:colour,
            type:type,
            price:price
        }

        Axios.post('http://localhost:3001/store_printer_info',data).then((res) => {
            if(res.data === "Inserted"){
                getPrinters();
            } else {
                respondError(res.data)
            }
        })
    }

    function deletePrinter(id){
        Axios.delete(`http://localhost:3001/delete_printer/${id}`).then((res) => {
            if(res.data === "deleted"){
                getPrinters()
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

    return(
        <div className="form">

            <div className="formBox">
                <div className="labelForm">
                    <label>PrinterID: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setPrinterID(event.target.value)}}
                    ></input>
                </div>
            </div>
            
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
                    <label>Colour: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}} 
                    type="text"
                    onChange={(event) => {setColour(event.target.value)}}
                    ></input>
                </div>
           </div>
           
           <div className="formBox">
                <div className="labelForm">
                    <label>Type: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="text"
                    onChange={(event) => {setType(event.target.value)}}
                    ></input>
                </div>
           </div>

           <div className="formBox">
                <div className="labelForm">
                    <label>Price (RM): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setPrice(event.target.value)}}
                    ></input>
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
                        <th><p>Printer ID</p></th>
                        <th><p>Model</p></th>
                        <th><p>Colour</p></th>
                        <th><p>Type</p></th>
                        <th><p>Price</p></th>
                        <th><p>Delete</p></th>
                    </tr>
                </tbody>

                {printerList.map((val,key) => {

                return(
                    <tbody key = {key}>
                        <tr>
                            <td><p>{val.PrinterID}</p></td>
                            <td><p>{val.Model}</p></td>
                            <td><p>{val.Colour}</p></td>
                            <td><p>{val.Type}</p></td>
                            <td><p>{val.Price}</p></td>
                            <td className="deleteColumn">
                                <button onClick={() => {deletePrinter(val.PrinterID)}} className="deleteButton">
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

export {PrinterForm}