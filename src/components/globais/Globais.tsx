const data = new Date();
const day = data.getUTCDate();
const year = data.getFullYear();
const month = data.getMonth() + 1;
const H = data.getHours();
const M = data.getMinutes();
const S = data.getSeconds();

let saudacao = ''
if (H <= 12 || H >= 6) {
    saudacao = 'Bom dia'
    if (H >= 19 || H >= 13) {
        saudacao = 'Boa tarde'
        if (H >= 19 || H <= 5) {
            saudacao = 'Boa noite'
        }
    }
};

const setMonth = () => {
    if (month === 1)
        return "jan"
    else if (month === 2)
        return "fev"
    else if (month === 3)
        return "mar"
    else if (month === 4)
        return "abr"
    else if (month === 5)
        return "maio"
    else if (month === 6)
        return "jun"
    else if (month === 7)
        return "jul"
    else if (month === 8)
        return "ago"
    else if (month === 9)
        return "set"
    else if (month === 10)
        return "out"
    else if (month === 11)
        return "nov"
    else if (month === 12)
        return "dez"
}

export class Globais {
    static calendar = saudacao + ' ' + day + ' ' + setMonth() + ' ' + year + ' ' + H + ':' + M + ':' + S
    static checksUserLogged = undefined;
    static privilAdmin = '2'
    static rights_reserved = '2007 | ' + year + ', All rights reserved Centro Informática';
    static address = 'Avenida Castro Alves 1241, Barbosa Ferraz, PR. CEP 86960-000';
    static phone = '+55 (44) 98852-1033'
    static title = 'Centro Informática';
    static company = "Centro Informática"
    static CNPJ = "18.069.383/0001-10"
    // static URL="https://centroinfo.com.br"
    // static API_URL="https://api.centroinfo.com.br"
    // static URL_NOTE="https://api.centroinfo.com.br/note"
    // static URL_CENTROINFO="https://www.centroinfo.com.br"
    static URL="http://localhost:3001"
    static API_URL="http://localhost:3000"
    static URL_NOTE="http://localhost:3000/note"
    static URL_CENTROINFO="http://localhost:3001"
 }
