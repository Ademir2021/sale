import { handleLinksDir } from "../utils/backHome/BackHome"

type Props = {
    children: any
    handlechange: any
    handleSubmit: any
    listPersons: any
    msg:string
}

export function PagarValorForm({
    children,
    handlechange,
    handleSubmit,
    listPersons,
    msg
}: Props) {
          const links = <>
                {handleLinksDir(
                    'dashboardefault',
                    'Painel',
                    'contas_pagar',
                    'Financeiro',
                    '##',
                    'Pagar valores'
                )}
            </>
    const pagarValor =
    <form onSubmit={handleSubmit} className="form">
           <>{links}</>
                <b>Pagar Valores</b>
                <input
                    type="number"
                    name='valor'
                    value={children.valor || ''}
                    placeholder="Digite o valor"
                    onChange={handlechange}
                />
                   <input
                    type="text"
                    name='descricao'
                    value={children.descricao || ''}
                    placeholder="Descrição do valor"
                    onChange={handlechange}
                />
                <button>Inserir Valor</button>
                <p>{msg}</p>
                <div className="list-person">{listPersons}</div>
            </form>
    return <>
            {pagarValor}
        </>
}