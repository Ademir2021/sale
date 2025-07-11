import { checksUserLogged, checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { Globais } from "../globais/Globais";
import { Logo } from "../logo/Logo";

import "../assets/dist/css/bootstrap.min.css"
import "./css/styles.css"

export function NavBar() {

    const privilAdmin = Globais.privilAdmin;
    const privilegeShopping = Globais.checksUserLogged;

    return (
        <div style={{fontSize:'14px'}}>
            <nav
                className="navbar navbar-expand-lg "
                id='nav-nav'
                aria-label="Offcanvas navbar large">
                <div className="container-fluid" >
                    <a
                        className="navbar-brand"
                        href="/dashboardefault">{<Logo />}
                    </a>
                    <button
                        className="navbar-toggler"
                        id="button-1"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar2"
                        aria-controls="offcanvasNavbar2">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="offcanvas offcanvas-end bg-secondary-old"
                        id="offcanvasNavbar2"
                        aria-labelledby="offcanvasNavbar2Label">
                        <div className="offcanvas-header">
                            < span
                                className="offcanvas-title"
                                id="offcanvasNavbar2Label" >
                                <a href={'/contact'}>Fale conosco </a>
                            </span>
                            <button
                                type="button"
                                className="btn-close btn-close-dark"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close">
                            </button>
                        </div>
                        <div
                            className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    {checksUserLogged() === privilegeShopping ?
                                        <a className="nav-link"
                                            aria-current="page"
                                            href="/dashboardefault">
                                            <b>Painel de Controle</b></a> :
                                        <a
                                            className="nav-link"
                                            aria-current="page"
                                            href="/store"><b>Home/Store</b>
                                        </a>}
                                </li>

                                <li className="nav-item">
                                    {checksUserLogged() === privilegeShopping ?
                                        <a className="nav-link"
                                            aria-current="page"
                                            href="/pe">Carrinho/Logar</a> :
                                        <a className="nav-link"
                                            aria-current="page"
                                            href="/pe">Carrinho/Alterar</a>}
                                </li>

                                <li className="nav-item">
                                    {checksUserLogged() === privilegeShopping ?
                                        <a className="nav-link"
                                            href='/register'><>Não tem conta?/</><b>Cadastre-se</b></a> :
                                        <a className="nav-link"
                                            href='/user_update'>Sua Conta/Alterar</a>}
                                </li>

                                <li className="nav-item">
                                    {checksUserLogged() === privilegeShopping ?
                                        <a className="nav-link" href='/login'>Entrar</a> :
                                        <a className="nav-link"
                                            href='/logout'>Sair</a>}
                                </li>
                                <li className="nav-item">
                                   <b>{checksUserLogged() === privilegeShopping ?
                                       <a className="nav-link"
                                       href="/sale">PDV/Logar</a> :
                                        <a className="nav-link"
                                            href="/sale">PDV/Comprar</a>}</b>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                        href="##"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">Cadastros</a>
                                    <ul className="dropdown-menu" style={{fontSize:'14px'}}>
                                        <li><a className="dropdown-item nav-link"
                                            href="/form_person">Clientes</a></li>
                                        <li>{checkAdminPrivilege() === privilAdmin ?
                                            <a className="dropdown-item nav-link"
                                                href="/form_product">Produtos</a> :
                                            <></>}
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item nav-link"
                                                href="/person_update">Atualizar - Clientes</a></li>
                                        <li>{checkAdminPrivilege() === privilAdmin ?
                                            <a className="dropdown-item nav-link"
                                                href="/product_update">Atualizar - Produtos</a> :
                                            <></>}
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">Consultar</a>
                                    <ul className="dropdown-menu" style={{fontSize:'14px'}}>
                                        <li><a className="dropdown-item nav-link"
                                            href="/person_list">Clientes</a></li>
                                        <li><a className="dropdown-item nav-link"
                                            href="/product_list">Produtos</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item nav-link"
                                            href="/list_sale">Emitir notas</a></li>
                                        <li><a className="dropdown-item nav-link"
                                            href="/users_list">Usuários</a></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">Financeiro</a>
                                    <ul className="dropdown-menu" style={{fontSize:'14px'}}>
                                        <li>{checkAdminPrivilege() === privilAdmin ?
                                            <a className="dropdown-item nav-link"
                                                href="/contas_receber">Contas a receber</a> :
                                            <a className="dropdown-item nav-link"
                                                href="/contas_receber">Consultar financeiro</a>}</li>
                                        <li>{checkAdminPrivilege() === privilAdmin ?
                                            <a className="dropdown-item nav-link"
                                                href="/contas_pagar">Contas a pagar</a> :
                                          null }</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <span id="nav-calendar">{Globais.calendar}</span> */}
        </div>
    )
}