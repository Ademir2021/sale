import moment from "moment";
import { TContaAreceber } from "../../contasAReceber/type/TContasAReceber";
import { TSale } from "../type/TSale";
import { TPagSeguroBoleto } from "../type/TPagSeguroBoleto";
import { TPagSeguroPix } from "../type/TPagSeguroPix";
import { TPagSeguroCard, TPagSeguroItems } from "../type/TPagSeguroCard";

class HandlePayment {

    clearSaleStorage(numNote: number) {
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

    private setPrazo(i: number) {
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

    handleInstallments(sale: TSale, cred: string, holder_id: string) {
        const installments = parseInt(sale.installments)
        let pay = parseFloat(sale.paySale) - sale.dinheiro - parseFloat(sale.disc_sale)
        sale.dinheiro = parseFloat(sale.dinheiro)
        if (pay > 0) {
            let valParc = pay / installments
            for (let i = 1; installments >= i; i++) {
                let contaReceber: TContaAreceber = {
                    id_conta: i,
                    fk_filial : sale.filial,
                    tipo : cred,
                    fk_venda : 0,
                    fk_user : sale.user.user_id,
                    parcela : i + '/' + installments,
                    valor : parseFloat(valParc.toFixed(3)),
                    multa : 0,
                    juros : 0,
                    desconto : 0,
                    emissao : new Date().toISOString(),
                    vencimento : this.setPrazo(i).toISOString(),
                    saldo : 0,
                    pagamento : null,
                    recebimento : 0,
                    observacao : holder_id,
                    fk_pagador : sale.person.fk_name_pers
                };
                sale.duplicatas.push(contaReceber)
            }
        }
    }

    pagSeguroItens(PagSeguro: TPagSeguroBoleto | TPagSeguroPix | TPagSeguroCard, SaleItens: TSale[] | any[]) {
        for (let i of SaleItens) {
            const newItem: TPagSeguroItems = {
                reference_id: i.item.toString(),
                name: i.descric.toString(),
                quantity: i.amount,
                unit_amount: i.valor.replace(/[.]/g, '')
            }
            PagSeguro.items.push(newItem)
        }
    };
}

export { HandlePayment }
