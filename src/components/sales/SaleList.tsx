import { TSaleList } from "../../useCases/sales/type/TSale"
import { Globais } from "../globais/Globais"
import { Waiting } from "../utils/waiting/Waiting"
import { FormatDate } from '../utils/formatDate/index';
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';

type Props = {
    sales: TSaleList[]
}

export function SalesList({ sales }: Props) {

    const NFeStatus = <img src="img/NFe/status/autorizada.ico" alt="img NFe autorizada"></img>

    const thead = <thead>
        <tr>
            <th className='text-center'>Nota</th>
            <th className="text-center">NFe</th>
            <th className="text-center">Status</th>
            <th>Emissão</th>
            <th>Cliente</th>
            <th>T-Prod</th>
            <th>Desc.</th>
            <th>T-Nota</th>
            <th>Imprimir</th>
        </tr>
    </thead>

    return (
        <table className='table bg-light mt-1 container'>
            {sales.length === 0 ? <Waiting waiting="Aguardando Notas" /> : thead}
            <tbody>
                {sales.map((sale: TSaleList) => (
                    <tr key={sale.id_sale}>
                        <th className='text-center'>{sale.id_sale}</th>
                        <th className="text-center">{sale.id_sale}</th>
                        <th className="text-center">{NFeStatus}</th>
                        <td>{FormatDate(sale.created_at)}</td>
                        <td>{sale.fk_name_pers}</td>
                        <td>{currencyFormat(sale.total_sale)}</td>
                        <td>{currencyFormat(sale.disc_sale)}</td>
                        <td>{currencyFormat(sale.val_rec)}</td>
                        <td><a href={Globais.URL_NOTE + '/' + sale.id_sale}>Imprimir</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
