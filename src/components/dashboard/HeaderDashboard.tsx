import { handleLinksDir } from '../utils/backHome/BackHome';

import './css/styles.css'

type Props = {
    privilege: number
    name: string;
    username: number;
    handleLogout: any;
}

export function HeaderDashboard(props: Props) {
    return (
        <>
            <hr></hr>
            <div id='container-dashboard'>
                <div id='form-dashboard'>
                    <h1>Sua Conta de acesso</h1>
                    <b>{props.privilege == 2 ? 'Nome adminstrador ' : 'Nome comprador '}</b>
                    <dd><b>Olá, </b>{props.name}</dd>
                    <b>{props.privilege == 2 ? 'Email admistrador ' : 'Email comprador '}</b>
                    <>{props.username}</>
                    <hr/>
                    {handleLinksDir(
                        'store',
                        'HomeStore',
                        'pe',
                        'Carrinho de compras',
                        '##',
                        'Painel de controle',
                    )}
                    <b>Gerenciar suas compras nunca foi tão fácil</b>
                    <ul>
                    <li><b>Incluir cadastro</b>{" >> "}<a href='form_person'>Dados do Cliente e endereço</a></li>
                    <li><b>Consultar parcelas</b>{" >> "}<a href='contas_receber'>Suas parcelas em aberto</a></li>
                    </ul>
                    <button
                        onClick={() => { window.location.replace("sale") }}
                        className="btn btn-primary mt-5"
                    >Checkout de compras</button>
                    <button
                        onClick={props.handleLogout}
                        className='btn btn-primary'
                    >Sair</button>
                </div>
            </div>
        </>
    )
}