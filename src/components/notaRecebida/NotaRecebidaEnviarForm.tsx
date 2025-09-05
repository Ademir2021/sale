type Props = {
    handleSubmit: any
    msgSendNota: string
}
export function NotaRecebidaEnviarForm({
    handleSubmit,
    msgSendNota
}: Props) {
    return <> <form className="form">
        <button
            onClick={handleSubmit}
        >Gravar a Nota</button>
        <label>{msgSendNota}</label>
    </form>
    </>
}