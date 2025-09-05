import { TContaAreceber } from "../../useCases/contasAReceber/type/TContasAReceber"
import { Globais } from "../globais/Globais"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"
import * as Icon from 'phosphor-react';


type Props = {
    duplicatas: TContaAreceber[]
    handleSubmit: any
    URLNoteSubmit: number
    dinheiro: number
    msg: string
}

export function PagCredLojaForm({
    handleSubmit,
    duplicatas,
    URLNoteSubmit,
    dinheiro,
    msg
}: Props) {

    const handleContasAReceber = new HandleFinanceiro()

    const listDuplicatas =<div className="table-container">
            <table className='table'>
                <thead>
                    <tr>
                        <th id="center">ID</th>
                        <th id='center'>Pagador</th>
                        <th id="center">Emissão</th>
                        <th id="center">Valor</th>
                        <th id="center">Parcela</th>
                        <th id="center">Vencimento</th>
                    </tr>
                </thead>
                <tbody>
                    {duplicatas.map((dup: TContaAreceber) => (
                        <tr key={dup.id_conta}>
                            <th id="center">{dup.id_conta}</th>
                            <th id="center">{dup.fk_pagador}</th>
                            <td id="center">{handleContasAReceber.formatDate(dup.emissao)}</td>
                            <td id="center">{dup.valor}</td>
                            <td id="center">{dup.parcela}</td>
                            <td id="center">{handleContasAReceber.formatDate(dup.vencimento)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    return <>
        <div className="form">
              <a href="invoice_sales">{<Icon.X size={18} color="gray" />}</a>
            <label>Crediário Loja</label>
            <p>Compra sujeita a aprovação do crediário! Caso seja sua primeira compra utilize pagamento com cartão, ou entre em <a href="contact">Contato</a> para detalhes sobre.</p>
            {dinheiro > 0 || duplicatas.length > 0 && <label>Forma de pagamento</label>}
            {dinheiro > 0 && <dd><label>Em dinheiro </label>{currencyFormat(dinheiro)}</dd>}
            {duplicatas.length > 0 && <label>Crediario Loja</label>}
            {duplicatas.length > 0 && listDuplicatas}
            {msg && <div id='msg-red'>{msg}</div>}
            <button className='m-3' onClick={handleSubmit}
            >Finalizar</button>
            <>{URLNoteSubmit > 0 && <a href="##" id='m-2'
                onClick={() => { window.location.replace(Globais.URL_NOTE + '/' + URLNoteSubmit) }}>{<Icon.Note size={32} />}Imprimir</a>}</>
        </div>
    </>
}