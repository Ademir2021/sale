import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro";
import { TContaAPagar, TValPago } from "../../useCases/contasAPagar/type/TContasAPagar"
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { handleLinksDir } from "../utils/backHome/BackHome";

import './css/styles.css'

type Props = {
    contasAPagar: TContaAPagar[]
    valoresPagos: TValPago[]
    pagarValor: any
    handleChangeValor: React.ChangeEventHandler<HTMLInputElement>
    handleChangeDesconto: React.ChangeEventHandler<HTMLInputElement>
    msg: string
    submitContasAPagarRegister: any
    submitInserirValor: any
    submitfluxoDeCaixa: any
    saldo: number
    findNameDespesa: any // (id: number)
    token:string | any
}

function ContasAPagarForm({
    contasAPagar,
    pagarValor,
    handleChangeValor,
    handleChangeDesconto,
    valoresPagos,
    msg,
    submitContasAPagarRegister,
    submitInserirValor,
    submitfluxoDeCaixa,
    saldo,
    findNameDespesa,
    token
}: Props) {

    const handleContasAPagar = new HandleFinanceiro()

    const headerContasPagar =
        <dd>Contas a pagar em aberto.</dd>

    const sumbit =
        <div className="mb-1">
            <button
                className="btn btn-primary"
                id="m-2"
                onClick={submitContasAPagarRegister}
            >Emitir título</button>
            <button
                className="btn btn-primary"
                id="m-2"
                onClick={submitInserirValor}
            >Pagar</button>
            <button
                className="btn btn-primary"
                id="m-2"
                onClick={submitfluxoDeCaixa}
            >Fluxo de caixa</button>
            <div id="m-2"><b>Saldo à pagar </b>{currencyFormat(saldo)}</div>
            {token}
        </div>

    const inputPagarValor = <div>
        <input
            min={0}
            max={999}
            type="number"
            id="input-valor"
            placeholder="Informe o Valor a pagar"
            onChange={handleChangeValor}
        />
        <input
            min={0}
            max={999}
            type="number"
            id="input-valor"
            placeholder="Desconto"
            onChange={handleChangeDesconto}
        />
    </div>

    const listaContasPagar = <table className='table bg-light mt-1'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td>Tipo</td>
                <td id="center">BenefID</td>
                <td id="center">Compra</td>
                <td id="center">DespID</td>
                <td>Despesa</td>
                <td>Emissão</td>
                <td>Valor</td>
                <td>Vencimento</td>
                <td>Juros</td>
                <td>Multa</td>
                <td>Desconto</td>
                <td>Saldo</td>
                <td>Recebimento</td>
                <td>Pagamento</td>
                <td>Observação</td>
                <td>Receber</td>
            </tr>
        </thead>
        <tbody>
            {contasAPagar.map((conta: TContaAPagar) => (
                <tr key={conta.id_conta}>
                    <th id="center">{conta.id_conta}</th>
                    <td>{conta.tipo}</td>
                    <td id="center">{conta.fk_beneficiario}</td>
                    <td id="center">{conta.fk_compra}</td>
                    <td id="center">{conta.fk_despesa}</td>
                    <td>{findNameDespesa(conta.fk_despesa)}</td>
                    <td>{handleContasAPagar.formatDate(conta.emissao)}</td>
                    <td>{parseFloat(conta.valor).toFixed(3)}</td>
                    <td>{handleContasAPagar.formatDate(conta.vencimento)}</td>
                    <td>{parseFloat(conta.juros).toFixed(3)}</td>
                    <td>{parseFloat(conta.multa).toFixed(3)}</td>
                    <td>{parseFloat(conta.desconto).toFixed(3)}</td>
                    <td>{parseFloat(conta.saldo).toFixed(2)}</td>
                    <td>{parseFloat(conta.recebimento).toFixed(2)}</td>
                    <td>{conta.pagamento !== null ? handleContasAPagar.formatDate(conta.pagamento) : null}</td>
                    <td>{conta.observacao}</td>
                    <td><button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => pagarValor(conta)}
                    >Pagar</button></td>
                </tr>
            ))}
        </tbody>
    </table>

    const listaValoresPago = <table className='table bg-light mt-1'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td id="center">Conta</td>
                <td id="center">Compra</td>
                <td id="center">User</td>
                <td>Recebido</td>
                <td>Pagamento</td>
                <td>Descrição</td>
            </tr>
        </thead>
        <tbody>{valoresPagos.map((valPago: TValPago) => (
            <tr key={valPago.id_val}>
                <th id="center">{valPago.id_val}</th>
                <td id="center">{valPago.fk_conta}</td>
                <td id="center">{valPago.fk_compra}</td>
                <td id="center">{valPago.fk_user}</td>
                <td>{valPago.valor}</td>
                <td>{handleContasAPagar.formatDate(valPago.data_recebimento)}</td>
                <td>{valPago.descricao}</td>
            </tr>
        ))}</tbody>
    </table>

    return (

        <div className="container">
                  {handleLinksDir(
                            'dashboardefault',
                            'Painel',
                            '##',
                            'Financeiro',
                            '##',
                            'Contas a pagar'
                            )}
            {checkAdminPrivilege() == '2' && sumbit}
            <hr/>
            {headerContasPagar}
            {msg && <div>{msg}</div>}
            {checkAdminPrivilege() == '2' && inputPagarValor}
            {contasAPagar.length > 0 && listaContasPagar}
            {valoresPagos.length > 0 && listaValoresPago}
        </div>

    )
}

export { ContasAPagarForm }