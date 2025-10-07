import { Globais } from "../../globais/Globais";

export function LogoIn(){

    return(
        <div className=" p-2 mb-2 text-center">
        <a href="/dashboardefault"><img
            src={"img/" + process.env.REACT_APP_IMG_LOGO}
            style={{ width: '130px', height: '48px' }}
            alt={Globais.title} /></a>
    </div>
    )
}