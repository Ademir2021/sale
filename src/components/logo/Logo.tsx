import "./Logo.css"

export function Logo() {
    const logo = <img
        src='img/logo_centroinfo.png'
        className="logo"
        alt={process.env.REACT_APP_TITLE}
    ></img>
    return (
        <>{logo}</>
    )
}