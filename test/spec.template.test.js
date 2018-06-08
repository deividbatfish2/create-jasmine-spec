const specTemplate = require('../lib/templates/spec.template')
let chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const should = chai.should()

describe('Spec Template Teste', () => {
    it('Deve retonar uma sting valida', () => {
        const cenario = 'Reabertura de mês contabil'
        const passos = [
            'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
            'Então o sistema deve processar a nota',
            'E deve exibir uma mensagem de reabertura de mês contabil.',
            'Então eu irei confirmar a importação.',
            'Então o sistema deve reabrir o mês contabil.'
        ]

        const template = `
            describe('Reabertura de mês contabil', () => {

                it('Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido', () => {

                })

                it('Então o sistema deve processar a nota', () => {
                    
                })

                it('E deve exibir uma mensagem de reabertura de mês contabil.', () => {
                    
                })

                it('Então eu irei confirmar a importação.', () => {
                    
                })

                it('Então o sistema deve reabrir o mês contabil.', () => {
                    
                })
            })`

        const result = specTemplate.criar(cenario, passos)

        expect(result).to.equalIgnoreSpaces(template)
    })

    it('Verifica parametros nulos', () => {
        const cenario = 'Reabertura de mês contabil'
        const passos = [
            'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
            'Então o sistema deve processar a nota',
            'E deve exibir uma mensagem de reabertura de mês contabil.',
            'Então eu irei confirmar a importação.',
            'Então o sistema deve reabrir o mês contabil.'
        ]

        let result = specTemplate.criar(cenario)

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')

        result = specTemplate.criar(passos)

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')

        result = specTemplate.criar(cenario, [])

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')
    })
})