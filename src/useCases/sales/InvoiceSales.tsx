import { useState, useEffect, useContext } from "react";
import { InvoiceSalesForm } from '../../components/sales/InvoiceSalesForm';
import { BackHome } from "../../components/utils/backHome/BackHome";
import { TPerson } from "../persons/type/TPerson";
import { ICeps, ICities } from "../ceps/type/TCeps";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import saleJSON from "./JSON/sale.json"
import { TItens } from "../products/type/TProducts";
import { postAuthHandle, getList } from "../../services/handleService";
import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";
import { TSale } from "./type/TSale";

const InvoiceSales:React.FC = () => {
    const [ceps, setCeps] = useState<ICeps[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [msg, setMsg] = useState('')
    const [sum, setSum] = useState(0)
    const [itens, setItens] = useState<TItens[]>([]);
    const [persons, setPersons] = useState<TPerson[]>([])
    const sale_ = saleJSON
    const [sale, setSale] = useState<TSale>(sale_);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")
    const [typePay, setTypePay] = useState("")
    const [installments, setInstallments] = useState<number | any>('Credito a vista')
    const [idPerson, setIdPerson] = useState(0)
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
        getList('ceps', setCeps)
    }, [ceps])

    useEffect(() => {
        getList('cities', setCities)
    }, [cities])

    const findCep = (Ceps: ICeps[]) => {
        for (let cep of Ceps)
            if (cep.id_cep === sale.person.address.fk_cep) {
                sale.person.address.uf = cep.uf;
                sale.person.address.num_cep = cep.num_cep;
                return cep
            }
    };
    useEffect(() => {
        findCep(ceps)
    }, [sale, ceps])

    const findCity = (Cities: ICities[]) => {
        for (let citie of Cities)
            if (citie.id_city === sale.person.address.fk_cep) {
                sale.person.address.name_city = citie.name_city
                return citie
            }
    };
    useEffect(() => {
        findCity(cities)
    }, [sale, cities])

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    const findPerson = (persons: TPerson[]) => {
        const person = persons.find(p => p.id_person === idPerson);
        if (!person) return;
        sale.filial = person.fk_name_filial;
        sale.user.user_id = person.fk_id_user;
        sale.user.user_name = isLogged[0].username;
        sale.person = {
            fk_name_pers: person.id_person,
            name_pers: person.name_pers,
            cpf_pers: person.cpf_pers,
            phone_pers: person.phone_pers,
            address: {
                address_pers: person.address_pers,
                num_address: person.num_address,
                bairro_pers: person.bairro_pers,
                fk_cep: person.fk_cep,
                name_city: findCity(cities)?.name_city,
                uf: findCep(ceps)?.uf || "",
                num_cep: findCep(ceps)?.num_cep || ""
            }
        };
    };

    const newSale = (Sale: TSale) => {
        findPerson(persons)
        const sumStorage = localStorage.getItem('s');
        if (sumStorage) {
            const sum: number = JSON.parse(sumStorage);
            Sale.tItens = sum;
            setSum(sum);
        };
        Sale.tNote = Sale.tItens - Sale.disc_sale;
        calcInstallments(Sale)
        const itensStorage = localStorage.getItem('i');
        if (itensStorage) {
            const itens: TItens[] = JSON.parse(itensStorage);
            setItens(itens);
        };
        setInstallments(installments)
        installments !== 'Credito a vista' ? Sale.installments = parseInt(installments) :
            setInstallments(1)
        Sale.duplicatas = []
    };
    useEffect(() => {
        newSale(sale)
    }, [idPerson, sale, tokenMessage, typePay]);

    const calcInstallments = (Sale: TSale) => {
        const payVal: number = parseFloat(sale.tItens)
        if (installments === 'Credito a vista')
            Sale.paySale = payVal
        else if (installments == 2)
            Sale.paySale = payVal + payVal * 3 / 100
        else if (installments == 3)
            Sale.paySale = payVal + payVal * 6 / 100
        else if (installments == 4)
            Sale.paySale = payVal + payVal * 9 / 100
    };

    const findItensSales = (Itens: TItens[]) => {
        if (sale.itens.length === 0)
            for (let i of Itens) {
                sale.itens.push(i)
                localStorage.setItem("sl", JSON.stringify(sale))
            }
        else {
            setMsg(msgSendPe)
        }
    };

    const processSale = (sale: TSale) => {
        if (!sale) {
            return setMsg(msgOkPe);
        };
        const { person, paySale: payment, disc_sale, tNote } = sale;
        if (person.fk_name_pers === 0) {
            return setMsg("Selecione o nome do Comprador");
        };
        const totalNote = sum - (disc_sale || 0);
        const limitDesc = disc_sale > sum * 0.1;
        if (limitDesc) {
            return setMsg(msgDesc);
        };
        if (totalNote <= 0) {
            return setMsg(msgNoItem);
        };
        if (payment < tNote) {
            return setMsg(msgValItem);
        }
        /** Pagamento Válido. */
        setMsg("Valor a Pagar " + currencyFormat(payment));
        findItensSales(itens);
        setTimeout(() => {
            window.location.replace(typePay);
        }, 2000);
    };

    useEffect(() => {
        if (typePay !== "")
            processSale(sale)
    },)

    function handleSubmit() {
        setTypePay('pagseguro')
        processSale(sale)
    }

    function handleSubmitCard() {
        setTypePay('pagsegurocard')
        processSale(sale)
    }

    function handleSubmitCred() {
        setTypePay('pagcredloja')
        processSale(sale)
    }

    return (<>
        <InvoiceSalesForm
            token={handleTokenMessage('invoice_sales', tokenMessage)}
            backHomeInvoice={<BackHome />}
            handleChange={handleChange}
            handleSubmitCard={handleSubmitCard}
            handleSubmitCred={handleSubmitCred}
            handleSubmit={installments === 1 ? handleSubmit :
                () => (setMsg('Parcelado somente com cartão de crédito.'))}
            msg={msg}
            installments={setInstallments}
            persons={persons}
            setIdPerson={setIdPerson}
        >
            {sale}
        </InvoiceSalesForm>
    </>
    )
}
export { InvoiceSales }
