import { useState, useEffect, useRef, useContext } from "react"
import ncmJSON from './NCM.json'
import { FormatDate } from "../../components/utils/formatDate";
import { TProduct, TSubSector, TBrand, TClasseProd, TGrupoFiscal, TTipoProd, TUnMed, TNcm, TSector } from "./type/TProducts";
import { postAuthHandle, postRegister, putUpdate, getList } from "../../services/handleService";
import { ProductFormUpdate } from "../../components/products/ProductFormUpdate";
import { ProductList } from "../../components/products/ProductList";
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import { Dashboard } from "../dashboard/Dashboard";
import { HandleProducts } from "./HandleProduct";
import { ProductValFields } from "./valsFields/ValsFields";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

import { AuthContext } from '../../context/auth'

import "../../App.css"

export function ProductUpdate() {
    const { user: isLogged }: any = useContext(AuthContext);
    const [flagRegister, setFlagRegister] = useState<boolean>(false)
    const [msg, setMsg] = useState("")
    const handleProducts: HandleProducts = new HandleProducts()
    const [sectors, setSectors] = useState<TSector[]>([]);
    const [subSectors, setSubSectors] = useState<TSubSector[]>([]);
    const [brands, setBrands] = useState<TBrand[]>([]);
    const [unMeds, setUnMeds] = useState<TUnMed[]>([])
    const [classesProds, setClassesProds] = useState<TClasseProd[]>([])
    const [gruposFiscais, setGruposFiscais] = useState<TGrupoFiscal[]>([])
    const [tiposProds, setTiposProds] = useState<TTipoProd[]>([])
    const [ncms_] = useState<any>(ncmJSON)
    const [ncms, setNcms] = useState<TNcm[]>([])
    const [selectedIdUnMed, setSelectedIdUn] = useState<any>(1);
    const [selectedIdClasseProd, setSelectedIdClasseProd] = useState<any>(1);
    const [selectedIdGrupoFiscal, setSelectedIdGrupoFiscal] = useState<any>(1)
    const [selectedIdTipoProd, setSelectdIdTipoProd] = useState<any>(1)
    const [selectedIdNcm, setSelectdIdNcm] = useState<any>('0000.0')
    const [selectedIdBrand, setSelectedIdBrand] = useState<any>(1);
    const [selectedIdSector, setSelectedIdSector] = useState<any>(1);
    const [products, setProducts] = useState<TProduct[]>([])
    const [product, setProduct] = useState<TProduct>({
        id_product: 0, descric_product: '',
        val_max_product: 0.00, val_min_product: 0.00,
        fk_brand: 1, fk_sub_sector: 1, fk_un_med: 1,
        bar_code: '', image: '', fk_classe: 1,
        fk_grupo_fiscal: 1, fk_tipo_prod: 1, ncm: ''
    });
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    // Atualiza  somente se selecionar
    if (selectedIdBrand !== 1) {
        product.fk_brand = parseInt(selectedIdBrand);
    }
    if (selectedIdSector !== 1) {
        product.fk_sub_sector = parseInt(selectedIdSector);
    }
    if (selectedIdUnMed !== 1) {
        product.fk_un_med = parseInt(selectedIdUnMed)
    }
    if (selectedIdClasseProd !== 1) {
        product.fk_classe = parseInt(selectedIdClasseProd)
    }
    if (selectedIdGrupoFiscal !== 1) {
        product.fk_grupo_fiscal = parseInt(selectedIdGrupoFiscal)
    }
    if (selectedIdTipoProd !== 1) {
        product.fk_tipo_prod = parseInt(selectedIdTipoProd)
    }
    if (selectedIdNcm !== '0000.0') {
        product.ncm = selectedIdNcm
    }
    const isLoggedParams: number = isLogged[0].id

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct(values => ({ ...values, [name]: value }))
    };

    useEffect(() => {
        getList('brands', setBrands)
    }, [brands])

      useEffect(() => {
        getList('sectors', setSectors)
    }, [sectors])

    useEffect(() => {
        getList('sub_sectors', setSubSectors)
    }, [subSectors])

    useEffect(() => {
        getList('un_med', setUnMeds)
    }, [unMeds])

    useEffect(() => {
        getList('classes_prods', setClassesProds)
    }, [classesProds])

    useEffect(() => {
        getList('grupos_fiscais', setGruposFiscais)
    }, [gruposFiscais])

    useEffect(() => {
        getList('tipos_prods', setTiposProds)
    }, [tiposProds])

    useEffect(() => {
        async function getNcms() {
            const ncms = await ncms_.Nomenclaturas;
            setNcms(ncms)
        };
        getNcms();
    }, [ncms_]);

    const [dropdown, setDropdown] = useState<string>("");
    const modalRef = useRef<any>(null);

    function listUpdate(product_: TProduct) {
        product.id_product = product_.id_product
        product.descric_product = product_.descric_product
        product.val_max_product = product_.val_max_product
        product.val_min_product = product_.val_min_product
        product.fk_brand = product_.fk_brand
        product.fk_sub_sector = product_.fk_sub_sector
        product.fk_un_med = product_.fk_un_med
        product.bar_code = product_.bar_code
        product.image = product_.image
        product.fk_classe = product_.fk_classe
        product.fk_grupo_fiscal = product_.fk_grupo_fiscal
        product.fk_tipo_prod = product_.fk_tipo_prod
        product.ncm = product_.ncm
        toggleDropdown()
    }

    useEffect(() => {
        postAuthHandle('products_list', setTokenMessage, setProducts, isLogged)
    }, [products, isLoggedParams]);


    function toggleDropdown(): void {
        setDropdown("modal-show");
    };

    function closeDropdown(e: Event) {
        e.stopPropagation();
        const contain = modalRef.current.contains(e.target);
        if (contain) {
            setDropdown("");
            document.body.removeEventListener("click", closeDropdown);
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (ProductValFields(product, setMsg)) {
            postRegister(product, 'product');
        }
    };
    async function handleUpdate(e: Event) {
        e.preventDefault();
        if (ProductValFields(product, setMsg)) {
            const resp: any = await putUpdate(product, 'product_update')
            setMsg(resp)
        }
    };

    async function handleNewProduct(e: Event) {
        e.preventDefault();
        setFlagRegister(true)
        setProduct({
            id_product: 0, descric_product: '',
            val_max_product: 0.00, val_min_product: 0.00,
            fk_brand: 1, fk_sub_sector: 1, fk_un_med: 1,
            bar_code: '', image: '', fk_classe: 1,
            fk_grupo_fiscal: 1, fk_tipo_prod: 1, ncm: ''
        })
    };

    return (
        <>
            <Dashboard />
            <h1 className='text-center'>Escolha o Item para atualizar</h1>
            {handleTokenMessage('product_update', tokenMessage)}
            < ProductFormUpdate
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                handleNewProduct={handleNewProduct}
                flagRegister={flagRegister}
                modalRef={modalRef}
                className={dropdown}
                close={closeDropdown}
                msg={msg}
                listBrand={<select
                    onChange={e => setSelectedIdBrand(e.target.value)}
                >
                    {brands.map((brand) => (
                        <option
                            key={brand.id_brand}
                            value={brand.id_brand}
                        >
                            {brand.name_brand}
                        </option>))}</select>}
                listSector={<select
                    onChange={e => setSelectedIdSector(e.target.value)}
                >
                    {subSectors.map((sector: TSubSector) => (
                        <option
                            key={sector.id_sub_sector}
                            value={sector.id_sub_sector}
                        >
                            {sector.name_sub_sector}
                        </option>))}</select>}

                listUn={<select
                    onChange={e => setSelectedIdUn(e.target.value)}
                >
                    {unMeds.map((un: TUnMed) => (
                        <option
                            key={un.id_un}
                            value={un.id_un}
                        >
                            {un.un_med}
                        </option>))}</select>}

                listClasse={<select
                    onChange={e => setSelectedIdClasseProd(e.target.value)}
                >{classesProds.map((classe: TClasseProd) => (
                    <option
                        key={classe.id_classe}
                        value={classe.id_classe}
                    >
                        {classe.name_classe}
                    </option>))}</select>}

                listGrupoFiscal={<select
                    onChange={e => setSelectedIdGrupoFiscal(e.target.value)}
                >{gruposFiscais.map((grupoFiscal: TGrupoFiscal) => (
                    <option
                        key={grupoFiscal.id_grupo_fiscal}
                        value={grupoFiscal.id_grupo_fiscal}
                    >
                        {grupoFiscal.name_grupo_fiscal}
                    </option>))}</select>}

                listTipoProd={<select
                    onChange={e => setSelectdIdTipoProd(e.target.value)}
                >{tiposProds.map((tipoProd: TTipoProd) => (
                    <option
                        key={tipoProd.id_tipo}
                        value={tipoProd.id_tipo}
                    >
                        {tipoProd.name_tipo}
                    </option>
                ))}</select>}

                listNcm={<><datalist
                ><select
                >{ncms.map((ncm: TNcm) => (
                    <option
                        key={ncm.Codigo}
                        value={ncm.Codigo}
                    >
                        {ncm.Descricao}
                    </option>
                ))};
                    </select></datalist>
                    <input
                        placeholder="Pequisar o NCM do produto"
                        type="search"
                        list="data-itens"
                        onChange={e => setSelectdIdNcm(e.target.value)}
                    />
                </>}
                msgNcm={product.ncm === "00000" ? product.ncm : "NCM Localizado: " + product.ncm}
            >
                {product}
            </ProductFormUpdate>
            {products.length === 0 ? <p>Carregando ...</p> : (
                products.map((product: TProduct) => (
                    <ProductList
                        key={product.id_product}
                        id={product.id_product}
                        created_at={FormatDate(product.created_at)}
                        updated_at={product.updated_at === null ?
                            "Não houve atualização"
                            : FormatDate(product.updated_at)}
                        name={product.descric_product}
                        val_max={currencyFormat(product.val_max_product)}
                        val_min={currencyFormat(product.val_min_product)}
                        brand={handleProducts.nameBrands(product.fk_brand, brands)}
                        name_sub_sector={handleProducts.nameSubSector(product.fk_sub_sector, subSectors)}
                        name_sector={handleProducts.findSectorNameBySubSector(products, subSectors, sectors, product.fk_sub_sector)}
                        un_med={handleProducts.nameUnMeds(product.fk_un_med, unMeds)}
                        bar_code={product.bar_code}
                        image={product.image}
                        classe={handleProducts.nameClasseProd(product.fk_classe, classesProds)}
                        grupo_fiscal={handleProducts.nameGruposFiscais(product.fk_grupo_fiscal, gruposFiscais)}
                        tipo_prod={handleProducts.nameTiposProds(product.fk_tipo_prod, tiposProds)}
                        ncm={product.ncm}
                        update={<a href="##" onClick={() => listUpdate(product)}>Atualizar</a>}
                        dropdown={dropdown}
                    />
                )))}
        </>
    )
}