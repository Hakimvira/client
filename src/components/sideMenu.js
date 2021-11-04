import "../css/sideMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"

function SideMenu(props){
    return(
        <div className="sideMenu">
            <FontAwesomeIcon icon={faTimes} className="closeMenuIcon" onClick={() => {props.toggleMenu()}}/>

            <button onClick={()=>{props.formCallBack('product')}} className="menuButton">
                <p>Product</p>
            </button>

            <button onClick={()=>{props.formCallBack('pc')}} className="menuButton">
                <p>Pc</p>
            </button>

            <button onClick={()=>{props.formCallBack('laptop')}} className="menuButton">
                <p>Laptop</p>
            </button>

            <button onClick={()=>{props.formCallBack('printer')}} className="menuButton">
                <p>Printer</p>
            </button>
        </div>
    )
}

export {SideMenu}