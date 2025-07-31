import React from "react";
import { currencyFormat } from "../utils/currentFormat/CurrentFormat";
import { Globais } from "../globais/Globais";
import { NavBar } from "../navbar/Navbar";
import { TCard } from "../../useCases/sales/type/TSale";

import '../../index'
import './css/styles.css'

type PropsPagSeguroCardForm = {
    children:TCard
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    handleSubmit: any;
    paidSucess: string | number
    paid: number | null | undefined
    paySale: number | any
    URLNoteSubmit: number
    err: string
}

export function PagSeguroCardForm({
    children,
    handleChange,
    handleSubmit,
    paidSucess,
    paid,
    paySale,
    URLNoteSubmit,
    err
}: PropsPagSeguroCardForm) {

    return <>
        <div className="container">
            <NavBar />
        </div>
        <form onSubmit={handleSubmit} className="form">
            <h1>Cartões aceitos</h1>
            <dd>Aceitamos as principais bandeiras de cartão de crédito para a sua conveniência.</dd>
                   <img id='img-band-card'
                src="img/band_cartao_creditos.png"
                alt="Cartões aceitos"/>
            <b>Visa, MasterCard, American Express (AMEX), Elo, Hipercard, Discover, Diners Club.</b>
            <p>Você tambêm pode usar o seu cartão de debito ou outras opções de pagamento <a href="invoice_sales">on-line</a> disponíveis.</p>
            <input
                type="hidden"
                name="public_key"
                onChange={handleChange}
                value={children.public_key}
                disabled
            />
            <input
                type="text"
                name="holder"
                onChange={handleChange}
                value={children.holder}
                placeholder="Nome no cartão"
                required
            />
            <input
                type="text"
                name="number"
                onChange={handleChange}
                value={children.number}
                placeholder="Número no cartão"
                required
            />
            <div id="main-inputs-row" >
                <input
                    type="text"
                    name="ex_month"
                    onChange={handleChange}
                    value={children.ex_month}
                    placeholder="Dia valídade"
                    required
                />
                <input
                    type="text"
                    name="ex_year"
                    onChange={handleChange}
                    value={children.ex_year}
                    placeholder="Ano valídade"
                    required
                />
                <input
                    type="text"
                    name="secure_code"
                    onChange={handleChange}
                    value={children.secure_code}
                    placeholder="Código CVV"
                    required
                />
                <input
                    type="hidden"
                    name="encrypted"
                    onChange={handleChange}
                    value={children.encrypted}
                    disabled
                />
            </div>
            {paidSucess || paid && <label id='msg-red'>{paidSucess} {paid}</label>}
            {err && <label id="msg-red">{err}</label>}
            <label id='msg-green'>{!URLNoteSubmit ? currencyFormat(paySale) : null}</label>
            {!URLNoteSubmit && <button id='m-2'>Pagar Compra</button>}
            {URLNoteSubmit != 0 && <button id='m-2' onClick={() => { window.location.replace(Globais.URL_NOTE + '/' + URLNoteSubmit) }}>Emitir Nota</button>}
            {URLNoteSubmit != 0 && <button id='m-2' onClick={() => { window.location.replace('dashboardefault') }}>Sair</button>}
        </form>
    </>
}