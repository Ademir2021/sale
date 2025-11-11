import { TSetorDespesa } from "../../useCases/contasAPagar/type/TContasAPagar"
import { HandleDespesa } from "../../useCases/despesas/handleDespesa"
import { CloseX } from "../utils/closeX/CloseX"

type Props = {
    children:TSetorDespesa
    setorDespesas:TSetorDespesa[]
    setSetorDespesa:Function
    handleChange:any
    handleSubmit:any
    listSetorDespesas:any
    setorDespesaUpdate:Function
    msg:string
}

const SetorDespesaForm = ({
    children,
    setorDespesas,
    setSetorDespesa,
    handleChange,
    handleSubmit,
    listSetorDespesas,
    setorDespesaUpdate,
    msg
}: Props) => {

    const handleDespesa = new HandleDespesa()
      const text_title = '  Setor da Despesa'

    const emitirSetorDespesa = <form onSubmit={handleSubmit} className="form">
         <CloseX link="despesa" />
          <label>{children.id === 0 ? 'Inserir' + text_title : 'Atualizar' + text_title} </label>
       {children.id !== 0 && <label>{"ID Setor: " + children.id}</label> }
        <label>Descrição do Setor para Despesas</label>
        <input
        type="text"
        name="name"
        value={children.name || ""}
         onChange={handleChange}
        placeholder="Descrição do Setor"
        />
        {listSetorDespesas}
        <button className="container">{children.id === 0 ? "Inserir" : 'Atualizar'}</button>
        <button onClick={()=>setSetorDespesa(handleDespesa.clearFieldSetorDespesa(children))} className="container">Cancelar</button>
        {msg && <p className="p-2">{msg}</p>}
    </form>

        const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Setor</th>
            <th>Tipo</th>
            <th className="text-center">Atualizar</th>
            <th className="text-center">Cancelar</th>
        </tr>
    </thead>

    const listSetorDespesa = <table className="table">
            {setorDespesas.length > 0 ? thead : <p>Inclua um novo Setor de Despesa</p>}
            <tbody>
                {setorDespesas.map((setorDespesa: TSetorDespesa | any) => (
                    <tr key={setorDespesa.id}>
                        <th className="text-center">{setorDespesa.id}</th>
                        <th>{setorDespesa.name}</th>
                        <th>{setorDespesa.tipo}</th>
                        <th className="text-center"><a href="#up_form_" onClick={() => setorDespesaUpdate(setorDespesa)}>Atualizar</a></th>
                        <th className="text-center"><a href="#up_form_" onClick={() => setSetorDespesa(handleDespesa.clearFieldSetorDespesa(setorDespesa))}>Cancelar</a></th>
                    </tr>
                ))}
            </tbody>
        </table>

    return <>
        {emitirSetorDespesa}
        {listSetorDespesa}
    </>

}

export { SetorDespesaForm }