import { useState } from 'react';
import { TProduct } from '../../useCases/products/type/TProducts';
import { UploadImagem } from '../../useCases/products/UploadImage';
import { CloseX } from '../utils/closeX/CloseX';

import '../../index'
import '../css/styles-forms.css'

type Props = {
    children: TProduct
    products:TProduct[]
    handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    handleSubmit?: any;
    handleUpdate?: any;
    handleNewProduct?: any;
    modalRef?: any;
    className?: string;
    close?: any;
    msg: string;
    listBrand: any;
    listSector: any;
    listUn: any;
    listClasse: any;
    listGrupoFiscal: any;
    listTipoProd: any
    listNcm: any;
    msgNcm: string | undefined;
    flagRegister: boolean
}

type IUpdateImagem = {
    path: string
    relativePath: string
    preview: string
}

export function ProductFormUpdate({
    handleChange,
    handleSubmit,
    children,
      products,
    handleUpdate,
    handleNewProduct,
    modalRef,
    className,
    close,
    msg,
    listBrand,
    listSector,
    listUn,
    listClasse,
    listGrupoFiscal,
    listTipoProd,
    listNcm,
    msgNcm,
    flagRegister,
}: Props) {

    const [menu, setMenu] = useState("geral")

    function getUploadImagem() {
        const res: any = localStorage.getItem('update_imagem')
        if (res != null) {
            const resp: IUpdateImagem[] = JSON.parse(res)
            children.image = resp[0].relativePath.substring(2);
            if (children.image) {
                localStorage.removeItem('update_imagem')
            }
        }
    }

    if (children.image === "") {
        getUploadImagem()
    }

    const nav = <p> <a href='##'
        onClick={() => (setMenu('geral'))}
    >Produto</a> / < a href='##'
        onClick={() => (setMenu('fiscal'))}
    >Situação fiscal</a>
    </p>

    const geral = <>
    <label>{"ID do Produto: " + children.id_product}</label>
        <input
            type="hidden"
            name="id_product"
            value={children.id_product || ''}
            placeholder='ID produto'
            disabled
            onChange={handleChange}
        />
        <input
            type="text"
            name="descric_product"
            value={children.descric_product || ""}
            placeholder='descrição do produto'
            onChange={handleChange}
        />
        <input
            id='main-input-number'
            type="text"
            name="val_max_product"
            mask-selectonfocus="true"
            maxLength={14}
            autoComplete="off"
            value={children.val_max_product || ""}
            placeholder="valor maxímo"
            onChange={handleChange}
        />
        <input
            id='main-input-number'
            type="text"
            name="val_min_product"
            mask-selectonfocus="true"
            maxLength={14}
            autoComplete="off"
            value={children.val_min_product || ""}
            onChange={handleChange}
            placeholder="valor mínimo"
        />

        <>
            {listBrand}
            {listSector}
            {listUn}
        </>
        <input
            type="text"
            name="bar_code"
            value={children.bar_code || ''}
            onChange={handleChange}
            placeholder='código de barras'
        />
        <label>{"Próxima Imagem: " + (products.length + 1) + '.png' }</label>
        <input
            type="text"
            name="image"
            value={children.image || ''}
            onChange={handleChange}
            placeholder='Imagem'
        />
        <UploadImagem />
        {msg && <div id='msg-red'>{msg}</div>}
        {!flagRegister && <button id='m-2' onClick={handleUpdate}>Atualizar Dados</button>}
        {!flagRegister && <button id='m-2' onClick={handleNewProduct}>Novo Produto</button>}
        {flagRegister && <button id='m-2' onClick={handleSubmit}>Inserir Produto</button>}
        <button id='m-2' onClick={close}>Sair</button>

    </>

    const fiscal = <div>
        <label>Classe {listClasse}</label>
        <label>Grupo Fiscal {listGrupoFiscal}</label>
        <label>Tipo de Produto {listTipoProd}</label>
        <div>Pesquise o NCM do Produto {listNcm}</div>
        <span>{msgNcm}</span>
    </div>

    return (
        <>
            <div ref={modalRef} className={`${className} modal`}>
                <div className='form'>
                       <CloseX link="product_update" />
                    {menu === 'geral' && <label>Atualizar Produto</label>}
                    {menu === 'fiscal' && <label>Situação fiscal do Produto</label>}
                    {nav}
                    <form>
                        {menu === "geral" ? geral : null}
                        {menu === 'fiscal' ? fiscal : null}
                    </form>
                </div>
            </div>
        </>
    )
}