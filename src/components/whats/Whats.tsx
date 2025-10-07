import { FloatingWhatsApp } from 'react-floating-whatsapp'

export function Whats() {
  // const avatar: any = <img ref="ssl_cert"/>
  const phone_whats:any = process.env.REACT_APP_PHONE_WHATS
  return (
    <>
      <FloatingWhatsApp
      phoneNumber={phone_whats}
      accountName={phone_whats}
      statusMessage={'Em breve retornamos sua mensagem, obrigado.'}
      chatMessage={'Olá! 🤝 \nComo podemos ajudar?'}
      placeholder={'Digite aqui sua mensagem ...'}
      // avatar={avatar}
      />
    </>
  )
}