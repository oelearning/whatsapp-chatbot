const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword
} = require('@bot-whatsapp/bot')

const flowSnacks = addKeyword(['2'])
  .addAnswer(['Aqui el menu de snacks'])

const flowHamburger = addKeyword(['2'])
  .addAnswer(['Aqui el menu de hamburguesas'])

const flowPizza = addKeyword(['1'])
  .addAnswer(['Nuestro menú es el siguiente:'])
  .addAnswer(
    [
      '🍕 Pizzas Clásicas',
      '',
      'Precios:',
      '* Mediana $120',
      '* Familiar $140',
      '* Jumbo $180',
      '',
      'Ingredientes:',
      '* Hawaiana: jamón y piña',
      '* Mexicana: jalapeño, cebolla y chorizo',
      '* Pepperoni: pepperoni',
      '* Queso: queso mozarella y ajo molido',
      '',
      '',
      '🍕 Pizzas Especiales',
      '',
      '* Precios:',
      '* Mediana $150',
      '* Familiar $170',
      '* Jumbo $210',
      '',
      'Ingredientes:',
      '* Carnes frias: jamón, pepperoni, salchicha y chorizo',
      '* 3 Quesos: queso mozarella, manchego y queso crema',
      '* Vegetariana: pimiento, cebolla morada, champiñón y elote',
      '* Vikinga: pepperoni, pimiento, cebolla morada, champiñón, tocino y chorizo',
      '* Suprema: pimiento, cebolla morada, carne molida, chorizo y tocino',
      '* Poblana: chile poblano, cebolla morada, champiñón, tocino y elote',
      '* Campestre: pepperoni, jalapeño, cebolla morada, chimpiñón y tocino',
      '* Combinada: jamón, jalapeño, piña, salchicha y chorizo',
      '\n\n Oprime 0 para regresar al menú principal'
    ],
    null,
    null,
    []
  )

const flowPrincipal = addKeyword(['hola'])
  .addAnswer([
    'Bienvenido a Vikingos Pizza*',
    '',
    '🍕 Escribe *1* para ver el menú de pizzas',
    '🍔 Escribe *2* para ver el menú de hamburguesas',
    '🍟 Escribe *3* para ver el menú de snacks'
  ],
  null,
  null,
  [flowPizza, flowHamburger, flowSnacks]
  )

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  QRPortalWeb()
}

main()

// const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
//     [
//       '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
//       'https://bot-whatsapp.netlify.app/',
//       '\n*2* Para siguiente paso.'
//     ],
//     null,
//     null,
//     [flowSecundario]
//   )

//   const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
//     [
//       '🙌 Aquí encontras un ejemplo rapido',
//       'https://bot-whatsapp.netlify.app/docs/example/',
//       '\n*2* Para siguiente paso.'
//     ],
//     null,
//     null,
//     [flowSecundario]
//   )

//   const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
//     [
//       '🚀 Puedes aportar tu granito de arena a este proyecto',
//       '[*opencollective*] https://opencollective.com/bot-whatsapp',
//       '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
//       '[*patreon*] https://www.patreon.com/leifermendez',
//       '\n*2* Para siguiente paso.'
//     ],
//     null,
//     null,
//     [flowSecundario]
//   )

//   const flowDiscord = addKeyword(['discord']).addAnswer(
//     ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
//     null,
//     null,
//     [flowSecundario]
//   )
