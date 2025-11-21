import { useState, useEffect } from "react";
import { RegisterSaleForm } from "../../components/sales/RegisterSaleForm";
import { Itens } from "../../components/sales/Itens";
import { TProduct, TItens } from "../products/type/TProducts";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import { postList } from "../../services/handleService";
import { HandleHome } from "../home/handleHome/HandleHome";

const RegisterSale: React.FC = () => {

    const [msg, setMsg] = useState('')
    const [editId, setEditId] = useState<any>(null);
    const [, setPreco] = useState(0);
    const [totalItens, setTotalItens] = useState(0)
    const [statusBtnSaleSubmit, setStatusBtnSaleSubmit] = useState<"Iniciar Pedido" | "Faturar Pedido">("Iniciar Pedido");
    const [statusBtnSaveUpdate, setStatusBtnSaveUpdate] = useState<"Inserir Item" | "Atualizar Item">("Inserir Item");
    const [itemImg, setIemImg] = useState('');
    const [itenStorage, setItenStorage] = useState<TItens[]>([]);
    const [statuStore, setStatuStore] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([]);
    const [itens, setItens] = useState<TItens[]>([]);
    const [item, setItem] = useState<TItens>(
        { id: 0, item: 0, descric: "", valor: 0, amount: 1, tItem: 0 });

    const handleHome = new HandleHome()

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
            findProducts(products);
        }
    };

    const findProducts = (Products: TProduct[]) => {
        for (let p of Products) {
            if (item.descric == p.id_product
                || item.descric === p.bar_code
                || item.descric === p.descric_product) {
                if (editId !== null) {
                    item.id = editId;
                } else {
                    item.id = itens.length + 1;
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

    const deleteProduct = (Items: TItens[]) => {
        for (let i = 0; Items.length > i; i++) {
            setEditId(editId)
            if (Items[i].id === editId) {
                Items.splice(i, 1);
                setEditId(null);
                openClearNewSale();
                setStatusBtnSaleSubmit("Faturar Pedido");
                handleHome.sumItens(Items, setTotalItens);
            }
        }
    };

     const searchItensInCart = (ItensStorage: TItens[]) => {
        if (statuStore === false) {
            itensStore(ItensStorage)
            setStatuStore(true)
            handleHome.sumItens(itens, setTotalItens);
        }
    }

    const verifItem = (Item: TItens) => {
        searchItensInCart(itenStorage) // Busca  e verifica se item esta no carrinho
        if (Item.item !== 0) {
            for (let item of itens)
                if (Item.item === item.item && editId == null) {
                    return setMsg("Este Item Já Foi Lançado ...")
                }else{setMsg('Item Incluido com Sucesso ...')}
            return itens.push(Item)
        } else {
            setMsg("Item não Localizado ...")
        }

    };

    function verifItemForUpdate(Item: TItens) {
        for (let item of itens)
            if (Item.item === item.item && editId !== null) {
                item.amount = Item.amount
                item.tItem = Item.amount * Item.valor
                return setMsg("Item já foi lançado ! a quantidade é de " + Item.amount + " item(s)")
            }
        deleteProduct(itens);
        setItens(itens);
        return itens.push(Item);
    };


    const handleSaveUpdate = (e: Event) => {
        e.preventDefault();
        if (editId === null) {
            findProducts(products);
            verifItem(item);
            handleHome.sumItens(itens, setTotalItens);
            openClearNewSale();
            setStatusBtnSaleSubmit("Faturar Pedido");
        } else {
            findProducts(products);
            verifItemForUpdate(item);
            handleHome.sumItens(itens, setTotalItens);
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
                deleteProduct(itens);
                openClearNewSale();
            }
        } else {
            setMsg("Selecione o Item que Deseja Remover ...");
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
                setMsg("Informe ao Menos (1) Item e Clique em Inserir ...");
            } else {
                setMsg("Seu pedido será gravado");
                const res = localStorage.getItem('sl');
                if (!res) {
                    localStorage.setItem("i", JSON.stringify(itens))
                    localStorage.setItem("c", JSON.stringify(itens.length));
                    localStorage.setItem("s", JSON.stringify(handleHome.sumItens(itens, setTotalItens).toFixed(2)));
                    setMsg("Pedido gravado com sucesso")
                    setTimeout(() => {
                        window.location.replace("/invoice_sales");
                    }, 1000);
                } else {
                    setMsg("Aguarde ! , Ainda existe Pedido em Aberto ...");
                }
            }
        }
    };

    const openClearNewSale = () => {
        setItem({ id: 0, item: 0, descric: '', valor: 0, amount: 1, tItem: 0 });
        setStatusBtnSaveUpdate("Inserir Item");
        setStatusBtnSaleSubmit("Iniciar Pedido");
        setEditId(null);
        setPreco(0);
        setIemImg('')
    };

    const searchItem = (e: Event) => {
        e.preventDefault();
        searchItensInCart(itenStorage)
        findProducts(products);
        setPreco(item.valor);
    };

    const itensStore = (ItensStorage: TItens[]) => {
        const res = localStorage.getItem('i');
        if (res) {
            const newItens: TItens[] = JSON.parse(res)
            setItenStorage(newItens);
            for (let i of ItensStorage) {
                itens.push(i);
                setItens(itens)
            }
        }
    };
    useEffect(() => {
        itensStore(itenStorage)
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