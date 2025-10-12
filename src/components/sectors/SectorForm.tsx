import { TSector } from "../../useCases/products/type/TProducts"

type Props = {
    children: TSector
    sectors: TSector[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateSector: Function
    setSector: Function
}

const SectorForm = ({
    sectors,
    handleChange,
    children,
    handleSubmit,
    msg,
    updateSector,
    setSector
}: Props) => {

    const register = <form className="form" id="up_form_" onSubmit={handleSubmit}>
        <a href="form_product">Sair</a>
        <label>Nome do Setor</label>
        <input
            type="text"
            placeholder="Setor do Produto"
            name="name_sector"
            value={children.name_sector}
            onChange={handleChange}
            required
        />
        {msg && <dd>{msg}</dd>}
        <button className="container" >{children.id_sector == 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setSector({
                        id_sector: 0,
                        name_sector: ''
                    })}>Cancelar</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Nome Setor</th>
            <th>Atualizar</th>
            <th>Cancelar</th>
        </tr>
    </thead>

    const listSectors = <table className="table">
        {sectors.length > 0 ? thead : <p>Inlua um Setor</p>}
        <tbody>
            {sectors.map((sector: TSector) => (
                <tr key={sector.id_sector}>
                    <th className="text-center">{sector.id_sector}</th>
                    <th>{sector.name_sector}</th>
                    <th><a href="#up_form_" onClick={() => updateSector(sector)}>Atualizar</a></th>
                    <th><a href="##" onClick={() => setSector({
                        id_sector: 0,
                        name_sector: ''
                    })}>Cancelar</a></th>
                </tr>
            ))}
        </tbody>
    </table>

    return (<>
        {register}
        <div className="container m-4">
            {listSectors}
        </div>
    </>
    )
}

export { SectorForm }