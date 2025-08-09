import { useState, useEffect } from 'react';
import { Dashboard } from './Dashboard';
import { ListItensStore } from '../../components/dashboard/ListItensStore';
import { TItens } from '../products/type/TProducts';

export function ItenStore() {

    const [itens, setItens] = useState<TItens[]>([]);
    const [messages, setMessages] = useState<string>('');
    const [subtotal, setsubtotal] = useState<number>(0);
    const [counter_, setCounter] = useState<number>(0)

    useEffect(() => {
        function getItensStorage() {
            const itemsStore = localStorage.getItem('i');
            if (itemsStore)
                setItens(JSON.parse(itemsStore));
            const counterStore = localStorage.getItem('c');
            if (counterStore)
                setCounter(JSON.parse(counterStore));
            const sumTotalStore = localStorage.getItem('t');
            if (sumTotalStore)
                setsubtotal(JSON.parse(sumTotalStore));
        };
        getItensStorage()
    }, [itens]);

    function sumItens() {
        let sum = 0
        for (let item of itens) {
            sum += (item.amount * item.valor)
        }
        localStorage.setItem("t", JSON.stringify(sum));
        return sum
    }

    function deleteListStore(item_: TItens) {
        if (window.confirm('Deseja remover, ' + item_.descric + ' ?')) {
            const index = itens.findIndex(item => item.id === item_.id);
            if (index !== -1) {
                itens.splice(index, 1);
                localStorage.setItem("i", JSON.stringify(itens));
                setMessages(item_.descric + ', foi removido com sucesso.');
                let counterStore = localStorage.getItem('c');
                if (counterStore) {
                    const counter = JSON.parse(counterStore);
                    const newCounter = counter - 1;
                    localStorage.setItem("c", JSON.stringify(newCounter));
                    setCounter(newCounter);
                }
                sumItens();
                setTimeout(() => {
                    setMessages('');
                }, 5000);
            }
        }
    }

    function incrementItemListStore(item_: TItens) {
        for (let item of itens) {
            if (item.id === item_.id) {
                item.amount += 1
                item.tItem = item.amount * item.valor
                localStorage.setItem("i", JSON.stringify(itens));
                sumItens()
            }
        }
    };

    function decrementItemListStore(item_: TItens) {
        for (let item of itens) {
            if (item.id === item_.id) {
                item.amount -= 1
                if (item.amount > 0) {
                    item.tItem = item.amount * item.valor
                    localStorage.setItem("i", JSON.stringify(itens));
                    sumItens()
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
                counter_={counter_}
                subtotal={subtotal}
            />
        </>
    )
}