import { useState } from 'react';
import { TProduct } from '../../useCases/products/type/TProducts';
import { UploadImagem } from '../../useCases/products/UploadImage';
import { NavBar } from '../navbar/Navbar';

import '../../index'
import '../css/styles-forms.css'
import { CloseX } from '../utils/closeX/CloseX';

type Props = {
  children: TProduct
  handleChange: React.ChangeEventHandler<HTMLInputElement> | any;
  handleSubmit: any;
  msg: string;
  listBrand: React.ReactNode;
  listSector: React.ReactNode;
  listUn: React.ReactNode;
  listClasse: React.ReactNode;
  listGrupoFiscal: React.ReactNode;
  listTipoProd: React.ReactNode
  listNcm: React.ReactNode;
  msgNcm: string | undefined;
}

type IUpdateImagem = {
  path: string
  relativePath: string
  preview: string
}

export function ProductForm({
  children,
  handleChange,
  handleSubmit,
  msg,
  listBrand,
  listSector,
  listUn,
  listClasse,
  listGrupoFiscal,
  listTipoProd,
  listNcm,
  msgNcm,
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

  const nav = <>
  <p>
      <a
      href='##'
        onClick={() => (setMenu('geral'))}
      >Produto</a>/
      <a href='##'
        onClick={() => (setMenu('fiscal'))}
      >Sit Fiscal</a>/
      <a href='sector'
      >Setor</a>/
         <a href='sub_sector'
      >SubSetor</a>/
         <a href='brand'
      >Marca</a>/
      <a href='classe_prod'
      >Classe</a>
  </p>
  </>

  const geral = <>
    <input
      type="text"
      name="descric_product"
      placeholder='Descrição do produto'
      value={children.descric_product || ""}
      onChange={handleChange}
    />
    <input
      id='main-input-number'
      type="number"
      name="val_max_product"
      placeholder='Valor máximo'
      value={children.val_max_product || ""}
      onChange={handleChange}
    />
    <input
      id='main-input-number'
      type="number"
      name="val_min_product"
      placeholder='Valor minimo'
      value={children.val_min_product || ""}
      onChange={handleChange}
    />
    <div
      id='m-2'
    >
      {listBrand}
      {listSector}
      {listUn}
    </div>

    <input
      type="text"
      name="bar_code"
      placeholder='Código de Barras'
      value={children.bar_code || ""}
      onChange={handleChange}
    />
    <input
      type="text"
      name="image"
      placeholder='Imagem'
      value={children.image || ""}
      onChange={handleChange}
    />
    <UploadImagem />
    {msg && <div id='msg-red'>{msg}</div>}
    <button>Inserir Produto</button>
  </>

  const fiscal = <div id='m-2'>
    <div>Classe {listClasse}</div>
    <div>Grupo Fiscal {listGrupoFiscal}</div>
    <div>Tipo de Produto {listTipoProd}</div>
    <div>Pesquise o NCM do Produto {listNcm}</div>
    <span id='m-2'>{msgNcm}</span>
  </div>

  return (
    <>
      <NavBar />
      <div className='form'>
        <CloseX/>
        {menu === 'geral' && <b id='m-2'>Cadastrar Produto</b>}
        {menu === 'fiscal' && <b id='m-2'>Situação fiscal do Produto</b>}
        {nav}
        <form onSubmit={handleSubmit}>
          {menu === 'fiscal' ? fiscal : null}
          {menu === "geral" ? geral : null}
        </form>
      </div>
    </>
  )
};