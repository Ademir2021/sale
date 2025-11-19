import { useState, useEffect, SetStateAction } from 'react';
import { TProduct, TItem, TItens, TBrand, TSubSector, TUnMed, TSector } from '../products/type/TProducts';
import { ListItensComponent } from '../../components/home/ListItensComponent';
import { Header } from '../../components/home/Header';
import { FooterHomePage } from './FooterHome';
import { SearchItens } from '../../components/home/SearchItens';
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import { FilterItens } from '../../components/home/FilterItens';
import { getList, getListQuery } from '../../services/handleService'
import api from '../../services/api/api'

type TProdListQuery = {
    id_product: number
    descric_product: string
    fk_brand: number
    fk_sub_sector: number
}

const Home: React.FC = () => {

    const [id, setId] = useState(1);
    const [amount, setAmount] = useState(0)
    const [counter, setCounter] = useState(0)
    const [subTotal, setSubtotal] = useState(0)
    const [products, setProducts] = useState<TProduct[]>([]);
    const [listProd, setlistProd] = useState<TProduct[]>([]);
    const [itens, setItens] = useState<TItens[]>([]);
    const [item, setItem] = useState<TItem>({ descric: '' });
    const [brands, setBrand] = useState<TBrand[]>([]);
    const [sectors, setSector] = useState<TSector[]>([]);
    const [subSectors, setSubSector] = useState<TSubSector[]>([]);
    const [uniMeds, setUniMeds] = useState<TUnMed[]>([])
    const [selectSector, setSelectSector] = useState<string>("Todos")
    const [flgItens, setFlgItens] = useState<boolean>(false)
    const [checkSearch, setCheckSearch] = useState<boolean>(false)
    const [descricProd, setDescricProd] = useState('')

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        getList('brands', setBrand)
    }, [])

    useEffect(() => {
        getList('sectors', setSector)
    }, [sectors])

    useEffect(() => {
        getList('sub_sectors', setSubSector)
    }, [subSectors])

    useEffect(() => {
        getList('un_meds', setUniMeds)
    }, [uniMeds])

    const nameBrands = (id: number) => {
        for (let brand of brands) {
            if (brand.id_brand === id)
                return brand.name_brand
        }
    }

    const nameSubSector = (id: number) => {
        for (let subSector of subSectors) {
            if (subSector.id_sub_sector === id)
                return subSector.name_sub_sector
        }
    }

    const nameUniMeds = (id: number) => {
        for (let uniMed of uniMeds) {
            if (uniMed.id_un === id)
                return uniMed.un_med
        }
    }
    const getProducts = async (Products: TProduct[]) => {
        try {
            await api.post<TProduct[]>('products_list')
                .then(response => {
                    Products = response.data
                    if (flgItens === false) {
                        setlistProd(Products)
                        setFlgItens(true)
                    }
                    findSubSectorsOfItems(Products)
                })
        } catch (err) { console.error("error occurred !" + err) }
    }
    useEffect(() => {
        getProducts(products)
    }, [flgItens, selectSector])

    const findIdSector = (nameSubSector: string) => {
        for (let subSector of subSectors) {
            if (subSector.name_sub_sector === nameSubSector) {
                return subSector
            }
        }
    }

    const findSubSectorsOfItems = (items: TProduct[]) => {
        const resultProducts: TProduct[] = []
        for (let item of items) {
            if (item.fk_sub_sector === findIdSector(selectSector)?.id_sub_sector)
                resultProducts.push(item);
            selectSector !== "Todos" ? setProducts(resultProducts) : setAllItems(items)
        }
    }

    const setAllItems = (items: TProduct[]) => {
        setProducts(items)
        setFlgItens(false);
    }

    const getItensStorage = () => {
        const res_itens = localStorage.getItem('i')
        if (res_itens)
            setItens(JSON.parse(res_itens))
        const res_counter = localStorage.getItem('c')
        if (res_counter)
            setCounter(JSON.parse(res_counter))
        const res_sub_total = localStorage.getItem('t')
        if (res_sub_total)
            setSubtotal(JSON.parse(res_sub_total))
    }
    useEffect(() => {
        getItensStorage()
    }, [item, itens, amount])

    const sumItens = (Itens: TItens[]) => {
        let sum = 0
        for (let i of Itens) {
            sum += (i.amount * i.valor)
        }
        setSubtotal(sum)
        localStorage.setItem("t", JSON.stringify(sum));
        return sum
    }

    const handleItemAlreadyExists = (Item: TItens) => {
        for (let i of itens)
            if (Item.item === i.item) {
                i.amount = i.amount + Item.amount;
                return i.tItem = i.amount * i.valor;
            }
        setCounter(counter + 1)
        localStorage.setItem("c", JSON.stringify(counter + 1));
        setId(id + 1);
        itens.push(Item);
    }

    const handleNewItem = (Item: TProduct) => {
        const newItem: TItens = {
            id: id,
            item: Item.id_product,
            descric: Item.descric_product,
            amount: amount || 1,
            valor: Item.val_max_product,
            tItem: Item.val_max_product * amount || 1
        };
        for (let item of itens) { // Add amount item
            if (item.item === Item.id_product)
                Item.amount = item.amount
        };
        if(amount === 0){
            setAmount(1)
        }
            handleItemAlreadyExists(newItem)
            setSubtotal(sumItens(itens))
            localStorage.setItem("i", JSON.stringify(itens))
            localStorage.setItem("id", JSON.stringify(id))
            setAmount(0)
        
    }

    const handleProducts = (Products: TProduct[]) => {
        if (item.descric !== '') {
            const resp: TProduct[] = []
            for (let p of Products)
                if (item.descric === p.descric_product) {
                    resp.push(p)
                    setlistProd(resp)
                    item.descric = ""
                }
        }
        setlistProd(products)
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        handleProducts(products)
    }

    const prod: TProdListQuery = {
        id_product: 0,
        descric_product: descricProd,
        fk_brand: 0,
        fk_sub_sector: 0
    }

    const filterItens = (e: Event) => {
        e.preventDefault()
        setlistProd([])
        getListQuery('product_list_query', setlistProd, { params: prod })
    }

    return <>
        <Header
            counter={counter !== 0 ? counter : 0}
            subtotal={subTotal !== 0 && currencyFormat(subTotal)}
        />
        <SearchItens
            selectSector={e => setSelectSector(e.target.value)}
            sectors={subSectors}
            messageItems={''}
            products={products}
            descric={item.descric}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            checkSearch={(e: boolean | any) => setCheckSearch(e.target.checked)}
            checkedSearch={checkSearch}
        />
        {checkSearch && <FilterItens
            onSubmit={filterItens}
            handleChange={(e: { target: { value: SetStateAction<string> } }) => setDescricProd(e.target.value)}
            listProd={listProd}
        />}
        {selectSector === "Todos" && <ControlledCarousel />}
        <ListItensComponent
            listProd={listProd}
            handleNewItem={handleNewItem}
            setAmount={setAmount}
            nameBrands={nameBrands}
            nameSubSector={nameSubSector}
            sectors={sectors}
            subSectors={subSectors}
            nameUniMeds={nameUniMeds}
            itens={itens}
            amount={amount}
        />
        <FooterHomePage /> </>
}

export { Home }