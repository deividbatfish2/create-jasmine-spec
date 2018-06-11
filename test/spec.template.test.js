let chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const should = chai.should()

const specTemplate = require('../lib/templates/spec.template')

describe('Spec Template Teste', () => {
    it('criarCenario -  Deve retonar uma sting valida', () => {
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

        const result = specTemplate.criarCenario(cenario, passos)

        expect(result).to.equalIgnoreSpaces(template)
    })

    it('criarCenario - Verifica parametros nulos', () => {
        const cenario = 'Reabertura de mês contabil'
        const passos = [
            'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
            'Então o sistema deve processar a nota',
            'E deve exibir uma mensagem de reabertura de mês contabil.',
            'Então eu irei confirmar a importação.',
            'Então o sistema deve reabrir o mês contabil.'
        ]

        let result = specTemplate.criarCenario(cenario)

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')

        result = specTemplate.criarCenario(passos)

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')

        result = specTemplate.criarCenario(cenario, [])

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')
    })

    it('criarContexto - Deve retonar uma sting valida', () => {

        const passos = [
            'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
            'Então o sistema deve processar a nota',
            'E deve exibir uma mensagem de reabertura de mês contabil.',
            'Então eu irei confirmar a importação.',
            'Então o sistema deve reabrir o mês contabil.'
        ]

        const template = `
            beforeAll(() => {
                // Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido
                // Então o sistema deve processar a nota
                // E deve exibir uma mensagem de reabertura de mês contabil.
                // Então eu irei confirmar a importação.
                // Então o sistema deve reabrir o mês contabil.
            })`

        const result = specTemplate.criarContexto(passos)

        expect(result).to.equalIgnoreSpaces(template)
    })

    it('criarContexto - Verifica parametros nulos', () => {

        let result = specTemplate.criarCenario()

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')

        result = specTemplate.criarCenario([])

        result.should.be.an.instanceOf(Error).with.property('message', 'Obrigatório enviar pelo menos um cenario e um passo para a função')
    })
})