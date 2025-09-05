import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro";
import { TContaAPagar, TValPago } from "../../useCases/contasAPagar/type/TContasAPagar"
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { handleLinksDir } from "../utils/backHome/BackHome";

import '../css/styles-forms.css'
import { NavBar } from "../navbar/Navbar";

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
    token: string | any
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

    const headerContasPagar = <b>Contas a Pagar em Aberto</b>

    const sumbit =
        <>
            <a href="##"
                id="m-2"
                onClick={submitContasAPagarRegister}
            >Emitir Título</a>
            <a href="##"
                id="m-2"
                onClick={submitInserirValor}
            >Pagar Valor</a>
            <a href="##"
                id="m-2"
                onClick={submitfluxoDeCaixa}
            >Fluxo de caixa</a>
            <div id="m-2"><b>Saldo à pagar </b>{currencyFormat(saldo)}</div>
        </>

    const inputPagarValor = <div id="main-inputs-row">
        <input
            id="main-input-number"
            min={0}
            max={999}
            type="number"
            placeholder="Informe o Valor"
            onChange={handleChangeValor}
        />
        <input
            id="main-input-number"
            min={0}
            max={999}
            type="number"
            placeholder="Desconto"
            onChange={handleChangeDesconto}
        />
    </div>

    const listaContasPagar = <table className='table'>
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
                <td>Pagar</td>
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
                    <td><a href="##" onClick={() => pagarValor(conta)} >Pagar</a></td>
                </tr>
            ))}
        </tbody>
    </table>

    const listaValoresPago = <table className='table'>
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
    return <> <NavBar />
        <div className="form">
            {handleLinksDir(
                'dashboardefault',
                'Painel',
                '##',
                'Financeiro',
                '##',
                'Contas a pagar'
            )}
            {checkAdminPrivilege() == '2' && sumbit}
            {headerContasPagar}
            {token}
            {msg && <div>{msg}</div>}
            {checkAdminPrivilege() == '2' && inputPagarValor}
        </div>
        {contasAPagar.length > 0 && <div className="table-container">{listaContasPagar}</div>}
        {valoresPagos.length > 0 && <div className="table-container">{listaValoresPago}</div>}
    </>
}

export { ContasAPagarForm }