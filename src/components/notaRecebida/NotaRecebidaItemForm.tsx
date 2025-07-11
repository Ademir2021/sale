import { TItems } from "../../useCases/notaRecebida/type/TNotaRecebida"
import { TProduct } from "../../useCases/products/type/TProducts"
type Props = {
    children: any
    products: TProduct[]
    handleSubmit: any
    handleChange: any
    items: TItems[]
    msg: string
}
export function NotaRecebidaItemForm(
    {
        children,
        products,
        handleSubmit,
        handleChange,
        items,
        msg
    }: Props
) {
    const body = <thead>
        <tr>
            <th id="center">ID</th>
            <td id="center">Tipo</td>
            <td id="center">Item</td>
            <td id="center">Descrição</td>
            <td id="center">Quantidade</td>
            <td id="center">Unitario</td>
            <td id="center">Total</td>
        </tr>
    </thead>
    return (
        <>
            <div className="container-global">
                <div className="main-global">
                    <form className="main-global-form">
                        <datalist id="data-itens">
                            <select>{products.map((product:TProduct) => (
                                <option key={product.id_product}>
                                    {product.descric_product}</option>))}
                            </select>
                        </datalist>
                        <input
                            type="search"
                            list="data-itens"
                            name="descric"
                            value={children.descric || ''}
                            onChange={handleChange}
                            placeholder="Item"
                        />
                        <input
                            type="number"
                            name="quantidade"
                            value={children.quantidade || ''}
                            onChange={handleChange}
                            placeholder="Quantidade"
                        />
                        <input
                            type="number"
                            name="total"
                            onChange={handleChange}
                            value={children.total || ''}
                            placeholder="Total"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >Inserir Items</button>
                    </form>
                    <>{msg}</>
                </div>
            </div>
            <table className='table bg-light mt-1'>
                {items.length > 0 ? body : null}
                <tbody>
                    {items.length > 0 ? items.map((item: TItems) => (
                        <tr key={item.id}>
                            <th id="center">{item.id}</th>
                            <td id="center">{item.tipo}</td>
                            <td id="center">{item.item}</td>
                            <td id="center">{item.descric}</td>
                            <td id="center">{item.quantidade}</td>
                            <td id="center">{item.unitario}</td>
                            <td id="center">{item.total}</td>
                        </tr>
                    )): null}
                </tbody>
            </table>
        </>
    )
}