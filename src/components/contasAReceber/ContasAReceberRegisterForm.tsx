import { handleLinksDir } from "../utils/backHome/BackHome"

type Props = {
    children: any
    handleSubmit: any
    handleChange: any
    msg: string
    listPersons: any
}

export function ContasAReceberRegisterForm({
    children,
    handleSubmit,
    handleChange,
    msg,
    listPersons
}: Props) {

        const links = <>
            {handleLinksDir(
                'dashboardefault',
                'Painel',
                'contas_receber',
                'Financeiro',
                '##',
                'Emitir titulos a receber'
            )}
        </> 

    const emitirTitulo = <form onSubmit={handleSubmit} className="form">
            <>{links}</>
            <p>Emitir título de conta a receber</p>
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
                <>{listPersons}</>
                <button>Inserir conta</button>
                <p>{msg}</p>
            </form>
    return <>
            {emitirTitulo}
        </>
}