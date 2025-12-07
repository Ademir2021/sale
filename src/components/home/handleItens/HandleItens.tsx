import * as Icon from 'phosphor-react';
import { TItens, TProduct } from "../../../useCases/products/type/TProducts"

class HandleItens {

    private valMin = (Item: TProduct) => {
        const valor: any = Item.val_min_product
        return <div className='itens-valor'>R$ {parseFloat(valor).toFixed(2)} <span className='itens-valor-vista'>á vista</span></div>
    }

    private valMax = (Item: TProduct) => {
        const installments = 4
        const installment = Item.val_max_product / installments
        return <div className='itens-valor-inst'>{installments}x de R$ {installment.toFixed(2)} no prazo</div>
    }

    private viewAmount = (Item: TProduct, Itens: TItens[], nameUniMeds: Function) => {
        for (let i of Itens) {
            if (i.item === Item.id_product) {
                if (i.amount > 0)
                    return <div id='msg-green'><b>{i.amount}</b>{nameUniMeds(Item.fk_un_med)} no Carrinho</div>
            }
        }
    }

    private selectAmount = (Item: TProduct, Itens: TItens[], newItem: TItens) => {
        for (let i of Itens)
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

    inputAmount = (Item: TProduct, Itens: TItens[], newItem: TItens) => {
        for (let i of Itens)
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

    cards = (Item: TProduct, Itens: TItens[], nameUniMeds: Function, handleNewItem: Function, newItem: TItens) => {
        const itemImg = './img/img_itens/sale_avatar.png'
        return<>
             <div className='container-itens'>
            <div className='main-itens' key={Item.id_product}>
                <img className='itens-img' src={Item.image !== null ?
                    `./img/img_itens/${Item.image}` :
                    itemImg} alt='Imagem do Item' />
                <div className='itens-descric'>{Item.descric_product}</div>
                {this.valMin(Item)}
                {this.valMax(Item)}
                {this.viewAmount(Item, Itens, nameUniMeds)}
                {newItem.amount > 11 || newItem.amount > 1 && newItem.amount < 12
                    ? this.inputAmount(Item, Itens, newItem) : this.selectAmount(Item, Itens, newItem)}
                <button onClick={(e: any) => {
                    e.preventDefault()
                    handleNewItem(Item)
                }} className='itens-btn'>Comprar{<Icon.ShoppingCart size={26} />}</button>
            </div>
        </div>
        </>
    }
}

export { HandleItens }