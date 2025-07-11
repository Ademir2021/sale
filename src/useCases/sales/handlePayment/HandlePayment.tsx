export function clearSaleStorage(paid: number, flagSales: boolean) {
    if (paid !== 0 && flagSales === true) {
        setTimeout(() => {
            localStorage.removeItem('sl');
            localStorage.removeItem('i');
            localStorage.removeItem('p');
            localStorage.removeItem('c');
            localStorage.removeItem('t');
            localStorage.removeItem('s');
            localStorage.removeItem('id');
        }, 2000);
    }
};