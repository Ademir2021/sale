import { TClasseProd } from "../../useCases/products/type/TProducts"

type Props = {
    children: TClasseProd
    classes: TClasseProd[]
    handleChange: any
    handleSubmit: Function | any
    msg: string
    updateClasse: Function
    seTClasseProd: Function
}

const ClasseProdForm = ({
    classes,
    handleChange,
    children,
    handleSubmit,
    msg,
    updateClasse,
    seTClasseProd
}: Props) => {

    const register = <form className="form" id="up_form_" onSubmit={handleSubmit}>
        <a href="form_product">Sair</a>
        <label>Nome da Classe</label>
        <input
            type="text"
            placeholder="Classe do Produto"
            name="name_classe"
            value={children.name_classe}
            onChange={handleChange}
            required
        />
        {msg && <dd>{msg}</dd>}
        <button className="container" >{children.id_classe == 0 ? 'Inserir' : 'Atualizar'}</button>
        <button className="container" onClick={() => seTClasseProd({
                        id_classe: 0,
                        name_classe: ''
                    })}>Cancelar</button>
    </form>

    const thead = <thead>
        <tr>
            <th className='text-center'>ID</th>
            <th>Nome Classe</th>
            <th>Atualizar</th>
            <th>Cancelar</th>
        </tr>
    </thead>

    const lisTClasseProds = <table className="table">
        {classes.length > 0 ? thead : <p>Inlua uma Classe</p>}
        <tbody>
            {classes.map((classe: TClasseProd) => (
                <tr key={classe.id_classe}>
                    <th className="text-center">{classe.id_classe}</th>
                    <th>{classe.name_classe}</th>
                    <th><a href="#up_form_" onClick={() => updateClasse(classe)}>Atualizar</a></th>
                    <th><a href="##" onClick={() => seTClasseProd({
                        id_classe: 0,
                        name_classe: ''
                    })}>Cancelar</a></th>
                </tr>
            ))}
        </tbody>
    </table>

    return (<>
        {register}
        <div className="container m-4">
            {lisTClasseProds}
        </div>
    </>
    )
}

export { ClasseProdForm }