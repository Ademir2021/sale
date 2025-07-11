import { handleLinksDir } from '../utils/backHome/BackHome'
import './css/styles.css'

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
    const emitirTitulo = <div className="container-global">
        <div className="main-global">
            <p>Emitir provisão de despesas</p>
            <div className="main-global-form">
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
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >Salvar conta</button>
                <dd className="text-center">{msg}</dd>
                <hr></hr>
            </div>
            <div className='list-person'>{listPersons}</div>
            <div className='list-despesa'>{listDespesas}</div>
        </div>
    </div>

    return (
        <>
        <div className='text-center'>{links}</div>
            {emitirTitulo}
        </>
    )
}