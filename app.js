const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword
} = require('@bot-whatsapp/bot')

const handleBack = async (ctx, { endFlow }) => {
  try {
    if (ctx.body === 'Regresar') {
      return await endFlow({ body: 'Regresando...' })
    }
    return endFlow
  } catch (error) {
    console.log(error)
  }
}
const flowConfirmar = addKeyword('Confirmar').addAnswer('Aqui va el flujo de confirmar')

const flowPedir = addKeyword(['Pedir'])
  .addAnswer(
    'Aqui debe aparecer el flujo de pedir',
    { capture: true, buttons: [{ body: 'Regresar' }, { body: 'Confirmar' }] },
    handleBack,
    [flowConfirmar]
  )

const flowSnacks = addKeyword(['🍟 Snacks'])
  .addAnswer('Aqui va el menu de snacks')

const flowHamburguesas = addKeyword(['🍔 Hamburguesas'])
  .addAnswer('Aqui va el menu de hamburguesas')

const flowPizzas = addKeyword(['🍕 Pizzas'])
  .addAnswer(
    [
      '🍕 Pizzas Clásicas',
      '\nPrecios:',
      '* Mediana $120',
      '* Familiar $140',
      '* Jumbo $180',
      '\nIngredientes:',
      '* Hawaiana: jamón y piña',
      '* Mexicana: jalapeño, cebolla y chorizo',
      '* Pepperoni: pepperoni',
      '* Queso: queso mozarella',
      '\n🍕 Pizzas Especiales',
      '\nPrecios:',
      '* Mediana $150',
      '* Familiar $170',
      '* Jumbo $210',
      '\nIngredientes:',
      '* Carnes frias: jamón, pepperoni, salchicha y chorizo',
      '* 3 Quesos: queso mozarella, manchego y queso crema',
      '* Vegetariana: pimiento, cebolla morada, champiñón y elote',
      '* Vikinga: pepperoni, pimiento, cebolla morada, champiñón, tocino y chorizo',
      '* Suprema: pimiento, cebolla morada, carne molida, chorizo y tocino',
      '* Poblana: chile poblano, cebolla morada, champiñón, tocino y elote',
      '* Campestre: pepperoni, jalapeño, cebolla morada, chimpiñón y tocino',
      '* Combinada: jamón, jalapeño, piña, salchicha y chorizo'
    ],
    { capture: true, buttons: [{ body: 'Regresar' }, { body: 'Pedir' }] },
    handleBack,
    [flowPedir]
  )

const flowMenus = addKeyword(['Menú', 'Regresar'])
  .addAnswer(
    [
      'Elige el menú que deseas ver'
    ],
    {
      buttons: [
        { body: '🍕 Pizzas' },
        { body: '🍔 Hamburguesas' },
        { body: '🍟 Snacks' }
      ]
    },
    null,
    [flowPizzas, flowHamburguesas, flowSnacks]
  )

const flowPrincipal = addKeyword(['hola'])
  .addAnswer(
    [
      '*Bienvenido a Vikingos Pizza*',
      '\nElige *Menú* para ver nuestro menù',
      'Elige *Pedir* para hacer un nuevo pedido'
    ],
    {
      buttons: [{ body: 'Menú' }, { body: 'Pedir' }]
    },
    null,
    [flowMenus, flowPedir]
  )

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal, flowMenus])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  QRPortalWeb()
}

main()

// [
//     '🍕 Pizzas Clásicas',
//     '',
//     'Precios:',
//     '* Mediana $120',
//     '* Familiar $140',
//     '* Jumbo $180',
//     '',
//     'Ingredientes:',
//     '* Hawaiana: jamón y piña',
//     '* Mexicana: jalapeño, cebolla y chorizo',
//     '* Pepperoni: pepperoni',
//     '* Queso: queso mozarella y ajo molido',
//     '',
//     '',
//     '🍕 Pizzas Especiales',
//     '',
//     '* Precios:',
//     '* Mediana $150',
//     '* Familiar $170',
//     '* Jumbo $210',
//     '',
//     'Ingredientes:',
//     '* Carnes frias: jamón, pepperoni, salchicha y chorizo',
//     '* 3 Quesos: queso mozarella, manchego y queso crema',
//     '* Vegetariana: pimiento, cebolla morada, champiñón y elote',
//     '* Vikinga: pepperoni, pimiento, cebolla morada, champiñón, tocino y chorizo',
//     '* Suprema: pimiento, cebolla morada, carne molida, chorizo y tocino',
//     '* Poblana: chile poblano, cebolla morada, champiñón, tocino y elote',
//     '* Campestre: pepperoni, jalapeño, cebolla morada, chimpiñón y tocino',
//     '* Combinada: jamón, jalapeño, piña, salchicha y chorizo',
//     '\n\n Oprime 0 para regresar al menú principal'
//   ]
