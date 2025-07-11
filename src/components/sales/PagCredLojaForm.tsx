import { TContaAreceber } from "../../useCases/contasAReceber/type/TContasAReceber"
import { Globais } from "../globais/Globais"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro"

import '../../index'

type Props = {
    duplicatas: TContaAreceber[]
    handleSubmit: any
    toGoBackInvoiceSale: any
    URLNoteSubmit: any
    dinheiro: number
    msg:string
}

export function PagCredLojaForm({
        handleSubmit,
        duplicatas,
        toGoBackInvoiceSale,
        URLNoteSubmit,
        dinheiro,
        msg
    }: Props) {

    const handleContasAReceber = new HandleFinanceiro()

    const listDuplicatas =
        <>
            <table className='table bg-light mt-1'>
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
        </>
    return (
        <>
        <hr></hr>
            <div id="container">
                <div id='main'>
                <h1 className="text-center">Crediário Loja</h1>
                {msg && <div id='msg-red'>{msg}</div>}
                <button
                    className="btn btn-primary"
                    id='m-2'
                    onClick={handleSubmit}
                >Finalizar compra</button>
                <button
                    className="btn btn-primary"
                    id="m-2"
                    onClick={toGoBackInvoiceSale}
                >Modificar forma de pagamento</button>
                {dinheiro > 0 || duplicatas.length > 0 ? <h1 className="mt-2">Forma de pagamento</h1>:<></>}
                {dinheiro > 0 && <dd><b>Em dinheiro: </b>{currencyFormat(dinheiro)}</dd>}
                {duplicatas.length > 0 && <b>Crediario Loja:</b>}
                {duplicatas.length > 0 && listDuplicatas}
                <>{URLNoteSubmit ? <button
                    className="btn btn-primary"
                    id='m-2'
                    onClick={() => { window.location.replace(Globais.URL_NOTE + '/' + URLNoteSubmit) }}>Imprimir compra</button> : null}</>
            </div>
                </div>       
        </>
    )
}