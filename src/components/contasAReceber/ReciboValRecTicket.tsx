import { TReciboValRec } from "../../useCases/contasAReceber/type/TContasAReceber"
import { Globais } from "../globais/Globais";
import { LogoIn } from "../utils/logoIn/LogoIn";

type Props = {
    recibo?: TReciboValRec
}

export function ReciboValRecticket({ recibo }: Props) {

    let valor:any = recibo?.valor
    valor = parseFloat(valor).toFixed(2)

    return (
        <div className="container-global">
            <div className="main-global">
                <div className="main-global-form">
                    <LogoIn/>
                    <div className="text-center">Comprovante de pagamento</div>
                    <dd className="text-center">{recibo?.data_rec}</dd>
                    <hr></hr>
                    <div>Valor do pagamento</div>
                    <b>R$ {valor}</b>
                    <hr></hr>
                    <b>Favorecido</b>
                    <dd>{Globais.company}</dd>
                    <dd><b>CNPJ</b> {Globais.CNPJ}</dd>
                    <hr></hr>
                    <b>Referências do valor</b>
                    <dd><b>ID</b> {recibo?.id}</dd>
                    <dd><b>Título</b> {recibo?.conta}</dd>
                    <dd><b>Venda</b> {recibo?.venda}</dd>
                    <dd><b>User</b> {recibo?.user}</dd>
                    <dd><b>Descrição</b> {recibo?.descricao}</dd>
                    <hr></hr>
                    <b>Cliente/Pagador</b>
                    <dd><b>ID</b> {recibo?.id_cliente}</dd>
                    <dd><b>Nome</b> {recibo?.nome_cliente}</dd>
                    <dd><b>CPF</b> {recibo?.cpf}</dd>
                    <hr></hr>
                    <dd>
                        {"Comprovante emitido por " + Globais.company + 
                        ' no ato do pagamento pelo Cliente/Pagador em Caso de dúvidas '
                        + 'entre em contato pelo Tel: (44) 98852-1033.' }
                    </dd>
                    <br />
                </div>
            </div>
        </div>
    )
}