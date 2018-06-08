const path = require('path')
const shell = require('shelljs')

module.exports = {

    isFeatureFile: function isFeatureFile(file) {
        return path.extname(file) === '.feature'
    },

    recuperarListaFeatures: (basePath) => {
        basePath = path.resolve(basePath)
        return new Promise((resolve) => {
            resolve(
                shell.find(basePath)
                    .map((file) => {
                        return path.join(file)
                    })
                    .filter((file) => {
                        return path.extname(file) === '.feature'
                    })
            )
        })
    }
}