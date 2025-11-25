import { useState, useEffect } from "react";
import saleJSON from "./JSON/sale.json"
import { PagCredLojaForm } from "../../components/sales/PagCredLojaForm"
import { NavBar } from "../../components/navbar/Navbar";

import api from "../../services/api/api";
import { TSale } from "./type/TSale";
import { HandlePayment } from "./handlePayment/HandlePayment";

const PagCredLoja:React.FC = () => {

    const [sendSale, setSendSale] = useState<boolean>(false)
    const [numNote, setNumNote] = useState(0)
    const saleJSON_:any = saleJSON
    const [sale, setSale] = useState<TSale>(saleJSON_);
    const [msg, setMsg] = useState('')

    const msgSendSale = 'Sua compra já foi enviada.'
    const msgNoShopping = 'Sem compras para pagar.'

    const handlePayment = new HandlePayment()

    const getSale = () => {
        const store_sale = localStorage.getItem('sl');
        if (store_sale) {
            const res = JSON.parse(store_sale)
            setSale(res)
            handlePayment.handleInstallments(res, 'Cred', "Crediário Loja")
        }
    };
    useEffect(() => {
        getSale()
    }, [])

    const registerSale = async () => {
        await api.post('sale_register', sale)
            .then(response => {
                const res = response.data
                setNumNote(res)
            })
            .catch(error => console.log(error));
    };

        useEffect(() => {
            handlePayment.clearSaleStorage(numNote)
        }, [numNote])

    const handleSubmit = () => {
        if (sale.dinheiro != 0 || sale.duplicatas.length > 0) {
            if (sendSale === false) {
                registerSale()
                sale.duplicatas = []
                setSendSale(true)
            } else {
                setMsg(msgSendSale)
            }
        } else {
            setMsg(msgNoShopping)
        }
    }

    return <> <NavBar />
        <PagCredLojaForm
            handleSubmit={handleSubmit}
            duplicatas={sale.duplicatas}
            URLNoteSubmit={numNote}
            dinheiro={sale.dinheiro}
            msg={msg}
        /> </>
}

export { PagCredLoja }
