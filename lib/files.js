const path = require('path')
const shell = require('shelljs')
const fs = require('fs')

module.exports = {

    recuperarListaFeatures: (basePath) => {

        return new Promise((resolve, reject) => {
            if (!basePath) reject(new Error('Diretório não informado'))

            basePath = path.resolve(basePath)

            fs.stat(basePath, (err, stats) => {
                if (err) reject(err)
                if (stats && stats.isDirectory()) {
                    resolve(
                        shell.find(basePath)
                            .map((file) => {
                                return path.join(file)
                            })
                            .filter((file) => {
                                return path.extname(file) === '.feature'
                            })
                    )
                } else {
                    reject(new Error(`No such file or directory ${basePath}`))
                }
            })

        })
    },

    criarArquivoFeature: (arquivo, ) => {
        fs.writeFileSync('./playground/teste.feature', arquivo)
    }
}