import { useEffect, useState, useContext } from "react"
import { ContasAReceberRegisterForm } from "../../components/contasAReceber/ContasAReceberRegisterForm";
import { TContaAreceber } from "./type/TContasAReceber";
import { TPerson } from "../persons/type/TPerson";
import { postAuthHandle, postRegister } from "../../services/handleService";

import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function ContasAReceberRegister() {
    const [IdPerson, setIdPerson] = useState<number>(0)
    const [sendConta, setSendConta] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('Aguardando titulo')
    const [persons, setPersons] = useState<TPerson[]>([])
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
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

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setContaAReceber(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        postAuthHandle('persons_user',setTokenMessage,setPersons,isLogged)
    }, [persons])

    function getContaAReceber() {
        contaAReceber.vencimento = new Date(contaAReceber.vencimento).toISOString()
        contaAReceber.valor = parseFloat(contaAReceber.valor).toFixed(3)
        if (persons.length > 0)
            contaAReceber.fk_pagador = IdPerson
        contaAReceber.fk_filial = persons[0].fk_name_filial
    }

    function clerFields(){
        contaAReceber.valor = 0
        contaAReceber.vencimento = ''
        contaAReceber.observacao = ''
    }

    function handleSubmit() {
        getContaAReceber()
        if (sendConta === false) {
            postRegister(contaAReceber, 'contas_receber')
            setMsg('Titulo gravado com sucesso')
            clerFields()
            setSendConta(true)
        } else { setMsg('Titulo já foi enviado') }
    }

    return (
        <>
            {handleTokenMessage('contas_receber_register', tokenMessage)}
            <ContasAReceberRegisterForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
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
                        { person.name_pers }
                        {" - " + person.cpf_pers }
                    </option>
                ))}</select>}
            >
                {contaAReceber}
            </ContasAReceberRegisterForm>
        </>
    )
}

