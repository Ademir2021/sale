import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import * as Icon from 'phosphor-react';

// import './css/styles.css'
import './css/cards-carousel.css'
import { TItens, TProduct, TSector, TSubSector } from '../../useCases/products/type/TProducts';
import { HandleItens } from '../home/handleItens/HandleItens';

type Props = {
    listProd: TProduct[]
    handleNewItem: Function;
    tItem?: number;
    nameBrands: Function
    nameSubSector: Function
    sectors: TSector[]
    subSectors: TSubSector[]
    nameUniMeds: Function
    itens: TItens[]
    newItem: TItens
}

const CardsCarousel: React.FC<Props> = ({
    listProd,
    handleNewItem,
    nameBrands,
    nameSubSector,
    sectors,
    subSectors,
    nameUniMeds,
    itens,
    newItem
}: Props) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };
        const handleItens = new HandleItens()
    return <div className='card-carousel'>
        <div className='card-title'>Produtos com os melhores preços</div>
        {listProd.length > 0 &&  <Carousel
            prevIcon={<Icon.CaretDoubleLeft alt='Voltar' size={32} color='blue' />}
            nextIcon={<Icon.CaretDoubleRight alt='Proximo' size={36} color='blue' />}
            variant='' //dark
            activeIndex={index}
            onSelect={handleSelect}>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                    Item.fk_sub_sector === 1 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                    Item.fk_sub_sector === 2 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                 Item.fk_sub_sector === 3 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                       Item.fk_sub_sector === 4 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                       Item.fk_sub_sector === 5 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                     Item.fk_sub_sector === 6 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                      Item.fk_sub_sector === 7 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                     Item.fk_sub_sector === 8 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            <Carousel.Item interval={800}>
                {listProd.map((Item) => (
                      Item.fk_sub_sector === 9 &&
                 handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
                ))}
            </Carousel.Item>
            {/* <Carousel.Caption>
</Carousel.Caption> */}
        </Carousel>}
        </div>
}

export { CardsCarousel }