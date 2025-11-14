import { useState, useEffect } from "react";
import { RegisterSaleForm } from "../../components/sales/RegisterSaleForm";
import { Itens } from "../../components/sales/Itens";
import { TProduct, TItens } from "../products/type/TProducts";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import { postList } from "../../services/handleService";

const RegisterSale: React.FC = () => {

    const [msg, setMsg] = useState('')
    const [id, setId] = useState(1);
    const [editId, setEditId] = useState<any>(null);
    const [, setPreco] = useState(0);
    const [totalItens, setTotalItens] = useState(0)
    const [statusBtnSaleSubmit, setStatusBtnSaleSubmit] = useState<"Iniciar Pedido" | "Faturar Pedido">("Iniciar Pedido");
    const [statusBtnSaveUpdate, setStatusBtnSaveUpdate] = useState<"Salvar Item" | "Atualizar Item">("Salvar Item");
    const [itemImg, setIemImg] = useState('');
    const [itenStorage, setItenStorage] = useState<TItens[]>([]);
    const [statuStore, setStatuStore] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([]);
    const [itens, setItens] = useState<TItens[]>([]);
    const [item, setItem] = useState<TItens>(
        { id: 0, item: 0, descric: "", valor: 0, amount: 1, tItem: 0 });

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        postList('products_list', setProducts)
    }, [products]);

    const updateListProduct = (Item: TItens) => {
        setStatusBtnSaveUpdate("Atualizar Item");
        setEditId(Item.id);
        item.id = Item.id;
        item.item = Item.item;
        item.descric = Item.descric;
        item.amount = Item.amount;
        item.valor = Item.valor;
        item.tItem = Item.amount * Item.valor;
        item.image = Item.image;
        if (item.image === null) {
            setIemImg('')
        } else {
            findProducts();
        }
    };

    const findProducts = () => {
        for (let p of products) {
            if (item.descric == p.id_product
                || item.descric === p.bar_code
                || item.descric === p.descric_product) {
                if (editId !== null) {
                    item.id = editId;
                } else {
                    item.id = id;
                }
                item.item = p.id_product;
                item.descric = p.descric_product;
                item.valor = p.val_max_product;
                item.tItem = item.valor * item.amount;
                if (p.image === null) {
                    setIemImg('')
                } else {
                    setIemImg("./img/img_itens/" + p.image);
                }
            }
        }
    };

    const deleteProduct = () => {
        for (let i = 0; itens.length > i; i++) {
            setEditId(editId)
            if (itens[i].id === editId) {
                itens.splice(i, 1);
                setEditId(null);
                openClearNewSale();
                setStatusBtnSaleSubmit("Faturar Pedido");
                sumItens();
            }
        }
    };

    const verifItem = (Item: TItens) => {
        if (Item.item !== 0) {
            for (let item of itens)
                if (Item.item === item.item && editId == null) {
                    return setMsg("Item já foi lançado")
                }
            setId(id + 1);
            return itens.push(Item)
        } else {
            setMsg("Item não localizado")
        }
    };

    function verifItemForUpdate(Item: TItens) {
        for (let item of itens)
            if (Item.item === item.item && editId !== null) {
                item.amount = Item.amount
                item.tItem = Item.amount * Item.valor
                return setMsg("Item já foi lançado ! a quantidade é de " + Item.amount + " item(s)")
            }
        deleteProduct();
        setItens(itens);
        return itens.push(Item);
    };

    const sumItens = () => {
        let sum = 0
        for (let item of itens) {
            sum += (item.amount * item.valor)
        }
        setTotalItens(sum)
        return sum
    };

    const handleSaveUpdate = (e: Event) => {
        e.preventDefault();
        if (editId === null) {
            findProducts();
            verifItem(item);
            sumItens();
            openClearNewSale();
            setStatusBtnSaleSubmit("Faturar Pedido");
        } else {
            findProducts();
            verifItemForUpdate(item);
            sumItens();
            openClearNewSale();
            setEditId(null);
            setPreco(0);
        }
    };

    const handleDelete = (e: Event) => {
        e.preventDefault();
        if (editId !== null) {
            if (window.confirm(
                "Realmente Deseja Remover o Item de ID: "
                + editId + " ?")) {
                deleteProduct();
                openClearNewSale();
            }
        } else {
            setMsg("Busque um Novo Item !");
            openClearNewSale();
        }
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (statusBtnSaleSubmit === "Iniciar Pedido") {
            itens.length === 0 ? setMsg("Iniciar Compra !") :
                openClearNewSale();
            setStatusBtnSaleSubmit("Faturar Pedido");
        } else {
            setStatusBtnSaleSubmit("Iniciar Pedido");
            if (itens.length === 0) {
                setMsg("Informe ao menos um item e clique em salvar !");
            } else {
                setMsg("Seu pedido será gravado");
                const sale_store = localStorage.getItem('sl');
                if (!sale_store) {
                    localStorage.setItem("i", JSON.stringify(itens))
                    localStorage.setItem("s", JSON.stringify(sumItens().toFixed(2)));
                    setMsg("Pedido gravado com sucesso")
                    setTimeout(() => {
                        window.location.replace("/invoice_sales");
                    }, 1000);
                } else {
                    setMsg("Aguarde ... ! Existe Pedido em Aberto");
                }
            }
        }
    };

    const openClearNewSale = () => {
        setItem({ id: 0, item: 0, descric: '', valor: 0, amount: 1, tItem: 0 });
        setStatusBtnSaveUpdate("Salvar Item");
        setStatusBtnSaleSubmit("Iniciar Pedido");
        setEditId(null);
        setPreco(0);
        setIemImg('')
    };

    const searchItem = (e: Event) => {
        e.preventDefault();
        if (statuStore === false) {
            itensStore()
            setStatuStore(true)
            sumItens()
        }
        findProducts();
        setPreco(item.valor);
    };

    const itensStore = () => {
        const itens_store_res = localStorage.getItem('i');
        if (itens_store_res) {
            const itens_store: TItens[] = JSON.parse(itens_store_res)
            setItenStorage(itens_store);
            for (let itemStorage of itenStorage) {
                itens.push(itemStorage);
                setItens(itens)
                const res_id = localStorage.getItem('id');
                if (res_id)
                    setId(JSON.parse(res_id))
            }
        }
    };
    useEffect(() => {
        itensStore()
    }, []);

    const clearItensStore = () => {
        if (window.confirm("Deseja Esvaziar o Carrinho ?")) {
            localStorage.removeItem('sl')
            localStorage.removeItem('i')
            localStorage.removeItem('t')
            localStorage.removeItem('c')
            localStorage.removeItem('s')
            setItens([])
            setTotalItens(0)
        } else {
            return
        }
    }

    return <>
        <RegisterSaleForm
            handleChange={handleChange}
            handleSaveUpdate={handleSaveUpdate}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            clearItensStore={clearItensStore}
            handleSearchItem={searchItem}
            products={products}
            item={(item.descric)}
            statusBtnSaveUpdate={statusBtnSaveUpdate}
            statusBtnSaleSubmit={statusBtnSaleSubmit}
            item_img={itemImg}
            msg={msg}
            totalItens={totalItens <= 0 ? '' : currencyFormat(totalItens)}
            loadItens={itens.length === 0 ? "Carregando" :
                <Itens
                    itens={itens}
                    updateListProduct={updateListProduct}
                />}
        >
            {item}
        </RegisterSaleForm> </>
}

export { RegisterSale }