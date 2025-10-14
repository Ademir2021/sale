import { HandleFilial } from "../../useCases/filial/HandleFilial"
import { TFilial } from "../../useCases/filial/type/TFilial"
import { CloseX } from "../utils/closeX/CloseX"

type Props = {
    filial: TFilial
    filiais: TFilial[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateFilial: Function
    setFilial: Function
    listPerson: any
    selectedIdPerson: number
    findNamePerson: Function
}

const FilialForm = ({
    filial,
    filiais,
    handleChange,
    handleSubmit,
    msg,
    updateFilial,
    setFilial,
    listPerson,
    selectedIdPerson,
    findNamePerson
}: Props) => {

    const handleFilial = new HandleFilial()

    const register = (
        <form className="form" id="up_form_" onSubmit={handleSubmit}>
            <CloseX />
            <label>Filial</label>
            <input type="text" name="id_filial" value={filial.id_filial} onChange={handleChange} required disabled />

            <label>Data Abertura</label>
            <input
                type="text"
                name="created_at"
                value={filial.created_at || ''}
                onChange={handleChange}
                required
                disabled
            />
            <label>Última Alteração</label>
            <input
                type="text"
                name="updated_at"
                value={filial.updated_at || ''}
                onChange={handleChange}
                required
                disabled
            />
            <label>Nome da Filial da Empresa</label>
            <input
                type="text"
                name="name_filial"
                value={filial.name_filial}
                onChange={handleChange}
                required
                disabled
            />
            <label>Nome Fantasia da Empresa</label>
            <input
                type="text"
                name="fantasia"
                value={filial.fantasia}
                onChange={handleChange}
                required
            />
            <label>Endereço</label>
            <input
                type="text"
                name="address"
                value={filial.address}
                onChange={handleChange}
                required
                disabled
            />
            <label>CNPJ</label>
            <input
                type="text"
                name="cnpj"
                value={filial.cnpj}
                onChange={handleChange}
                required
                disabled />
            <label>Inscrição Estadual</label>
            <input
                type="text"
                name="inscric"
                value={filial.inscric}
                onChange={handleChange}
                required
                disabled
            />
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={filial.email}
                onChange={handleChange}
                required
            />
            <label>ID da Empresa/Cadastro Selecionado</label>
            <input
                type="text"
                value={selectedIdPerson}
                disabled
            />
            <label>Selecionar Cadastro</label>
            {listPerson}
            {msg && <dd>{msg}</dd>}
            <button className="container">
                {filial.id_filial == 0 ? 'Inserir' : 'Atualizar'}
            </button>
            <button
                className="container"
                type="button"
                onClick={() => setFilial(handleFilial.clearFieldFilial(filial))}
            >Cancelar</button>
        </form>
    );

    const thead = (
        <thead>
            <tr>
                <th className="text-center">ID</th>
                <th>Nome da Empresa</th>
                <th>Fantasia</th>
                <th>Endereço</th>
                <th>CNPJ</th>
                <th>Inscrição</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>ID</th>
                <th>Pessoa</th>
                <th className="text-center">Atualizar</th>
                <th className="text-center">Cancelar</th>
            </tr>
        </thead>
    );

    const listFiliais = (
        <table className="table">
            {filiais.length > 0 ? thead : <p>Inclua uma nova Filial</p>}
            <tbody>
                {filiais.map((filial: TFilial) => (
                    <tr key={filial.id_filial}>
                        <td className="text-center">{filial.id_filial}</td>
                        <td>{filial.name_filial}</td>
                        <td>{filial.fantasia}</td>
                        <td>{filial.address}</td>
                        <td>{filial.cnpj}</td>
                        <td>{filial.inscric}</td>
                        <td>{filial.phone}</td>
                        <td>{filial.email}</td>
                        <td className="text-center">{filial.fk_person}</td>
                        <td>{findNamePerson(filial)}</td>
                        <td className="text-center">
                            <a href="#up_form_" onClick={() => updateFilial(filial)}>Atualizar</a>
                        </td>
                        <td className="text-center">
                            <a href="##" onClick={() => setFilial(handleFilial.clearFieldFilial(filial))}>Cancelar</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    return (
        <>
            {register}
            <div className="container m-4">
                {listFiliais}
            </div>
        </>
    );
};

export { FilialForm }