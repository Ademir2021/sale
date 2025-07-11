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
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    const [sales_autorizada, setSaleAutorizada] = useState<TSaleList[]>([])

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
        const nfeStatus_: INFeStatus = {
            nfe_autorizada: false,
            nfe_impressa: false,
            nfe_em_aberto: false,
            nfe_cancelada: false,
            nfe_com_problema: false,
            nfe_denegada: false,
            nfe_enviada: false,
            nfe_inutilizada: false
        }
        setNFeStatus(nfeStatus_)
    }

    const handleChange = (e: any) => {
        const name = e.target.name
        const value = e.target.checked
        setNFeStatus(values => ({ ...values, [name]: value }))
    }

    const getSales = async () => {

        if (sales_autorizada) {

            await postAuthHandle('sale_user', setTokenMessage, setSales, isLogged)

            for (let sale of sales)
                if (nfeStatus.nfe_autorizada === true)
                    if (sale.chave_nfe !== null)
                        sales_autorizada.push(sale)

            for (let sale of sales)
                if (nfeStatus.nfe_em_aberto === true)
                    if (sale.chave_nfe === null) {
                        sales_autorizada.push(sale)

                        if (sales_autorizada.length !== 0) {
                            const sales_: TSaleList[] = []
                            setSales(sales_)
                        }
                        // clearNfeStatus()
                    }
        }
    };

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

    function hanndleClear(e: Event) {
        e.preventDefault()
        const sales_: TSaleList[] = []
        clearNfeStatus()
        setSaleAutorizada(sales_)
    }

    async function handleGerarNFe(sale: TSaleList) {
        const resp = await putUpdate(sale, 'gerar_nfe')
        console.log(resp)
    }

    function gerarNFe(sale: TSaleList) {
        handleGerarNFe(sale)
    }

    return (
        <>
            {/* <p>{JSON.stringify(nfeStatus)}</p> */}
            <HandleNFeForm
                sales={sales_autorizada}
                findPerson={findPerson}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClear={hanndleClear}
                gerarNFe={gerarNFe}
            >
                {nfeStatus}
            </HandleNFeForm>
        </>
    )
}

export { HandleNFe }

