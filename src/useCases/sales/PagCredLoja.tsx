import { useState, useEffect } from "react";
import moment from 'moment-timezone';
import sale_JSON from "./sale.json"
import { TContaAreceber } from "../contasAReceber/type/TContasAReceber"
import { PagCredLojaForm } from "../../components/sales/PagCredLojaForm"
import { NavBar } from "../../components/navbar/Navbar";
import api from "../../services/api/api";

export function PagCredLoja() {
    const [sendSale, setSendSale] = useState<boolean>(false)
    const [numNote, setNumNote] = useState(0)
    const [sale, setSale] = useState(sale_JSON);
    const [msg, setMsg] = useState('')

    const msgSendSale = 'Sua compra já foi enviada.'
    const msgNoShopping = 'Sem compras para pagar.'

    const getSale = () => {
        const sale_store_res = localStorage.getItem('sl');
        if (sale_store_res) {
            const sales = JSON.parse(sale_store_res)

            setSale(sales)
            handleInstallments(sales)
        }
    };
    useEffect(() => {
        getSale()
    }, [])

    const setPrazo = (i: number) => {
        let days = 0
        if (i === 1)
            days = 30
        else if (i === 2)
            days = 60
        else if (i === 3)
            days = 90
        else if (i === 4)
            days = 120
        let prazo = moment(
            new Date()
        ).add(
            'days', days
        )
        return prazo
    }

    function handleInstallments(sales: any) {
        const installments = parseInt(sales.installments)
        let pay = parseFloat(sales.paySale) - sales.dinheiro - parseFloat(sales.disc_sale)
        sales.dinheiro = parseFloat(sales.dinheiro)
        if (pay > 0) {
            let valParc = pay / installments
            for (let i = 1; installments >= i; i++) {
                let contaReceber: TContaAreceber = {
                    id_conta: 0,
                    fk_filial: 0,
                    tipo: "",
                    fk_venda: 0,
                    fk_user: 0,
                    parcela: "",
                    valor: 0,
                    multa: 0,
                    juros: 0,
                    desconto: 0,
                    emissao: null,
                    vencimento: null,
                    saldo: 0,
                    pagamento: null,
                    recebimento: null,
                    observacao: "",
                    fk_pagador: 0
                };
                contaReceber.id_conta = i
                contaReceber.fk_filial = sales.filial
                contaReceber.tipo = 'Cred'
                contaReceber.fk_venda = 0
                contaReceber.fk_user = sales.user.user_id
                contaReceber.parcela = i + '/' + installments
                contaReceber.valor = parseFloat(valParc.toFixed(3))
                contaReceber.multa = 0
                contaReceber.juros = 0
                contaReceber.desconto = 0
                contaReceber.emissao = new Date().toISOString()
                contaReceber.vencimento = setPrazo(i).toISOString()
                contaReceber.saldo = 0
                contaReceber.pagamento = null
                contaReceber.recebimento = 0
                contaReceber.fk_pagador = sales.person.fk_name_pers
                sales.duplicatas.push(contaReceber)
            }
        }
    }
    async function registerSale() {
        await api.post('sale_register', sale)
            .then(response => {
                const res = response.data
                setNumNote(res)
            })
            .catch(error => console.log(error));
    };

    const handleSubmit = () => {
        if (sale.dinheiro != 0 || sale.duplicatas.length > 0) {
            if (sendSale === false) {
                registerSale()
                sale.duplicatas = []
                setSendSale(true)
            } else {
                setMsg(msgSendSale)
            }
        } else {
            setMsg(msgNoShopping)
        }
    }

    return (
        <>
            <NavBar />
            <PagCredLojaForm
                handleSubmit={handleSubmit}
                duplicatas={sale.duplicatas}
                toGoBackInvoiceSale={() => { window.location.replace('invoice_sales') }}
                URLNoteSubmit={numNote}
                dinheiro={sale.dinheiro}
                msg={msg}
            />
        </>
    )
}
