import React from "react";
import { currencyFormat } from "../utils/currentFormat/CurrentFormat";
import { Globais } from "../globais/Globais";
import { NavBar } from "../navbar/Navbar";
import { TCard } from "../../useCases/sales/type/TPagSeguroCard";
import * as Icon from 'phosphor-react';

import '../../index'
import './css/styles.css'

type PropsPagSeguroCardForm = {
    children: TCard
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    handleSubmit: any
    paidSucess: string
    paid: number
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
            <a href="invoice_sales">{<Icon.X size={18} color="gray" />}</a>
            <label>Inserir Cartão de Crédito</label>
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
                placeholder="Nº do cartão"
                required
            />
            <div id="main-inputs-row" >
                <input
                    id="card-yy-aa"
                    type="text"
                    name="ex_month"
                    onChange={handleChange}
                    value={children.ex_month}
                    placeholder="MM"
                    required
                />
                <label className="p-1">/</label>
                <input
                    id="card-yy-aa"
                    type="text"
                    name="ex_year"
                    onChange={handleChange}
                    value={children.ex_year}
                    placeholder="AAAA"
                    required
                />
                <input
                    id="card-secure"
                    type="text"
                    name="secure_code"
                    onChange={handleChange}
                    value={children.secure_code}
                    placeholder="Cód. de segurança (CVV)"
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
            {paidSucess && <label id="msg-green">{paidSucess}</label>}
            {paid > 0 && <label id="msg-green">{paid}</label>}
            {err && <label id="msg-red">{err}</label>}
            <label id='msg-green'>{!URLNoteSubmit ? currencyFormat(paySale) : null}</label>
            {!URLNoteSubmit && <button id='m-2'>Pagar</button>}
            {URLNoteSubmit !== 0 && <a href="##" className='m-3' onClick={() => { window.location.replace(Globais.URL_NOTE + '/' + URLNoteSubmit) }}>{<Icon.Note size={32} />}Emitir Nota</a>}
            {URLNoteSubmit !== 0 && <a href="##" className='m-3' onClick={() => { window.location.replace('dashboardefault') }}>{<Icon.SignOut size={32} />}Sair</a>}
        </form>
    </>
}