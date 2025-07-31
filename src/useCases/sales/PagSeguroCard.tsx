import { useState, useEffect } from "react"
import { PagSeguroCardForm } from "../../components/pagseguro/PagSeguroCardForm";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import pagSeguroCard_JSON from "./pagSeguroCard.json";
import saleJSON from "./sale.json"
import cardRequest_JSON from "./cardRequest.json"
import { clearSaleStorage, handleInstallments } from "./handlePayment/HandlePayment";
import { TCard, TCardRequest, TError } from "./type/TSale";

import api from './../../services/api/api';

export function PagSeguroCard() {
    const [card, setCard] = useState<TCard>({
        public_key: "", holder: "", number: "",
        ex_month: "", ex_year: "", secure_code: "", encrypted: ""
    });
    const [publicKey, setPublicKey] = useState({ public_key: "", created_at: "" })
    const [flagSales, setFlagSales] = useState<boolean>(false);
    const [err, setErr] = useState("")
    const [erro, setErro] = useState<TError>()
    const [encrypted, setEncripted] = useState("")
    const [pagSeguroCard, setPagSeguroCard] = useState(pagSeguroCard_JSON);
    const [cardRequest, setCardRequest] = useState<any>(cardRequest_JSON)
    const [paidSucess, setPaidSucess] = useState<string | number>("")
    const [paid, setPaid] = useState(0)
    const [sale, setSale] = useState<any>(saleJSON);
    const [numNote, setNumNote] = useState(0)
    const payment = sale.paySale - sale.dinheiro - sale.disc_sale
    const paySale: number = payment

    /* Mensagem na Tela **/
    const msgPay = 'Sem compras para pagar'
    // const msgTaxId = 'CPF ou CNPJ inválido'
    const msgErr = 'Erro de comunicação, tente novamente'
    const msgSucess = 'Valor pago com sucesso.'
    const msgSendFields = "Por favor, preencha todos os campos corretamente."
    const valPayCard = "Pagamento em " + sale.installments + " parcelas de " + currencyFormat(paySale / sale.installments)

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setCard(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        const INVALID_NUMBER = "INVALID_NUMBER"
        const INVALID_NUMBER_MSG = "campo inválido `número`. Você deve passar um valor entre 13 e 19 dígitos"
        const errorCardStorage = localStorage.getItem('errors')
        if (!errorCardStorage) return
        try {
            const errors = JSON.parse(errorCardStorage)
            if (Array.isArray(errors) && errors[0]?.code === INVALID_NUMBER) {
                setErr(INVALID_NUMBER_MSG)
            }
        } catch (err) {
            console.error("Erro ao parsear os erros do localStorage:", err)
        }
    }, [cardRequest])

    useEffect(() => {
        const DECLINED = 'DECLINED'
        const INVALID_DECLINER_MSG = 'Cartão recusado, verifique os dados: '
        const INVALID_VAL_MSG = 'O valor da parcela é menor que o valor mínimo permitido. use um valor maior '
        const VAL_MIN = '40002'
        const status = cardRequest?.charges?.[0]?.status
        const errorCode = erro?.error_messages?.[0]?.code
        if (!err) {
            if (status === DECLINED) {
                setErr(`${INVALID_DECLINER_MSG}${status}`)
            } else if (errorCode === VAL_MIN && sale?.duplicatas[0]?.valor < 6) {
                setErr(INVALID_VAL_MSG)
            }
        }
    }, [cardRequest, erro, err])

    useEffect(() => {
        const getSale = () => {
            const store_sale = localStorage.getItem('sl');
            if (store_sale !== null) {
                const res = JSON.parse(store_sale)
                setSale(res)
                handleInstallments(res, 'Card')
            }
        };
        getSale()
    }, []);
    function arrayItems(obj: Object | any) {
        for (let i = 0; sale.itens.length > i; i++) {
            const items = { reference_id: "", name: '', quantity: 0, unit_amount: 0 }
            items.reference_id = sale.itens[i].item
            items.name = sale.itens[i].descric
            items.quantity = sale.itens[i].amount
            items.unit_amount = sale.itens[i].valor.replace(/[.]/g, '')
            obj.items.push(items)
        }
    };

    function getPargSeguroCard(obj: Object | any) {
        obj.reference_id = sale.user.user_id
        obj.description = "pagamento da nota"
        obj.customer.name = sale.person.name_pers
        obj.customer.email = sale.user.user_name
        obj.customer.tax_id = sale.person.cpf_pers
        obj.customer.phones[0].number = sale.person.phone_pers.substring(2)
        obj.customer.phones[0].country = '55'
        obj.customer.phones[0].area = sale.person.phone_pers.slice(0, -9);
        obj.customer.phones[0].type = "MOBILE"
        obj.shipping.address.street = sale.person.address.address_pers
        obj.shipping.address.number = parseInt(sale.person.address.num_address)
        obj.shipping.address.complement = null
        obj.shipping.address.locality = sale.person.address.bairro_pers
        obj.shipping.address.city = sale.person.address.name_city
        obj.shipping.address.region_code = sale.person.address.uf
        obj.shipping.address.country = 'BRA'
        obj.shipping.address.postal_code = sale.person.address.num_cep.replace(/[..-]/g, '')
        obj.charges[0].reference_id = sale.user.user_id
        obj.charges[0].description = "Compras Online"
        obj.charges[0].payment_method.installments = parseInt(sale.installments)
        obj.charges[0].payment_method.holder.tax_id = sale.person.cpf_pers
        obj.charges[0].amount.value = payment.toFixed(2).replace(/[.]/g, '')
        obj.charges[0].payment_method.card.encrypted = encrypted
        arrayItems(pagSeguroCard)
        setPagSeguroCard(pagSeguroCard)
    };

    async function publicKeyPagSeguro() {
        try {
            await api.get("publickey")
                .then(response => {
                    setPublicKey(response.data)
                    card.public_key = response.data.public_key
                })
        } catch (err) {
            setErr(msgErr)
            // console.log("error" + err)
        }
    };

    useEffect(() => {
        publicKeyPagSeguro() // Gera chave
    }, [publicKey])

    useEffect(() => {
        const storage_encrypted = localStorage.getItem('encrypted')
        if (storage_encrypted) {
            setEncripted(JSON.parse(storage_encrypted))
            getPargSeguroCard(pagSeguroCard)
        }
    }, [encrypted])

    async function registerPagSeguroCard() {
        if (!encrypted) return
        try {
            const response = await api.post<any>("card", pagSeguroCard)
            const error:TError = response.data
            setErro(error)
            const res: TCardRequest = response.data
            if (res.charges) {
                const paid = res.charges[0].amount.summary.paid
                setPaid(paid)
                setCardRequest(res)
            }
        } catch (error: unknown) {
            setErr("Erro " + error)
        }
    }

    useEffect(() => {
        if (paid === 0) {
            registerPagSeguroCard() // Registra o pagamento
        }
        if (paid !== 0) {
            clearStorageCard()
        }
        if (paid !== 0 && flagSales === false) {
            registerSale() // Se paid for maior que 0 gera a venda.
            setFlagSales(true)
        }
    }, [encrypted, paid, flagSales])

    async function registerSale() {
        await api.post('sale_register', sale)
            .then(response => {
                const res = response.data
                setNumNote(res)
            })
            .catch(error => console.log(error));
    };

    function clearStorageCard() {
        localStorage.removeItem('encrypted')
        localStorage.removeItem('card')
        localStorage.removeItem('hasErrors')
        localStorage.removeItem('errors')
        setPaidSucess(msgSucess)
    }

    function handleSubmitCard(e: Event) {
        e.preventDefault();
            if (paySale !== 0) {
                if (paid === 0) {
                    if (card.public_key !== "") {
                        localStorage.setItem('card', JSON.stringify(card))
                        window.location.replace("/pagsegurocard")
                    }
                }
            } else {
                setErr(msgPay)
            }
    }

    useEffect(() => {
        clearSaleStorage(paid, flagSales)
    }, [paid, flagSales])

    return <>
        {/* <p>{JSON.stringify(sale?.duplicatas[1]?.valor)}</p> */}
        <PagSeguroCardForm
            handleSubmit={handleSubmitCard}
            handleChange={handleChange}
            paidSucess={paidSucess}
            err={err}
            paid={paid !== 0 ? paid : null}
            paySale={sale.installments !== 1 ?
                valPayCard :
                'Valor a pagar ' + currencyFormat(paySale)}
            URLNoteSubmit={numNote}
        >
            {card}
        </PagSeguroCardForm>
    </>
}