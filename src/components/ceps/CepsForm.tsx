import InputMask from 'react-input-mask';
import { ICities } from '../../useCases/ceps/type/TCeps';

import '../../index'

interface Props {
    children: React.ChangeEventHandler<HTMLInputElement> | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit: any
    alertCep: string
    message: string
    listUf: React.ChangeEvent<HTMLSelectElement> | EventTarget & HTMLSelectElement | any
    listCity: ICities[]
    setSelectedIdCity: React.ChangeEvent<HTMLSelectElement> | EventTarget & HTMLSelectElement | any
}

export function CepsForm({
    children,
    handleChange,
    handleSubmit,
    alertCep,
    message,
    listUf,
    listCity,
    setSelectedIdCity
}: Props) {

    return (
        <>
            <hr></hr>
            <div id="container">
                <form id="main">
                    <strong id='text-center'>Cadastro de CEP</strong>
                    <a href="form_person">Retornar</a>
                    {alertCep && <label>{alertCep}</label>}
                    <label>CEP</label>
                    <InputMask
                    id='main-input'
                        mask={"99.999-999"}
                        type="text"
                        name="num_cep"
                        placeholder='CEP de sua cidade - Confirmar/Registrar'
                        value={children.num_cep || ""}
                        onChange={handleChange}
                    />
                    <label>Endereço</label>
                    <input
                    id='main-input'
                        type="text"
                        name="public_place"
                        placeholder='Logradouro'
                        value={children.public_place || ""}
                        onChange={handleChange}
                    />
                    <label>Tipo de Cep</label>
                    <input
                    id='main-input'
                        type="text"
                        name="type_cep"
                        placeholder='Tipo de CEP'
                        value={children.type_cep || ""}
                        onChange={handleChange}
                    />
                    <label>Número inicial</label>
                    <input
                        id='main-input-number'
                        type="number"
                        name="num_initial"
                        placeholder='Número inicial'
                        value={children.num_initial || ""}
                        onChange={handleChange}
                    />
                    <label>Número Final</label>
                    <input
                        id='main-input-number'
                        type="number"
                        name="num_final"
                        placeholder='Número final'
                        value={children.num_final || ""}
                        onChange={handleChange}
                    />
                    <label>Complemento</label>
                    <input
                    id='main-input'
                        type="text"
                        name="complement"
                        placeholder='Complemento'
                        value={children.complement || ""}
                        onChange={handleChange}
                    />
                    <label>{message}</label>
                    <label>
                        <select
                        id='main-input'
                        onChange={e => listUf(e.target.value)}>
                            <option>{"Selecione um Estado"}</option>
                            <option>{"AC"}</option>
                            <option>{"AL"}</option>
                            <option>{"AP"}</option>
                            <option>{"AM"}</option>
                            <option>{"BA"}</option>
                            <option>{"CE"}</option>
                            <option>{"DF"}</option>
                            <option>{"ES"}</option>
                            <option>{"GO"}</option>
                            <option>{"MA"}</option>
                            <option>{"MT"}</option>
                            <option>{"MS"}</option>
                            <option>{"MG"}</option>
                            <option>{"PA"}</option>
                            <option>{"PB"}</option>
                            <option>{"PR"}</option>
                            <option>{"PE"}</option>
                            <option>{"PI"}</option>
                            <option>{"RJ"}</option>
                            <option>{"RN"}</option>
                            <option>{"RS"}</option>
                            <option>{"RO"}</option>
                            <option>{"RR"}</option>
                            <option>{"SC"}</option>
                            <option>{"SP"}</option>
                            <option>{"SE"}</option>
                            <option>{"TO"}</option>
                        </select>
                    </label>
                    <label>
                        <select
                        id='main-input'
                        onChange={e => setSelectedIdCity(e.target.value)}>
                            <option>Escolha um Municipio</option>
                            {listCity.map((city: ICities) => (
                                <option
                                    key={city.id_city}
                                    value={city.id_city}
                                >
                                    {city.name_city}
                                </option>))}</select>
                    </label>
                    <button
                        className='btn btn-primary'
                        id='m-2'
                        onClick={handleSubmit}>Registrar</button>
                </form>
            </div>
        </>
    )
}