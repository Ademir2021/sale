import { useState, useEffect, SetStateAction } from 'react';
import { NavBar } from "../../components/navbar/Navbar";
import { TProduct, TItem, TItens, TBrand, TSector, TUnMed } from '../products/type/TProducts';
import { ListItens } from '../../components/storeHome/ListItens';
import { Header } from '../../components/storeHome/Header';
import { FooterHomePage } from './FooterHome';
import { SearchItens } from '../../components/storeHome/SearchItens';
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import { FilterItens } from '../../components/storeHome/FilterItens';
import { getList, getListQuery } from '../../services/handleService';
import api from '../../services/api/api'

type TProdListQuery = {
    id_product:number
    descric_product:string
    fk_brand:number
    fk_sector:number
}

export function StoreHome() {
    const [id, setId] = useState<number>(1);
    let [amount, setAmount] = useState<number>(1)
    const [counter, setCounter] = useState<number>(0)
    const [subtotal, setsubtotal] = useState<number>(0)
    const [itemImg,] = useState<string>('./img/img_itens/sale_avatar.png');
    const [products, setProducts] = useState<TProduct[]>([]);
    const [listProd, setlistProd] = useState<TProduct[]>([]);
    const [itens, setItens] = useState<TItens[]>([]);
    const [item, setItem] = useState<TItem>({ descric: '' });
    const [brands, setBrand] = useState<TBrand[]>([]);
    const [sectors, setSector] = useState<TSector[]>([]);
    const [uniMeds, setUniMeds] = useState<TUnMed[]>([])
    const [selectSector, setSelectSector] = useState<string>("Todos")
    const [flgItens, setFlgItens] = useState<boolean>(false)
    const [checkSearch, setCheckSearch] = useState<boolean>(false)

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        function idSector(nameSector: string) {
            for (let i = 0; i < sectors.length; i++) {
                if (sectors[i].name_sector === nameSector) {
                    return sectors[i]
                }
            }
        };
        async function getProducts() {
            try {
                await api.post<TProduct[]>('products_list')
                    .then(response => {
                        const resultProducts: TProduct[] = []
                        const items: TProduct[] = response.data
                        if (flgItens === false) {
                            setlistProd(items)
                            setFlgItens(true)
                        }
                        for (let item of items) {
                            if (item.fk_sector === idSector(selectSector)?.id_sector) resultProducts.push(item);
                            selectSector !== "Todos" ? setProducts(resultProducts) : setProducts(items);
                        }
                    })
            } catch (err) { console.log("error occurred !" + err) }
        }
        getProducts()
    }, [flgItens, selectSector, sectors])

    useEffect(() => {
        function getItensStorage() {
            const res_itens: any | undefined = localStorage.getItem('p')
            if (res_itens)
                setItens(JSON.parse(res_itens))
            const res_counter: any | undefined = localStorage.getItem('c')
            if (res_counter)
                setCounter(JSON.parse(res_counter))
            const res_sub_total: any | undefined = localStorage.getItem('t')
            if (res_sub_total)
                setsubtotal(JSON.parse(res_sub_total))
        }

        getItensStorage()
    }, [item, itens])

    function sumItens() {
        let sum = 0
        for (let item of itens) {
            sum += (item.amount * item.valor)
        }
        setsubtotal(sum)
        localStorage.setItem("t", JSON.stringify(sum));
        return sum
    }

    function verifItem(element: TItens) {
        for (let item of itens)
            if (element.item === item.item) {
                item.amount = item.amount + element.amount;
                return item.tItem = item.amount * item.valor;
            }

        setCounter(counter + 1)
        localStorage.setItem("c", JSON.stringify(counter + 1));
        setId(id + 1);
        return itens.push(element);
    }

    function handleItem(item: TProduct) {
        const getItem: TItens = {
            id: 0, item: 0, descric: '', amount: 0, valor: 0, tItem: 0
        }
        getItem.id = id;
        getItem.item = item.id_product;
        getItem.descric = item.descric_product;
        getItem.amount = amount
        setAmount(amount)
        amount = 1
        setAmount(amount)
        getItem.valor = item.val_max_product;
        getItem.tItem = getItem.valor * getItem.amount;
        verifItem(getItem);
        setItens(itens);
        for (let item_ of itens) { // Add amount item
            if (item_.item === item.id_product) {
                item.amount = item_.amount
            }
        }
        setsubtotal(sumItens)
        localStorage.setItem("p", JSON.stringify(itens));
        localStorage.setItem("id", JSON.stringify(id));
    }

    function handleProducts() {
        if (item.descric !== '') {
            const resp: TProduct[] = []
            for (let i = 0; products.length > 0; i++) {
                if (item.descric === products[i].descric_product) {
                    resp.push(products[i])
                    setlistProd(resp)
                    item.descric = ""
                }
            }
        }
        setlistProd(products)
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        handleProducts()
    }

    useEffect(() => {
        getList('brands', setBrand)
    }, [])

    useEffect(() => {
        getList('sectors', setSector)
    }, [sectors])

    useEffect(() => {
        getList('un_meds', setUniMeds)
    }, [uniMeds])

    function nameBrands(idBrand: number) {
        for (let brand of brands) {
            if (brand.id_brand === idBrand)
                return brand.name_brand
        }
    }

    function nameSector(idSector: number) {
        for (let sector of sectors) {
            if (sector.id_sector === idSector)
                return sector.name_sector
        }
    }

    function nameUniMeds(idUniMeds: number) {
        for (let uniMed of uniMeds) {
            if (uniMed.id_un === idUniMeds)
                return uniMed.un_med
        }
    }

    const [descricProd, setDescricProd] = useState<any>(null)

    const prod:TProdListQuery = {
        id_product:0,
        descric_product:descricProd,
        fk_brand:0,
        fk_sector:0
    }

    function filterItens(e:Event){
        e.preventDefault()
        setlistProd([])
        getListQuery('product_list_query', setlistProd, {params:prod})
    }

    return (
        <>
            <Header
                counter={counter !== 0 ? counter : 0}
                subtotal={subtotal === 0 ? '' : currencyFormat(subtotal)}
            />
            <NavBar />
            <SearchItens
                selectSector={(e: { target: { value: SetStateAction<string> } }) => setSelectSector(e.target.value)}
                sectors={sectors}
                messageItems={''}
                products={products}
                descric={item.descric}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                checkSearch={(e: boolean | any) => setCheckSearch(e.target.checked)}
                checkedSearch={checkSearch}
            />
            { checkSearch ?
            <FilterItens
            onSubmit={filterItens}
            handleChange={(e: { target: { value: SetStateAction<string> } }) => setDescricProd(e.target.value)}
            listProd={listProd}
            />
            : null }
            {selectSector === "Todos" ? <ControlledCarousel /> : null}
            {(listProd.map((item: TProduct) => (
                <ListItens
                    key={item.id_product}
                    item_img={item.image !== null ? `./img/img_itens/${item.image}` : itemImg}
                    id={item.id_product}
                    brand={nameBrands(item.fk_brand)}
                    sector={nameSector(item.fk_sector)}
                    descric={item.descric_product}
                    amount={item.amount ? item.amount : "0"}
                    valor={item.val_max_product}
                    selectAmount={e => e.target.value !== "Quant: 1" ? setAmount(parseInt(e.target.value)) : setAmount(1)}
                    handleItem={handleItem}
                    itemParameter={item}
                    unMed={nameUniMeds(item.fk_un_med)}
                />
                
            )))}
            <FooterHomePage />
        </>
    )
} 