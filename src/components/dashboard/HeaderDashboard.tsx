import { handleLinksDir } from '../utils/backHome/BackHome';

import './css/styles.css'
import '../css/styles-forms.css'

type Props = {
    privilege: number
    name: string;
    username: number;
    handleLogout: any;
}

const HeaderDashboard: React.FC<Props> = (props: Props) => {
    const links = handleLinksDir(
        '/',
        'Home',
        'pe',
        'Carrinho',
        '##',
        'Painel',
    )
    return <>
        <div className='form'>
            {links}
            <h1>Painel de controle</h1>
            <p>{props.privilege == 2 ? 'Adminstrador' : 'Cliente'}</p>
            <p><b>Olá, </b>{props.name}</p>
            <p>{props.username}</p>
            <b>Gerenciar suas compras nunca foi tão fácil</b>
            <p>
                <a href='form_person'>Dados do cliente</a>
                {' / '}
                <a href='contas_receber'>Financeiro</a>
            </p>
            <button
                onClick={() => {
                    window.location.replace("sale")
                }}
                className="m-2"
            >Checkout de compras</button>
            <button
                onClick={props.handleLogout}
                className='m-2'
            >Sair</button>
        </div>
    </>
}

export { HeaderDashboard }