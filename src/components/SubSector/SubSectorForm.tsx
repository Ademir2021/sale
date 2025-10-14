import { TSubSector } from "../../useCases/products/type/TProducts"
import { HandleSubSector } from "../../useCases/subSector/handleSubSector"

type Props = {
    children: TSubSector
    subSectors: TSubSector[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateSubSector: Function
    setSubSector: Function
    listSector:any
    selectedIdSector:number
    findNameSector:Function
}

const SubSectorForm = ({
    subSectors,
    handleChange,
    children,
    handleSubmit,
    msg,
    updateSubSector,
    setSubSector,
    listSector,
    selectedIdSector,
    findNameSector
}: Props) => {

     const handleSubSector = new HandleSubSector()

    const register = <form className="form" id="up_form_" onSubmit={handleSubmit}>
        <a href="form_product">Sair</a>
        <label>Nome do Sub Setor</label>
        <input
            type="text"
            placeholder="Sub Setor do Produto"
            name="name_sub_sector"
            value={children.name_sub_sector}
            onChange={handleChange}
            required
        />
          <label>Descrição do Sub Setor</label>
        <input
            type="text"
            placeholder="Descrição Sub Setor do Produto"
            name="description_sub_sector"
            value={children.description_sub_sector}
            onChange={handleChange}
            required
        />
        <label>ID do Setor Selecionado</label>
          <input
            type="text"
            placeholder="ID Setor Selecionado"
            // name="selectedIdSector"
            value={selectedIdSector}
            // onChange={handleChange}
            // required
            disabled
        />
        {listSector}
        {msg && <dd>{msg}</dd>}
        <button className="container" >{children.id_sub_sector == 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setSubSector(handleSubSector.clearFieldSubSector(children))}>Cancelar</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Nome Sub Setor</th>
            <th>Descrição</th>
            <th className="text-center">ID Setor</th>
            <th>Nome Setor</th>
            <th className="text-center">Atualizar</th>
            <th  className="text-center">Cancelar</th>
        </tr>
    </thead>

    const listSectors = <table className="table">
        {subSectors.length > 0 ? thead : <p>Inlua um SubSetor</p>}
        <tbody>
            {subSectors.map((subSector: TSubSector) => (
                <tr key={subSector.id_sub_sector}>
                    <th className="text-center">{subSector.id_sub_sector}</th>
                    <th>{subSector.name_sub_sector}</th>
                    <th>{subSector.description_sub_sector}</th>
                    <th className="text-center">{subSector.fk_sector}</th>
                    <th>{findNameSector(subSector)}</th>
                    <th className="text-center"><a href="#up_form_" onClick={() => updateSubSector(subSector)}>Atualizar</a></th>
                    <th className="text-center"><a href="##" onClick={() => setSubSector(handleSubSector.clearFieldSubSector(subSector))}>Cancelar</a></th>
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

export { SubSectorForm }