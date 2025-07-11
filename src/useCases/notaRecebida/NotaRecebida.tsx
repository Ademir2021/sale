import { useEffect, useState, useContext } from "react";
import { NotaRecebidaForm } from "../../components/notaRecebida/NotaRecebidaForm";
import { TNotaRecebida, TItem } from "./type/TNotaRecebida";
import { TProduct } from "../products/type/TProducts";
import { TContaAPagar, TValPago } from "../contasAPagar/type/TContasAPagar";
import { NotaRecebidaItemForm } from "../../components/notaRecebida/NotaRecebidaItemForm";
import { NotaRecebidaValsPagoForm } from "../../components/notaRecebida/NotarecebidaValsPagoForm";
import { NotaRecebidaContaAPagarForm } from "../../components/notaRecebida/NotaRecebidaContaAPagarForm";
import { NotaRecebidaEnviarForm } from "../../components/notaRecebida/NotaRecebidaEnviarForm";
import { postList, postRegister } from "../../services/handleService";

import { AuthContext } from '../../context/auth'
import api from "../../services/api/api";

export function NotaRecebida() {
    const [flagSendNota, setFlagSendNota] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [msgSendNota, setMsgSendNota] = useState<string>('Aguardando o envio da nota')
    const { user: isLogged }: any = useContext(AuthContext);
    const [products, setProducts] = useState<TProduct[]>([])
    const [notaRecebida, setNotaRecebida] = useState<TNotaRecebida>({
        fk_fornecedor: 0,
        data: new Date().toISOString(),
        emissao: new Date().toISOString(),
        numNota: 0,
        modelo: '',
        vFrete: 0,
        vSeguro: 0,
        despAcessorias: 0,
        encargos: 0,
        acrescimo: 0,
        desconto: 0,
        tProdutos: 0,
        total: 0,
        items: [],
        contaAPagar: [],
        valsPago: []
    });
    const [valPago, setValsPago] = useState<TValPago>({
        id_val: 0,
        fk_conta: 0,
        fk_compra: 0,
        fk_user: 0,
        valor: 0,
        data_recebimento: "",
        descricao: "",
        fk_person: 0,
        fk_despesa:0
    });
    const [contaAPagar, setContaAPagar] = useState<TContaAPagar>({
        id_conta: 0,
        fk_filial: 0,
        tipo: "Compra",
        fk_compra: 0,
        fk_user: isLogged[0].id,
        parcela: '1/1',
        valor: 0,
        multa: 0,
        juros: 0,
        desconto: 0,
        emissao: new Date(notaRecebida.emissao).toISOString(),
        vencimento: new Date().toISOString(),
        saldo: 0,
        pagamento: null,
        recebimento: 0,
        observacao: "",
        fk_beneficiario: 0,
        fk_despesa:1
    });
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setNotaRecebida(values => ({ ...values, [name]: value }))
    };
    const handleChange_ = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };
    const handleChange__ = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setValsPago(values => ({ ...values, [name]: value }))
    };
    const handleChange___ = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setContaAPagar(values => ({ ...values, [name]: value }))
    };
    useEffect(() => {
        postList('products_list',setProducts)
    }, [products]);

    const sumItems = () => {
        let sum = 0
        for (let item_ of notaRecebida.items) {
            sum += parseFloat(item_.total)
        }
        return sum
    };
    function handleSubmit() {
        notaRecebida.data = new Date().toISOString()
        notaRecebida.emissao = new Date(notaRecebida.emissao).toISOString()
        notaRecebida.tProdutos = sumItems()
        notaRecebida.total = notaRecebida.tProdutos
            + parseFloat(notaRecebida.vFrete)
            + parseFloat(notaRecebida.vSeguro)
            + parseFloat(notaRecebida.despAcessorias)
            + parseFloat(notaRecebida.encargos)
            + parseFloat(notaRecebida.acrescimo)
            - parseFloat(notaRecebida.desconto);
        parseFloat(notaRecebida.total.toFixed(2))
    };
    const [item, setItem] = useState<TItem>(
        {
            id: 0,
            tipo: "",
            item: 0,
            descric: "",
            quantidade: 0,
            unitario: 0,
            total: 0
        }
    );
    const clearFields = () => {
        setItem({
            id: 0,
            tipo: "",
            item: 0,
            descric: "",
            quantidade: 0,
            unitario: 0,
            total: 0
        })
    };
    function handleItems() {
        for (let product of products) {
            if (item.descric == product.descric_product) {
                item.descric = product.descric_product
                item.item = product.id_product
                item.tipo = 'sem'
                parseFloat(item.unitario)
                item.unitario = parseFloat(item.total) / parseInt(item.quantidade)
                notaRecebida.items.push(item)
            }
        }
        clearFields()
    };
    async function handleSubmitItem(e: Event) {
        e.preventDefault()
        handleItems()
    };
    function handleValorPago() {
        valPago.data_recebimento = new Date().toISOString()
        valPago.id_val = notaRecebida.valsPago.length + 1
        notaRecebida.valsPago.push(valPago)
    };
    function clearFiledsValPago() {
        setValsPago({
            id_val: 0,
            fk_conta: 0,
            fk_compra: 0,
            fk_user: 0,
            valor: 0,
            data_recebimento: "",
            descricao: "",
            fk_person: 0,
            fk_despesa:0
        })
    };
    function handleSubmitValor(e: Event) {
        e.preventDefault()
        handleValorPago()
        clearFiledsValPago()
    };
    function handleContaAPagar() {
        contaAPagar.emissao = new Date(notaRecebida.emissao).toISOString()
        contaAPagar.vencimento = new Date(contaAPagar.vencimento).toISOString()
        let parc = notaRecebida.contaAPagar.length + 1
        contaAPagar.id_conta = parc
        contaAPagar.parcela = parc + "/" + parc
        notaRecebida.contaAPagar.push(contaAPagar)
    };
    const clearFieldsContaAPagar = () => {
        setContaAPagar({
            id_conta: 0,
            fk_filial: 1,
            tipo: "Compra",
            fk_compra: 0,
            fk_user: isLogged[0].id,
            parcela: '1/1',
            valor: 0,
            multa: 0,
            juros: 0,
            desconto: 0,
            emissao: new Date(notaRecebida.emissao).toISOString(),
            vencimento: new Date().toISOString(),
            saldo: 0,
            pagamento: null,
            recebimento: 0,
            observacao: "",
            fk_beneficiario: 1,
            fk_despesa:1
        });
    };
    function handleSubmitContaAPagar(e: Event) {
        e.preventDefault()
        handleContaAPagar()
        clearFieldsContaAPagar()
    };
    function handleSubmitEnviarNota(e: Event) {
        e.preventDefault()
        if (notaRecebida.total > 0) {
            if (flagSendNota === false) {
                postRegister(notaRecebida, 'registrar_nota_recebida')
                setFlagSendNota(true)
            } else {
                setMsgSendNota('Nota já foi enviada com sucesso')
            }
        } else {
            setMsgSendNota('Total da Nota sem valor')
        }
    };
    return (
        <div className="container">
            <NotaRecebidaForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            >
                {notaRecebida}
            </NotaRecebidaForm>
            <NotaRecebidaValsPagoForm
                handleChange__={handleChange__}
                handleSubmit={handleSubmitValor}
                valsPago={notaRecebida.valsPago}
            >
                {valPago}
            </NotaRecebidaValsPagoForm>
            <NotaRecebidaItemForm
                handleChange={handleChange_}
                handleSubmit={handleSubmitItem}
                products={products}
                items={notaRecebida.items}
                msg={msg}
            >
                {item}
            </NotaRecebidaItemForm>
            <NotaRecebidaContaAPagarForm
                handleChange={handleChange___}
                handleSubmit={handleSubmitContaAPagar}
                contasApagar={notaRecebida.contaAPagar}
            >
                {contaAPagar}
            </NotaRecebidaContaAPagarForm>
            <NotaRecebidaEnviarForm
                handleSubmit={handleSubmitEnviarNota}
                msgSendNota={msgSendNota}
            />
        </div>
    )
}