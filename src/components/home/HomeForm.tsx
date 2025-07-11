import InputMask from "react-input-mask";
import { HomeNav } from './HomeNav'
import './css/styles.css'

type Props = {
    children: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleSubmit: any
    sendMsg: String;
}

export function HomeForm({
    children,
    handleChange,
    handleSubmit,
    sendMsg }: Props) {
    return (
        <>
            <HomeNav />
            <hr></hr>
            <div id='container-home'>
                <div id='main-form'>
                    <h1>Formulário de inscrição</h1>
                        <label id="text-center">Preencha com os dados da sua empresa</label>
                    <form id="prospecting-form">
                        {/* <input
                        id='main-input'
                            placeholder='Nome fantasia'
                            required
                            type='text'
                            name='fantasia'
                            value={children.fantasia || ''}
                            onChange={handleChange}
                        /> */}
                        {/* <input
                         id='main-input'
                            placeholder='Razão social'
                            required
                            type='text'
                            name='rsocial'
                            value={children.rsocial || ''}
                            onChange={handleChange}
                        /> */}
                        <InputMask
                         id='main-input'
                            mask="99.999.999.9999-99"
                            mask-selectonfocus="true"
                            maxLength={18}
                            autoComplete="off"
                            maskChar={null}
                            placeholder='CNPJ'
                            required
                            type='text'
                            name='cnpj'
                            value={children.cnpj || ''}
                            onChange={handleChange}
                        />
                        {/* <input
                         id='main-input'
                            placeholder='Inscrição estadual'
                            required
                            type='text'
                            name='iestadual'
                            value={children.iestadual || ''}
                            onChange={handleChange}
                        /> */}
                        <input
                         id='main-input'
                            placeholder='Telefone'
                            required
                            type='text'
                            name='phone'
                            value={children.phone || ''}
                            onChange={handleChange}
                        />
                        <input
                         id='main-input'
                            placeholder='Email'
                            required
                            type='email'
                            name='email'
                            value={children.email || ''}
                            onChange={handleChange}
                        />
                        {/* <input
                         id='main-input'
                            placeholder='Endereço'
                            required
                            type='text'
                            name='endereco'
                            value={children.endereco || ''}
                            onChange={handleChange}
                        /> */}
                        {/* <input
                            id='main-input-number'
                            placeholder='Número'
                            required
                            type='text'
                            name='numero'
                            value={children.numero || ''}
                            onChange={handleChange}
                        /> */}
                        {/* <input
                         id='main-input'
                            placeholder='Cidade'
                            required
                            type='text'
                            name='cidade'
                            value={children.cidade || ''}
                            onChange={handleChange}
                        /> */}
                        {/* <input
                         id='main-input-number'
                            placeholder='UF'
                            required
                            type='text'
                            name='uf'
                            value={children.uf || ''}
                            onChange={handleChange}
                        /> */}
                        {/* <input
                         id='main-input'
                            placeholder='CEP'
                            required
                            type='text'
                            name='cep'
                            value={children.cep || ''}
                            onChange={handleChange}
                        /> */}
                        <div id='msg'>
                            {sendMsg && <dd id='msg-red'>{sendMsg}</dd>}
                        </div>
                        <button
                            className='btn btn-primary'
                            id='m-2'
                            type='submit'
                            onClick={handleSubmit}
                        >Enviar</button>
                    </form>
                </div>
            </div>
        </>
    )
};