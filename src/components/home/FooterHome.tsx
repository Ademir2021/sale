import { NewsLetter } from '../../useCases/contacts/newsLetter'
import * as Icon from 'phosphor-react';
import { Globais } from '../globais/Globais'

import './css/footer.css'


export function FooterHome() {

    const linkApp = 'https://drive.google.com/file/d/1cxKaXyg9uOfaqpu_eS8lRSgp4jhAY12G/view?usp=drive_link'

    return (
        <footer className='text-center'>
            <p>
                <dd>Baixe nosso App-Store !</dd>
                <a
                    href={linkApp}
                    hrefLang='pt-br'
                    target='_black'
                >
                    <img
                        src='img/android_downl_app.png'
                        alt='Baixar nosso aplicativo para Android'
                    ></img></a>
            </p>
            <p>
                <dd>Siga-nos !</dd>
                <a target="_blank" href={process.env.REACT_APP_FACEBOOK_SOCIAL}><img className="social-icons" src="img/social/facebook.ico" alt='Icon Facebook'></img></a>
                <a target="_blank" href={process.env.REACT_APP_INSTAGRAM_SOCIAL}><img className="social-icons" src="img//social//instagram.ico" alt='Icon Intagram'></img></a>
                <a target="_blank" href={process.env.REACT_APP_LINKEDIN_SOCIAL}><img className="social-icons" src="img//social//linkedin.png"></img></a>
                <a target="_blank" href={process.env.REACT_APP_GITHUB_SOCIAL}><img className="social-icons" src="img//social//github.ico" alt='Icon Github'></img></a>
                <a target="_blank" href={process.env.REACT_APP_TWITTER_SOCIAL}><img className="social-icons" src="img//social//twitter.png"></img></a>
            </p>

            <p>Loja on-line. Fácil de comprar, Rapidez e segurança em suas compras</p>

            <label id="header-channel-title">Canais para Acessos rápido</label>
            <div className="menu-footer">
                <div className="menu-footer-column">
                    <a href="pe">Carrinho de Compras</a>
                    <a href="invoice_sales">Finalizar Compras</a>
                    <a href="contact">Garantias, Fretes</a>
                    <a href="form_person">Cadastrar Dados</a>
                </div>
                <div className="menu-footer-column">
                    <a href="pagsegurocard">Cartões de Crédito</a>
                    <a href="pagcredloja">Crediário Loja</a>
                    <a href="pagseguro">PIX, Boletos</a>
                    <a href="contas_receber">Financeiros</a>
                </div>
                <div className="menu-footer-column">
                    <a href="sale">ChecKout de Compras</a>
                    <a href="contact">Fale Conosco</a>
                    <a href="login">Sua Conta</a>
                    <a href="contacts_list">Seus Posts</a>
                </div>
            </div>

            <p><a href='#' className='btn-top'><Icon.CaretUp size={32} /></a></p>
            <NewsLetter />
            {/* Google Maps */}
            <div className="maps">
                <p>
                    <iframe src={process.env.REACT_APP_GOOGLE_MAPS} className="maps" loading="lazy"></iframe><br />
                    {/* fim */}
                </p>
            </div>
            {/**Text Footer */}
            <div className='text-footer'>
                <div>{Globais.rights_reserved}</div>
                <div>{Globais.address}</div>
                <div>Powered by <a href={Globais.URL} title="Powered By." target="_self">{Globais.title}</a> Contato {Globais.phone}</div>
                <br />
                <p>
                    <span>Política de cookies: </span>
                    Os <b>cookies... </b>
                    <a href={'cookies'} title="Politica de cookies">cookies</a>
                </p>
                <p className='text-center'><span>{Globais.company} | <b>CNPJ: </b>{Globais.CNPJ}</span></p>

                <p> <a href={'invoice_sales'}>
                    <img src='/img/band_cartao_creditos.png' className='footer-payment'></img>
                </a></p>
                <p> <a href='##'>
                    <img className="site-ssl" src='img/ssl_cert.png' alt="Certificado SSL"></img></a></p>
            </div>
        </footer>
    )
}