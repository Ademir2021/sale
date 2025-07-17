import { TReciboValRec } from "../../useCases/contasAReceber/type/TContasAReceber"
import { Globais } from "../globais/Globais";
import { LogoIn } from "../utils/logoIn/LogoIn";

import './css/ticket.css'

type Props = {
    recibo?: TReciboValRec
}

export function ReciboValRecticket({ recibo }: Props) {

    let valor: any = recibo?.valor
    valor = parseFloat(valor).toFixed(2)

    return <>
        <div className="receipt-container">
            <LogoIn />

            <h2 className="receipt-title">Comprovante de Pagamento</h2>
            <p className="receipt-date">{recibo?.data_rec}</p>
            <hr />

            <div className="receipt-section">
                <p className="section-label">Valor do pagamento</p>
                <p className="section-value">R$ {valor}</p>
            </div>
            <hr />
            <div className="receipt-section">
                <p className="section-label">Favorecido</p>
                <p>{Globais.company}</p>
                <p><b>CNPJ:</b> {Globais.CNPJ}</p>
            </div>
            <hr />
            <div className="receipt-section">
                <p className="section-label">Referências do valor</p>
                <p><b>ID:</b> {recibo?.id}</p>
                <p><b>Título:</b> {recibo?.conta}</p>
                <p><b>Venda:</b> {recibo?.venda}</p>
                <p><b>User:</b> {recibo?.user}</p>
                <p><b>Descrição:</b> {recibo?.descricao}</p>
            </div>
            <hr />

            <div className="receipt-section">
                <p className="section-label">Cliente / Pagador</p>
                <p><b>ID:</b> {recibo?.id_cliente}</p>
                <p><b>Nome:</b> {recibo?.nome_cliente}</p>
                <p><b>CPF:</b> {recibo?.cpf}</p>
            </div>
            <hr />

            <p className="receipt-footer">
                Comprovante emitido por <b>{Globais.company}</b> no ato do pagamento pelo Cliente/Pagador. <br />
                Em caso de dúvidas, entre em contato pelo Tel: <b>(44) 98852-1033</b>.
            </p>
        </div>

    </>
}