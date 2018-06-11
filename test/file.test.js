const mock = require('mock-fs')
let chai = require('chai')
chai.use(require('chai-string'))
chai.use(require('chai-as-promised'))
const expect = chai.expect
const path = require('path')

const file = require('../lib/files')

describe('File.js testes', () => {

    afterEach(() => {
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

    it('Verifica pasta raiz', async () => {
        mock({
            './raiz': {
                'teste1.feature': 'teste',
                'teste1.txt': 'teste',
                'teste2.feature': 'teste',
                'teste2.txt': 'teste',
                'teste3.feature': 'teste',
                'teste3.txt': 'teste'
            }
        })

        const result = await file.recuperarListaFeatures('./raiz')

        expect(result).to.have.length(3)

        expect(result).to.include.members([
            path.resolve('./raiz/teste1.feature'),
            path.resolve('./raiz/teste2.feature'),
            path.resolve('./raiz/teste3.feature')
        ])
    })

    it('Verifica pasta sem arquivos .feature', async () => {
        mock({
            './raiz': {
                'teste1.txt': 'teste',
                'teste2.txt': 'teste',
                'teste3.txt': 'teste'
            }
        })

        const result = await file.recuperarListaFeatures('./raiz')

        expect(result).to.have.length(0)
    })

    it('Verifica parametro não informado', async () => {

        return file.recuperarListaFeatures().should.be.eventually.rejectedWith(Error).and.have.property('message', 'Diretório não informado')
    })

    it('Verifica pasta inexistente', async () => {

        return file.recuperarListaFeatures('./lalalala').should.be.eventually.rejectedWith(Error).and.have.property('message').to.have.string('no such file or directory')
    })
})