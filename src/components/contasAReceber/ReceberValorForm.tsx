import { handleLinksDir } from '../utils/backHome/BackHome'
import './css/styles.css'

type Props = {
    children: any
    handlechange: any
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

    const receberValor = <div className="container-global">
        <div className="main-global">
            <p>Receber Valores</p>
            <div className="main-global-form">
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
                <button className="btn btn-primary"
                    onClick={handleSubmit}
                >Registrar Valor</button>
                <dd>{msg}</dd>
                <hr></hr>
            </div>
                <div className="list-person">{listPersons}</div>
        </div>
    </div>
    return (
        <>
        <div className='text-center'>{links}</div>
            {receberValor}
        </>
    )
}