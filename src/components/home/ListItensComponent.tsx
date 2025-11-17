import { useEffect, useState } from 'react';
import { TItens, TProduct, TSector, TSubSector, TUnMed } from '../../useCases/products/type/TProducts';
import { HandleProducts } from '../../useCases/products/HandleProduct';

import './css/list-itens.css'
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';

type Props = {
    msg: string
    listProd: TProduct[]
    handleAddItem: Function;
    tItem?: number;
    setAmount: Function
    nameBrands: Function
    nameSubSector: Function
    sectors: TSector[]
    subSectors: TSubSector[]
    nameUniMeds: Function
}

const ListItensComponent: React.FC<Props> = ({
    msg,
    listProd,
    handleAddItem,
    setAmount,
    nameBrands,
    nameSubSector,
    sectors,
    subSectors,
    nameUniMeds,
}: Props) => {

    const handleProducts: HandleProducts = new HandleProducts()
    const [itemImg,] = useState('./img/img_itens/sale_avatar.png');

    const selectAmount = <>
        <select onChange={e => setAmount(parseInt(e.target.value))}
            className='select-amount'
            defaultValue={''}
        ><option disabled value={''}
        >Quantidade</option>
            <option>{1}</option>
            <option>{2}</option>
            <option>{3}</option>
            <option>{4}</option>
            <option>{5}</option>
            <option>{6}</option>
            <option>{7}</option>
            <option>{8}</option>
            <option>{9}</option>
            <option>{10}</option>
        </select></>

    const cardsProds = <> {(listProd.map((Item: TProduct) => (
        <div className='container-itens' key={Item.id_product}>
            <div className='main-itens'>
                <img className='itens-img' src={Item.image !== null ?
                    `./img/img_itens/${Item.image}` :
                    itemImg} alt='Imagem do Item' />
                    <div className='container'>
                    <div ><b>SKU </b>{String(Item.id_product).padStart(8, '0')}</div>
                <strong>{Item.descric_product}</strong>
                <div><b>Marca </b>{nameBrands(Item.fk_brand)}</div>
                <div><b>Sub </b>{nameSubSector(Item.fk_sub_sector)}</div>
                <div><b>Setor </b>{handleProducts.findSectorNameBySubSector(listProd, subSectors, sectors, Item.fk_sub_sector)}</div>
                <strong className='itens-valor'>R$ {currencyFormat(Item.val_max_product)}</strong>
                {!Item.amount && msg && <div id='msg-red'>{msg}</div>}
                    </div>
                {selectAmount}
                <button
                    className='mb-1'
                    onClick={(e: Event | any) => {
                        e.preventDefault()
                        handleAddItem(Item)
                    }}>Comprar</button>
                {Item.amount > 0 && <p><b>{Item.amount}</b> {nameUniMeds(Item.fk_un_med)} no Carrinho</p>}
                {Item.amount > 0 && <a href='pe'>Ir para o Carrinho</a>}
            </div>
        </div>
    )))}
    </>

    return <> {cardsProds} </>
}

export { ListItensComponent }


