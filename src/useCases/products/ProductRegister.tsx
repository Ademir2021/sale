import { useState, useEffect } from "react";
import { ProductForm } from '../../components/products/ProductForm';
import { postRegister, getList } from "../../services/handleService";
import { TProduct, TBrand, TSector, TUnMed, TClasseProd, TGrupoFiscal, TTipoProd, TNcm } from "./type/TProducts"
import ncmJSON from './NCM.json'
import { ProductValFields } from "./valsFields/ValsFields";

export function FormProduct() {
    const [alert_, setAlert_] = useState<string>("")
    const [brands, setBrands] = useState<TBrand[]>([]);
    const [sectors, setSectors] = useState<TSector[]>([]);
    const [unMeds, setUnMeds] = useState<TUnMed[]>([])
    const [classesProds, setClassesProds] = useState<TClasseProd[]>([])
    const [gruposFiscais, setGruposFiscais] = useState<TGrupoFiscal[]>([])
    const [tiposProds, setTiposProds] = useState<TTipoProd[]>([])
    const [ncms_] = useState<any>(ncmJSON)
    const [ncms, setNcms] = useState<TNcm[]>([])
    const [selectedIdBrand, setSelectedIdBrand] = useState<any>(1);
    const [selectedIdSector, setSelectedIdSector] = useState<any>(1);
    const [selectedIdUnMed, setSelectedIdUn] = useState<any>(1);
    const [selectedIdClasseProd, setSelectedIdClasseProd] = useState<any>(1);
    const [selectedIdGrupoFiscal, setSelectedIdGrupoFiscal] = useState<any>(1)
    const [selectedIdTipoProd, setSelectdIdTipoProd] = useState<any>(1)
    const [selectedIdNcm, setSelectdIdNcm] = useState<any>('0000.0')
    const [product, setProduct] = useState<TProduct>({
        id_product: 0, descric_product: '',
        val_max_product: 0.00, val_min_product: 0.00,
        fk_brand: 1, fk_sector: 1, fk_un_med: 1,
        bar_code: '', image: '', fk_classe: 1,
        fk_grupo_fiscal: 1, fk_tipo_prod: 1, ncm: ''
    });

    product.fk_brand = parseInt(selectedIdBrand);
    product.fk_sector = parseInt(selectedIdSector);
    product.fk_un_med = parseInt(selectedIdUnMed)
    product.fk_classe = parseInt(selectedIdClasseProd)
    product.fk_grupo_fiscal = parseInt(selectedIdGrupoFiscal)
    product.fk_tipo_prod = parseInt(selectedIdTipoProd)
    product.ncm = selectedIdNcm.replace(/[().]/g, '')

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

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (ProductValFields(product, setAlert_)) {
            postRegister(product, 'product')
            if (alert_ !== "")
                setAlert_('')
        }
    };

    return (
        <>
            <ProductForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                alert={alert_}
                message=""
                listBrand={<select
                id="main-input"
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
                id='main-input-number'
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
                id="main-input"
                    onChange={e => setSelectedIdClasseProd(e.target.value)}
                >{classesProds.map((classe: TClasseProd) => (
                    <option
                        key={classe.id_classe}
                        value={classe.id_classe}
                    >
                        {classe.name_classe}
                    </option>))}</select>}

                listGrupoFiscal={<select
                id="main-input"
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
            </ProductForm>
        </>
    )
}