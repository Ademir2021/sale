import { NavBar } from "../navbar/Navbar"

export function CookiesWarnings() {
    return (
            <div className="container">
                <NavBar/>
                <hr></hr>
                <div><strong>O que são cookies ?</strong></div>
                <span className="cookies-font">
                    Todo mundo já viu banners de sites que perguntam se você permite cookies em seu navegador ou não.<br />
                    Mas o que isso significa exatamente e o que são esses cookies? Bem, para começar, eles são essenciais para a experiência moderna da Internet.<br />
                    Uma parte necessária da navegação na Web, os cookies ajudam os desenvolvedores da Web a oferecer uma visita ao site mais pessoal e conveniente.<br />
                    Resumindo, os cookies permitem que os sites se lembrem de você, de seus logins, carrinhos de compras e muito mais.<br />
                    Mas também podem ser um tesouro de informações privadas e uma séria vulnerabilidade à sua privacidade.<br />
                    Proteger sua privacidade online pode ser trabalhoso.<br />
                    Felizmente, mesmo um conhecimento básico sobre cookies pode ajudá-lo a manter olhos indesejados longe de sua atividade na Internet.<br />
                    Embora a maioria dos cookies sejam perfeitamente seguros, alguns podem ser usados por criminosos cibernéticos para rastreá-lo sem o seu consentimento.<br />
                    Neste artigo, vamos orientá-lo sobre como os cookies funcionam e como você pode se manter seguro online.,<br></br><br />
                    <strong>O que são cookies da Internet ?</strong><br />
                    Cookies (frequentemente conhecidos como cookies da Internet),<br />
                    são arquivos de texto com pequenos fragmentos de dados – como nome de usuário e senha – que são usados para identificar seu computador<br />
                    enquanto você usa uma rede. Cookies específicos são usados para identificar usuários específicos e melhorar sua experiência de navegação na Web.<br />
                    Os dados armazenados em um cookie são criados pelo servidor após sua conexão. Esses dados são rotulados com um ID exclusivo para você e seu computador.<br />
                    Quando o cookie é trocado entre o seu computador e o servidor da rede, o servidor lê o ID e sabe quais informações fornecer especificamente para você.<br />
                    Devido a leis internacionais, como o Regulamento Geral sobre Proteção dos Dados (RGPD) da UE, e a certas leis estaduais,<br />
                    como o California Consumer Privacy Act (CCPA), muitos sites agora são obrigados a solicitar permissão para usar determinados cookies com seu navegador<br />
                    e fornecer a você informações sobre como seus cookies serão usados se você aceitar.,<br></br><br />
                    <strong>Política de cookies !</strong>
                    <p>
                        Os <b>cookies</b> pemite que o website "lembre" suas ações ou preferencias ao longo do tempo. A
                        maioria dos navegadores da internet aceitam <a>cookies;</a> entretanto, os usuários podem configurar
                        seus navegadores para recusar certos tipos de <a>cookies</a> ou <a>cookies</a> específicos.<br></br>
                        <a href={'/'} title="Close"> Sair</a>
                        <br/>
                    </p>
                </span>
            </div>
    )
}