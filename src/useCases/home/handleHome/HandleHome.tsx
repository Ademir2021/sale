import { TItens } from "../../products/type/TProducts";

class HandleHome {

    sumItens = (Itens: TItens[], setSubtotal: Function) => {
        let sum = 0
        for (let i of Itens) {
            sum += (i.amount * i.valor)
        }
        setSubtotal(sum)
        localStorage.setItem("t", JSON.stringify(sum));
        return sum
    }

    getItensStorage = (setItens: Function, setSubTotal: Function) => {
        const itens = localStorage.getItem('i')
        if (itens)
            setItens(JSON.parse(itens))
        const subTotal = localStorage.getItem('t')
        if (subTotal)
            setSubTotal(JSON.parse(subTotal))
    }
}

export { HandleHome }