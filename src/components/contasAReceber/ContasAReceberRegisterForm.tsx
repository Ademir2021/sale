import { HandleContaAReceber } from "../../useCases/contasAReceber/handleContaAReceber"
import { TContaAreceber } from "../../useCases/contasAReceber/type/TContasAReceber"
import { handleLinksDir } from "../utils/backHome/BackHome"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"
import { FormatDate } from "../utils/formatDate"

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
    handleTokenMessage
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
        <button className="container">{children.id_conta === 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => setContaAReceber(children)}>Cancelar</button>
        {msg && <p className='p-2 text-center'>{msg}</p>}
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th className="text-center">Venda</th>
            <th className="text-center">ID Pagador</th>
            <th>Emissão</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Pagamento</th>
            <th>Saldo</th>
            <th>Recebido</th>
            <th className="text-center">Atualizar</th>
            <th className="text-center">Cancelar</th>
        </tr>
    </thead>

    const listContasAReceber = <table className="table">
        {contasAReceber.length > 0 ? thead : <p>Inclua uma nova Conta a Receber</p>}
        <tbody>
            {contasAReceber.map((contaAReceber: TContaAreceber) => (
                <tr key={contaAReceber.id_conta}>
                    <th className="text-center">{contaAReceber.id_conta}</th>
                    <th className="text-center">{contaAReceber.fk_venda}</th>
                    <th className="text-center">{contaAReceber.fk_pagador}</th>
                    <th className="">{handleFinanceiro.formatDate(contaAReceber.emissao)}</th>
                    <th>{contaAReceber.valor}</th>
                    <th>{handleFinanceiro.formatDate(contaAReceber.vencimento)}</th>
                    <th>{contaAReceber.pagamento ? contaAReceber.pagamento : 'Em aberto'}</th>
                    <th>{contaAReceber.saldo}</th>
                    <th>{contaAReceber.recebimento}</th>
                    <th className="text-center"><a href="#up_form_" onClick={() => contaReceberUpdate(contaAReceber)}>Atualizar</a></th>
                    <th className="text-center"><a href="#up_form_" onClick={() => setContaAReceber(handleContaAReceber.clearFields(contaAReceber))}>Cancelar</a></th>
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