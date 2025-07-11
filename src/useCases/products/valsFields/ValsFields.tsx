import { TProduct } from "../type/TProducts"

export function ProductValFields(product:TProduct, setAlert_:any) {
    let msg = "Por favor Informar "
    if (product.descric_product === "") { msg += "descrição do produto! " };
    if (product.val_max_product === 0) { msg += "valor max! " };
    if (product.val_min_product === 0) { msg += "valor min! " };
    if (product.bar_code === "") { msg += "código de barras! " };
    if (msg !== "Por favor Informar ") {
        setAlert_(msg)
        return false;
    };
    return true;
};