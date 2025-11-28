import { handleLinksDir } from '../utils/backHome/BackHome';
import * as Icon from 'phosphor-react';

import './css/styles.css'
import '../css/styles-forms.css'
import { Dashboard } from '../../useCases/dashboard/Dashboard';

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
    const perfil = <div className='panel-perfil'>
        <strong>Perfil :</strong>
         <span> {props.privilege == 2 ? 'Adminstrador' : 'Cliente'}</span>
        <div><strong>Olá, </strong>{props.name}</div>
        <div>{props.username}</div>
    </div>
    const linkSales = <div className='link-sales'>
        <a href='##'
        onClick={()=>window.location.replace('list_sale')}
        >Consultar Compras<span>
            <Icon.CaretRight size={26} color='white' alt='Compras' /></span></a>
    </div>
    const panel = <>
    <label>Acesso rápido</label>
    <div className='panel-card'>
        <div  className='panel-card-button'>
        <a href='form_person' >{
            <Icon.FolderUser size={32} />}<p>Cliente</p></a>
        </div>
        <div className='panel-card-button'>
        <a href='contas_receber'>
            {<Icon.ChartLineUp size={32} />}<p>Financeiro</p></a>
        </div>
        <div className='panel-card-button'>
        <a href='##' onClick={() => {
            window.location.replace("sale")
        }} >{<Icon.ListChecks size={32} />}<p>Checkout</p></a>
        </div>
        <div className='panel-card-button'>
        <a href='##' onClick={()=>window.location.replace("invoice_sales")}
        >{<Icon.ArrowClockwise size={32} />}<p>Compra</p></a>
        </div>
        </div>
    
        <div className='panel-card'>
             <div className='panel-card-button'>
        <a href='##' onClick={()=>window.location.replace('pe')}
        >{<Icon.ShoppingCart size={32} />}<p>Carrinho</p></a>
        </div>
             <div className='panel-card-button'>
        <a href='##' onClick={()=>window.location.replace('login')}
        >{<Icon.User size={32} />}<p>Sua Conta</p></a>
        </div>
             <div className='panel-card-button'>
        <a href='##' onClick={()=>window.location.replace('pagsegurocard')}
        >{<Icon.CreditCard size={32} />}<p>Cartão</p></a>
        </div>
            <div className='panel-card-button'>
        <a href='##' onClick={props.handleLogout}
        >{<Icon.SignOut size={32} />}<p>Sair</p></a>
        </div>
        </div>
        <hr></hr>
        </>
    return <>
        <Dashboard />
        <div className='container'>
            {links}
            <label>Sua Conta</label>
            {perfil}
            {linkSales}
            {panel}
        </div>
    </>
}

export { HeaderDashboard }