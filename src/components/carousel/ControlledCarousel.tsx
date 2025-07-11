import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './css/styles.css'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };


  return (
        <Carousel
          prevIcon=''
          nextIcon=''
          variant='' //dark
          activeIndex={index}
          onSelect={handleSelect}>
          <Carousel.Item interval={800}>
            <a href='form_person'>
            <div id="carousel-item1">
              <h2>Realize suas compras aqui</h2>
              <p>Produtos com até 10% de desconto</p>
              <button className='btn btn-primary' onClick={() => { window.location.replace('form_person') }}>Cadastre-se</button>
            </div>
            </a>
          </Carousel.Item>

          <Carousel.Item interval={800}>
      <a href='contact'>
            <div id="carousel-item2">
              <h5>Como prefere receber a sua COMPRA</h5>
              <p>Retire na loja ou despachamos até sua localidade</p>
              <button className='btn btn-primary' onClick={() => { window.location.replace('contact') }}>Fale conosco</button>
              </div>
           </a> 
          </Carousel.Item>

          <Carousel.Item interval={800}>
            <a href='register'>
            <div id='carousel-item3'>
              <h2><>Acesso rápido e seguro</></h2>
              <p>WEB-token, confiança durante as suas compras</p>
              <button className='btn btn-primary' onClick={() => { window.location.replace('register') }}>Criar conta</button>
            </div>
            </a>
        
          </Carousel.Item>
          {/* <Carousel.Caption>
          </Carousel.Caption> */}
        </Carousel>
  )
}

export default ControlledCarousel