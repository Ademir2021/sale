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
                    className="d-flex mt-1 mt-lg-0"
                >
                    <input
                        className='search-item-input'
                        placeholder="Pesquisar na loja"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <button
                        className='btn-search'
                        onClick={onSubmit}
                    ><img src='img/icons8-pesquisar.png'
                        className='search-items-img'></img></button>
                </form>
            </div>
        </>
    )
}