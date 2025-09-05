import { TContaAPagar } from "../../useCases/contasAPagar/type/TContasAPagar"

type Props = {
    children: any
    handleChange: any
    handleSubmit: any
    contasApagar: TContaAPagar[]
}
export function NotaRecebidaContaAPagarForm({
    children,
    handleChange,
    handleSubmit,
    contasApagar
}: Props) {
    const contas_pagar = <table className='table bg-light mt-1'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td id="center">Tipo\Origem</td>
                <td id='center'>Parcela</td>
                <td id="center">Emissão</td>
                <td id="center">Vencimento</td>
                <td id="center">Valor</td>
                <td id="center">Observação</td>
            </tr>
        </thead>
        <tbody>
            {contasApagar.map((contaAPagar: TContaAPagar) => (
                <tr key={contaAPagar.id_conta}>
                    <th id="center">{contaAPagar.id_conta}</th>
                    <td id="center">{contaAPagar.tipo}</td>
                    <td id="center">{contaAPagar.parcela}</td>
                    <td id="center">{contaAPagar.emissao}</td>
                    <td id="center">{contaAPagar.vencimento}</td>
                    <td id="center">{contaAPagar.valor}</td>
                    <td id="center">{contaAPagar.observacao}</td>
                </tr>
            ))}
        </tbody>
    </table>
    return (
        <>
            <form className="form">
                <dd>Valor do título</dd>
                <input
                    type="number"
                    name="valor"
                    value={children.valor || ''}
                    onChange={handleChange}
                    placeholder="Digite o valor do titulo"
                />
                <dd>Vencimento</dd>
                <input
                    type='date'
                    name="vencimento"
                    value={(children.vencimento || null)}
                    onChange={handleChange}
                />
                <button
                    onClick={handleSubmit}
                >Inserir Titulos</button>
            </form>
        <div className="table-container" >{contasApagar.length > 0 && contas_pagar}</div>
        </>
    )
}