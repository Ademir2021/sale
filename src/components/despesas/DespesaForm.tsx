import { TDespesa } from "../../useCases/contasAPagar/type/TContasAPagar"
import { HandleDespesa } from "../../useCases/despesas/handleDespesa"

type Props = {
    children: TDespesa
    despesas: TDespesa[]
    handleChange: any
    handleSubmit: any
    despesaUpdate: Function
    setDespesa: Function
}

const DespesaForm = ({
    children,
    despesas,
    handleChange,
    handleSubmit,
    despesaUpdate,
    setDespesa
}: Props) => {

    const handleDespesa = new HandleDespesa()

    const emitirDespesa = <form onSubmit={handleSubmit} className="form">
        <input
            type="number"
            name="id"
            value={children.id || ""}
            onChange={handleChange}
            placeholder="ID"
        />
        <input
            type="text"
            name="name"
            value={children.name || ""}
            onChange={handleChange}
            placeholder="Descrição da Despesa"
        />
        <button>{children.id  === 0 ? 'Inserir' : 'Atualizar'}</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th className="text-center">Despesa</th>
            <th className="text-center">IdSetor</th>
            <th className="text-center">Nome Setor</th>
            <th className="text-center">Atualizar</th>
            <th className="text-center">Cancelar</th>
        </tr>
    </thead>

    const listDespesas = <table className="table">
        {despesas.length > 0 ? thead : <p>Inclua uma nova Despesa</p>}
        <tbody>
            {despesas.map((despesa: TDespesa) => (
                <tr key={despesa.id}>
                    <th className="text-center">{despesa.id}</th>
                    <th className="text-center">{despesa.name}</th>
                    <th className="text-center">{despesa.fk_setor}</th>
                    <th className="text-center">{'setor XX'}</th>
                    <th className="text-center"><a href="#up_form_" onClick={() => despesaUpdate(despesa)}>Atualizar</a></th>
                    <th className="text-center"><a href="#up_form_" onClick={() => setDespesa(handleDespesa.clearField(despesa))}>Cancelar</a></th>
                </tr>
            ))}
        </tbody>
    </table>

    return <>
        {emitirDespesa}
        {listDespesas}
    </>
}

export { DespesaForm }