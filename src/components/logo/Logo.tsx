import "./Logo.css"

export function Logo() {
    const logo = <img
        src={'img/' + process.env.REACT_APP_IMG_LOGO}
        className="logo"
        alt={process.env.REACT_APP_TITLE}
    ></img>
    return (
        <>{logo}</>
    )
}