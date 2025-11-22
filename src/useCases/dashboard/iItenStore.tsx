import { useState, useEffect } from 'react';
import { Dashboard } from './Dashboard';
import { ListItensStore } from '../../components/dashboard/ListItensStore';
import { TItens } from '../products/type/TProducts';
import { HandleHome } from '../home/handleHome/HandleHome';

const ItenStore: React.FC = () => {

    const [itens, setItens] = useState<TItens[]>([]);
    const [messages, setMessages] = useState('');
    const [subTotal, setSubTotal] = useState(0);

    const handleHome = new HandleHome()

    useEffect(() => {
        handleHome.getItensStorage(setItens, setSubTotal)
    }, [itens, subTotal]);

    useEffect(() => {
        handleHome.sumItens(itens, setSubTotal)
    }, [itens])

    function deleteListStore(Item: TItens) {
        if (window.confirm('Deseja remover, ' + Item.descric + ' ?')) {
            const index = itens.findIndex(item => item.id === Item.id);
            if (index !== -1) {
                itens.splice(index, 1);
                localStorage.setItem("i", JSON.stringify(itens));
                setMessages(Item.descric + ', foi removido com sucesso.');
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

    return <>
        <Dashboard />
        <ListItensStore
            itens={itens}
            incrementItemListStore={incrementItemListStore}
            decrementItemListStore={decrementItemListStore}
            deleteListStore={deleteListStore}
            messages={messages}
            counter={itens.length}
            subTotal={subTotal}
        /> </>

}

export { ItenStore }