import { handleLinksDir } from '../utils/backHome/BackHome'

type Props = {
    children: any
    handleSubmit: any
    handleChange: any
    msg: string
    listPersons: any
    listDespesas: any
}

export function ContasAPagarRegisterForm({
    children,
    handleSubmit,
    handleChange,
    msg,
    listPersons,
    listDespesas
}: Props) {

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
    const emitirTitulo =<>
     <form onSubmit={handleSubmit} className='form'>
        <>{links}</>
            <p>Emitir provisão de despesas</p>
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
                    value={children.observacao}
                    onChange={handleChange}
                    placeholder="Observação"
                />
            <div>{listPersons}</div>
            <div>{listDespesas}</div>
                <button>inserir conta</button>
                <hr/>
                <p>{msg}</p>
            </form>
            </>
    return <>
            {emitirTitulo}
        </>
}