import { checksUserLogged } from "../checksUserLogged/ChecksUserLogged"

export const BackHome = () => {

    function handleLink() {
        let link = ''
        if (checksUserLogged() !== undefined) {
            link = '/dashboardefault'
            window.location.replace(link);

        } else {
            link = '/store'
            window.location.replace(link);
        }
        return link
    };
    function handleLocale() {
        let locale = ''
        if (checksUserLogged() !== undefined) {
            locale = "Retornar - Panel"
        } else {
            locale = 'Retornar - Home'
        }
        return locale
    };

    return (
        <div className="container-global">
            <button className="btn btn-primary"
                onClick={handleLink}>{handleLocale()}</button>
        </div>
    )
}

export function handleLinksDir(
    link_a: string,
    title_a: string,
    link_b: string,
    title_b: string,
    link_c: string,
    title_c: string
) {
    const links = <>
    <p className="mt-2"><i>
            <a href={link_a}><b>{title_a}</b></a>
            <>{' > '}</>
            <a href={link_b}><b>{title_b}</b></a>
            <>{' > '}</>
            <a href={link_c}><b>{title_c}</b></a>
        </i></p></>
    return links;
};
