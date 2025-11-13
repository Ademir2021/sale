import { TSaleList } from "../../useCases/sales/type/TSale"
import { Globais } from "../globais/Globais"
import { Waiting } from "../utils/waiting/Waiting"
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { Dashboard } from "../../useCases/dashboard/Dashboard";
import { handleTokenMessage } from "../../services/handleEnsureAuth";
import { CloseX } from "../utils/closeX/CloseX";
import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro";

type Props = {
    sales: TSaleList[]
    msg: string
    int: string;
    end: string;
    setInt: Function
    setEnd: Function
    searchHandle: React.FormEventHandler<HTMLFormElement>
    filteredSales: any
    setFilteredSales: Function
    tokenMessage: string
}

const ListSalesForm: React.FC<Props> = ({
    sales,
    msg,
    int,
    setInt,
    searchHandle,
    end,
    setEnd,
    filteredSales,
    setFilteredSales,
    tokenMessage }: Props) => {

    const handleFinanceiro = new HandleFinanceiro()

    const NFeStatus = <img src="img/NFe/status/autorizada.ico" alt="img NFe Autorizada"></img>

    const form = <form onSubmit={searchHandle} className="form-container">
        <CloseX link="/" />
        <label>Notas de Vendas</label>
        <div>{handleTokenMessage('list_sale', tokenMessage)}</div>
        <div className="input-group">
            {sales.length === 0 && <Waiting waiting="Aguardando Notas ..." />}
            <label htmlFor="data-inicial">Data Inicial</label>
            <input
                id="data-inicial"
                type="date"
                value={int}
                onChange={e => setInt(e.target.value)}
            />
        </div>
        <div className="input-group">
            <label htmlFor="data-final">Data Final</label>
            <input
                id="data-final"
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
            />
        </div>
        {sales.length > 0 ? <Waiting waiting={"Nota(s) Localizada"} /> : msg && <Waiting waiting={msg} />}
        <button type="submit">Buscar</button>
    </form>

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

    const tbody = <tbody>
        {sales.map((sale: TSaleList) => (
            <tr key={sale.id_sale}>
                <th className='text-center'>{sale.id_sale}</th>
                <th className="text-center">{sale.id_sale}</th>
                <th className="text-center">{NFeStatus}</th>
                <td>{handleFinanceiro.formatDate(sale.created_at)}</td>
                <td>{sale.fk_name_pers}</td>
                <td>{currencyFormat(sale.total_sale)}</td>
                <td>{currencyFormat(sale.disc_sale)}</td>
                <td>{currencyFormat(sale.val_rec)}</td>
                <td><a href={Globais.URL_NOTE + '/' + sale.id_sale}>Imprimir</a></td>
            </tr>
        ))}
    </tbody>
    return <>
        <Dashboard />
        {sales.length < 1 && form}
        <div className="table-container">
            {filteredSales.length > 0 && <a href="##"
                onClick={() => { setFilteredSales([]) }}
            >Limpar busca</a>}
            <table className='table'>
                {sales.length > 0 && thead}
                {sales.length > 0 && tbody}
            </table>
        </div>
    </>
}

export { ListSalesForm }
