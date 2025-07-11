import { useState, useEffect } from "react";
import { PagSeguroForm } from '../../components/sales/PagSeguroForm';
import sale_JSON from "./sale.json"
import pagSeguroPix_JSON from "./pagSeguroPix.json"
import pagSeguroTicket_JSON from "./pagSeguroTicket.json"
import ticketRequest_JSON from './ticketRequest.json'
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import api from "../../services/api/api";

export function PagSeguro() {
    const [sendSale, setSendSale] = useState<boolean>(false)
    const [sendPaid, setSendPaid] = useState(false);
    const [messagesSucess, setMessagesSucess] = useState<string>('');
    const [sale, setSale] = useState<any>(sale_JSON);
    const [pagSeguroPix] = useState<any>(pagSeguroPix_JSON);
    const [qrcodePagSeguro, setQrcode] = useState<any>({ "qr_codes": [{ "amount": { "value": 0 }, "expiration_date": "", "links": [{ "href": "" }] }] });
    const [pagSeguroBoleto,] = useState<any>(pagSeguroTicket_JSON);
    const [boletoPagSeguro, setBoletoPagSeguro] = useState<any>(ticketRequest_JSON);
    const imgQrCode = qrcodePagSeguro.qr_codes[0].links[0].href
    const valueQrCode: number = qrcodePagSeguro.qr_codes[0].amount.value
    const barCodeBoleto = boletoPagSeguro.charges[0].payment_method.boleto.barcode
    const barCodeBoletoFormated = boletoPagSeguro.charges[0].payment_method.boleto.formatted_barcode
    const [numNote, setNumNote] = useState(0)
    const [error, setError] = useState("")
    const payment = sale.paySale - sale.dinheiro - sale.disc_sale
    const paySale:number = payment

    const msgPay = 'Sem compras para pagar'

    useEffect(() => {
        const getSale = () => {
            const sale_store_res = localStorage.getItem('sl');
            if (sale_store_res !== null) {
                const sales = JSON.parse(sale_store_res)
                setSale(sales)
            }
        };
        getSale()
    }, [sale]);


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

    function getPagSeguro(obj: any) {
        obj.reference_id = sale.user.user_id
        obj.description = "Compras On-line"
        obj.customer.name = sale.person.name_pers
        obj.customer.email = sale.user.user_name
        obj.customer.tax_id = sale.person.cpf_pers
        obj.customer.phones[0].number = sale.person.phone_pers.substring(2)
        obj.customer.phones[0].country = '55'
        obj.customer.phones[0].area = sale.person.phone_pers.slice(0, -9);
        obj.customer.phones[0].type = "MOBILE"
        obj.shipping.address.street = sale.person.address.address_pers
        obj.shipping.address.number = "1241"
        obj.shipping.address.complement = null
        obj.shipping.address.locality = sale.person.address.bairro_pers
        obj.shipping.address.city = sale.person.address.name_city
        obj.shipping.address.region_code = sale.person.address.uf
        obj.shipping.address.country = 'BRA'
        obj.shipping.address.postal_code = sale.person.address.num_cep.replace(/[..-]/g, '')
        arrayItems(obj)
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

    useEffect(() => {
        async function registerSale() {
            await api.post('sale_register', sale)
                .then(response => {
                    const res = response.data
                    setNumNote(res)
                })
                .catch(error => setError((JSON.stringify(error))));
        };
        if (valueQrCode !== 0 || barCodeBoleto !== "")
            if (sendSale === false) {
                registerSale()
                setSendSale(true)
            }
    }, [valueQrCode, barCodeBoleto])

    useEffect(() => {
        function clearSaleStorage() {
            if (valueQrCode !== 0 || barCodeBoleto !== "") {
                setTimeout(() => {
                    localStorage.removeItem('sl');
                    localStorage.removeItem('i');
                    localStorage.removeItem('p');
                    localStorage.removeItem('c');
                    localStorage.removeItem('t');
                    localStorage.removeItem('s');
                    localStorage.removeItem('id');
                }, 2000);
            }
        };
        clearSaleStorage()
    }, [barCodeBoleto, valueQrCode])

    return (
        <>
        {/* {JSON.stringify(pagSeguroPix)} */}
            <PagSeguroForm
                handleBoleto={handleBoleto}
                datavenc={getboletoDueDate}
                setInt={setboletoDueDate}
                barCodeBoleto={barCodeBoleto}
                barCodeBoletoFormated={barCodeBoletoFormated}
                handleQrCode={handleQrCode}
                qrcode_img={imgQrCode}
                payPix={valueQrCode !== 0 ? currencyFormat(paySale) : 'R$ 0,00'} /** utilizado valor da sale, o retorno não separa casa decimal !! */
                qrCodeGeneratedSuccessfully={messagesSucess}
                URLNoteSubmit={numNote}
                paySale={payment}
                error={error}
            >
            </PagSeguroForm>
        </>
    )
}