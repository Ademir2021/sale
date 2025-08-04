import * as Icon from 'phosphor-react';

import './css/filter-itens.css'
import './css/search-itens.css'

type Props = {
    onSubmit: any
    handleChange: any
    listProd: any
}

export function FilterItens({
    onSubmit,
    handleChange,
    listProd
}: Props) {

    const subject = "Com base em sua pesquisa item não localizado. Tente novamente!"
    return (
        <>
            <div
                className="search-item-main"
                id='filter-main'
            >
                {listProd.length === 0 ? <span id='filter-subject'>{subject}</span> : null}
                <form
                    onSubmit={onSubmit}
                    className="d-flex mt-1 mt-lg-0"
                >
                    <input
                        className='search-item-input'
                        placeholder="Pesquisar na loja"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <button className="btn-search">
                        <div className='search-items-img'>
                            {<Icon.MagnifyingGlass size={28} color='gray' />}
                        </div></button>
                </form>
            </div>
        </>
    )
}