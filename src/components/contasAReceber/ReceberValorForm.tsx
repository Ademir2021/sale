import { handleLinksDir } from '../utils/backHome/BackHome'
import { TValsRecebidos } from '../../useCases/contasAReceber/type/TContasAReceber'

type Props = {
    children: TValsRecebidos
    handlechange:any
    handleSubmit: any
    listPersons: any
    msg:string
}

export function ReceberValorForm({
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
                'contas_receber',
                'Financeiro',
                '##',
                'Receber valores'
            )}
        </> 

    const receberValor = <>
            <form onSubmit={handleSubmit} className="form">
                {links}
            <b>Receber valores</b>
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
                <>{listPersons}</>
                <button>Inserir valor</button>
                <dd>{msg}</dd>
            </form>
        </>
    return <>
            {receberValor}
        </>
}