import { checksUserLogged } from "../checksUserLogged/ChecksUserLogged"
import * as Icon from 'phosphor-react';

export const BackHome = () => {
    function handleLink() {
        let link = ''
        if (checksUserLogged() !== undefined) {
            link = '/dashboardefault'
            window.location.replace(link);

        } else {
            link = '/'
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
    return <p id="container">
        <button
            className="mt-3"
            onClick={handleLink}>{handleLocale()}
        </button>
    </p>
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
        <div className="mt-2">
            <a href={link_a}><b>{title_a}</b></a>
            {<Icon.CaretRight size={32} color="blue" />}
            <a href={link_b}><b>{title_b}</b></a>
             {<Icon.CaretRight size={32} color="blue" />}
            <a href={link_c}><b>{title_c}</b></a>
        </div></>
    return links;
};
