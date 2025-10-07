import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import * as Icon from 'phosphor-react';

import './css/styles.css'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const res_banners: any = process.env.REACT_APP_BANNERS
  const banners: [] = JSON.parse(res_banners)
  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };
  return <>
    {banners.length > 0 && <Carousel
      prevIcon={<Icon.CaretDoubleLeft size={32} color='black' />}
      nextIcon={<Icon.CaretDoubleRight size={32} color='black' />}
      variant='' //dark
      activeIndex={index}
      onSelect={handleSelect}>
      {banners.map((banner) => (<Carousel.Item interval={800}>
        <a href='form_person'>
          <div>
            <img src={'img/carousel/' + banner} />
          </div></a>
      </Carousel.Item>))}
      {/* <Carousel.Caption>
</Carousel.Caption> */}
    </Carousel>}
  </>
}

export default ControlledCarousel