import { TItens, TProduct, TSector, TSubSector, TUnMed } from '../../useCases/products/type/TProducts';
// import { HandleProducts } from '../../useCases/products/HandleProduct';

import './css/list-itens.css'
import { HandleItens } from './handleItens/HandleItens';

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

const ListItensComponent: React.FC<Props> = ({
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
    // const handleProducts: HandleProducts = new HandleProducts()
    const handleItens = new HandleItens()
    const cardsProds = <>{(listProd.map((Item: TProduct) => (
        handleItens.cards(Item, itens, nameUniMeds, handleNewItem, newItem)
    )))}
    </>
    return <><h3 className='text-center mt-2 mb-0'>Destaques</h3> {cardsProds} </>
}

export { ListItensComponent }


