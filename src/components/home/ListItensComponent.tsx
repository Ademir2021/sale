import { useState } from 'react';
import { TProduct, TSector, TSubSector, TUnMed } from '../../useCases/products/type/TProducts';
import { HandleProducts } from '../../useCases/products/HandleProduct';
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import * as Icon from 'phosphor-react';

import './css/list-itens.css'

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

    const valMin = (Item: TProduct) => {
        return <div className='itens-valor'>{currencyFormat(Item.val_min_product)} á vista</div>
    }

    const valMax = (Item: TProduct) => {
        const installments = 4
        const installment = Item.val_max_product / installments
        return <div className='itens-valor'>{installments}x de R$ {installment} no cartão ou loja</div>
    }

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
                    <div className='itens-descric'>{Item.descric_product}</div>
                    {valMin(Item)}
                    {valMax(Item)}
                    {selectAmount}
                    <button
                        className='itens-btn'
                        onClick={(e: Event | any) => {
                            e.preventDefault()
                            handleAddItem(Item)
                        }}>Comprar agora</button>
                    {Item.amount > 0 && <p><b>{Item.amount}</b> {nameUniMeds(Item.fk_un_med)} no Carrinho</p>}
                </div>
            </div>
        </div>
    )))}
    </>

    return <> {cardsProds} </>
}

export { ListItensComponent }


