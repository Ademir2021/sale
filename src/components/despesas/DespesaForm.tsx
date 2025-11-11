import { TDespesa } from "../../useCases/contasAPagar/type/TContasAPagar"
import { HandleDespesa } from "../../useCases/despesas/handleDespesa"
import { handleLinksDir } from "../utils/backHome/BackHome"
import { CloseX } from "../utils/closeX/CloseX"

type Props = {
    children: TDespesa
    despesas: TDespesa[]
    handleChange: any
    handleSubmit: any
    despesaUpdate: Function
    setDespesa: Function
    listSetorDespesas: any
    findSetorDespesa: Function
    msg: string
}

const DespesaForm = ({
    children,
    despesas,
    handleChange,
    handleSubmit,
    despesaUpdate,
    setDespesa,
    listSetorDespesas,
    findSetorDespesa,
    msg
}: Props) => {

    const handleDespesa = new HandleDespesa()
    const text_title = '  Despesa'
    
    const emitirDespesa = <form onSubmit={handleSubmit} className="form" id="up_form_">
          <CloseX link='contas_pagar_register' />
          <label>{children.id === 0 ? 'Emitir' + text_title : 'Atualizar' + text_title} </label>
          <a href="setor_despesa">Setor</a>
        <input
            type="number"
            name="id"
            value={children.id || ""}
            onChange={handleChange}
            placeholder="ID"
            disabled
        />
        <input
            type="text"
            name="name"
            value={children.name || ""}
            onChange={handleChange}
            placeholder="Descrição da Despesa"
        />
        {listSetorDespesas}
        <button>{children.id === 0 ? 'Inserir' : 'Atualizar'}</button>
        {msg && <p className="m-2">{msg}</p>}
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Descrição da Despesa</th>
            <th className="text-center">IdSetor</th>
            <th>Nome do Setor e Tipo</th>
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
                    <th>{despesa.name}</th>
                    <th className="text-center">{despesa.fk_setor}</th>
                    <th>{findSetorDespesa(despesa).name + " - " + findSetorDespesa(despesa).tipo}</th>
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