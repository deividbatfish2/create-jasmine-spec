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

    criarArquivoFeature: (caminho, arquivo, index) => {
        if (!caminho || !arquivo) return new Error('Necessário informar todos os parâmetros')

        if (index !== 0) {
            caminho = caminho.replace('.feature', '.' + index + '.js')
        } else {
            caminho = caminho.replace('.feature', '.js')
        }
        try {
            fs.writeFileSync(caminho, arquivo)
        } catch (error) {
            return error
        }
    }
}