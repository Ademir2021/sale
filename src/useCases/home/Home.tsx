import { useState, useEffect, SetStateAction } from 'react';
import { TProduct, TItem, TItens, TBrand, TSubSector, TUnMed, TSector } from '../products/type/TProducts';
import { ListItensComponent } from '../../components/home/ListItensComponent';
import { Header } from '../../components/home/Header';
import { FooterHomePage } from './FooterHome';
import { SearchItens } from '../../components/home/SearchItens';
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import { ControlledCarousel } from '../../components/carousel/ControlledCarousel';
import { FilterItens } from '../../components/home/FilterItens';
import { getList, getListQuery } from '../../services/handleService'
import { HandleHome } from './handleHome/HandleHome';

import api from '../../services/api/api'
import { CardsCarousel } from '../../components/carousel/CardsCarousel';

type TProdListQuery = {
    id_product: number
    descric_product: string
    fk_brand: number
    fk_sub_sector: number
}

const Home: React.FC = () => {

    const [subTotal, setSubtotal] = useState(0)
    const [products, setProducts] = useState<TProduct[]>([]);
    const [listProd, setlistProd] = useState<TProduct[]>([]);
    const [item, setItem] = useState<TItem>({ descric: '' });
    const [brands, setBrand] = useState<TBrand[]>([]);
    const [sectors, setSector] = useState<TSector[]>([]);
    const [subSectors, setSubSector] = useState<TSubSector[]>([]);
    const [uniMeds, setUniMeds] = useState<TUnMed[]>([])
    const [selectSector, setSelectSector] = useState("Todos")
    const [flgItens, setFlgItens] = useState(false)
    const [checkSearch, setCheckSearch] = useState(false)
    const [descricProd, setDescricProd] = useState('')
    const [itens, setItens] = useState<TItens[]>([]);
    let [newItem, setNewItem] = useState<TItens>({
        id: itens.length + 1,
        item: 0,
        descric: '',
        unMed: '',
        amount: 1,
        valor: 0,
        tItem: 0
    });

    const handleHome = new HandleHome()

    const itemImg = './img/img_itens/sale_avatar.png'

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

    useEffect(() => {
        handleHome.getItensStorage(setItens, setSubtotal)
    }, [itens, subTotal])

    const handleItemAlreadyExists = (Item: TItens) => {
        for (let i of itens)
            if (Item.item === i.item) {
                i.amount = i.amount + Item.amount;
                return i.tItem = i.amount * i.valor;
            }
        return itens.push(Item);
    }

    const handleNewItem = (Item: TProduct) => {
        newItem.id = itens.length + 1
        newItem.item = Item.id_product
        newItem.descric = Item.descric_product
        newItem.unMed = nameUniMeds(Item.fk_un_med) || ''
        newItem.valor = Item.val_max_product
        newItem.tItem = Item.val_max_product * newItem.amount | 1

        for (let item of itens) { // Add amount item
            if (item.item === Item.id_product)
                Item.amount = item.amount
        };

        handleItemAlreadyExists(newItem)
        setSubtotal(handleHome.sumItens(itens, setSubtotal))
        localStorage.setItem("i", JSON.stringify(itens))

        setNewItem({
            id: itens.length + 1,
            item: 0,
            descric: '',
            unMed: '',
            amount: 1,
            valor: 0,
            tItem: 0
        })
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
            counter={itens.length > 0 ? itens.length : 0}
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
        {/* <CardsCarousel
            listProd={listProd}
            handleNewItem={handleNewItem}
            nameBrands={nameBrands}
            nameSubSector={nameSubSector}
            sectors={sectors}
            subSectors={subSectors}
            nameUniMeds={nameUniMeds}
            itens={itens}
            newItem={newItem}
        /> */}
        <ListItensComponent
            listProd={listProd}
            handleNewItem={handleNewItem}
            nameBrands={nameBrands}
            nameSubSector={nameSubSector}
            sectors={sectors}
            subSectors={subSectors}
            nameUniMeds={nameUniMeds}
            itens={itens}
            newItem={newItem}
        />
        <FooterHomePage /> </>
}

export { Home }