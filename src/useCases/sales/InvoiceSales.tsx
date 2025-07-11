import { useState, useEffect, useContext } from "react";
import { InvoiceSalesForm } from '../../components/sales/InvoiceSalesForm';
import { BackHome } from "../../components/utils/backHome/BackHome";
import { TPerson } from "../persons/type/TPerson";
import { ICeps, ICities } from "../ceps/type/TCeps";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import saleJSON from "./sale.json"
import { TItens } from "../products/type/TProducts";
import { postAuthHandle, getList } from "../../services/handleService";
import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function InvoiceSales() {
    const [ceps, setCeps] = useState<ICeps[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [msg, setMsg] = useState<string>('')
    const [sum, setSum] = useState<number>(0)
    const [itens, setItens] = useState<TItens[]>([]);
    const [persons, setPersons] = useState<TPerson[]>([])
    const [sale, setSale] = useState<any>(saleJSON);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
    const [typePay, setTypePay] = useState("")
    const [installments, setInstallments] = useState<number | any>('Credito a vista')
    const [idPerson, setIdPerson] = useState<number | any>(0)
    const { user: isLogged }: any = useContext(AuthContext);

    const msgDesc = "Desconto não autorizado."
    const msgNoItem = "Nenhum item comprado no momento."
    const msgValItem = "O valor está diferente do total na nota " + sale.paySale + '.'
    const msgOkPe = "O pedido já foi enviado."
    const msgSendPe = "Enviando pedido, aguardem ..."

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setSale((values: any) => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    function getSale() {
        for (let person of persons) {
            if (person.id_person === idPerson) {
                sale.filial = person.fk_name_filial;
                sale.user.user_id = person.fk_id_user;
                sale.user.user_name = isLogged[0].username
                sale.person.fk_name_pers = person.id_person;
                sale.person.name_pers = person.name_pers;
                sale.person.cpf_pers = person.cpf_pers;
                sale.person.phone_pers = person.phone_pers;
                sale.person.address.address_pers = person.address_pers;
                sale.person.address.num_address = person.num_address;
                sale.person.address.bairro_pers = person.bairro_pers;
                sale.person.address.fk_cep = person.fk_cep;
                const resSum: any | undefined = localStorage.getItem('s');
                if (resSum) {
                    const sum: number = JSON.parse(resSum);
                    sale.tItens = sum;
                    setSum(sum);
                };
                sale.tNote = sale.tItens - sale.disc_sale;
                calcInstallments()
                const resItens: any | undefined = localStorage.getItem('i');
                if (resItens) {
                    const itens: TItens[] = JSON.parse(resItens);
                    setItens(itens);
                }
                setInstallments(installments)
                installments !== 'Credito a vista' ? sale.installments = parseInt(installments) :
                    setInstallments(1)
                sale.duplicatas = []
            }
        }
        setTimeout(() => {
            if (!sale.person.fk_name_pers) {
                window.location.replace('form_person');
            }
        }, 4000)
    };
    useEffect(() => {
        getSale()
    }, [persons, sale, tokenMessage, typePay]);

    function calcInstallments() {
        const payVal: number = parseFloat(sale.tItens)
        if (installments === 'Credito a vista')
            sale.paySale = payVal
        else if (installments == 2)
            sale.paySale = payVal + payVal * 3 / 100
        else if (installments == 3)
            sale.paySale = payVal + payVal * 6 / 100
        else if (installments == 4)
            sale.paySale = payVal + payVal * 9 / 100
    }

    useEffect(() => {
        getList('ceps', setCeps)
    }, [ceps])

    useEffect(() => {
        getList('cities', setCities)
    }, [cities])

    useEffect(() => {
        function setCep() {
            for (let cep of ceps) {
                if (cep.id_cep === sale.person.address.fk_cep) {
                    sale.person.address.num_cep = cep.num_cep
                    sale.person.address.uf = cep.uf
                }
            }
        };
        setCep()
    }, [sale, ceps])

    useEffect(() => {
        async function setCity() {
            for (let citie of cities) {
                if (citie.id_city === sale.person.address.fk_cep) {
                    sale.person.address.name_city = citie.name_city
                }
            }
        };
        setCity()
    }, [cities])

    function payment() {
        if (sale) {
            let payment = sale.paySale
            let totalNote = 0
            const limitDesc = (sale.disc_sale > sum * 0.10)
            totalNote += sum
            totalNote -= sale.disc_sale;
            if (limitDesc) {
                setMsg(msgDesc)
            } else {
                if (totalNote === 0) {
                    setMsg(msgNoItem)
                } else {
                    if (payment >= sale.tNote) {
                        setMsg("Valor á pagar " + currencyFormat(payment))
                        prepareSales();
                        setTimeout(() => {
                            window.location.replace(typePay)
                        }, 2000);
                    } else {
                        setMsg(msgValItem)
                    }
                }
            }
        } else {
            setMsg(msgOkPe)
        }
    };

    function prepareSales() {
        if (sale.itens.length === 0)
            for (let item of itens) {
                sale.itens.push(item)
                localStorage.setItem("sl", JSON.stringify(sale))
            }
        else {
            setMsg(msgSendPe)
        }
    };

    useEffect(() => {
        if (typePay !== "")
            payment()
    },)

    function handleSubmit() {
        setTypePay('pagseguro')
        payment()
    }

    function handleSubmitCard() {
        setTypePay('pagsegurocard')
        payment()
    }

    function handleSubmitCred() {
        setTypePay('pagcredloja')
        payment()
    }

    return (
        <>
            {/* <p>{JSON.stringify(persons)}</p> */}
            <InvoiceSalesForm
                token={handleTokenMessage('invoice_sales', tokenMessage)}
                backHomeInvoice={<BackHome />}
                handleChange={handleChange}
                handleSubmitCard={handleSubmitCard}
                handleSubmitCred={handleSubmitCred}
                handleSubmit={installments === 1 ? handleSubmit :
                    () => (setMsg('Parcelado somente com cartão de crédito.'))}
                alert=""
                message={msg}
                installments={setInstallments}
                persons={persons}
                idPerson={setIdPerson}
            >
                {sale}
            </InvoiceSalesForm>
        </>
    )
}