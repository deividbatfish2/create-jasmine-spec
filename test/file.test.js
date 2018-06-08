const mock = require('mock-fs')
let chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const path = require('path')

const file = require('../lib/files')

describe('File.js testes', () => {

    after(() => {
        mock.restore()
    })

    it('Verifica se a função retorna apenas arquivos .feature verificano subdiretorios', async () => {
        mock({
            './raiz': {
                'teste1.feature': 'teste',
                'subfolder': {
                    'teste2.txt': 'teste',
                    'subfolder_1.2': {
                        'teste_1.2.txt': 'teste'
                    }
                },
                'subfolder_2': {
                    'teste_2.feature': 'teste'
                }
            }
        })

        const result = await file.recuperarListaFeatures('./raiz')

        expect(result).to.have.length(2)

        expect(result).to.include.members([
            path.resolve('./raiz/teste1.feature'),
            path.resolve('./raiz/subfolder_2/teste_2.feature')
        ])
    })
})