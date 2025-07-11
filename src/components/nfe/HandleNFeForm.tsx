import { TSaleList } from "../../useCases/sales/type/TSale"
import { currencyFormat } from "../utils/currentFormat/CurrentFormat"
import { FormatDate } from "../utils/formatDate"
import { Waiting } from "../utils/waiting/Waiting"

type Props = {
    sales: TSaleList[]
    findPerson: any // função findPerson
    children: string | number | readonly string[] | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit: any // função listar Notas
    handleClear: any // Função limpar lista de notas
    gerarNFe: any // Função para gerar NFe
}

function HandleNFeForm(
    {
        sales,
        findPerson,
        handleChange,
        handleSubmit,
        handleClear,
        gerarNFe
    }: Props) {

    // const NFeStatus = <img src="img/NFe/status/autorizada.ico" alt="img NFe autorizada"></img>

    const header = <> <h1 className="text-center">Acompanhamento NFe </h1>
        <div className="container">
            <dd>Selecione as opções desejada</dd>
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
            <button onClick={handleSubmit} className="m-1 btn btn-primary">Atualizar</button>
            <button onClick={handleClear} className="btn btn-primary">limpar</button>
        </form>
    </>
    const thead = <thead>
        <tr>
            <th className='text-center'>Nota</th>
            <th className="text-center">NFe</th>
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
            <th>Emitir NFe</th>
        </tr>
    </thead>

    return (
        <>
            {header}
            <table className='table bg-light mt-1 container'>
                {sales.length === 0 ? <Waiting waiting="Aguardando Notas" /> : thead}
                <tbody>
                    {sales.map((sale: TSaleList) => (
                        <tr key={sale.id_sale}>
                            <th className='text-center'>{sale.id_sale}</th>
                            <th className="text-center">{sale.id_nfe}</th>
                            <th className="text-center">{sale.fk_name_filial}</th>
                            <td>{sale.fk_name_pers}</td>
                            <td>{findPerson(sale.fk_name_pers)}</td>
                            <td>{FormatDate(sale.created_at)}</td>
                            <td>{sale.doc_nfe ? sale.doc_nfe : 'null'}</td>
                            <td>{currencyFormat(sale.created_at)}</td>
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