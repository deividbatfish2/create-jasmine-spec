let chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const should = chai.should()

const reader = require('../lib/reader')

describe('Reader teste', () => {
    it('getOrdemPalavrasReservadas - Verifica parametro obrigatorio', () => {
        reader.getOrdemPalavrasReservadas().should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo não informado!')
    })

    it('getOrdemPalavrasReservadas - Verifica parametro diferente de string', () => {
        reader.getOrdemPalavrasReservadas(1).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')

        reader.getOrdemPalavrasReservadas(['aaa', 'bbb']).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')

        reader.getOrdemPalavrasReservadas({ obj: 'teste' }).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')
    })

    it('getOrdemPalavrasReservadas - Verifica retorno dado uma string valida', () => {
        const arquivo = `# lanhuage: pt

        Funcionalidade: Importação de notas fiscais
        
        Contexto:
            Dado que eu esteja logado na aplicação
        
        Cenário: Importação de nota fiscal
            Dado que eu importe uma nota fiscal
            Então o sistema deve processar a nota
        
        
        Cenário: Reabertura de mês contabil
            Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido
            Então o sistema deve processar a nota`

        reader.getOrdemPalavrasReservadas(arquivo).should.have.include.members([
            'Funcionalidade',
            'Contexto',
            'Cenário',
            'Cenário'
        ])
    })

    it('getEscopoFuncao - Verifica Paramentro obrigatorio', () => {
        reader.getEscopoFuncao().should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo não informado!')
    })

    it('getEscopoFuncao - Verifica parametro diferente de string', () => {
        reader.getEscopoFuncao(1).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')

        reader.getEscopoFuncao(['aaa', 'bbb']).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')

        reader.getEscopoFuncao({ obj: 'teste' }).should.be.an.instanceOf(Error)
            .with.property('message', 'Arquivo deve ser uma string!')
    })

    it('getEscopoFuncao - Verifica retorno dado uma string valida', () => {
        let arquivo = `# lanhuage: pt

        Funcionalidade: Importação de notas fiscais
        
        Contexto:
            Dado que eu esteja logado na aplicação
        
        Cenário: Importação de nota fiscal
            Dado que eu importe uma nota fiscal
            Então o sistema deve processar a nota
        
        
        Cenário: Reabertura de mês contabil
            Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido
            Então o sistema deve processar a nota`

        let ordemPalavrasResevadas = ['Funcionalidade', 'Contexto', 'Cenário', 'Cenário']
        reader.getEscopoFuncao(arquivo, ordemPalavrasResevadas).should.have.deep.include.members([
            {
                funcao: 'Funcionalidade: Importação de notas fiscais',
                passos: []
            },
            {
                funcao: 'Contexto:',
                passos: [
                    'Dado que eu esteja logado na aplicação'
                ]
            },
            {
                funcao: 'Cenário: Importação de nota fiscal',
                passos: [
                    'Dado que eu importe uma nota fiscal',
                    'Então o sistema deve processar a nota'
                ]
            },
            {
                funcao: 'Cenário: Reabertura de mês contabil',
                passos: [
                    'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
                    'Então o sistema deve processar a nota'
                ]
            }
        ])

        arquivo = `# lanhuage: pt

        Funcionalidade: Importação de notas fiscais
        
        Cenário: Importação de nota fiscal
            Dado que eu importe uma nota fiscal
            Então o sistema deve processar a nota
        
        
        Cenário: Reabertura de mês contabil
            Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido
            Então o sistema deve processar a nota`

        ordemPalavrasResevadas = ['Funcionalidade', 'Cenário', 'Cenário']

        reader.getEscopoFuncao(arquivo, ordemPalavrasResevadas).should.have.deep.include.members([
            {
                funcao: 'Funcionalidade: Importação de notas fiscais',
                passos: []
            },
            {
                funcao: 'Cenário: Importação de nota fiscal',
                passos: [
                    'Dado que eu importe uma nota fiscal',
                    'Então o sistema deve processar a nota'
                ]
            },
            {
                funcao: 'Cenário: Reabertura de mês contabil',
                passos: [
                    'Dado que eu importe uma nota refetente ao mês anterior após o prazo estabelecido',
                    'Então o sistema deve processar a nota'
                ]
            }
        ])
    })
})