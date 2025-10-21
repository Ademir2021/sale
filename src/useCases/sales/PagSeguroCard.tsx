import { useState, useEffect } from "react"
import { PagSeguroCardForm } from "../../components/pagseguro/PagSeguroCardForm";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import { clearSaleStorage, handleInstallments } from "./handlePayment/HandlePayment";
import { TSale } from "./type/TSale";
import { TCard, TPagSeguroItems, TPagSeguroCard } from "./type/TPagSeguroCard";
import { TPagSeguroRequest } from "./type/TPagSeguroRequest";
import saleJSON from "./JSON/sale.json"
import pagSeguroCardJSON from "./JSON/pagSeguroCard.json"
// import pagSeguroRequestJSON from "./JSON/pagSeguroRequest.json"
import api from './../../services/api/api';

// Adiciona a definição de PagSeguro ao tipo Window
declare global {
    interface Window {
        PagSeguro?: any;
    }
}

export function PagSeguroCard() {

    const [flagSales, setFlagSales] = useState<boolean>(false);
    const [err, setErr] = useState('')
    const [paidSucess, setPaidSucess] = useState("")

    const [publicKey, setPublicKey] = useState({ public_key: "", created_at: "" })

    const [card, setCard] = useState<TCard>({
        public_key: "", holder: "", number: "",
        ex_month: "", ex_year: "", secure_code: "", encrypted: ""
    });

    const sale_: any = saleJSON
    const [sale, setSale] = useState<TSale | any>(sale_);
    const [numNote, setNumNote] = useState(0)
    const payment = sale.paySale - sale.dinheiro - sale.disc_sale
    const paySale: number = payment

    const pagSeguroCard_: any = pagSeguroCardJSON
    const [pagSeguroCard, setPagSeguroCard] = useState<TPagSeguroCard>(pagSeguroCard_);

    // const pagSeguroRequest_: any = pagSeguroRequestJSON
    // const [pagSeguroRequest, setPagSeguroRequest] = useState<TPagSeguroRequest>(pagSeguroRequest_)
    const [paid, setPaid] = useState(0)
    const [payResponseCode, setPayResponseCode] = useState('')
    const [payResponseMessage, setPayResponseMessage] = useState('')
    const [payResponseIdCharge, setPayResponseIdCharge] = useState('')


    const msgPay = 'Sem compras para pagar'
    const msgErr = 'Erro de comunicação, tente novamente'
    const msgSucess = 'Valor pago com sucesso.'
    const valPayCard = "Pagamento em " + sale.installments + " parcelas de " + currencyFormat(paySale / sale.installments)

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setCard(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        const getSale = () => {
            const store_sale = localStorage.getItem('sl');
            if (store_sale !== null) {
                const res = JSON.parse(store_sale)
                setSale(res)
                handleInstallments(res, 'Card', payResponseIdCharge || "Pago com Cartão")
            }
        };
        getSale()
    }, [payResponseIdCharge]);

    function getPagSeguroArrayItems(items: TPagSeguroCard) {
        items.items = []
        for (let i = 0; sale.itens.length > i; i++) {
            const item: TPagSeguroItems = { reference_id: "", name: '', quantity: 0, unit_amount: 0 }
            item.reference_id = sale.itens[i].item.toString()
            item.name = sale.itens[i].descric.toString()
            item.quantity = sale.itens[i].amount
            item.unit_amount = sale.itens[i].valor.replace(/[.]/g, '')
            items.items.push(item)
        }
    };

    function getPargSeguroCard(pagSeguroCard: TPagSeguroCard) {
        pagSeguroCard.reference_id = sale.user.user_id.toString()
        pagSeguroCard.description = "pagamento da nota"
        pagSeguroCard.customer.name = sale.person.name_pers
        pagSeguroCard.customer.email = sale.user.user_name
        pagSeguroCard.customer.tax_id = sale.person.cpf_pers
        pagSeguroCard.customer.phones[0].number = sale.person.phone_pers.substring(2)
        pagSeguroCard.customer.phones[0].country = "55"
        pagSeguroCard.customer.phones[0].area = sale.person.phone_pers.slice(0, -9);
        pagSeguroCard.customer.phones[0].type = "MOBILE"
        pagSeguroCard.shipping.address.street = sale.person.address.address_pers
        pagSeguroCard.shipping.address.number = parseInt(sale.person.address.num_address)
        pagSeguroCard.shipping.address.complement = null
        pagSeguroCard.shipping.address.locality = sale.person.address.bairro_pers
        pagSeguroCard.shipping.address.city = sale.person.address.name_city
        pagSeguroCard.shipping.address.region_code = sale.person.address.uf
        pagSeguroCard.shipping.address.country = 'BRA'
        pagSeguroCard.shipping.address.postal_code = sale.person.address.num_cep.replace(/[..-]/g, '')
        pagSeguroCard.charges[0].reference_id = sale.user.user_id.toString()
        pagSeguroCard.charges[0].description = "Compras Online"
        pagSeguroCard.charges[0].payment_method.installments = parseInt(sale.installments)
        pagSeguroCard.charges[0].payment_method.holder.tax_id = sale.person.cpf_pers
        pagSeguroCard.charges[0].amount.value = payment.toFixed(2).replace(/[.]/g, '')
        getPagSeguroArrayItems(pagSeguroCard)
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
        }
    };

    useEffect(() => {
        publicKeyPagSeguro()
    }, [publicKey])

    useEffect(() => {
        if (paid !== 0 || payResponseCode === "20000" && flagSales === false) {
            registerSale() // Gerar a Venda
            setFlagSales(true)
        }
    }, [paid, payResponseCode, flagSales])

    async function registerPagSeguroCard() {
        try {
            const response = await api.post<TPagSeguroRequest>("card", pagSeguroCard)
            const res: TPagSeguroRequest = response.data
            // setPagSeguroRequest(res)
            if (res.charges) {
                setPaid(res.charges[0].amount.summary.paid)
                setPayResponseCode(res.charges[0].payment_response.code)
                setPayResponseMessage(res.charges[0].payment_response.message)
                setPayResponseIdCharge(res.charges[0].id)
            }
        } catch (error: unknown) {
            setErr("Erro " + error)
        }
    }

    const sdkPagSeguro = async () => {
        if (!window.PagSeguro || !publicKey) {
            setErr("SDK não carregado corretamente.");
            return;
        }
        try {
            const encrypted = await window.PagSeguro.encryptCard({
                publicKey: publicKey.public_key,
                holder: card.holder,
                number: card.number,
                expMonth: card.ex_month,
                expYear: card.ex_year,
                securityCode: card.secure_code,
            });

            if (encrypted) {
                pagSeguroCard.charges[0].payment_method.card.encrypted = encrypted.encryptedCard
                getPargSeguroCard(pagSeguroCard) // seta a nota
                registerPagSeguroCard() // efetua o pagamento
            }

            if (encrypted.hasErrors === true) {
                setErr(JSON.stringify(encrypted.errors[0].code))
            } else {
                if (paid !== 0 || payResponseCode === "20000") {
                    setErr("Cartão Aceito")
                } else {
                    setErr(payResponseMessage || "MSG - Confira os dados ou Aguarde um instante ...")
                }
            }
        } catch (err: unknown) {
            setErr('ErroEncryptCard: ' + err)
        }
    };
    useEffect(() => {
        setErr(payResponseMessage)
    }, [payResponseMessage])

    async function registerSale() {
        await api.post<number>('sale_register', sale)
            .then(response => {
                setNumNote(response.data)
                setPaidSucess(msgSucess)
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        clearSaleStorage(numNote)
    }, [numNote])

    const handleSubmitCard = (e: Event) => {
        e.preventDefault();
        if (paySale !== 0) {
            if (paid === 0 || payResponseCode !== "20000") {
                if (card.public_key) {
                    sdkPagSeguro() // criptografa cartão
                }
            }
        } else {
            setErr(msgPay)
        }
    }

    return <>
        <PagSeguroCardForm
            handleSubmit={handleSubmitCard}
            handleChange={handleChange}
            paidSucess={paidSucess}
            err={err}
            paid={paid}
            paySale={sale.installments !== 1 ?
                valPayCard :
                'À Pagar ' + currencyFormat(paySale)}
            URLNoteSubmit={numNote}
        >
            {card}
        </PagSeguroCardForm>
    </>
}