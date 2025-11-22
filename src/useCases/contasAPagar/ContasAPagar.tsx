import { useEffect, useState, useContext } from "react"
import { TContaAPagar, TDespesa, TValPago } from "./type/TContasAPagar"
import { HandleFinanceiro } from "../../components/utils/financeiro/HandleFinanceiro"
import { ContasAPagarForm } from "../../components/contasAPagar/ContasAPagarForm"
import { getList, postAuthHandle } from "../../services/handleService"
import { AuthContext } from '../../context/auth'
import api from "../../services/api/api"
import { handleTokenMessage } from "../../services/handleEnsureAuth"

function ContasAPagar() {
    const handleContasAPagar = new HandleFinanceiro()
    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
    const [msg, setMsg] = useState('')
    const [statusJurosEMulta, setStatusJurosEMulta] = useState<boolean>(false)
    const [contasAPagar, setContasAPagar] = useState<TContaAPagar[]>([])
    const [contasAPagarUser, setContasAPagarUser] = useState<TContaAPagar[]>([])
    const [desconto, setDesconto] = useState(0)
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const [valor, setValor] = useState(0)
    const [valsPagos] = useState<TValPago[]>([])
    const [valsPagosList, setValsPagosList] = useState<TValPago[]>([])
    const [valsPagosUser, setValsPagosUser] = useState<TValPago[]>([])

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusJurosEMulta(e.target.checked);
    };

    useEffect(() => {
        setTimeout(() => {
            setMsg('')
        }, 9000);
    }, [msg])

    useEffect(() => {
        getList('despesas', setDespesas)
    }, [despesas])

    function findNameDespesa(id: number) {
        for (let despesa of despesas) {
            if (despesa.id === id)
                return despesa.name
        }
    }

    async function getContasAPagar() {
        await postAuthHandle('contas_pagar_list', setTokenMessage, setContasAPagarUser, isLogged)
        const contas_: TContaAPagar[] = []
        for (let conta of contasAPagarUser)
            if (conta.saldo > 0 || conta.recebimento == 0) {
                contas_.push(conta)
                setContasAPagar(contas_)
            }
    }
    useEffect(() => {
        if (contasAPagar.length === 0)
            getContasAPagar()
    }, [contasAPagarUser])

    async function getValsPagos() {
        await postAuthHandle('vals_pagos_list', setTokenMessage, setValsPagosUser, isLogged)
        const vals: TValPago[] = []
        for (let val of valsPagosUser)
            if (val.fk_user)
                vals.push(val)
        setValsPagosList(vals)
    }
    useEffect(() => {
        getValsPagos()
    }, [valsPagosUser])

    const updateContaPagar = async (conta: TContaAPagar) => {
        await api.put<TContaAPagar>('contas_pagar', conta)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    function calcContasAPagar() {
        for (let contaAPagar of contasAPagar) {
            const venc_original = new Date(contaAPagar.vencimento).getTime();
            const diaPagamento = new Date().getTime()
            if (statusJurosEMulta === true) {
                if (venc_original < diaPagamento) { // se vencer calcular juros e multa
                    const difference = handleContasAPagar.dateDifference(venc_original, diaPagamento);
                    const diasCalcJuros: number | any = (difference.diffInDays).toFixed(0)
                    contaAPagar.juros = contaAPagar.valor !== 0.00 ? contaAPagar.saldo * diasCalcJuros * (0.10 / 100) : 0.00
                    contaAPagar.multa = diasCalcJuros > 5 ? contaAPagar.valor * (3 / 100) : 0.00
                }
            }
            const saldo =
                parseFloat(contaAPagar.valor) -
                parseFloat(contaAPagar.recebimento) +
                parseFloat(contaAPagar.juros) +
                parseFloat(contaAPagar.multa)
            contaAPagar.saldo = saldo.toFixed(3)
        }
    }
    useEffect(() => {
        calcContasAPagar();
    }, [contasAPagar, statusJurosEMulta])

    const registerValPago = async (valPago: TValPago) => {
        await api.post<TValPago>('val_pago', valPago)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log((error)))
    }

    function valsAPagar(Conta: TContaAPagar) {
        let id = 1
        let newValPago: TValPago = {
            id_val: id++,
            fk_conta: Conta.id_conta,
            fk_compra: Conta.fk_compra || 0,
            fk_user: isLogged[0].id,
            valor: valor,
            data_recebimento: new Date(),
            descricao:findNameDespesa(Conta.fk_despesa)  || '',
            fk_person: Conta.fk_beneficiario || 0,
            fk_despesa: Conta.fk_despesa || 0
        }
        valsPagos.push(newValPago)
        registerValPago(newValPago)
    }

    function somaValsPago(Conta: TContaAPagar) {
        let soma = valor || 0
        for (let valRecebido of valsPagosList) {
            if (valRecebido.fk_conta === Conta.id_conta) {
                const res: any = valRecebido.valor
                soma += parseFloat(res)
            }
        }
        return soma
    }

    const pagarValores = async (Conta: TContaAPagar) => {
        for (let contaAPagar of contasAPagar) {
            if (contaAPagar.id_conta === Conta.id_conta) {
                const recebimento = somaValsPago(Conta)
                contaAPagar.recebimento = recebimento
                contaAPagar.desconto = desconto
                const saldo =
                    parseFloat(contaAPagar.valor) -
                    parseFloat(contaAPagar.recebimento) +
                    parseFloat(contaAPagar.juros) +
                    parseFloat(contaAPagar.multa) -
                    parseFloat(contaAPagar.desconto)
                contaAPagar.saldo = saldo.toFixed(2)
                contaAPagar.juros = parseFloat(contaAPagar.juros).toFixed(2)
                contaAPagar.multa = parseFloat(contaAPagar.multa).toFixed(2)
                contaAPagar.desconto = parseFloat(contaAPagar.desconto).toFixed(2)
                contaAPagar.pagamento = handleContasAPagar.newData()
                await updateContaPagar(contaAPagar)
            }
        }
    }

    const handleSumbit = (Conta: TContaAPagar) => {
        setMsg('')
        valsAPagar(Conta)
        pagarValores(Conta)
        setValor(0)
    }

    function sumSaldoAPagar() {
        let saldo: number | any = 0
        if (contasAPagar) {
            for (let contaPagar_ of contasAPagar)
                saldo += parseFloat(contaPagar_.saldo)
            return saldo
        }
        else if (!contasAPagar)
            return 0
    }
    return (
        <ContasAPagarForm
            token={handleTokenMessage('contas_pagar', tokenMessage)}
            contasAPagar={contasAPagar}
            valoresPagos={valsPagosList}
            pagarValor={valor > 0 ? handleSumbit : () => { setMsg('Informe um novo valor') }}
            handleChangeValor={(e: any) => {
                setValor(parseFloat(e.target.value))
            }}
            handleChangeDesconto={(e: any) => {
                setDesconto(parseFloat(e.target.value))
            }}
            msg={msg}
            submitContasAPagarRegister={() => { window.location.assign("/contas_pagar_register") }}
            submitInserirValor={() => { window.location.assign("pagar_valor") }}
            submitfluxoDeCaixa={() => { window.location.assign("caixa_mov") }}
            saldo={sumSaldoAPagar()}
            findNameDespesa={findNameDespesa}
            handleChangeStatus={handleChangeStatus}
        />
    )
}

export { ContasAPagar }