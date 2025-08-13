import moment from "moment";
import { TContaAreceber } from "../../contasAReceber/type/TContasAReceber";
import { TSale } from "../type/TSale";

export function clearSaleStorage(numNote: number) {
    if (numNote !== 0) {
        setTimeout(() => {
            localStorage.removeItem('sl')
            localStorage.removeItem('i')
            localStorage.removeItem('c')
            localStorage.removeItem('t')
            localStorage.removeItem('s')
            localStorage.removeItem('id')
        }, 2000)
    }
};

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

export function handleInstallments(sale: TSale, cred: string, holder_id: string) {
    const installments = parseInt(sale.installments)
    let pay = parseFloat(sale.paySale) - sale.dinheiro - parseFloat(sale.disc_sale)
    sale.dinheiro = parseFloat(sale.dinheiro)
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
            contaReceber.fk_filial = sale.filial
            contaReceber.tipo = cred
            contaReceber.fk_venda = 0
            contaReceber.fk_user = sale.user.user_id
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
            contaReceber.observacao = holder_id
            contaReceber.fk_pagador = sale.person.fk_name_pers
            sale.duplicatas.push(contaReceber)
        }
    }
}