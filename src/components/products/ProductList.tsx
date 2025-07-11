import '../../index'

type Props = {
    id: number;
    created_at: Date | any;
    updated_at?: Date | any | null;
    name: string | number;
    val_max: string | number;
    val_min: string | number;
    brand: string | undefined;
    sector: string | undefined;
    un_med: string | undefined;
    bar_code: string;
    update: any,
    image?: string
    classe: string | undefined;
    grupo_fiscal: string | undefined
    tipo_prod: string | undefined
    ncm: string | undefined
    dropdown: string;
}

export function ProductList(props: Props) {

    const list = <div id="container" >
        <div id="main">
            <div id='main-list' >
                <div><b>ID</b> {props.id}</div>
                <div><b>Cadastro</b> {props.created_at}</div>
                <div><b>Alterado</b> {props.updated_at}</div>
                <div><b>Descrição</b> {props.name}</div>
                <div><b>Valor máximo</b> {props.val_max}</div>
                <div><b>Valor mínimo</b> {props.val_min}</div>
                <div><b>Marca</b> {props.brand}</div>
                <div><b>Setor</b> {props.sector}</div>
                <div><b>Un Medida</b> {props.un_med}</div>
                <div><b>Barras</b> {props.bar_code}</div>
                <div><b>Imagem</b> {props.image}</div>
                <div><b>Classe</b> {props.classe}</div>
                <div><b>Grupo Fiscal</b> {props.grupo_fiscal}</div>
                <div><b>Tipo Produto</b> {props.tipo_prod}</div>
                <div><b>NCM</b> {props.ncm}</div>
                <>{props.update}</>
            </div>
        </div>
    </div>
    return (
        <>
            {!props.dropdown && list}
        </>
    )
}