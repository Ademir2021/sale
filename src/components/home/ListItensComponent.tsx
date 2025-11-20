import { useState } from 'react';
import { TItens, TProduct, TSector, TSubSector, TUnMed } from '../../useCases/products/type/TProducts';
// import { HandleProducts } from '../../useCases/products/HandleProduct';

import './css/list-itens.css'

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
    newItem:TItens
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

    const viewAmount = (Item: TProduct) => {
        for (let i of itens) {
            if (i.item === Item.id_product) {
                if (i.amount > 0)
                    return <div id='msg-green'><b>{i.amount}</b>{nameUniMeds(Item.fk_un_med)} no Carrinho</div>
            }
        }
    }

    const selectAmount = (Item: TProduct) => {
        for (let i of itens)
            if (i.item === Item.id_product)
                return <select onChange={e => newItem.amount = parseInt(e.target.value)}
                    className='select-amount'
                    defaultValue={1}
                ><option disabled value={1}
                >Quantidades</option>
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
                    <option>{11}</option>
                    <option>{12}</option>
                </select>
    }

    const inputAmount = (Item: TProduct) => {
        for (let i of itens)
            if (i.item === Item.id_product)
                return <input
                    className='input-amount'
                    type='number'
                    pattern="[1-1000]*"
                    placeholder='Apenas números'
                    min={1}
                    max={1000}
                    value={newItem.amount || ''}
                    onChange={e => newItem.amount = parseInt(e.target.value)}
                />
    }

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
                    {viewAmount(Item)}
                    {newItem.amount > 11 || newItem.amount > 1 && newItem.amount < 12
                        ? inputAmount(Item) : selectAmount(Item)}
                    <button onClick={(e: any) => {
                        e.preventDefault()
                        handleNewItem(Item)
                    }}
                        className='itens-btn'>Comprar agora</button>
                </div>
            </div>
        </form>
    )))}
    </>
    
    return <> {cardsProds} </>
}

export { ListItensComponent }


