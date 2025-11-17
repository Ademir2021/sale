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

const Home = () => {

    const [msg, setMsg] = useState('')
    const [id, setId] = useState(1);
    const [amount, setAmount] = useState(0)
    const [counter, setCounter] = useState(0)
    const [subtotal, setsubtotal] = useState(0)
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

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };

    const getProducts = async () => {
        try {
            await api.post<TProduct[]>('products_list')
                .then(response => {
                    const resp: TProduct[] = response.data
                    if (flgItens === false) {
                        setlistProd(resp)
                        setFlgItens(true)
                    }
                    findSubSectorsOfItems(resp)

                })
        } catch (err) { console.error("error occurred !" + err) }
    }
    useEffect(() => {
        getProducts()
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
            setsubtotal(JSON.parse(res_sub_total))
    }
    useEffect(() => {
        getItensStorage()
    }, [item, itens])

    const sumItens = () => {
        let sum = 0
        for (let item of itens) {
            sum += (item.amount * item.valor)
        }
        setsubtotal(sum)
        localStorage.setItem("t", JSON.stringify(sum));
        return sum
    }

    const itemAlreadyExists = (Item: TItens) => {
        for (let item of itens)
            if (Item.item === item.item) {
                item.amount = item.amount + Item.amount;
                return item.tItem = item.amount * item.valor;
            }
        setCounter(counter + 1)
        localStorage.setItem("c", JSON.stringify(counter + 1));
        setId(id + 1);
        return itens.push(Item);
    }

    const handleAddItem = (Item: TProduct) => {
        const getItem: TItens = {
            id: 0, item: 0, descric: '', amount: 0, valor: 0, tItem: 0
        }
        getItem.id = id;
        getItem.item = Item.id_product;
        getItem.descric = Item.descric_product;
        getItem.amount = amount
        getItem.valor = Item.val_max_product;
        getItem.tItem = getItem.valor * getItem.amount;
        setItens(itens);
        for (let item_ of itens) { // Add amount item
            if (item_.item === Item.id_product) {
                Item.amount = item_.amount
            }
        }
        setsubtotal(sumItens)
        if (getItem.amount !== 0) {
            itemAlreadyExists(getItem)
            localStorage.setItem("i", JSON.stringify(itens))
            localStorage.setItem("id", JSON.stringify(id))
            setAmount(0)
            setMsg('')
        } else {
            setMsg("Selecione uma Quantidade")
        }
    }

    const handleProducts = () => {
        if (item.descric !== '') {
            const resp: TProduct[] = []
            for (let p of products)
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
        handleProducts()
    }

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

    const nameBrands = (idBrand: number) => {
        for (let brand of brands) {
            if (brand.id_brand === idBrand)
                return brand.name_brand
        }
    }

    const nameSubSector = (idSubSector: number) => {
        for (let subSector of subSectors) {
            if (subSector.id_sub_sector === idSubSector)
                return subSector.name_sub_sector
        }
    }

    const nameUniMeds = (idUniMeds: number) => {
        for (let uniMed of uniMeds) {
            if (uniMed.id_un === idUniMeds)
                return uniMed.un_med
        }
    }

    const [descricProd, setDescricProd] = useState<any>(null)

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
            subtotal={subtotal === 0 ? '' : currencyFormat(subtotal)}
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
            msg={msg}
            listProd={listProd}
            handleAddItem={handleAddItem}
            setAmount={setAmount}
            nameBrands={nameBrands}
            nameSubSector={nameSubSector}
            sectors={sectors}
            subSectors={subSectors}
            nameUniMeds={nameUniMeds}
        />
        <FooterHomePage /> </>
}

export { Home }