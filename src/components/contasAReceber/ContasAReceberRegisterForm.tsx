import { HandleContaAReceber } from "../../useCases/contasAReceber/handleContaAReceber"
import { TContaAreceber } from "../../useCases/contasAReceber/type/TContasAReceber"
import { handleLinksDir } from "../utils/backHome/BackHome"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"

type Props = {
    children: TContaAreceber
    contasAReceber: TContaAreceber[]
    contaReceberUpdate: Function
    setContaAReceber: Function
    handleSubmit: any
    handleChange: any
    handleChangeStatus: any
    msg: string
    listPersons: any
    handleTokenMessage: any
    listSituacao:any
}

export function ContasAReceberRegisterForm({
    children,
    contasAReceber,
    contaReceberUpdate,
    setContaAReceber,
    handleSubmit,
    handleChange,
    handleChangeStatus,
    msg,
    listPersons,
    handleTokenMessage,
    listSituacao
}: Props) {

    const handleFinanceiro = new HandleFinanceiro()
    const handleContaAReceber = new HandleContaAReceber()

    const links = <>
        {handleLinksDir(
            'dashboardefault',
            'Painel',
            'contas_receber',
            'Financeiro',
            '##',
            'Emitir titulos a receber'
        )}
    </>

    const text_title = ' o Título de Conta a Receber'
    const emitirTitulo = <form onSubmit={handleSubmit} className="form" id="up_form_">
        <>{handleTokenMessage}</>
        <>{links}</>
        <p>{children.id_conta === 0 ? 'Emitir' + text_title : 'Atualizar' + text_title}</p>
        <input
            type="number"
            name="valor"
            value={children.valor || ""}
            onChange={handleChange}
            placeholder="Digite o valor"
        />
        <label>Multa</label>
        <input
            type="number"
            name="multa"
            value={children.multa || 0}
            onChange={handleChange}
            placeholder="Multa Aplicada"
        />
        <label>Juros</label>
        <input
            type="number"
            name="juros"
            value={children.juros || 0}
            onChange={handleChange}
            placeholder="Juros Aplicados"
        />
        <label>Desconto</label>
        <input
            type="number"
            name="desconto"
            value={children.desconto || 0}
            onChange={handleChange}
            placeholder="Desconto Concedido"
        />
        <label>Recebimentos</label>
        <input
            type="number"
            name="recebimento"
            value={children.recebimento || ""}
            onChange={handleChange}
            placeholder="Valores Recebidos"
        />
        <label>Saldo</label>
        <input
            type="number"
            name="saldo"
            value={children.saldo = children.valor - children.recebimento - children.desconto || 0}
            onChange={handleChange}
            placeholder="Valores Recebidos"
            disabled
        />
        <label>Vencimento</label>
        <input
            type="date"
            name="vencimento"
            onChange={handleChange}
        />
        <input
            type="text"
            name="observacao"
            value={children.observacao}
            onChange={handleChange}
            placeholder="Observação"
        />
        <>{listPersons}</>
        <>{listSituacao}</>
        <button className="container">{children.id_conta === 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setContaAReceber(children)}>Cancelar</button>
        {msg && <p className='p-2 text-center'>{msg}</p>}
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <td className="text-center">Venda</td>
            <td className="text-center">ID Pagador</td>
            <td>Emissão</td>
            <td>Valor</td>
            <td>Vencimento</td>
            <td>Pagamento</td>
            <td>Saldo</td>
            <td>Recebido</td>
            <td className="text-center">Atualizar</td>
            <td className="text-center">Cancelar</td>
            <td>Situação</td>
        </tr>
    </thead>

    const listContasAReceber = <table className="table">
        {contasAReceber.length > 0 ? thead : <p>Inclua uma nova Conta a Receber</p>}
        <tbody>
            {contasAReceber.map((contaAReceber: TContaAreceber) => (
                <tr key={contaAReceber.id_conta}>
                    <th className="text-center">{contaAReceber.id_conta}</th>
                    <td className="text-center">{contaAReceber.fk_venda}</td>
                    <td className="text-center">{contaAReceber.fk_pagador}</td>
                    <td className="">{handleFinanceiro.formatDate(contaAReceber.emissao)}</td>
                    <td>{contaAReceber.valor}</td>
                    <td>{handleFinanceiro.formatDate(contaAReceber.vencimento)}</td>
                    <td>{contaAReceber.pagamento ? contaAReceber.pagamento : 'Em aberto'}</td>
                    <td>{contaAReceber.saldo}</td>
                    <td>{contaAReceber.recebimento}</td>
                    <td className="text-center"><a href="#up_form_" onClick={() => contaReceberUpdate(contaAReceber)}>Atualizar</a></td>
                    <td className="text-center"><a href="#up_form_" onClick={() => setContaAReceber(handleContaAReceber.clearFields(contaAReceber))}>Cancelar</a></td>
                    <td>{contaAReceber.situacao || "Não Informada"}</td>
                </tr>
            ))}
        </tbody>
    </table>

    const statusTitulo = <div className="container">
        <input
            type="checkbox"
            name="statusTitulo"
            onChange={handleChangeStatus}
        />
        <label className="p-2">Listar Somente os Títulos em Abertos</label>
    </div>

    return <>
        {emitirTitulo}
        {statusTitulo}
        {listContasAReceber}
    </>
}