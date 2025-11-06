import { HandleContaAPagar } from '../../useCases/contasAPagar/handleContaAPagar'
import { TContaAPagar } from '../../useCases/contasAPagar/type/TContasAPagar'
import { TPerson } from '../../useCases/persons/type/TPerson'
import { handleLinksDir } from '../utils/backHome/BackHome'
import { FormatDate } from '../utils/formatDate'

type Props = {
    handleTokenMessage:any
    children: TContaAPagar
    contasAPagar:TContaAPagar[]
    contaPagarUpdate:Function
    setContaAPagar:Function
    handleSubmit: any
    handleChange: any
    msg: string;
    listPersons: any
    listDespesas: any
}

export function ContasAPagarRegisterForm({
    handleTokenMessage,
    children,
    contasAPagar,
    contaPagarUpdate,
    setContaAPagar,
    handleSubmit,
    handleChange,
    msg,
    listPersons,
    listDespesas
}: Props) {

    const handleContaAPagar = new HandleContaAPagar()

    const links = <>
        {handleLinksDir(
            'dashboardefault',
            'Painel',
            'contas_pagar',
            'Financeiro',
            '##',
            'Emitir titulos a pagar'
        )}
    </>
    const text_title = ' Provisão da Despesas'
    const emitirTitulo = <form onSubmit={handleSubmit} className='form' id='up_form_'>
         {handleTokenMessage}
        <>{links}</>
            <p>{children.id_conta == 0 ? 'Emitir' + text_title : 'Atualizar' + text_title } </p>
                <input
                    type="number"
                    name="valor"
                    value={children.valor || ""}
                    onChange={handleChange}
                    placeholder="Digite o valor"
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
            {listPersons}
            {listDespesas}
                <button>{children.id_conta === 0 ? 'Inserir Conta' : 'Atualizar Conta'}</button>
                {msg && <p className='p-2'>{msg}</p>}
            </form>
              const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th className="text-center">Compra</th>
            <th>BenefID</th>
            <th>Emissão</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Pagamento</th>
            <th>Saldo</th>
            <th>Recebido</th>
            <th className="text-center">Atualizar</th>
            <th className="text-center">Cancelar</th>
        </tr>
    </thead>

     const listContasAPagar = <table className="table">
            {contasAPagar.length > 0 ? thead : <p>Inclua uma nova Conta a Pagar</p>}
            <tbody>
                {contasAPagar.map((contaAPagar: TContaAPagar) => (
                    <tr key={contaAPagar.id_conta}>
                        <th className="text-center">{contaAPagar.id_conta}</th>
                        <th className="text-center">{contaAPagar.fk_compra}</th>
                        <th className="text-center">{contaAPagar.fk_despesa}</th>
                        <th className="">{FormatDate(contaAPagar.emissao)}</th>
                        <th>{contaAPagar.valor}</th>
                        <th>{FormatDate(contaAPagar.vencimento)}</th>
                        <th>{contaAPagar.pagamento ? contaAPagar.pagamento : 'Em aberto'}</th>
                        <th>{contaAPagar.saldo}</th>
                        <th>{contaAPagar.recebimento}</th>
                        <th className="text-center"><a href="#up_form_" onClick={() => contaPagarUpdate(contaAPagar)}>Atualizar</a></th>
                        <th className="text-center"><a href="#up_form_" onClick={() => setContaAPagar(handleContaAPagar.clearFields(contaAPagar))}>Cancelar</a></th>
                    </tr>
                ))}
            </tbody>
        </table>
    return <>
            {emitirTitulo}
            {listContasAPagar}
        </>
}