import { TValPago } from "../../useCases/contasAPagar/type/TContasAPagar"

type Props = {
    children: any
    handleChange: any
    handleSubmit: any
    valsPago: TValPago[]
}
export function NotaRecebidaValsPagoForm({
    children,
    handleChange,
    handleSubmit,
    valsPago
}: Props) {
    const duplicatas = <table className='table'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td id="center">Valor</td>
                <td id="center">Descrição</td>
            </tr>
        </thead>
        <tbody>
            {valsPago.map((contaAPagar: TValPago) => (
                <tr key={contaAPagar.id_val}>
                    <th id="center">{contaAPagar.id_val}</th>
                    <td id="center">{contaAPagar.valor}</td>
                    <td id="center">{contaAPagar.descricao}</td>
                </tr>
            ))}
        </tbody>
    </table>

    return <> <form className="form">
        <dd>Inserir valor em dinheiro</dd>
        <input
            type="number"
            name="valor"
            onChange={handleChange}
            value={children.valor || ''}
            placeholder="Valor em dinheiro"
        />
        <dd>Descrição</dd>
        <input
            type="text"
            name='descricao'
            onChange={handleChange}
            value={children.descricao}
            placeholder="Descrição do valor"
        />
        <button
            onClick={handleSubmit}
        >Inserir Valor
        </button>
    </form>
        <div className="table-container">{valsPago.length > 0 && duplicatas}</div>
    </>
}