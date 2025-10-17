import { useState, useContext, useEffect } from "react";
import { HandleNFeForm } from "../../components/nfe/HandleNFeForm";
import { AuthContext } from '../../context/auth'
import { postAuthHandle, putUpdate } from "../../services/handleService";
import { TSaleList } from "../sales/type/TSale";
import { TPerson } from "../persons/type/TPerson";

type INFeStatus = {
    nfe_autorizada: boolean
    nfe_impressa: boolean
    nfe_em_aberto: boolean
    nfe_cancelada: boolean
    nfe_inutilizada: boolean
    nfe_denegada: boolean
    nfe_com_problema: boolean
    nfe_enviada: boolean
}

function HandleNFe() {
    const { user: isLogged }: any = useContext(AuthContext);
    const [sales, setSales] = useState<TSaleList[]>([]);
    const [persons, setPersons] = useState<TPerson[]>([])
    const [tokenMessage, setTokenMessage] = useState("Usuário Autenticado !")
    const [msg, setMsg] = useState('')
    const [salesFound, setSalesFound] = useState<TSaleList[]>([])
    const [nfeStatus, setNFeStatus] = useState<INFeStatus>({
        nfe_autorizada: false,
        nfe_impressa: false,
        nfe_em_aberto: false,
        nfe_cancelada: false,
        nfe_com_problema: false,
        nfe_denegada: false,
        nfe_enviada: false,
        nfe_inutilizada: false,
    })

    function clearNfeStatus() {
        const nfeStatus: INFeStatus = {
            nfe_autorizada: false,
            nfe_impressa: false,
            nfe_em_aberto: false,
            nfe_cancelada: false,
            nfe_com_problema: false,
            nfe_denegada: false,
            nfe_enviada: false,
            nfe_inutilizada: false
        }
        return setNFeStatus(nfeStatus)
    }

    const handleChange = (e: any) => {
        const name = e.target.name
        const value = e.target.checked
        setNFeStatus(values => ({ ...values, [name]: value }))
    }

    function findAuthorizationSales(salesFound: TSaleList[]) {
        for (let sale of sales)
            if (nfeStatus.nfe_autorizada === true)
                if (sale.chave_nfe !== null)
                    salesFound.push(sale)
    }

    function findOpenSales(salesFound: TSaleList[]) {
        for (let sale of sales)
            if (nfeStatus.nfe_em_aberto === true)
                if (sale.chave_nfe === null)
                    salesFound.push(sale)
    }

    const getSales = async () => {
        await postAuthHandle('sale_user', setTokenMessage, setSales, isLogged)
        setTimeout(() => {
            if (salesFound.length === 0)
                findAuthorizationSales(salesFound)
            findOpenSales(salesFound)
            salesFound.length > 0 && setMsg("Notas Localizadas")
        }, 1000)
    };

    useEffect(() => {
        getSales()
    }, [])

    const getPersons = async () => {
        await postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    };
    useEffect(() => {
        getPersons()
    }, [persons])

    function findPerson(id: number) {
        for (let person of persons)
            if (person.id_person === id)
                return person.name_pers
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        getSales()
    }

    function handleClear(e: Event) {
        e.preventDefault()
        const sales: TSaleList[] = []
        clearNfeStatus()
        setSalesFound(sales)
        setMsg('')
    }

    async function handleGerarNFe(sale: TSaleList) {
        const resp = await putUpdate(sale, 'gerar_nfe')
        // console.log(resp)
    }

    function gerarNFe(sale: TSaleList) {
        handleGerarNFe(sale)
        setMsg("Nota gerada com sucesso")
        setTimeout(() => {
            setMsg("")
        }, 3000)
    }

    return (
        <>
            <HandleNFeForm
                tokenMessage={tokenMessage}
                salesFound={salesFound}
                msg={msg}
                sales={salesFound}
                findPerson={findPerson}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                gerarNFe={gerarNFe}
            >
                {nfeStatus}
            </HandleNFeForm>
        </>
    )
}

export { HandleNFe }

