import { NavBar } from "../navbar/Navbar"

type Props = {
    children: any
    handleChange: any
    handleSubmit: any
}

export function NotaRecebidaForm({
    children,
    handleChange,
    handleSubmit,
}: Props) {
    return (
        <>
        <NavBar/>
        <div className="container-global">
            <div className="main-global">
            <div>Lançar Nota de Entrada</div>
                <div className="main-global-form">
                    <dd>ID do Fornecedor</dd>
                    <input
                        type='number'
                        name="fk_fornecedor"
                        value={children.fk_fornecedor || ''}
                        onChange={handleChange}
                        placeholder="ID do Fornecedor"
                    />
                    <dd>Emissão</dd>
                    <input
                        type='date'
                        name="emissao"
                        value={children.emissao || new Date().toISOString()}
                        onChange={handleChange}
                    />
                    <dd>Número da Nota</dd>
                       <input
                        type='text'
                        name="numNota"
                        value={children.numNota || ''}
                        onChange={handleChange}
                        placeholder="Número da Nota"
                    />
                      <dd>Modelo</dd>
                       <input
                        type='text'
                        name="modelo"
                        value={children.modelo || ''}
                        onChange={handleChange}
                        placeholder="Modelo"
                    />
                      <dd>Valor do Frete</dd>
                       <input
                        type='number'
                        name="vFrete"
                        value={children.vFrete || ''}
                        onChange={handleChange}
                        placeholder="Valor do Frete"
                    />
                      <dd>Valor do Seguro</dd>
                       <input
                        type='number'
                        name="vSeguro"
                        value={children.vSeguro || ''}
                        onChange={handleChange}
                        placeholder="Valor do Seguro"
                    />
                      <dd>Despesas Acessorias</dd>
                       <input
                        type='number'
                        name="despAcessorias"
                        value={children.despAcessorias || ''}
                        onChange={handleChange}
                        placeholder="Despesas Acessorias"
                    />
                      <dd>Encargos</dd>
                       <input
                        type='number'
                        name="encargos"
                        value={children.encargos || ''}
                        onChange={handleChange}
                        placeholder="Encargos"
                    />
                      <dd>Acréscimo</dd>
                       <input
                        type='number'
                        name="acrescimo"
                        value={children.acrescimo || ''}
                        onChange={handleChange}
                        placeholder="Acréscimo"
                    />
                      <dd>Desconto</dd>
                       <input
                        type='number'
                        name="desconto"
                        value={children.desconto || ""}
                        onChange={handleChange}
                        placeholder="Desconto"
                    />
                      <dd>Total dos Produtos</dd>
                       <input
                        type='number'
                        name='tProdutos'
                        value={children.tProdutos || ''}
                        onChange={handleChange}
                        placeholder='Total dos Produtos'
                        disabled
                    />
                      <dd>Total Nota</dd>
                       <input
                        type='number'
                        name="total"
                        value={children.total || ''}
                        onChange={handleChange}
                        placeholder="Total Nota"
                        disabled
                    />
                    <button
                        className='btn btn-primary'
                        onClick={handleSubmit}
                    >Inserir Dados</button>
                </div>
            </div>
        </div>
        </>
    )
}