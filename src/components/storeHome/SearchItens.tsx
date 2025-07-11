import { TProduct, TSector } from '../../useCases/products/type/TProducts'

import './css/search-itens.css'

type Props = {
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    handleSubmit: React.FormEvent<HTMLFormElement> | undefined | any;
    descric: string;
    messageItems: string;
    selectSector: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    sectors: TSector[]
    products: TProduct[]
    checkSearch: boolean | any
    checkedSearch: boolean
}

export function SearchItens(props: Props) {
    return (
        <section className="search-item-main">
            <div className='checkbox-label'>
                <input
                    type='checkbox'
                    onChange={props.checkSearch}
                />
                {props.checkedSearch ?
                    ' Pesquisar por nome' :
                    ' Pesquisar por setor'}
            </div>
            {!props.checkedSearch ?
                <form onSubmit={props.handleSubmit} className="d-flex mt-1 mt-lg-0" role="search">
                    <datalist id='data-itens' ><select>{props.products.map((product: TProduct) => (
                        <option key={product.id_product}>
                            {product.descric_product}</option>))}
                    </select></datalist>
                    <select className='search-select' onChange={props.selectSector} >
                        <option>Todos</option>
                        {props.sectors.map((sector: TSector) => (
                            <option key={sector.id_sector}>
                                {sector.name_sector}</option>))}
                    </select>
                    <input className='search-item-input' type="search"
                        placeholder="Do que você precisa" aria-label="Search"
                        list='data-itens' name='descric' value={props.descric}
                        style={{ backgroundColor: 'white' }}
                        onChange={props.handleChange} />
                    <button className="btn-search" type="submit">
                        <img src='img/icons8-pesquisar.png'
                            className='search-items-img'></img></button>
                </form>
                : null}
            <strong className='search-items-message'>{props.messageItems}</strong>
        </section>
    )
}