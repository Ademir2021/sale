export function currencyFormat  (money: number)  {
    return money.toLocaleString('pt-br',{
        style: 'currency', currency: 'BRL'});
};