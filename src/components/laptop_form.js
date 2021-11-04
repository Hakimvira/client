import { useEffect, useState } from "react"
import "../css/SQLForm.css"
import Axios from 'axios'

function LaptopForm(){
    const [laptopid, setLaptodId] = useState(null);
    const [model, setModel] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [ram, setRam] = useState(null);
    const [hardDisk, setHardDisk] = useState(null);
    const [screen, setScreen] = useState(null)
    const [price, setPrice] = useState(null);

    const [laptopList, setLaptopList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    useEffect(() => {
        getLaptops();
    },[])
    
    function getLaptops(){
        Axios.get('http://localhost:3001/laptop').then((res)=> {
            setLaptopList(res.data);
        });
    }

    function sendButton(){
        const data = {
            pcid:laptopid,
            model:model,
            speed:speed,
            ram:ram,
            hardDisk:hardDisk,
            screen:screen,
            price:price
        }

        Axios.post('http://localhost:3001/store_laptop_info',data).then((res) => {
            if(res.data === "Inserted"){
                getLaptops();
            } else {
                respondError(res.data)
            }
        })
    }

    function deleteLaptop(id){
        Axios.delete(`http://localhost:3001/delete_laptop/${id}`).then((res) => {
            if(res.data === "deleted"){
                getLaptops()
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
                    <label>PCID: </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setLaptodId(event.target.value)}}
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
                    <label>Speed (GHz): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}} 
                    type="number"
                    onChange={(event) => {setSpeed(event.target.value)}}
                    ></input>
                </div>
           </div>
           
           <div className="formBox">
                <div className="labelForm">
                    <label>RAM (GB): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setRam(event.target.value)}}
                    ></input>
                </div>
           </div>

           <div className="formBox">
                <div className="labelForm">
                    <label>Hard Disk (GB): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setHardDisk(event.target.value)}}
                    ></input>
                </div>
           </div>

           <div className="formBox">
                <div className="labelForm">
                    <label>Screen (Inch): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="number"
                    onChange={(event) => {setScreen(event.target.value)}}
                    ></input>
                </div>
           </div>

           <div className="formBox">
                <div className="labelForm">
                    <label>Price (RM): </label>
                </div>
                <div className="inputForm">
                    <input style={{width:"100%"}}
                    type="text"
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
                        <th><p>Laptop ID</p></th>
                        <th><p>Model</p></th>
                        <th><p>Speed</p></th>
                        <th><p>Ram</p></th>
                        <th><p>Hard Disk</p></th>
                        <th><p>Screen</p></th>
                        <th><p>Price</p></th>
                        <th><p>Delete</p></th>
                    </tr>
                </tbody>

                {laptopList.map((val,key) => {

                return(
                    <tbody key = {key}>
                        <tr>
                            <td><p>{val.LaptopID}</p></td>
                            <td><p>{val.Model}</p></td>
                            <td><p>{val.Speed}</p></td>
                            <td><p>{val.RAM}</p></td>
                            <td><p>{val.Hard_disk}</p></td>
                            <td><p>{val.Screen}</p></td>
                            <td><p>{val.Price}</p></td>
                            <td className="deleteColumn">
                                <button onClick={() => {deleteLaptop(val.LaptopID)}} className="deleteButton">
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

export {LaptopForm}