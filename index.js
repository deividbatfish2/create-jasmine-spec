const reader = require('./lib/reader')
const file = require('./lib/files')

const filePath = process.argv[2] || './playground'

const run = async () => {
    let featuresFileList = await file.recuperarListaFeatures(filePath)
    featuresFileList.forEach(arquivo => {
        const arrayDeCenarios = reader.extrairCenarios(arquivo)
        console.log(arrayDeCenarios)
    });

}
run()