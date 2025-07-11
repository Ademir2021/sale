import { TValPago } from "../../useCases/contasAPagar/type/TContasAPagar"

type Props = {
    children:any
    handleChange__:any
    handleSubmit:any
    valsPago:TValPago[]
}
export function NotaRecebidaValsPagoForm({
children,
handleChange__,
handleSubmit,
valsPago
}:Props){
    const body = <thead>
    <tr>
        <th id="center">ID</th>
        <td id="center">Valor</td>
        <td id="center">Descrição</td>
    </tr>
</thead>
    return(
        <>
        <div className="container-global">
            <div className="main-global">
                <form className="main-global-form">
                    <dd>Inserir valor em dinheiro</dd>
                    <input
                    type="number"
                    name="valor"
                    onChange={handleChange__}
                    value={children.valor || ''}
                    placeholder="Valor em dinheiro"
                    />
                    <dd>Descrição</dd>
                    <input
                    type="text"
                    name='descricao'
                    onChange={handleChange__}
                    value={children.descricao}
                    placeholder="Descrição do valor"
                    />
                    <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    >Inserir Valor
                    </button>
                </form>
            </div>
        </div>
        <table className='table bg-light mt-1'>
                { valsPago.length !== 0 ? body : null }
                <tbody>
                    { valsPago.length !== 0 ? valsPago.map((contaAPagar: TValPago) => (
                        <tr key={contaAPagar.id_val}>
                            <th id="center">{contaAPagar.id_val}</th>
                            <td id="center">{contaAPagar.valor}</td>
                            <td id="center">{contaAPagar.descricao}</td>
                        </tr>
                    )):null}
                </tbody>
            </table>
        </>
    )
}