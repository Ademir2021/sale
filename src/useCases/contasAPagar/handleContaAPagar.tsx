import { TContaAPagar } from "./type/TContasAPagar";

class HandleContaAPagar {
    clearFields(ContaAPagar: TContaAPagar) {
        const res: TContaAPagar = ({
            id_conta: 0,
            fk_filial: 0,
            tipo: "Desp",
            fk_compra: 0,
            fk_user: ContaAPagar.fk_user,
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
            fk_beneficiario: 0,
            fk_despesa: 1
        });
        return res
    }
}

export { HandleContaAPagar }