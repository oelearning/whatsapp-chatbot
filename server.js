const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword
} = require('@bot-whatsapp/bot')

let nombre
let apellidos
let telefono

const flowFormulario = addKeyword(['Hola', '⬅️ Volver al Inicio'])
  .addAnswer(
    ['Hola!', 'Para enviar el formulario necesito unos datos...', 'Escriba su *Nombre*'],
    { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

    async (ctx, { flowDynamic, endFlow }) => {
      try {
        if (ctx.body === '❌ Cancelar solicitud') {
          return await endFlow({
            body: '❌ Su solicitud ha sido cancelada ❌', // Aquí terminamos el flow si la condicion se comple
            buttons: [{ body: '⬅️ Volver al Inicio' }] // Y además, añadimos un botón por si necesitas derivarlo a otro flow
          })
        }

        nombre = ctx.body
        return flowDynamic(`Encantado *${nombre}*, continuamos...`)
      } catch (error) {
        console.error(error)
      }
    }
  )
  .addAnswer(
    ['También necesito tus dos apellidos'],
    { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

    async (ctx, { flowDynamic, endFlow }) => {
      try {
        if (ctx.body === '❌ Cancelar solicitud') {
          return await endFlow({
            body: '❌ Su solicitud ha sido cancelada ❌',
            buttons: [{ body: '⬅️ Volver al Inicio' }]
          })
        }

        apellidos = ctx.body
        return flowDynamic(`Perfecto *${nombre}*, por último...`)
      } catch (error) {
        console.error(error)
      }
    }
  )
  .addAnswer(
    ['Dejeme su número de teléfono y le llamaré lo antes posible.'],
    { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

    async (ctx, { flowDynamic, endFlow }) => {
      try {
        if (ctx.body === '❌ Cancelar solicitud') {
          return await endFlow({
            body: '❌ Su solicitud ha sido cancelada ❌',
            buttons: [{ body: '⬅️ Volver al Inicio' }]
          })
        }

        telefono = ctx.body
        return flowDynamic(`Estupendo *${nombre}*! te dejo el resumen de tu formulario
                  \n- Nombre y apellidos: *${nombre} ${apellidos}*
                  \n- Telefono: *${telefono}*`)
      } catch (error) {
        console.error(error)
      }
    }
  )

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowFormulario])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  QRPortalWeb()
}

main()
