import { handleTokenMessage } from "../../services/handleEnsureAuth"
import { TSaleList } from "../../useCases/sales/type/TSale"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { FormatDate } from "../utils/formatDate"
import { Waiting } from "../utils/waiting/Waiting"

type Props = {
    sales: TSaleList[]
    salesFound:TSaleList[]
    findPerson: any // função findPerson
    children: string | number | readonly string[] | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit?: any // função listar Notas
    handleClear: any // Função limpar lista de notas
    gerarNFe: any // Função para gerar NFe
    msg?:string
    tokenMessage:any
}

function HandleNFeForm(
    {
        sales,
        findPerson,
        salesFound,
        handleChange,
        handleSubmit,
        handleClear,
        gerarNFe,
        msg,
        tokenMessage
    }: Props) {

    const NFeAuth = <img src="img/NFe/status/autorizada.ico" alt="img NFe autorizada"></img>
    const NFeOpen = <img src="img/NFe/status/emAberto.ico" alt="img NFe aberta"></img>

    const header = <> 
      <div className="container">
        <h1>Acompanhamento NFe </h1>
          {handleTokenMessage('nfe', tokenMessage)}
        <div className="container">
            <label>Selecione as opções desejada</label>
            <div>{NFeAuth}{" Autorizadas"}{" - "}{NFeOpen}{" Abertas"}</div>
            <table>
                <td>
                    <tr><input
                        type="checkbox"
                        name='nfe_autorizada'
                        onChange={handleChange}
                    /> Notas autorizadas</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_impressa'
                        onChange={handleChange}
                    /> Notas impressas</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_em_aberto'
                        onChange={handleChange}
                    /> Notas em aberto</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_cancelada'
                        onChange={handleChange}
                    /> Notas canceladas</tr>
                </td>
                <td>
                    <tr><input
                        type="checkbox"
                        name='nfe_inutilizada'
                        onChange={handleChange}
                    /> Notas inutilizadas</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_denegada'
                        onChange={handleChange}
                    /> Notas denegadas</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_com_problema'
                        onChange={handleChange}
                    /> Notas com Problemas</tr>
                    <tr><input
                        type="checkbox"
                        name='nfe_enviada'
                        onChange={handleChange}
                    /> Notas enviadas</tr>
                </td>
            </table>
        </div>
        <form className="container p-3">
            <button onClick={salesFound.length === 0 ?
                handleSubmit : handleClear}
                className="m-1 btn btn-primary">
                    {salesFound.length === 0 ? "Pesquisar" : "Limpar"}</button>
            <div id="msg-green">{msg && msg}</div>
        </form>
        </div>
    </>
    const thead = <thead>
        <tr>
            <th className='text-center'>Nota</th>
            <th className="text-center">NFe</th>
            <th className="text-center">Situação</th>
            <th className="text-center">Filial</th>
            <th>Cliente</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Doc</th>
            <th>Emissão</th>
            <th>Total</th>
            <th>Email</th>
            <th>Situação</th>
            <th>Chave</th>
            <th>Protocolo</th>
            <th>Emitir</th>
        </tr>
    </thead>

    return (
        <>
            {header}
            <table className='table'>
                {sales.length === 0 ? <Waiting waiting="Aguardando Notas" /> : thead}
                <tbody>
                    {sales.map((sale: TSaleList) => (
                        <tr key={sale.id_sale}>
                            <th className='text-center'>{sale.id_sale}</th>
                            <th className="text-center">{sale.id_nfe}</th>
                            <th className="text-center" >{sale.chave_nfe ? NFeAuth : NFeOpen}</th>
                            <th className="text-center">{sale.fk_name_filial}</th>
                            <td>{sale.fk_name_pers}</td>
                            <td>{findPerson(sale.fk_name_pers)}</td>
                            <td>{FormatDate(sale.created_at)}</td>
                            <td>{sale.doc_nfe ? sale.doc_nfe : 'null'}</td>
                            <td>{FormatDate(sale.created_at)}</td>
                            <td>{currencyFormat(sale.total_sale)}</td>
                            <td>{'email'}</td>
                            <td>{sale.situacao_nfe ? sale.situacao_nfe : 'null'}</td>
                            <td>{sale.chave_nfe ? sale.chave_nfe : 'null'}</td>
                            <td>{sale.protocolo_nfe ? sale.protocolo_nfe : 'null'}</td>
                            <td>{!sale.protocolo_nfe ? <button
                                    onClick={() => (gerarNFe(sale))}
                                    className="btn btn-primary"
                                >Emitir</button>:null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export { HandleNFeForm }