import { useEffect, useState } from 'react';
import { TItens, TProduct, TSector, TSubSector, TUnMed } from '../../useCases/products/type/TProducts';
import { HandleProducts } from '../../useCases/products/HandleProduct';

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
    itens:TItens[]
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
    itens
}: Props) => {

    // const handleProducts: HandleProducts = new HandleProducts()


    const [itemImg,] = useState('./img/img_itens/sale_avatar.png');

    const valMin = (Item: TProduct) => {
        const valor: any = Item.val_min_product
        return <div className='itens-valor'>R$ {parseFloat(valor).toFixed(2)} <span className='itens-valor-vista'>á vista</span></div>
    }

    const valMax = (Item: TProduct) => {
        const installments = 4
        const installment = Item.val_max_product / installments
        return <div className='itens-valor-inst'>{installments}x de R$ {installment.toFixed(2)} no prazo</div>
    }

    const viewAmont = (Item: TProduct) => {
        for (let i of itens) {
            if (i.item === Item.id_product) {
                if (i.amount > 0)
                    return <label id='msg-green'><b>{i.amount}</b> {nameUniMeds(Item.fk_un_med)} no Carrinho</label>
            }
        }
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
        <form className='container-itens' key={Item.id_product}>
            <div className='main-itens'>
                <img className='itens-img' src={Item.image !== null ?
                    `./img/img_itens/${Item.image}` :
                    itemImg} alt='Imagem do Item' />
                <div className='container'>
                    <div className='itens-descric'>{Item.descric_product}</div>
                    {valMin(Item)}
                    {valMax(Item)}
                    {selectAmount}
                    <button onClick={(e: any) => {
                        e.preventDefault()
                        handleAddItem(Item)
                    }}
                        className='itens-btn'>Comprar agora</button>
                    {viewAmont(Item)}
                </div>
            </div>
        </form>
    )))}
    </>

    return <> {cardsProds} </>
}

export { ListItensComponent }


