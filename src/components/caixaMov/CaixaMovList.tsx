import { TCaixaMov } from "../../useCases/caixaMov/type/TCaixaMov"
import { handleLinksDir } from "../utils/backHome/BackHome"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"


type Props = {
    caixaMov: TCaixaMov[]
    findNameMovCaixaDebito: any // (id:number)
    findNameMovCaixaCredito: any // (id:number)
    findVendaMovCaixaCredito: any //(id:number
}

export function CaixaMovListComp({
    caixaMov,
    findNameMovCaixaDebito,
    findNameMovCaixaCredito,
    findVendaMovCaixaCredito
}: Props) {

    const handleContasAReceber = new HandleFinanceiro()

          const links = <>
                    {handleLinksDir(
                        'dashboardefault',
                        'Painel',
                        '##',
                        'Financeiro',
                        '##',
                        'Caixa movimento'
                    )}
                    <>{<a href="contas_pagar">Contas a pagar</a>} {'<< Financeiro >>'}  <a href="contas_receber">Contas a receber</a></>
                </>

    const caixaMovList = <table className='table bg-light mt-1'>
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
    return (
        <>
         <div className='text-center'>{links}</div>
            <div className="container">
                <div className="mt-2">Caixa movimento</div>
                {caixaMovList}
            </div>
            </>
    )
}