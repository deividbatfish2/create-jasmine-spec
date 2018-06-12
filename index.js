const reader = require('./lib/reader')
const file = require('./lib/files')
const specs = require('./lib/specs')
const template = require('./lib/templates/spec.template')

const filePath = process.argv[2] || './playground'

const run = async () => {
    let contexto
    let arrayCenarios = []
    let featuresFileList = await file.recuperarListaFeatures(filePath)
    featuresFileList.forEach(arquivo => {
        const arrayDeFuncoes = reader.extrairCenarios(arquivo)
        arrayDeFuncoes.forEach(cenario => {
            if (specs.isCenario(cenario)) {
                arrayCenarios.push(template.criarCenario(cenario.funcao, cenario.passos))
            }

            if (specs.isContexto(cenario)) {
                contexto = template.criarContexto(cenario.passos)
            }
        })

        arrayCenarios.forEach((cenario, index) => {
            let template = `
${contexto || ''}
${cenario}`
            try {
                file.criarArquivoFeature(arquivo, template, index)
            } catch (error) {
                console.error(error)
            }
        })
        arrayCenarios = []
    });

}
run()