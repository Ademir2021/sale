import { handleTokenMessage } from "../../services/handleEnsureAuth"
import { TSaleList } from "../../useCases/sales/type/TSale"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { FormatDate } from "../utils/formatDate"
import { Waiting } from "../utils/waiting/Waiting"

import './css/styles.css'

type Props = {
    sales: TSaleList[]
    salesFound: TSaleList[]
    findPerson: any // função findPerson
    children: string | number | readonly string[] | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit?: any // função listar Notas
    handleClear: any // Função limpar lista de notas
    gerarNFe: any // Função para gerar NFe
    msg?: string
    tokenMessage: any
    setModel: Function
    setSerie: Function
    setTpAmb: Function
    setTpEmis: Function
    setTpNf: Function
    model: string
    serie: string
    tpAmb: string
    tpEmis: string
    tpNf: string
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
        tokenMessage,
        setModel,
        setSerie,
        setTpAmb,
        setTpEmis,
        setTpNf,
        model,
        serie,
        tpAmb,
        tpEmis,
        tpNf
    }: Props) {

    const NFeAuth = <img src="img/NFe/status/autorizada.ico" alt="img NFe autorizada"></img>
    const NFeOpen = <img src="img/NFe/status/emAberto.ico" alt="img NFe aberta"></img>

    const header = <>
        <div className="container">
            <h1>Acompanhamento NFe </h1>
            {handleTokenMessage('nfe', tokenMessage)}
            <div className="container">
                <span>{tpNf == '1 - Saída' ? "1 - Saída" : '0 - Entrada'}</span>
                <strong>{model && ' | '}</strong>
                <span>{model && model}</span>
                <strong>{serie && ' | '}</strong>
                <span>{serie && `Série - ${serie}`}</span>
                <br />
                <span>{tpAmb}</span>
                <strong> {tpEmis && ' | '} </strong>
                <span>{tpEmis && tpEmis}</span>
                <div className="nfe-select">
                    <select defaultValue="" onChange={(e) => setTpNf(e.target.value)}>
                        <option disabled value="">Selecione o Tipo ...</option>
                        <option>{"0 - Entrada"}</option>
                        <option>{"1 - Saída"}</option>
                    </select>
                    <select defaultValue="" onChange={(e) => setModel(e.target.value)}>
                        <option disabled value="">Selecione o Modelo ...</option>
                        <option>{"NFe Modelo 55"}</option>
                        <option>{"NFe Modelo 65"}</option>
                    </select>

                    <select defaultValue="" onChange={(e) => setSerie(e.target.value)}>
                        <option disabled value="">Selecione a Série ...</option>
                        <option>{'001'}</option>
                        <option>{'002'}</option>
                        <option>{'003'}</option>
                    </select>
                </div>
                <div className="nfe-select">
                    <select defaultValue="" onChange={(e) => setTpAmb(e.target.value)}>
                        <option>{'1 - Produção'}</option>
                        <option>{'2 - Homologação'}</option>
                    </select>
                    <select defaultValue="" onChange={(e) => setTpEmis(e.target.value)}>
                        <option disabled value="">Selecione a Forma de Emissão da NFe ...</option>
                        <option>{'1 - Normal'}</option>
                        <option>{'2 - Contigência'}</option>
                        <option>{'3 - Regime Especial NFF (NT2021.002)'}</option>
                        <option>{'4 - Contigência DPEC'}</option>
                        <option>{'5 - Contigência FSDA'}</option>
                        <option>{'6 - Contigência SVC - AN'}</option>
                        <option>{'7 - Contiência - SVC - RS'}</option>
                        <option>{'9 - Contigência off-line NFC-e'}</option>
                    </select>
                </div>
                <div>Selecione as opções desejada</div>
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
                            >Emitir</button> : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export { HandleNFeForm }