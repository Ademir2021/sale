import { Globais } from '../globais/Globais';
import { NavBar } from '../navbar/Navbar';
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import * as Icon from 'phosphor-react';

import '../../index'
import './css/styles.css'

type Props = {
    children?: any
    handleBoleto: any
    handleQrCode: any
    qrcode_img: string
    payPix: number | string;
    datavenc: Date | string | any
    setboletoDueDate: Function
    qrCodeGeneratedSuccessfully?: any
    barCodeBoleto: string
    barCodeBoletoFormated: string
    paySale: number
    URLNoteSubmit: number
    error: string
}
const PagSeguroForm:React.FC<Props> = ({
    handleBoleto,
    handleQrCode,
    qrcode_img,
    payPix,
    datavenc,
    setboletoDueDate,
    qrCodeGeneratedSuccessfully,
    barCodeBoleto,
    barCodeBoletoFormated,
    paySale,
    URLNoteSubmit,
    error
}: Props) => {
    return <>
        <NavBar />
        {<form className='form' >
              <a href="invoice_sales">{<Icon.X size={18} color="gray" />}</a>
            <label>Emitir Boleto</label>
            <label><b>À Pagar</b> {currencyFormat(paySale)}</label>
            <label>Vencim. boleto</label>
            <input
                type="date"
                value={datavenc}
                onChange={(e) => setboletoDueDate(e.target.value)}
            />
            {barCodeBoleto !== "" ? <div className='text-center' ><label>Código de Barras gerado com sucesso</label>
                <hr></hr>
                <label>{"< CÓDIGO DE BARRAS SEM FORMATAÇÃO />"}</label>
                <strong style={{ fontSize: '10px' }}>{barCodeBoleto}</strong>
                <label>{"< CÓDIGO DE BARRAS FORMATADO />"}</label>
                <strong style={{ fontSize: '10px' }}>{barCodeBoletoFormated}</strong></div> :
                <label>Aguardando código de barras</label>}
            <button className='container m-1' onClick={handleBoleto}>Emitir BOLETO</button>
            <hr></hr>
            <label>Gerar PIX</label>
            {qrcode_img && <img id='img-qrcode' src={qrcode_img} alt='Qrcode'></img>}
            {qrcode_img && <label><b>PIX</b> {payPix}</label>}
            {error && <label id='msg-red'>{error}</label>}
            {qrcode_img && <label>{qrCodeGeneratedSuccessfully}</label>}
            <button className='container m-1' onClick={handleQrCode}>Gerar QR-CODE</button>
            <hr></hr>
            {URLNoteSubmit > 0 && <a className='m-3' href={Globais.URL_NOTE + '/' + URLNoteSubmit}>{<Icon.Note size={32} />}Emitir Nota</a>}
            {URLNoteSubmit > 0 && <a className='m-3' href='/dashboardefault'>{<Icon.SignOut size={32} />}Sair</a>}
        </form >}
    </>
}

export { PagSeguroForm }
