import React, { useState, useRef } from 'react';
import { Modal } from '../../components/modal/Modal';

import '../../App.css';

export default function AppModal() {

const [dropdown, setDropdown] = useState(""); 
const modalRef = useRef<any>(null);

const showDropdown = () => {
console.log("show");
//se clicar no botão, modal aparece
setDropdown("show");
document.body.addEventListener("click", closeDropdown);
}

const toggleDropdown = () => {
console.log("show");
//se clicar no botão, modal aparece
setDropdown("show");
document.body.addEventListener("click", closeDropdown);
}

const closeDropdown = (event: { stopPropagation: () => void; target: any; }) => {
event.stopPropagation(); //impede de executar listeners dos filhos
const contain = modalRef.current.contains(event.target);
if (contain) { //se clicar fora do modal, ele DESaparece
  console.log("hidden");
  setDropdown("");
  document.body.removeEventListener("click", closeDropdown);
}
};

return (
<div className="App">
  <header className="App-header">
    <button onClick={showDropdown}>Click Here!</button>
    <Modal 
    className={dropdown} 
    modalRef={modalRef}
    close={showDropdown}
    />
  </header>
</div>
);
}


