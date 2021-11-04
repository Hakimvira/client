import './App.css';
import { SideMenu } from './components/sideMenu';
import {ProductForm} from './components/product_form'
import {PCForm} from './components/pc_form'
import { useState } from 'react';
import {LaptopForm} from './components/laptop_form'
import {PrinterForm} from './components/printer_form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [showForm , setShowForm] = useState('product');
  const [showMenu , setShowMenu] = useState(false);

  function formCallBack(formName){

    setShowForm(formName);

  }

  function openForm(formName){
    if(formName === 'product'){

      return <ProductForm></ProductForm>

    } else if (formName === 'pc'){

      return <PCForm></PCForm>

    } else if (formName === 'laptop'){

      return <LaptopForm></LaptopForm>

    } else if (formName === 'printer'){

      return <PrinterForm></PrinterForm>

    } else {

      return null;

    }
  }

  function toggleMenu(){
    setShowMenu(!showMenu)
  }

  return (
    <div className="App">

      <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="menuIcon"/>

      {showMenu ? <SideMenu formCallBack={formCallBack} toggleMenu={toggleMenu}></SideMenu> : null}

      {openForm(showForm)}
     
    </div>
  );
}

export default App;
