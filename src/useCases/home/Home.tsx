import { useState, useEffect, SetStateAction } from 'react';
import { TProduct, TItem, TItens, TBrand, TSubSector, TUnMed, TSector } from '../products/type/TProducts';
import { ListItens } from '../../components/home/ListItens';
import { Header } from '../../components/home/Header';
import { FooterHomePage } from './FooterHome';
import { SearchItens } from '../../components/home/SearchItens';
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import { FilterItens } from '../../components/home/FilterItens';
import { getList, getListQuery } from '../../services/handleService'
import api from '../../services/api/api'
import { HandleProducts } from '../products/HandleProduct';

type TProdListQuery = {
    id_product: number
    descric_product: string
    fk_brand: number
    fk_sub_sector: number
}

export function Home() {
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
    const [subSectors, setSubSector] = useState<TSubSector[]>([]);
    const [uniMeds, setUniMeds] = useState<TUnMed[]>([])
    const [selectSector, setSelectSector] = useState<string>("Todos")
    const [flgItens, setFlgItens] = useState<boolean>(false)
    const [checkSearch, setCheckSearch] = useState<boolean>(false)
    const handleProducts: HandleProducts = new HandleProducts()

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setItem(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        async function getProducts() {
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
            } catch (err) { console.log("error occurred !" + err) }
        }
        getProducts()
    }, [flgItens, selectSector])


    // Funções auxiliares de busca dos items
    function findIdSector(nameSubSector: string) {
        for (let subSector of subSectors) {
            if (subSector.name_sub_sector === nameSubSector) {
                return subSector
            }
        }
    };
    function findSubSectorsOfItems(items: TProduct[]) {
        const resultProducts: TProduct[] = []
        for (let item of items) {
            if (item.fk_sub_sector === findIdSector(selectSector)?.id_sub_sector)
                resultProducts.push(item);
            selectSector !== "Todos" ? setProducts(resultProducts) : setAllItems(items)
        }

    };
    function setAllItems(items: TProduct[]) {
        setProducts(items)
        setFlgItens(false);
    }

    useEffect(() => {
        function getItensStorage() {
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
        localStorage.setItem("i", JSON.stringify(itens));
        localStorage.setItem("id", JSON.stringify(id));
    }

    function handleProducts_() {
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
        handleProducts_()
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

    function nameBrands(idBrand: number) {
        for (let brand of brands) {
            if (brand.id_brand === idBrand)
                return brand.name_brand
        }
    }

    function nameSubSector(idSubSector: number) {
        for (let subSector of subSectors) {
            if (subSector.id_sub_sector === idSubSector)
                return subSector.name_sub_sector
        }
    }

    function nameUniMeds(idUniMeds: number) {
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

    function filterItens(e: Event) {
        e.preventDefault()
        setlistProd([])
        getListQuery('product_list_query', setlistProd, { params: prod })
    }

    return (
        <>
            <Header
                counter={counter !== 0 ? counter : 0}
                subtotal={subtotal === 0 ? '' : currencyFormat(subtotal)}
            />
            <SearchItens
                selectSector={(e: { target: { value: SetStateAction<string> } }) => setSelectSector(e.target.value)}
                sectors={subSectors}
                messageItems={''}
                products={products}
                descric={item.descric}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                checkSearch={(e: boolean | any) => setCheckSearch(e.target.checked)}
                checkedSearch={checkSearch}
            />
            {checkSearch ?
                <FilterItens
                    onSubmit={filterItens}
                    handleChange={(e: { target: { value: SetStateAction<string> } }) => setDescricProd(e.target.value)}
                    listProd={listProd}
                />
                : null}
            {selectSector === "Todos" ? <ControlledCarousel /> : null}
            {(listProd.map((item: TProduct) => (
                <ListItens
                    key={item.id_product}
                    item_img={item.image !== null ? `./img/img_itens/${item.image}` : itemImg}
                    id={item.id_product}
                    brand={nameBrands(item.fk_brand)}
                    name_sector={handleProducts.findSectorNameBySubSector(listProd, subSectors, sectors, item.fk_sub_sector)}
                    name_sub_sector={nameSubSector(item.fk_sub_sector)}
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