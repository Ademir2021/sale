import { useState, useEffect } from 'react';
import { Dashboard } from './Dashboard';
import { ListItensStore } from '../../components/dashboard/ListItensStore';
import { TItens } from '../products/type/TProducts';
import { HandleHome } from '../home/handleHome/HandleHome';

export function ItenStore() {

    const [itens, setItens] = useState<TItens[]>([]);
    const [messages, setMessages] = useState<string>('');
    const [subTotal, setSubTotal] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0)

     const handleHome = new HandleHome()

    useEffect(() => {
        handleHome.getItensStorage(setItens, setCounter, setSubTotal)
    }, [itens]);

    function deleteListStore(Item: TItens) {
        if (window.confirm('Deseja remover, ' + Item.descric + ' ?')) {
            const index = itens.findIndex(item => item.id === Item.id);
            if (index !== -1) {
                itens.splice(index, 1);
                localStorage.setItem("i", JSON.stringify(itens));
                setMessages(Item.descric + ', foi removido com sucesso.');
                let counterStore = localStorage.getItem('c');
                if (counterStore) {
                    const counter = JSON.parse(counterStore);
                    const newCounter = counter - 1;
                    localStorage.setItem("c", JSON.stringify(newCounter));
                    setCounter(newCounter);
                }
                handleHome.sumItens(itens, setSubTotal);
                setTimeout(() => {
                    setMessages('');
                }, 5000);
            }
        }
    }

    function incrementItemListStore(Item: TItens) {
        for (let item of itens) {
            if (item.id === Item.id) {
                item.amount += 1
                item.tItem = item.amount * item.valor
                localStorage.setItem("i", JSON.stringify(itens));
                handleHome.sumItens(itens, setSubTotal);
            }
        }
    };

    function decrementItemListStore(Item: TItens) {
        for (let item of itens) {
            if (item.id === Item.id) {
                item.amount -= 1
                if (item.amount > 0) {
                    item.tItem = item.amount * item.valor
                    localStorage.setItem("i", JSON.stringify(itens));
                    handleHome.sumItens(itens, setSubTotal);
                }
            }
        }
    };

    return (
        <>
            <Dashboard />
            <ListItensStore
                itens={itens}
                incrementItemListStore={incrementItemListStore}
                decrementItemListStore={decrementItemListStore}
                deleteListStore={deleteListStore}
                messages={messages}
                counter={counter}
                subTotal={subTotal}
            />
        </>
    )
}