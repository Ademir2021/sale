import './css/cookies.css'

type Props = {
    handleSubmit: any
    cookieStatus: boolean
}
export function CookieAlertComponet({ handleSubmit, cookieStatus }: Props) {
    let cookie_notice = "cookie-alert";
    let cookie_close = "cookie-close"
    return (
        <div className={cookieStatus === false ? cookie_notice : cookie_close} >
            <p className="cookie-text">
                Usamos cookies para melhorar sua experiência.
                Ao continuar a visitar este site,
                você concorda com o uso de cookies. <a href="cookies">Saiba mais ...</a>
            </p>
            <button
                className="cookie-button"
                onClick={handleSubmit}>Aceitar</button>
        </div>
    );
}