import React, { useState } from 'react';
import { HomeCards } from './HomeCards'
import { HomeContact, PropsHomeContact } from './HomeContact'
import * as Icon from 'phosphor-react';
import { HomeIcons } from './HomeIcons';

import './css/styles.css'
import { InvoiceSalesForm } from '../sales/InvoiceSalesForm';
import { screen } from '@testing-library/react';

const HomeMain = ({ children, handleChange, handleSubmit, msg, msgFields }: PropsHomeContact) => {

    const [vText, setVText] = useState(false)
    const [vTec, setVTec] = useState(false)

    const cards = [
        { id: 1, item: "Emissor NFe", descric: "Modelo 55 e 65", content: 'Emissão e controle', img:'img/logo_acsor.png', },
        { id: 2, item: "Emissor NFCe", descric: 'EvoFácil emissor NFECe', content: "NFCe do simples",img:'img/logo_evofacil.png', },
        { id: 3, item: "Checkout de Vendas", descric: "Cartão, PIX e Boleto", content: 'Integração de sistemas para  vendas on-line',img:'img/logo_reactjs.png', },
        { id: 4, item: "API Rest", descric: "Comunicação", content: 'Micro-serviços com estruturas json/XML',img:'img/logo_reactjs.png', },
        { id: 5, item: "AC-Sor Sistema de Gestão - ERP", descric: "Sistema Integrado", content: 'Automação das vendas',img:'img/logo_acsor.png', }
    ]

    const btnSol = <button id='btn-list' onClick={() => !vText ? setVText(true) : setVText(false)}>
        <strong>Soluções</strong>
        <div id='icon-seta'>
            {!vText &&
                <HomeIcons title='UP' icon={<Icon.CaretUp size={28} />} />
            }
            {vText &&
                <HomeIcons title='Down' icon={<Icon.CaretDown size={28} />} />
            }
        </div>
    </button>

    const btnTec = <button id='btn-list' onClick={() => !vTec ? setVTec(true) : setVTec(false)}>
        <strong>Tecnologias</strong>
        <div id='icon-seta'>
            {!vTec &&
                <HomeIcons title='UP' icon={<Icon.CaretUp size={28} />} />
            }
            {vTec &&
                <HomeIcons title='Down' icon={<Icon.CaretDown size={28} />} />
            }
        </div>
    </button>

    const textSol = <div id='v-text'>
        {/* <p>Transformando suas idéias em realidade! Solicite agora mesmo um orçamento personalizado para o seu projeto de software.</p> */}
        {/* <p>Junte-se a uma empresa líder que prioriza qualidade e satisfação do cliente. Com um histórico comprovado de clientes em todo o Brasil.</p> */}
        <ul>
            <li>AC-Sor, sistema de gestão empresarial</li>
            <li>EvoFácil, sistema emissor de NFCe</li>
            <li>API REST, para comunicação das vendas on-line</li>
            <li>Módulo integrador, para NFE</li>
            <li>Sistemas web, para gestão de vendas online</li>
            <li>APP para vendas, versão para Android e IOS</li>
            <li>MiddleWares e Web-tokens</li>
        </ul>
    </div>

    const textTec = <div id='v-text'>
        {/* <div>Trabalhamos com as melhores tecnologias do mercado</div> */}
        {/* <div>Integração continua e qualidade no desenvolvimento</div> */}
        <ul>
            <li>ReactJS</li>
            <li>Google cloud</li>
            <li>Docker</li>
            <li>git e gitHub</li>
            <li>Postgres</li>
            <li>TypeScript</li>
            <li>JAVA</li>
        </ul>
    </div>

    return (
        <>
            <div id='container-home'>
                <header id='header' className='text-center'>
                    <a href='#cards'><button id='btn-header' className='btn btn-primary'
                    >Desenvolvendo o seu Software</button></a>
                </header>
                <main id="main-home">
                    <div>
                        <h1>Faça a sua escolha para o seu <b>Projeto de Software</b> !</h1>
                        {btnSol}
                        {vText && textSol}
                        {btnTec}
                        {vTec && textTec}
               
                    </div>
                    <div>
                        <HomeContact
                            children={children}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            msg={msg}
                            msgFields={msgFields}
                        />
                    </div>
                </main>
                <div id='cards'>
                    
                    <a href='#cards-in'><button className='btn btn-primary p-2 mb-3'>Soluções para sua empresa</button></a>
                    {/* <p id='cards-in'>A solução que você precisa!</p> */}
                    <dd id='cards-in'></dd>
                    {(cards.map((card: any) => (
                        <HomeCards
                            key={card.id}
                            id={card.id}
                            img={card.img}
                            item={card.item}
                            descric={card.descric}
                            content={card.content}
                            onClick={() => (window.location.assign("/hire"))}
                        />
                    )))}
                </div>
                {/* Fim dos cards **/}

                <div id='container-dev' >
                    <button
                        className='btn btn-primary'
                        id='mt18'
                        onClick={() => (window.location.assign("https://github.com/Ademir2021"))}
                    >Downloads</button>
                    <p id='font-bold'>Repositorios no gitHub</p>
                    <img src='img/code_NFe.png' id='img' alt='Exemplo de código node'></img>
                    <p id='font-bold'>code - simples imagem</p>

                    <button className='btn btn-primary' id='mt18'
                        onClick={() => (window.location.assign("/store"))}
                    >Acessar a loja online</button>
                    <div id='mt18'>Sistemas Web, o melhores para gestão de lojas online</div>
                    <div>Versões para web e para Android</div>
                    <img src='img/site-store.png' id='img' alt='Site de compras'></img>
                    <div id='font-bold'>Tudo de uma loja online em um formato web</div>
                </div>
            </div>

        </>
    )
}

export { HomeMain }