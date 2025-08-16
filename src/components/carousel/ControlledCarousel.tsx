import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import * as Icon from 'phosphor-react';

import './css/styles.css'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };
  return <>
    <Carousel
      prevIcon={<Icon.CaretDoubleLeft size={32} color='black' />}
      nextIcon={<Icon.CaretDoubleRight size={32} color='black' />}
      variant='' //dark
      activeIndex={index}
      onSelect={handleSelect}>
      <Carousel.Item interval={800}>
        <a href='form_person'><div>
          <img src='img/carousel/banner_ubiquiti.png'/>
          </div></a>
      </Carousel.Item>
      <Carousel.Item interval={800}>
        <a href='form_person'><div>
           <img src='img/carousel/banner_century.png'/>
          </div></a>
      </Carousel.Item>
      <Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
           <img src='img/carousel/banner_cftv.png'/>
            </div></a>
      </Carousel.Item>
       <Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
           <img src='img/carousel/banner_lan.png'/>
            </div></a>
      </Carousel.Item>
       <Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
           <img src='img/carousel/banner_compre_aqui.png'/>
            </div></a>
      </Carousel.Item>
       <Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
           <img src='img/carousel/banner_kits_ants_parabol.png'/>
            </div></a>
      </Carousel.Item>
             <Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
           <img src='img/carousel/banner1_maria.png'/>
            </div></a>
      </Carousel.Item>
      {/* <Carousel.Caption>
</Carousel.Caption> */}
    </Carousel>
  </>
}

export default ControlledCarousel