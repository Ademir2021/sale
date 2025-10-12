import { TBrand } from "../../useCases/products/type/TProducts"

type Props = {
    children: TBrand
    brands: TBrand[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateBrand: Function
    setBrand: Function
}

const BrandForm = ({
    brands,
    handleChange,
    children,
    handleSubmit,
    msg,
    updateBrand,
    setBrand
}: Props) => {

    const register = <form className="form" id="up_form_" onSubmit={handleSubmit}>
        <a href="form_product">Sair</a>
        <label>Nome da Marca</label>
        <input
            type="text"
            placeholder="Marca do Produto"
            name="name_brand"
            value={children.name_brand}
            onChange={handleChange}
            required
        />
        {msg && <dd>{msg}</dd>}
        <button className="container" >{children.id_brand == 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setBrand({
                        id_brand: 0,
                        name_brand: ''
                    })}>Cancelar</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Nome Marca</th>
            <th>Atualizar</th>
            <th>Cancelar</th>
        </tr>
    </thead>

    const listBrands = <table className="table">
        {brands.length > 0 ? thead : <p>Inlua uma Marca</p>}
        <tbody>
            {brands.map((sector: TBrand) => (
                <tr key={sector.id_brand}>
                    <th className="text-center">{sector.id_brand}</th>
                    <th>{sector.name_brand}</th>
                    <th><a href="#up_form_" onClick={() => updateBrand(sector)}>Atualizar</a></th>
                    <th><a href="##" onClick={() => setBrand({
                        id_brand: 0,
                        name_brand: ''
                    })}>Cancelar</a></th>
                </tr>
            ))}
        </tbody>
    </table>

    return (<>
        {register}
        <div className="container m-4">
            {listBrands}
        </div>
    </>
    )
}

export { BrandForm }