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
            const itens_store_res:any | undefined = localStorage.getItem('p');
            if (itens_store_res)
                setItens(JSON.parse(itens_store_res));
            const counter_res:any | undefined = localStorage.getItem('c');
            if (counter_res)
                setCounter(JSON.parse(counter_res));
            const subTotal_res:any | undefined = localStorage.getItem('t');
            if (subTotal_res)
                setsubtotal(JSON.parse(subTotal_res));
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
            for (let i = 0; itens.length > 0; i++) {
                if (itens[i].id === item_.id) {
                    itens.splice(i, 1);
                    localStorage.setItem("p", JSON.stringify(itens));
                    setMessages(item_.descric + ', foi removido com sucesso.');
                    let res_counter = localStorage.getItem('c');
                    if (res_counter !== null) {
                        const counter = JSON.parse(res_counter)
                        localStorage.setItem("c", JSON.stringify(counter - 1));
                        res_counter = localStorage.getItem('c');
                        setCounter(counter_);
                    }
                    sumItens()
                    setTimeout(() => {
                        setMessages('');
                    }, 5000);
                }
            }
        }
    }

    function incrementItemListStore(item_: TItens) {
        for (let item of itens) {
            if (item.id === item_.id) {
                item.amount += 1
                item.tItem = item.amount * item.valor
                localStorage.setItem("p", JSON.stringify(itens));
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
                    localStorage.setItem("p", JSON.stringify(itens));
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