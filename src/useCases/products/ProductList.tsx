import { useState, useEffect } from "react";
import { TProduct, TBrand, TSector, TUnMed, TClasseProd, TGrupoFiscal, TTipoProd } from "./type/TProducts"
import { FormatDate } from "../../components/utils/formatDate";
import { ProductList } from "../../components/products/ProductList";
import { currencyFormat } from "../../components/utils/currentFormat/CurrentFormat";
import { Dashboard } from "../dashboard/Dashboard";
import { HandleProducts } from "./HandleProduct";
import { postList, getList } from "../../services/handleService";

export function ProductsList() {
    const handleProducts: HandleProducts = new HandleProducts();
    const [products, setproducts] = useState<TProduct[]>([]);
    const [brands, setBrands] = useState<TBrand[]>([]);
    const [sectors, setSectors] = useState<TSector[]>([]);
    const [unMeds, setUnMeds] = useState<TUnMed[]>([])
    const [classesProds, setClassesProds] = useState<TClasseProd[]>([])
    const [gruposFiscais, setGruposFiscais] = useState<TGrupoFiscal[]>([])
    const [tiposProds, setTiposProds] = useState<TTipoProd[]>([])

    useEffect(() => {
        postList('products_list', setproducts)
    }, [products]);

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

    return (
        <>
            <Dashboard />
            <h1 className="text-center">Lista de Produtos</h1>
            {products.length === 0 ? <p>Carregando...</p> : (
                products.map((product: TProduct) => (
                    <ProductList
                        key={product.id_product}
                        id={product.id_product}
                        created_at={FormatDate(product.created_at)}
                        updated_at={product.updated_at === null ?
                            "não houve atualização" : FormatDate(product.updated_at)}
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
                        update={null}
                        dropdown=""
                    />
                )))}
        </>
    )
}