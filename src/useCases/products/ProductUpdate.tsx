import { useState, useEffect, useRef, useContext } from "react"
import ncmJSON from './NCM.json'
import { FormatDate } from "../../components/utils/formatDate";
import { TProduct, TSector, TBrand, TClasseProd, TGrupoFiscal, TTipoProd, TUnMed, TNcm } from "./type/TProducts";
import { postAuthHandle, postRegister, putUpdate, getList } from "../../services/handleService";
import { ProductFormUpdate } from "../../components/products/ProductFormUpdate";
import { ProductList } from "../../components/products/ProductList";
import { AuthContext } from '../../context/auth'
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';
import { Dashboard } from "../dashboard/Dashboard";
import { HandleProducts } from "./HandleProduct";
import "../../App.css"
import { ProductValFields } from "./valsFields/ValsFields";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function ProductUpdate() {
    const { user: isLogged }: any = useContext(AuthContext);
    const [flagRegister, setFlagRegister] = useState<boolean>(false)
    const [alert_, setAlert_] = useState<string>("")
    const handleProducts: HandleProducts = new HandleProducts()
    const [sectors, setSectors] = useState<TSector[]>([]);
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
        fk_brand: 1, fk_sector: 1, fk_un_med: 1,
        bar_code: '', image: '', fk_classe: 1,
        fk_grupo_fiscal: 1, fk_tipo_prod: 1, ncm: ''
    });
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    // Atualiza  somente se selecionar
    if (selectedIdBrand !== 1) {
        product.fk_brand = parseInt(selectedIdBrand);
    }
    if (selectedIdSector !== 1) {
        product.fk_sector = parseInt(selectedIdSector);
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
       getList('sectors',setSectors)
    }, [sectors])

    useEffect(() => {
        getList('un_med',setUnMeds)
    }, [unMeds])

    useEffect(() => {
        getList('classes_prods',setClassesProds)
    }, [classesProds])

    useEffect(() => {
        getList('grupos_fiscais',setGruposFiscais)
    }, [gruposFiscais])

    useEffect(() => {
   getList('tipos_prods',setTiposProds)
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
        product.fk_sector = product_.fk_sector
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
        postAuthHandle('products_list',setTokenMessage,setProducts,isLogged)
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
        if (ProductValFields(product, setAlert_)) {
            postRegister(product, 'product');
        }
    };
    async function handleUpdate(e: Event) {
        e.preventDefault();
        if (ProductValFields(product, setAlert_)) {
            const resp: any = await putUpdate(product, 'product_update')
            setAlert_(resp)
        }
    };

    async function handleDelete(e: Event) {
        e.preventDefault();
        setFlagRegister(true)
        setProduct({
            id_product: 0, descric_product: '',
            val_max_product: 0.00, val_min_product: 0.00,
            fk_brand: 1, fk_sector: 1, fk_un_med: 1,
            bar_code: '', image: '', fk_classe: 1,
            fk_grupo_fiscal: 1, fk_tipo_prod: 1, ncm: ''
        })
    };
    
    return (
        <>
            <Dashboard />
             <h1 className="text-center">Lista de Produtos</h1>
               {handleTokenMessage('product_update', tokenMessage)}
            < ProductFormUpdate
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                flagRegister={flagRegister}
                modalRef={modalRef}
                className={dropdown}
                close={closeDropdown}
                alert={alert_}
                message=""
                listBrand={<select
                id='main-input'
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
                  id='main-input'
                    onChange={e => setSelectedIdSector(e.target.value)}
                >
                    {sectors.map((sector: TSector) => (
                        <option
                            key={sector.id_sector}
                            value={sector.id_sector}
                        >
                            {sector.name_sector}
                        </option>))}</select>}

                listUn={<select
                  id='main-input'
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
                  id='main-input'
                    onChange={e => setSelectedIdClasseProd(e.target.value)}
                >{classesProds.map((classe: TClasseProd) => (
                    <option
                        key={classe.id_classe}
                        value={classe.id_classe}
                    >
                        {classe.name_classe}
                    </option>))}</select>}

                listGrupoFiscal={<select
                  id='main-input'
                    onChange={e => setSelectedIdGrupoFiscal(e.target.value)}
                >{gruposFiscais.map((grupoFiscal: TGrupoFiscal) => (
                    <option
                        key={grupoFiscal.id_grupo_fiscal}
                        value={grupoFiscal.id_grupo_fiscal}
                    >
                        {grupoFiscal.name_grupo_fiscal}
                    </option>))}</select>}

                listTipoProd={<select
                  id='main-input'
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
                    id="data-itens"><select
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
                        sector={handleProducts.nameSector(product.fk_sector, sectors)}
                        un_med={handleProducts.nameUnMeds(product.fk_un_med, unMeds)}
                        bar_code={product.bar_code}
                        image={product.image}
                        classe={handleProducts.nameClasseProd(product.fk_classe, classesProds)}
                        grupo_fiscal={handleProducts.nameGruposFiscais(product.fk_grupo_fiscal, gruposFiscais)}
                        tipo_prod={handleProducts.nameTiposProds(product.fk_tipo_prod, tiposProds)}
                        ncm={product.ncm}
                        update={<button
                            className="btn btn-primary"
                            id='m-2'
                            onClick={() => listUpdate(product)}>Atualizar</button>}
                            dropdown={dropdown}
                    />
                )))}
        </>
    )
}