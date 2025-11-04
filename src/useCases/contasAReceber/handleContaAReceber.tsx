import { TContaAreceber } from "./type/TContasAReceber";

class HandleContaAReceber {

    clearFields(ContaAReceber: TContaAreceber) {
        const res: TContaAreceber = ({
            id_conta: 0,
            fk_filial: 0,
            tipo: "Leg",
            fk_venda: 0,
            fk_user:ContaAReceber.fk_user,
            parcela: '1/1',
            valor: 0,
            multa: 0,
            juros: 0,
            desconto: 0,
            emissao: new Date().toISOString(),
            vencimento: '',
            saldo: 0,
            pagamento: null,
            recebimento: 0,
            observacao: "",
            fk_pagador: 0
        });
        return res;
    }
}

export { HandleContaAReceber }