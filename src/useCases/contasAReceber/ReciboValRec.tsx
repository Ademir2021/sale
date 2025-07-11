import { useEffect, useState } from "react";
import { ReciboValRecticket } from "../../components/contasAReceber/ReciboValRecTicket";
import { TReciboValRec } from "./type/TContasAReceber";
export function ReciboValRc() {

    const [recibo, setRecibo] = useState<TReciboValRec>()

    useEffect(() => {
        const getRecibo = () => {
            const recibo_store_res = localStorage.getItem('recibo_val_rec');
            if (recibo_store_res) {
                const recibo_: TReciboValRec = JSON.parse(recibo_store_res)
                setRecibo(recibo_)
            }
        };
        getRecibo()
    }, [])

    return (
        <ReciboValRecticket
            recibo={recibo}
        />
    )
}