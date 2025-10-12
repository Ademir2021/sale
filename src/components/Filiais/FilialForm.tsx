import { TFilial } from "../../useCases/Filial/type/TFilial"

type Props = {
    children: TFilial
    filiais: TFilial[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateFilial: Function
    setFilial: Function
    listFilial: any
    selectedIdPerson: number
    findNamePerson: Function
}

const FilialForm = ({
    filiais,
    handleChange,
    children,
    handleSubmit,
    msg,
    updateFilial,
    setFilial,
    listFilial,
    selectedIdPerson,
    findNamePerson
}: Props) => {

    const register = <form className="form" id="up_form_" onSubmit={handleSubmit}>
        <a href="form_product">Sair</a>
        <label>Nome da Filial da Empresa</label>
        <input
            type="text"
            placeholder="Nome da Filial"
            name="name_filial"
            value={children.name_filial}
            onChange={handleChange}
            required
        />
        <label>Nome Fantasia da Empresa</label>
        <input
            type="text"
            placeholder="Nome Fantasia da Empresa"
            name="fantasia"
            value={children.fantasia}
            onChange={handleChange}
            required
        />
        <label>ID da Empresa/Pessoa Selecionada</label>
        <input
            type="text"
            placeholder="ID Empresa"
            // name="selectedIdSector"
            value={selectedIdPerson}
            // onChange={handleChange}
            // required
            disabled
        />
        {listFilial}
        {msg && <dd>{msg}</dd>}
        <button className="container" >{children.id_filial == 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setFilial({
            id_filial: 0,
            created_at: new Date(),
            updated_at: new Date(),
            name_filial: '',
            fantasia: '',
            address: '',
            cnpj: '',
            inscric: '',
            phone: '',
            email: '',
            fk_person: 0
        })}>Cancelar</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Nome da Empresa</th>
            <th>Fantasia</th>
            <th className="text-center">ID Setor</th>
            <th>Nome Setor</th>
            <th className="text-center">Atualizar</th>
            <th className="text-center">Cancelar</th>
        </tr>
    </thead>

    const listSectors = <table className="table">
        {filiais.length > 0 ? thead : <p>Inlua uma nova Filial</p>}
        <tbody>
            {filiais.map((filial: TFilial) => (
                <tr key={filial.id_filial}>
                    <th className="text-center">{filial.id_filial}</th>
                    <th>{filial.name_filial}</th>
                    <th>{filial.fantasia}</th>
                    <th className="text-center">{filial.fk_person}</th>
                    <th>{findNamePerson(filial)}</th>
                    <th className="text-center"><a href="#up_form_" onClick={() => updateFilial(filial)}>Atualizar</a></th>
                    <th className="text-center"><a href="##" onClick={() => setFilial({
                        id_filial: 0,
                        created_at: new Date(),
                        updated_at: new Date(),
                        name_filial: '',
                        fantasia: '',
                        address: '',
                        cnpj: '',
                        inscric: '',
                        phone: '',
                        email: '',
                        fk_person: 0
                    })}>Cancelar</a></th>
                </tr>
            ))}
        </tbody>
    </table>

    return (<>
        {register}
        <div className="container m-4">
            {listFilial}
        </div>
    </>
    )
}

export { FilialForm }