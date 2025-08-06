import { handleLinksDir } from '../utils/backHome/BackHome';
import * as Icon from 'phosphor-react';

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
            <label>{<Icon.DotsThreeOutlineVertical size={18} color='blue' />}Gerenciar suas compras nunca foi tão fácil</label>

            <a href='form_person' className='p-3' >{<Icon.FolderUser size={32} />} Dados do cliente</a>
            <a href='contas_receber' className='p-3' >{<Icon.ChartLineUp size={32} />} Financeiro</a>
            <a href='##' className='p-3' onClick={() => {
                window.location.replace("sale")
            }} >{<Icon.ListChecks size={32} />} Checkout de compras</a>
            <a href='##' className='p-3' onClick={props.handleLogout}
            >{<Icon.SignOut size={32} />} Sair</a>
        </div>
    </>
}

export { HeaderDashboard }