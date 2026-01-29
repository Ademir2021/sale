import { HandleContaAPagar } from '../../useCases/contasAPagar/handleContaAPagar'
import { TContaAPagar } from '../../useCases/contasAPagar/type/TContasAPagar'
import { handleLinksDir } from '../utils/backHome/BackHome'
import { HandleFinanceiro } from '../utils/financeiro/HandleFinanceiro'
import { FormatDate } from '../utils/formatDate'

type Props = {
    handleTokenMessage: any
    children: TContaAPagar
    contasAPagar: TContaAPagar[]
    contaPagarUpdate: Function
    setContaAPagar: Function
    handleSubmit: any
    handleChange: any
    msg: string;
    listPersons: any
    listDespesas: any
    findDespesa: Function
    findPerson: Function
    handleChangeStatus:any
}

const ContasAPagarRegisterForm:React.FC<Props> = ({
    handleTokenMessage,
    children,
    contasAPagar,
    contaPagarUpdate,
    setContaAPagar,
    handleSubmit,
    handleChange,
    msg,
    listPersons,
    listDespesas,
    findDespesa,
    findPerson,
    handleChangeStatus
}: Props) => {

    const handleFinanceiro = new HandleFinanceiro()
    const handleContaAPagar = new HandleContaAPagar()

    const nav = <p>
        <a href='despesa'>Despesa</a>
    </p>

    const links = <>
        {handleLinksDir(
            'dashboardefault',
            'Painel',
            'contas_pagar',
            'Financeiro',
            '##',
            'Emitir Despesa'
        )}
    </>
    const text_title = ' Provisão da Despesas'
    const emitirTitulo = <form onSubmit={handleSubmit} className='form' id='up_form_'>
        {handleTokenMessage}
        <>{links}</>
        <p>{children.id_conta === 0 ? 'Emitir' + text_title : 'Atualizar' + text_title} </p>
        {nav}
        <input
            type="number"
            name="valor"
            value={children.valor || ""}
            onChange={handleChange}
            placeholder="Digite o valor"
        />
        <label>Multa</label>
        <input
            type="number"
            name="multa"
            value={children.multa || 0}
            onChange={handleChange}
            placeholder="Multa"
        />
        <label>Juros</label>
        <input
            type="number"
            name="juroa"
            value={children.juros || 0}
            onChange={handleChange}
        />
        <label>Desconto</label>
        <input
            type="number"
            name="desconto"
            value={children.desconto || 0}
            onChange={handleChange}
        />
        <label>Recebimentos</label>
        <input
            type="number"
            name="Recebimento"
            value={children.recebimento || 0}
            onChange={handleChange}
        />
        <label>Saldo</label>
        <input
            type="saldo"
            name="desconto"
            value={children.saldo = children.valor - children.recebimento - children.desconto || 0}
            onChange={handleChange}
        />
        <input
            type="date"
            name="vencimento"
            onChange={handleChange}
        />
        <input
            type="text"
            name="observacao"
            value={children.observacao || ""}
            onChange={handleChange}
            placeholder="Observação"
        />
        <label>Beneficiário</label>
        {children && <p>{findPerson(children)}</p>}
        {listPersons}
        <label>Despesa:</label>
        {children && <p>{findDespesa(children)}</p>}
        {listDespesas}
        <button className='container'>{children.id_conta === 0 ? 'Inserir Conta' : 'Atualizar Conta'}</button>
        <button className='container' onClick={() => setContaAPagar(handleContaAPagar.clearFields(children))}>Cancelar</button>
        {msg && <p className='p-2 text-center'>{msg}</p>}
    </form>
    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <td className="text-center">Compra</td>
            <td>BenefID</td>
            <td>Beneficiário</td>
            <td>DespID</td>
            <td>Despesa</td>
            <td>Observação</td>
            <td>Emissão</td>
            <td>Valor</td>
            <td>Vencimento</td>
            <td>Pagamento</td>
            <td>Saldo</td>
            <td>Recebido</td>
            <td className="text-center">Atualizar</td>
            <td className="text-center">Cancelar</td>
        </tr>
    </thead>

    const listContasAPagar = <table className="table">
        {contasAPagar.length > 0 ? thead : <p>Inclua uma nova Conta a Pagar</p>}
        <tbody>
            {contasAPagar.map((contaAPagar: TContaAPagar) => (
                <tr key={contaAPagar.id_conta}>
                    <th className="text-center">{contaAPagar.id_conta}</th>
                    <td className="text-center">{contaAPagar.fk_compra}</td>
                    <td className="text-center">{contaAPagar.fk_beneficiario}</td>
                    <td>{findPerson(contaAPagar)}</td>
                    <td className="text-center">{contaAPagar.fk_despesa}</td>
                    <td>{findDespesa(contaAPagar)}</td>
                    <td>{contaAPagar.observacao}</td>
                    <td className="">{handleFinanceiro.formatDate(contaAPagar.emissao)}</td>
                    <td>{contaAPagar.valor}</td>
                    <td>{handleFinanceiro.formatDate(contaAPagar.vencimento)}</td>
                    <td>{contaAPagar.pagamento ? contaAPagar.pagamento : 'Em aberto'}</td>
                    <td>{contaAPagar.saldo}</td>
                    <td>{contaAPagar.recebimento}</td>
                    <td className="text-center"><a href="#up_form_" onClick={() => contaPagarUpdate(contaAPagar)}>Atualizar</a></td>
                    <td className="text-center"><a href="#up_form_" onClick={() => setContaAPagar(handleContaAPagar.clearFields(contaAPagar))}>Cancelar</a></td>
                </tr>
            ))}
        </tbody>
    </table>
      const statusTitulo = <div className="container">
        <input
        type="checkbox"
        name="statusTitulo"
        onChange={handleChangeStatus}
    />
        <label className="p-2">Listar Somente os Títulos em Abertos</label>
    </div>
      
    return <>
        {emitirTitulo}
        {statusTitulo}
        {listContasAPagar}
    </>
}

export { ContasAPagarRegisterForm }