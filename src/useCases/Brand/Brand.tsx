import { useState, useEffect } from "react";
import { TBrand } from "../products/type/TProducts";
import { getList } from "../../services/handleService";
import api from "../../services/api/api";
import { BrandForm } from "../../components/brands/BrandForm";

const Brand = () => {

    const [msg, setMsg] = useState('')
    const [brands, setBrands] = useState<TBrand[]>([])
    const [brand, setBrand] = useState<TBrand>({
        id_brand: 0,
        name_brand: ''
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setBrand(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getList('brands', setBrands)
    }, [brands])

    const updateBrand = (Sector: TBrand) => {
        setBrand(Sector)
        setMsg('')
    }

    const handleBrandRegister = async () => {
        await api.post('/brand', brand)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if (!res)
                    setMsg('Inserido com sucesso')
            }).catch(error => setMsg(error))
    }

    const handleBrandUpdate = async () => {
        await api.put('/brand', brand)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if (!res)
                    setMsg("Atualizado com sucesso")
            }).catch(error => setMsg(error))
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (brand.name_brand !== "") {
            brand.id_brand == 0 ?
                handleBrandRegister() :
                handleBrandUpdate()
        } else {
            setMsg("Informe o nome da Marca")
        }
        setBrand({id_brand:0,name_brand:''})
    }

    return <>
        <BrandForm
            brands={brands}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
            updateBrand={updateBrand}
            setBrand={setBrand}
        >
            {brand}
        </BrandForm>
    </>
}

export { Brand }

