import { useEffect, useState, useContext } from "react"
import { ContasAreceberForm } from "../../components/contasAReceber/ContasAReceberForm"
import { FormatDate } from "../../components/utils/formatDate"
import { HandleFinanceiro } from "../../components/utils/financeiro/HandleFinanceiro"
import { handleTokenMessage } from "../../services/handleEnsureAuth"
import { postAuthHandle } from "../../services/handleService"
import { TContaAreceber, TValsRecebidos } from "./type/TContasAReceber"
import { TPerson } from "../persons/type/TPerson"
import { TSaleList } from "../sales/type/TSale"

import { AuthContext } from '../../context/auth'

import api from "../../services/api/api"

const ContasAReceber: React.FC = () => {

    const { user: isLogged }: any = useContext(AuthContext);
    const handleContasAReceber = new HandleFinanceiro()

    const [msg, setMsg] = useState('')
    const [valor, setValor] = useState(0)
    const [desconto, setDesconto] = useState(0)
    const [statusJurosEMulta, setStatusJurosEMulta] = useState<boolean>(false)
    const [flagJuros, setFlagJuros] = useState(false)
    const [contasAReceber, setContasAReceber] = useState<TContaAreceber[]>([])
    const [openAccounts, setOpenAccounts] = useState<TContaAreceber[]>([])
    const [valsRecebido] = useState<TValsRecebidos[]>([])
    const [valsRecebidos, setValsRecebidos] = useState<TValsRecebidos[]>([])
    const [valsRecebidosAll, setValsRecebidosAll] = useState<TValsRecebidos[]>([])
    const [persons, setPersons] = useState<TPerson[]>([])
    const [sales, setSales] = useState<TSaleList[]>([]);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusJurosEMulta(e.target.checked);
    };

    useEffect(() => {
        setTimeout(() => {
            setMsg('')
        }, 9000);
    }, [msg])

    useEffect(() => {
        async function getContasAReceber() {
            await postAuthHandle('contas_receber_list', setTokenMessage, setContasAReceber, isLogged)
            const NewOpenAccounts: TContaAreceber[] = []
            for (let conta of contasAReceber)
                if (conta.saldo > 0 || conta.recebimento == 0) {
                    NewOpenAccounts.push(conta)
                }
            setOpenAccounts(NewOpenAccounts)
        }
        if (openAccounts.length === 0) {
            if(flagJuros === false)
            getContasAReceber()
        }
    }, [contasAReceber])

    useEffect(() => {
        async function getValsRecebidos() {
            await postAuthHandle('vals_recebidos_list', setTokenMessage, setValsRecebidosAll, isLogged)
            const vals: TValsRecebidos[] = []
            for (let val of valsRecebidosAll)
                if (val.fk_user)
                    vals.push(val)
            setValsRecebidos(vals)
        }
        getValsRecebidos()
    }, [valsRecebidosAll])

    const updateContaReceber = async (Conta: TContaAreceber) => {
        await api.put<TContaAreceber>('contas_receber', Conta)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    const getSaldo = (ContaAReceber: TContaAreceber) => {
        const saldo = parseFloat(ContaAReceber.valor || 0) -
            parseFloat(ContaAReceber.recebimento || 0) +
            parseFloat(ContaAReceber.juros || 0) +
            parseFloat(ContaAReceber.multa || 0)
        ContaAReceber.saldo = saldo.toFixed(3)
    }

    const calcContasAReceber = (OpenAccounts: TContaAreceber[]) => {
        for (let contaAReceber of OpenAccounts) {

            const venc_original = new Date(contaAReceber.vencimento).getTime();
            const diaPagamento = new Date().getTime()

            if (statusJurosEMulta === true) {
                if (venc_original < diaPagamento) { // se vencer calcular juros e multa
                    const difference = handleContasAReceber.dateDifference(venc_original, diaPagamento);

                    if (parseInt(difference.diffInDays.toFixed(0)) < 500) { // calcula juros e multa por determindado tempo somente.
                        const diasCalcJuros: number | any = (difference.diffInDays).toFixed(0)
                        contaAReceber.juros = contaAReceber.valor !== 0.00 ? contaAReceber.saldo * diasCalcJuros * (0.10 / 100) : 0.00
                        contaAReceber.multa = diasCalcJuros > 5 ? contaAReceber.valor * (3 / 100) : 0.00
                    }
                }
            }
            getSaldo(contaAReceber)
        }
    }

    useEffect(() => {
        calcContasAReceber(openAccounts);
    }, [openAccounts, statusJurosEMulta])

    async function registerValRecebido(ValRecebido: TValsRecebidos) {
        await api.post<TValsRecebidos>('val_recebido', ValRecebido)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log((error)))
    }

    async function valsReceber(Conta: TContaAreceber) {
        let id = 1
        let newValueReceived: TValsRecebidos = {
            id_val: id++,
            fk_conta: Conta.id_conta,
            fk_venda: Conta.fk_venda || 0,
            fk_user: isLogged[0].id,
            valor: valor,
            data_recebimento: new Date(),
            descricao: "Venda",
            fk_person: 0
        }
        valsRecebido.push(newValueReceived)
        await registerValRecebido(newValueReceived)
    }

    const somaValsRecebidos = async (Conta: TContaAreceber) => {
        let soma = valor || 0
        for (let v of valsRecebidos) 
            if (v.fk_conta === Conta.id_conta){
                const res:any = v.valor
            soma += parseFloat(res)
            }
        return soma
    }

    const receberValores = async (Conta: TContaAreceber) => {
        for (let contaAReceber of contasAReceber) {
            if (contaAReceber.id_conta === Conta.id_conta) {
                const recebimento = await somaValsRecebidos(Conta)
                contaAReceber.recebimento = recebimento
                contaAReceber.desconto = desconto
                const saldo =
                    parseFloat(contaAReceber.valor) -
                    parseFloat(contaAReceber.recebimento) +
                    parseFloat(contaAReceber.juros) +
                    parseFloat(contaAReceber.multa) -
                    parseFloat(contaAReceber.desconto)

                contaAReceber.saldo = saldo.toFixed(2)
                contaAReceber.juros = parseFloat(contaAReceber.juros).toFixed(2)
                contaAReceber.multa = parseFloat(contaAReceber.multa).toFixed(2)
                contaAReceber.desconto = parseFloat(contaAReceber.desconto).toFixed(2)
                contaAReceber.pagamento = handleContasAReceber.newData()
                await updateContaReceber(contaAReceber)
            }
        }
    }

    function handleSumbit(Conta: TContaAreceber) {
        setMsg('')
        valsReceber(Conta)
        receberValores(Conta)
        setValor(0)
    }

    function sumSaldoAReceber() {
        let saldo: number | any = 0
        if (openAccounts) {
            for (let contaReceber_ of openAccounts)
                saldo += parseFloat(contaReceber_.saldo)
            return saldo
        }
        else if (!openAccounts)
            return 0
    }

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    useEffect(() => {
        postAuthHandle('sale_user', setTokenMessage, setSales, isLogged)
    }, [sales])

    const findPerson = (id_pers: number, id_conta: number, id_venda: number) => {
        for (let pers of persons)
            if (pers.id_person === id_pers) {
                return [pers.id_person, pers.name_pers, pers.cpf_pers]
            }
        for (let conta of contasAReceber)
            if (conta.id_conta === id_conta) {
                for (let pers of persons)
                    if (pers.id_person === conta.fk_pagador) {
                        return [pers.id_person, pers.name_pers, pers.cpf_pers]
                    }
            }
        for (let sale of sales)
            if (sale.id_sale === id_venda) {
                for (let pers of persons)
                    if (pers.id_person == sale.fk_name_pers) {
                        return [pers.id_person, pers.name_pers, pers.cpf_pers]
                    }
            }
    }

    function printValorRecebido(ValRec: TValsRecebidos) {
        for (let val of valsRecebidos) {
            if (val.id_val === ValRec.id_val) {
                const pers = findPerson(ValRec.fk_person, ValRec.fk_conta, ValRec.fk_venda)
                const recibo = {
                    id: ValRec.id_val,
                    conta: ValRec.fk_conta,
                    venda: ValRec.fk_venda,
                    user: ValRec.fk_user,
                    valor: ValRec.valor,
                    data_rec: FormatDate(ValRec.data_recebimento),
                    descricao: ValRec.descricao,
                    id_cliente: pers && pers[0] || 0,
                    nome_cliente: pers && pers[1] || "",
                    cpf: pers && pers && pers[2] || ''
                }
                localStorage.setItem("recibo_val_rec", JSON.stringify(recibo))
                window.location.replace('recibo_val_rec')
            }
        }
    }

    return <>
      <ContasAreceberForm
                handleChangeStatus={handleChangeStatus}
                token={handleTokenMessage('contas_receber', tokenMessage)}
                contasAReceber={openAccounts}
                valoresRecebidos={valsRecebidos}
                receberValor={valor > 0 ? handleSumbit : () => { setMsg('Informe um novo valor') }}
                handleChangeValor={(e: any) => {
                    setValor(parseFloat(e.target.value))
                }}
                handleChangeDesconto={(e: any) => {
                    setDesconto(parseFloat(e.target.value))
                }}
                msg={msg}
                submitContasAReceberRegister={() => { window.location.assign("/contas_receber_register") }}
                submitInserirValor={() => { window.location.assign("receber_valor") }}
                submitfluxoDeCaixa={() => { window.location.assign("caixa_mov") }}
                saldo={sumSaldoAReceber()}
                printValorRecebido={printValorRecebido}
            />
        </>
}

export { ContasAReceber }