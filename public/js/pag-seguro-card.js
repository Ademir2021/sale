const res = localStorage.getItem('card')
if (res !== null) {
    const res_card = JSON.parse(res)
    const card = PagSeguro.encryptCard({
        publicKey: res_card.public_key,
        holder: res_card.holder,
        number: res_card.number,
        expMonth: res_card.ex_month,
        expYear: res_card.ex_year,
        securityCode: res_card.secure_code
    });
    const encrypted = card.encryptedCard;
    const hasErrors = card.hasErrors;
    const errors = card.errors;
    if (encrypted !== null) {
        localStorage.setItem('encrypted', JSON.stringify(encrypted))
    }
    // console.log(hasErrors)
    localStorage.setItem('hasErrors', JSON.stringify(hasErrors))
    // console.log(errors)
    localStorage.setItem('errors', JSON.stringify(errors))
}
