import { useState, useEffect } from "react";
import { PagSeguroForm } from '../../components/sales/PagSeguroForm';
import saleJSON from "./JSON/sale.json"
import pagSeguroPixJSON from "./JSON/pagSeguroPix.json"
import pagSeguroBoletoJSON from "./JSON/pagSeguroBoleto.json"
import boletoRequestJSON from './JSON/boletoRequest.json'
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import { clearSaleStorage, handleInstallments } from "./handlePayment/HandlePayment";
import { TPagSeguroBoleto } from "./type/TPagSeguroBoleto";
import { TPagSeguroPix } from "./type/TPagSeguroPix";
import { TPagSeguroItems } from "./type/TPagSeguroCard";
import api from "../../services/api/api";

export function PagSeguro() {
    const [sendSale, setSendSale] = useState(false)
    const [sendPaid, setSendPaid] = useState(false)
    const [messagesSucess, setMessagesSucess] = useState('')
    const [error, setError] = useState("")

    const [sale, setSale] = useState<any>(saleJSON);
    const [numNote, setNumNote] = useState(0)
    const payment = sale.paySale - sale.dinheiro - sale.disc_sale
    const paySale: number = payment

    const pagSeguroPix_: any = pagSeguroPixJSON
    const [pagSeguroPix] = useState<TPagSeguroPix>(pagSeguroPix_);
    const [qrcodePagSeguro, setQrcode] = useState({
        "qr_codes": [
            { "amount": { "value": 0 }, "expiration_date": "", "links": [{ "href": "" }] }]
    })
    const imgQrCode = qrcodePagSeguro.qr_codes[0].links[0].href
    const valueQrCode: number = qrcodePagSeguro.qr_codes[0].amount.value
    const pagSeguroBoleto_: any = pagSeguroBoletoJSON
    const [pagSeguroBoleto,] = useState<TPagSeguroBoleto>(pagSeguroBoleto_);
    const [boletoPagSeguro, setBoletoPagSeguro] = useState<any>(boletoRequestJSON);
    const barCodeBoleto = boletoPagSeguro.charges[0].payment_method.boleto.barcode
    const barCodeBoletoFormated = boletoPagSeguro.charges[0].payment_method.boleto.formatted_barcode


    const msgPay = 'Sem compras para pagar'

    useEffect(() => {
        const getSale = () => {
            const store_sale = localStorage.getItem('sl');
            if (store_sale) {
                const res = JSON.parse(store_sale)
                setSale(res)
                handleInstallments(res, 'Pix/Boleto', "Aguardando Pagamento")
            }
        };
        getSale()
    }, []);

    function arrayItems(items: TPagSeguroBoleto | TPagSeguroPix) {
        for (let i = 0; sale.itens.length > i; i++) {
            const item: TPagSeguroItems = { reference_id: "", name: '', quantity: 0, unit_amount: 0 }
            item.reference_id = sale.itens[i].item
            item.name = sale.itens[i].descric
            item.quantity = sale.itens[i].amount
            item.unit_amount = sale.itens[i].valor.replace(/[.]/g, '')
            items.items.push(item)
        }
    };

    function getPagSeguro(pagSeguro: TPagSeguroBoleto | TPagSeguroPix) {
        pagSeguro.reference_id = sale.user.user_id
        pagSeguro.description = "Compras On-line"
        pagSeguro.customer.name = sale.person.name_pers
        pagSeguro.customer.email = sale.user.user_name
        pagSeguro.customer.tax_id = sale.person.cpf_pers
        pagSeguro.customer.phones[0].number = sale.person.phone_pers.substring(2)
        pagSeguro.customer.phones[0].country = '55'
        pagSeguro.customer.phones[0].area = sale.person.phone_pers.slice(0, -9);
        pagSeguro.customer.phones[0].type = "MOBILE"
        pagSeguro.shipping.address.street = sale.person.address.address_pers
        pagSeguro.shipping.address.number = parseInt(sale.person.address.num_address)
        pagSeguro.shipping.address.complement = null
        pagSeguro.shipping.address.locality = sale.person.address.bairro_pers
        pagSeguro.shipping.address.city = sale.person.address.name_city
        pagSeguro.shipping.address.region_code = sale.person.address.uf
        pagSeguro.shipping.address.country = 'BRA'
        pagSeguro.shipping.address.postal_code = sale.person.address.num_cep.replace(/[..-]/g, '')
        arrayItems(pagSeguro)
    };

    function getPagSeguroPix() {
        let time = new Date();
        let expiration_date_qrcode = new Date();
        expiration_date_qrcode.setHours(time.getHours() + 48);
        getPagSeguro(pagSeguroPix)
        pagSeguroPix.qr_codes[0].amount.value = payment.toFixed(2).replace(/[.]/g, '')
        pagSeguroPix.qr_codes[0].expiration_date = expiration_date_qrcode
        pagSeguroPix.notification_urls = ["https://meusite.com/notificacoes"]
        setMessagesSucess('Aponte sua Camera para o QrCorde')
        setSendPaid(true)
    };

    const [getboletoDueDate, setboletoDueDate] = useState(new Date());
    function boletoDueDate() {
        const data = new Date(getboletoDueDate),
            day = (data.getDate() + 1).toString().padStart(2, '0'),
            month = (data.getMonth() + 1).toString().padStart(2, '0'),
            year = data.getFullYear();
        return year + "-" + month + "-" + day;
    }

    function getPagSeguroBoleto() {
        getPagSeguro(pagSeguroBoleto)
        pagSeguroBoleto.charges[0].reference_id = sale.user.user_id
        pagSeguroBoleto.charges[0].description = "Compra On-line"
        pagSeguroBoleto.charges[0].amount.value = payment.toFixed(2).replace(/[.]/g, '')
        pagSeguroBoleto.charges[0].amount.currency = "BRL"
        pagSeguroBoleto.charges[0].payment_method.type = "BOLETO"
        pagSeguroBoleto.charges[0].payment_method.boleto.due_date = boletoDueDate()
        pagSeguroBoleto.charges[0].payment_method.boleto.instruction_lines.lines_1 = "Pagamento processado para DESC Fatura"
        pagSeguroBoleto.charges[0].payment_method.boleto.instruction_lines.lines_2 = "Via PagSeguro"
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.name = sale.person.name_pers
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.tax_id = sale.person.cpf_pers
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.email = sale.user.user_name
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.country = "BRL"
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.region = sale.person.address.uf
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.region_code = sale.person.address.uf
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.city = sale.person.address.name_city
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.postal_code = sale.person.address.num_cep.replace(/[..-]/g, '')
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.street = sale.person.address.address_pers
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.number = sale.person.address.num_address
        pagSeguroBoleto.charges[0].payment_method.boleto.holder.address.locality = sale.person.address.bairro_pers
        pagSeguroBoleto.notification_urls[0] = "https://meusite.com/notificacoes"
        setMessagesSucess('Aguardando pagamento do boleto')
        setSendPaid(true)
    };

    async function registerPagSeguroPix() {
        await api.post<any>('/pix', pagSeguroPix)
            .then(response => {
                setQrcode(response.data)
            }).catch(error => setError("Erro ao gerar PIX tente novamente"))
    }

    async function registerPagSeguroBoleto() {
        await api.post('/boleto', pagSeguroBoleto)
            .then(response => {
                setBoletoPagSeguro(response.data)
            }).catch(error => setError("Erro ao gerar BOLETO tente novamente"))
    };
    
    function handleQrCode(e: Event) {
        e.preventDefault()
        if (paySale !== 0) {
            if (sendPaid === false) {
                getPagSeguroPix()
                registerPagSeguroPix()
            }
        } else {
            setError(msgPay)
        }
    };

    function handleBoleto(e: Event) {
        e.preventDefault()
        if (paySale !== 0) {
            if (sendPaid === false) {
                if (window.confirm("Confirma a geração do BOLETO ?")) {
                    getPagSeguroBoleto()
                    registerPagSeguroBoleto()
                }
            }
        } else {
            setError(msgPay)
        }
    };

    async function registerSale() {
        await api.post('sale_register', sale)
            .then(response => {
                const res = response.data
                setNumNote(res)
            })
            .catch(error => setError((JSON.stringify(error))));
    };
    useEffect(() => {
        if (valueQrCode !== 0 || barCodeBoleto !== "")
            if (sendSale === false) {
                registerSale()
                setSendSale(true)
            }
    }, [valueQrCode, barCodeBoleto])

    useEffect(() => {
        clearSaleStorage(numNote)
    }, [numNote])

    return (
        <>
            <PagSeguroForm
                handleBoleto={handleBoleto}
                datavenc={getboletoDueDate}
                setInt={setboletoDueDate}
                barCodeBoleto={barCodeBoleto}
                barCodeBoletoFormated={barCodeBoletoFormated}
                handleQrCode={handleQrCode}
                qrcode_img={imgQrCode}
                payPix={valueQrCode !== 0 ?
                    currencyFormat(paySale) :
                    'R$ 0,00'} /** utilizado valor da sale, o retorno não separa casa decimal !! */
                qrCodeGeneratedSuccessfully={messagesSucess}
                URLNoteSubmit={numNote}
                paySale={payment}
                error={error}
            >
            </PagSeguroForm>
        </>
    )
}