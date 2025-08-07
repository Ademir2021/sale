import { TCaixaMov } from "../../useCases/caixaMov/type/TCaixaMov"
import { handleLinksDir } from "../utils/backHome/BackHome"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"


type Props = {
    caixaMov: TCaixaMov[]
    findNameMovCaixaDebito: Function //(id:number)
    findNameMovCaixaCredito: Function //(id:number)
    findVendaMovCaixaCredito: Function //(id:number)
    token: JSX.Element
}

export const CaixaMovListComp: React.FC<Props> = ({
    caixaMov,
    findNameMovCaixaDebito,
    findNameMovCaixaCredito,
    findVendaMovCaixaCredito,
    token
}: Props) => {

    const handleContasAReceber = new HandleFinanceiro()
    const headers = <div className="form">
        {handleLinksDir(
            'dashboardefault',
            'Painel',
            '##',
            'Financeiro',
            '##',
            'Caixa Movimento'
        )}
        {<a href="contas_pagar">Contas a Pagar</a>} {'<< Financeiro >>'}  <a href="contas_receber">Contas a Receber</a>
        <h1>Caixa Movimento</h1>
        <span>{caixaMov.length > 0 && "Saldo => R$ " + currencyFormat(caixaMov[0].saldo)}</span>
        {token}
    </div>

    const caixaMovList = <div className="table-container">
        <table className='table'>
            <thead>
                <tr>
                    <th id="center">ID</th>
                    <td id="">Emissão</td>
                    <td id="center">MovId</td>
                    <td id="">Movimentos</td>
                    <td id="center">Vendas</td>
                    <td id="center">D/C</td>
                    <td id="">Valor</td>
                    <td id="">Saldo</td>
                </tr>
            </thead>
            <tbody>
                {caixaMov.map((caixa: TCaixaMov) => (
                    <tr key={caixa.id_caixa}>
                        <th id="center">{caixa.id_caixa}</th>
                        <td>{handleContasAReceber.formatDate(caixa.data_recebimento)}</td>
                        <td id="center">{caixa.fk_val}</td>
                        <td id='center'>{caixa.debito !== null ?
                            findNameMovCaixaDebito(caixa.fk_val) :
                            findNameMovCaixaCredito(caixa.fk_val)}</td>
                        <td id="center">{findVendaMovCaixaCredito(caixa.fk_val) !==
                            undefined && caixa.credito !== null ?
                            findVendaMovCaixaCredito(caixa.fk_val) : null}</td>
                        <td id="center">{caixa.credito === null ? "D" : "C"}</td>
                        <td>{caixa.credito === null ?
                            parseFloat(caixa.debito).toFixed(2) :
                            parseFloat(caixa.credito).toFixed(2)}</td>
                        <td>{parseFloat(caixa.saldo).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    return <>
        {headers}
        {caixaMovList}
    </>
}