import { useEffect, useState, useContext } from "react"
import { TContaAPagar, TDespesa } from "./type/TContasAPagar";
import { AuthContext } from '../../context/auth'
import api from "../../services/api/api"
import { TPerson } from "../persons/type/TPerson";
import { postAuthHandle, postRegister } from "../../services/handleService";
import { ContasAPagarRegisterForm } from "../../components/contasAPagar/ContasAPagarRegisterForm";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function ContasAPagarRegister() {
    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState("Usuário Autenticado !")
    const [msg, setMsg] = useState('Aguardando Conta ou Despesa')
    const [statusTitulo, setStatusTitulo] = useState<boolean>(false)
    const [person, setPerson] = useState<TPerson | any>(null)
    const [persons, setPersons] = useState<TPerson[]>([])
    const [despesas, setDespesas] = useState<TDespesa[]>([]) //criar no banco
    const [idDespesa, setIdDespesa] = useState<number>(0)
    const [contasAPagar, setContasAPagar] = useState<TContaAPagar[]>([])
    const [contasAPagarOpen, setContasAPagarOpen] = useState<TContaAPagar[]>([])
    const [contaAPagar, setContaAPagar] = useState<TContaAPagar>({
        id_conta: 0,
        fk_filial: 0,
        tipo: "Desp",
        fk_compra: 0,
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
        fk_beneficiario: 0,
        fk_despesa: 1
    });

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setContaAPagar(values => ({ ...values, [name]: value }))
    };

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusTitulo(e.target.checked);
    };

    const handleSelectPerson = (e: any) => {
        const selectedId = Number(e.target.value);
        const person: TPerson | any = persons.find((u) => u.id_person === selectedId);
        setPerson(person);
    };

    const getContasAPagar = async () => {
        await postAuthHandle('contas_pagar_list', setTokenMessage, setContasAPagar, isLogged)
    };

    useEffect(() => {
        getContasAPagar()
    }, [contaAPagar])

    const getContasAPagarOpen = () => {
        const res: TContaAPagar[] = []
        for (let c of contasAPagar)
            if (c.recebimento <= c.saldo) {
                res.push(c)
            }
        setContasAPagarOpen(res)
    }

    useEffect(() => {
        getContasAPagarOpen()
    }, [contasAPagar])

    const getDespesas = async () => {
        try {
            await api.get<TDespesa[]>('despesas')
                .then(response => {
                    setDespesas(response.data)
                })
        } catch (err) { console.log("err: " + err) }
    };
    useEffect(() => {
        getDespesas()
    }, [despesas])

    function findDespesa(ContaAPagar: TContaAPagar) {
        for (let d of despesas)
            if (d.id === ContaAPagar.fk_despesa)
                return d.name
    }

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    function findPerson(ContaAPagar: TContaAPagar) {
        for (let p of persons)
            if (p.id_person === ContaAPagar.fk_beneficiario)
                return p.name_pers
    }

    function getContaAPagar() {
        contaAPagar.vencimento = new Date(contaAPagar.vencimento).toISOString()
        contaAPagar.valor = parseFloat(contaAPagar.valor).toFixed(3)
        if (persons.length > 0)
            contaAPagar.fk_beneficiario = person?.id_person | 0
        contaAPagar.fk_filial = persons[0].fk_name_filial
        if (despesas.length > 0)
            contaAPagar.fk_despesa = idDespesa
    }

    function contaPagarUpdate(contaAReceber: TContaAPagar) {
        setContaAPagar(contaAReceber)
    }

    const contaAPagarClear: TContaAPagar = {
        id_conta: 0,
        fk_filial: 0,
        tipo: "Desp",
        fk_compra: 0,
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
        fk_beneficiario: 0,
        fk_despesa: 1
    }

    const handleContasAPagarUpdate = async () => {
        getContaAPagar()
        await api.put<TContaAPagar>('contas_pagar', contaAPagar)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
        setContaAPagar(contaAPagarClear)
        setMsg('Conta Atualizada com sucesso')
    }

    function handleContaPagarRegister() {
        getContaAPagar()
        postRegister(contaAPagar, 'contas_pagar')
        setContaAPagar(contaAPagarClear)
        setMsg('Conta Gravada com sucesso')
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (contaAPagar.valor !== 0) {
            contaAPagar.id_conta === 0 ?
                handleContaPagarRegister() :
                handleContasAPagarUpdate()
        } else {
            setMsg("Informe um valor para a Conta")
        }
    }

    return (
        <>
            {/* <p>{JSON.stringify(contaAPagar)}</p> */}
            <ContasAPagarRegisterForm
                handleChangeStatus={handleChangeStatus}
                handleTokenMessage={handleTokenMessage('contas_pagar_register', tokenMessage)}
                contasAPagar={statusTitulo ? contasAPagarOpen : contasAPagar}
                setContaAPagar={setContaAPagar}
                contaPagarUpdate={contaPagarUpdate}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                findDespesa={findDespesa}
                findPerson={findPerson}
                msg={msg}
                listPersons={<div>
                    {/* <b>Selecione um Beneficiário:</b> */}
                    <select onChange={handleSelectPerson} defaultValue="">
                        <option value="" disabled>Selecione o Beneficiário...</option>
                        {persons.map((person: TPerson) => (
                            <option key={person.id_person} value={person.id_person}>
                                {person.id_person + " - " + person.name_pers}
                            </option>
                        ))}
                    </select>
                </div>}

                listDespesas={<select
                    onChange={e => setIdDespesa(parseInt(e.target.value))} defaultValue=""
                >
                    <option disabled value="">Selecione a Despesa...</option>
                    {despesas.map((despesa: TDespesa) => (
                        <option
                            key={despesa.id}
                            value={despesa.id}
                        >
                            {despesa.id + " - " + despesa.name}
                        </option>
                    ))}
                </select>}
            >
                {contaAPagar}
            </ContasAPagarRegisterForm>
        </>
    )
}

