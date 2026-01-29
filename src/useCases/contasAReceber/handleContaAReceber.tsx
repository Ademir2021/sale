import { TContaAreceber, TReciboValRec, ContasAReceberSituacao } from "./type/TContasAReceber";

class HandleContaAReceber {

    clearFields(ContaAReceber: TContaAreceber) {
        const res: TContaAreceber = ({
            id_conta: 0,
            fk_filial: 0,
            tipo: "Leg",
            fk_venda: 0,
            fk_user: ContaAReceber.fk_user,
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
            fk_pagador: 0,
            situacao:ContasAReceberSituacao.Aberto
        });
        return res;
    }

    private bodyReceipt(receipt: TReciboValRec) {
        const line = "=".repeat(12)
        let res = process.env.REACT_APP_ADDRESS
        const resp: any = res?.split(',')
        let address = resp[0]
        let city = resp[1]
        const receiptTXT = `${process.env.REACT_APP_COMPANY}
CNPJ: ${process.env.REACT_APP_CNPJ}
${address}
${city.trim()}
FONE: ${process.env.REACT_APP_PHONE}
${line} / RECIBO / ${line}
ID: ${receipt.id}
Conta: ${receipt.conta}
Venda: ${receipt.venda}
Usuário: ${receipt.user}
Valor recebido: R$ ${receipt.valor}
Data: ${receipt.data_rec}
Descrição: ${receipt.descricao}

Cliente: ${receipt.nome_cliente}
CPF: ${receipt.cpf}

--------------------------------
Obrigado pela preferência!`;

        return receiptTXT
    }

    generateFileTXT(receipt: TReciboValRec, nameFile: string) {
        const res: any | TReciboValRec = this.bodyReceipt(receipt)
        const blob = new Blob([res], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = nameFile;
        a.click();
        URL.revokeObjectURL(url);
    }
}

export { HandleContaAReceber }