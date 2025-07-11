import { useState } from 'react';
import { TProduct } from '../../useCases/products/type/TProducts';
import { UploadImagem } from '../../useCases/products/UploadImage';
import { NavBar } from '../navbar/Navbar';

import '../../index'

type Props = {
  children: TProduct
  handleChange: React.ChangeEventHandler<HTMLInputElement> | any;
  handleSubmit: any;
  alert: string;
  message: string;
  listBrand: any;
  listSector: any;
  listUn: any;
  listClasse: any;
  listGrupoFiscal: any;
  listTipoProd: any
  listNcm: any;
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
  alert,
  message,
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
    <div>
      <button
        className='btn btn-primary'
        id='m-2'
        onClick={() => (setMenu('geral'))}
      >Cadastro do Produto</button>
      <button
        className='btn btn-primary'
        id='m-2'
        onClick={() => (setMenu('fiscal'))}
      >Situação Fiscal</button>
    </div>
  </>

  const geral = <>
    <input
      id='main-input'
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
      id='main-input'
      type="text"
      name="bar_code"
      placeholder='Código de Barras'
      value={children.bar_code || ""}
      onChange={handleChange}
    />
    <input
      id='main-input'
      type="text"
      name="image"
      placeholder='Imagem'
      value={children.image || ""}
      onChange={handleChange}
    />
    <UploadImagem />
    {alert && <div id='msg-red'>{alert}</div>}
    {message && <div id='msg-red'>{message}</div>}
    <button
      className='btn btn-primary'
      id='m-2'
      onClick={handleSubmit}>Registrar</button>
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
      <div id='container'>
        {menu === 'geral' ? <b className='m-3'>Cadastrar Produto</b>:null}
        {menu === 'fiscal' ? <b className='m-3'>Situação fiscal do Produto</b>:null}
      </div>
      <div id='container'>
        {nav}
      </div>
      <div id="container">
        <form id="main">
          {menu === 'fiscal' ? fiscal : null}
          {menu === "geral" ? geral : null}
        </form>
      </div>
    </>
  )
};