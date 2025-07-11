import { useEffect, useState, useContext } from "react"
import { ReceberValorForm } from "../../components/contasAReceber/ReceberValorForm";
import { TValsRecebidos } from "./type/TContasAReceber";
import { TPerson } from "../persons/type/TPerson";
import { AuthContext } from '../../context/auth'
import { postAuthHandle, postRegister } from "../../services/handleService";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function ReceberValor() {
    const [IdPerson, setIdPerson] = useState<number>(0)
    const [sendValor, setSendValor] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('Aguardando valor')
    const [persons, setPersons] = useState<TPerson[]>([])
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
    const { user: isLogged }: any = useContext(AuthContext);
    const [receberValor, setReceberValor] = useState<TValsRecebidos>({
        id_val: 0,
        fk_conta: 0,
        fk_venda: 0,
        fk_user: isLogged[0].id,
        valor: 0,
        data_recebimento: new Date().toISOString(),
        descricao: '',
        fk_person: 0
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setReceberValor(values => ({ ...values, [name]: value }))
    };

        useEffect(() => {
            postAuthHandle('persons_user',setTokenMessage,setPersons,isLogged)
        }, [persons])
    
    function clearFields() {
        receberValor.valor = 0
        receberValor.descricao = ''
    }

    function handleSubmit() {
        if (persons.length > 0)
            receberValor.fk_person = IdPerson
        if (sendValor === false) {
            postRegister(receberValor, 'val_recebido')
            setSendValor(true)
            clearFields()
            setMsg('Valor registrado com sucesso')
        } else {
            setMsg('Valor já foi registrado')
        }
    }

    return (
        <>
        {handleTokenMessage('receber_valor', tokenMessage)}
            <ReceberValorForm
                handlechange={handleChange}
                handleSubmit={handleSubmit}
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
                msg={msg}
            >
                {receberValor}
            </ReceberValorForm>
        </>
    )
}