import { useEffect, useState, useContext } from "react"
import { TContaAPagar, TDespesa, TValPago } from "./type/TContasAPagar"
import { HandleFinanceiro } from "../../components/utils/financeiro/HandleFinanceiro"
import { ContasAPagarForm } from "../../components/contasAPagar/ContasAPagarForm"
import { getList, postAuthHandle } from "../../services/handleService"
import { AuthContext } from '../../context/auth'
import api from "../../services/api/api"
import { handleTokenMessage } from "../../services/handleEnsureAuth"

function ContasAPagar() {
    const [msg, setMsg] = useState('')
    const [valor, setValor] = useState(0)
    const [desconto, setDesconto] = useState(0)
    const handleContasAPagar = new HandleFinanceiro()
    const [contasAPagar, setContasAPagar] = useState<TContaAPagar[]>([])
    const [contasAPagar_, setContasAPagar_] = useState<TContaAPagar[]>([])
    const [valsPagos_, setValsPagos_] = useState<TValPago[]>([])
    const [valsPagos__] = useState<TValPago[]>([])
    const [valsPagos___, setValsPagos___] = useState<TValPago[]>([])
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

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

    useEffect(() => {
        async function getContasAPagar() {
            await postAuthHandle('contas_pagar_list', setTokenMessage, setContasAPagar_, isLogged)
            const contas_: TContaAPagar[] = []
            for (let conta of contasAPagar_)
                if (conta.saldo > 0 || conta.recebimento == 0) {
                    contas_.push(conta)
                    setContasAPagar(contas_)
                }
        }
        if (contasAPagar.length === 0) {
            getContasAPagar()
        }
    }, [contasAPagar_])

    useEffect(() => {
        async function getValsPagos() {
            await postAuthHandle('vals_pagos_list', setTokenMessage, setValsPagos___, isLogged)
            const vals: TValPago[] = []
            for (let val of valsPagos___)
                if (val.fk_user)
                    vals.push(val)
            setValsPagos_(vals)
        }
        getValsPagos()
    }, [valsPagos___])

    const updateContaPagar = async (conta: TContaAPagar) => {
        await api.put<TContaAPagar>('contas_pagar', conta)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        function calcContasAPagar() {
            for (let contaAPagar of contasAPagar) {
                const venc_original = new Date(contaAPagar.vencimento).getTime();
                const diaPagamento = new Date().getTime()
                if (venc_original < diaPagamento) { // se vencer calcular juros e multa
                    const difference = handleContasAPagar.dateDifference(venc_original, diaPagamento);
                    const diasCalcJuros: number | any = (difference.diffInDays).toFixed(0)
                    contaAPagar.juros = contaAPagar.valor !== 0.00 ? contaAPagar.valor * diasCalcJuros * (0.10 / 100) : 0.00
                    contaAPagar.multa = diasCalcJuros > 5 ? contaAPagar.valor * (3 / 100) : 0.00
                }
                const saldo =
                    parseFloat(contaAPagar.valor) -
                    parseFloat(contaAPagar.recebimento) +
                    parseFloat(contaAPagar.juros) +
                    parseFloat(contaAPagar.multa)
                contaAPagar.saldo = saldo.toFixed(3)
            }
        }
        calcContasAPagar();
    }, [contasAPagar])

    const registerValPago = async (valPago: TValPago) => {
        await api.post<TValPago>('val_pago', valPago)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log((error)))
    }

    function valsPagos(conta: TContaAPagar) {
        let id = 1
        let valPago: TValPago = {
            id_val: 0,
            fk_conta: 0,
            fk_compra: 0,
            fk_user: 0,
            valor: 0,
            data_recebimento: "",
            descricao: "",
            fk_person: 0,
            fk_despesa: 0
        }
        valPago.id_val = id++
        valPago.fk_conta = conta.id_conta
        if (conta.fk_compra !== null) {
            valPago.fk_compra = conta.fk_compra
        }
        else if (conta.fk_compra === null) {
            valPago.fk_compra = 0
        }
        valPago.fk_despesa = conta.fk_despesa
        valPago.fk_user = isLogged[0].id
        valPago.data_recebimento = new Date()
        valPago.valor = valor
        valPago.descricao = findNameDespesa(conta.fk_despesa)
        valPago.fk_person = 0
        valsPagos__.push(valPago)
        registerValPago(valPago)
    }

    function somaValsPago(conta: TContaAPagar) {
        let valRec: any = 0
        let soma = 0
        for (let valRecebido of valsPagos_) {
            if (valRecebido.fk_conta === conta.id_conta)
                valRec = valRecebido.valor
            soma += parseFloat(valRec)
        }
        return soma + valor
    }

    const pagarValores = async (conta: TContaAPagar) => {
        for (let contaAPagar of contasAPagar) {
            if (contaAPagar.id_conta === conta.id_conta) {
                const recebimento = await somaValsPago(conta)
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

    const handleSumbit = (conta: TContaAPagar) => {
        setMsg('')
        valsPagos(conta)
        pagarValores(conta)
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
            valoresPagos={valsPagos_}
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
        />
    )
}

export { ContasAPagar }