import { useEffect, useState, useContext } from "react"
import { ContasAReceberRegisterForm } from "../../components/contasAReceber/ContasAReceberRegisterForm";
import { TContaAreceber } from "./type/TContasAReceber";
import { TPerson } from "../persons/type/TPerson";
import { postAuthHandle, postRegister } from "../../services/handleService";
import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";
import api from "../../services/api/api";

export function ContasAReceberRegister() {
    const [IdPerson, setIdPerson] = useState<number>(0)
    const [statusTitulo, setStatusTitulo] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('Aguardando titulo')
    const [persons, setPersons] = useState<TPerson[]>([])
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
    const [contasAReceber, setContasAReceber] = useState<TContaAreceber[]>([])
    const [contasAReceberOpen, setContasAReceberOpen] = useState<TContaAreceber[]>([])
    const { user: isLogged }: any = useContext(AuthContext);
    const [contaAReceber, setContaAReceber] = useState<TContaAreceber>({
        id_conta: 0,
        fk_filial: 0,
        tipo: "Leg",
        fk_venda: 0,
        fk_user: isLogged[0].id,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setContaAReceber(values => ({ ...values, [name]: value }))
    };

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusTitulo(e.target.checked);
    };

    useEffect(() => {
        postAuthHandle('contas_receber_list', setTokenMessage, setContasAReceber, isLogged)
    }, [contaAReceber])

    useEffect(() => {
        const res: TContaAreceber[] = []
        for (let c of contasAReceber)
            if (c.recebimento <= c.saldo) {
                res.push(c)
            }
        setContasAReceberOpen(res)
    }, [contasAReceber])


    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    function getContaAReceber() {
        contaAReceber.vencimento = new Date(contaAReceber.vencimento).toISOString()
        contaAReceber.valor = parseFloat(contaAReceber.valor).toFixed(3)
        if (persons.length > 0)
            contaAReceber.fk_pagador = IdPerson
        contaAReceber.fk_filial = persons[0].fk_name_filial
    }

    useEffect(() => {
        if (contaAReceber.vencimento)
            getContaAReceber()
    }, [IdPerson])


    function contaReceberUpdate(contaAReceber: TContaAreceber) {
        setContaAReceber(contaAReceber)
    }

    const contaAReceberClear: TContaAreceber = {
        id_conta: 0,
        fk_filial: 0,
        tipo: "Leg",
        fk_venda: 0,
        fk_user: isLogged[0].id,
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
    }

    const handleContasAReceberUpdate = async () => {
        await api.put<TContaAreceber>('contas_receber', contaAReceber)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
        setContaAReceber(contaAReceberClear)
        setMsg('Titulo Atualizado com sucesso')
    }

    function handleContaReceberRegister() {
        getContaAReceber()
        postRegister(contaAReceber, 'contas_receber')
        setContaAReceber(contaAReceberClear)
        setMsg('Titulo gravado com sucesso')

    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (contaAReceber.valor !== 0) {
            contaAReceber.id_conta === 0 ?
                handleContaReceberRegister() :
                handleContasAReceberUpdate()
        } else {
            setMsg("Informe um valor para o Título")
        }
    }

    return <>
        <ContasAReceberRegisterForm
            handleTokenMessage={handleTokenMessage('contas_receber_register', tokenMessage)}
            contasAReceber={statusTitulo ? contasAReceberOpen : contasAReceber}
            contaReceberUpdate={contaReceberUpdate}
            setContaAReceber={setContaAReceber}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleChangeStatus={handleChangeStatus}
            msg={msg}
            listPersons={<select
                onChange={e => setIdPerson(parseInt(e.target.value))}
            >
                <option>Selecione um pagador</option>
                {persons.map((person: TPerson) => (
                    <option
                        key={person.id_person}
                        value={person.id_person}
                    >
                        {person.name_pers}
                        {" - " + person.cpf_pers}
                    </option>
                ))}</select>}
        >
            {contaAReceber}
        </ContasAReceberRegisterForm>
    </>
}

