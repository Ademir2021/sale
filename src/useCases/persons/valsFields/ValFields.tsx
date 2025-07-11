export function PersonsValFields(person: any, setAlert_: any) {
    let msg = "Digite o "
    if (person.name_pers === "") { msg += "seu nome completo!\n" };
    if (person.phone_pers === "") { msg += "telefone!\n" };
    if (person.address_pers === "") { msg += "endereço!\n" };
    if (person.num_address === "") { msg += "número!\n" };
    if (person.fk_name_filial === 0) { msg += "Informe o num loja!\n" };
    if (msg !== "Digite o ") {
        setAlert_(msg)
        return false;
    };
    return true;
  };