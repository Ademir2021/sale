import { useState, useEffect } from "react";
import sale_JSON from "./JSON/sale.json"
import { PagCredLojaForm } from "../../components/sales/PagCredLojaForm"
import { NavBar } from "../../components/navbar/Navbar";
import { clearSaleStorage, handleInstallments } from "./handlePayment/HandlePayment";

import api from "../../services/api/api";

export function PagCredLoja() {
    const [sendSale, setSendSale] = useState<boolean>(false)
    const [numNote, setNumNote] = useState(0)
    const [sale, setSale] = useState(sale_JSON);
    const [msg, setMsg] = useState('')

    const msgSendSale = 'Sua compra já foi enviada.'
    const msgNoShopping = 'Sem compras para pagar.'

    const getSale = () => {
        const store_sale = localStorage.getItem('sl');
        if (store_sale) {
            const res = JSON.parse(store_sale)
            setSale(res)
            handleInstallments(res, 'Cred', "Crediário Loja")
        }
    };
    useEffect(() => {
        getSale()
    }, [])

    async function registerSale() {
        await api.post('sale_register', sale)
            .then(response => {
                const res = response.data
                setNumNote(res)
            })
            .catch(error => console.log(error));
    };

        useEffect(() => {
            clearSaleStorage(numNote)
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
