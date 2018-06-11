const fs = require('fs')

const palavrasReservadasList = require('./palavrasReservadas')

const getOrdemPalavrasReservadas = (arquivo) => {

    if (!arquivo) return new Error('Arquivo não informado!')
    if (typeof arquivo !== 'string') return new Error('Arquivo deve ser uma string!')
    let ordemList = []
    arquivo.split('\n')
        .forEach((linha) => {
            palavrasReservadasList.palavrasIndicamFuncao.forEach((pReservada) => {
                if (linha.indexOf(pReservada) > -1) {
                    ordemList.push(pReservada)
                }
            })
        })
    return ordemList || new Error('Nenhuma palavra reservada foi encontrada')
}

const getEscopoFuncao = (arquivo, ordemFuncoesList) => {

    if (!arquivo) return new Error('Arquivo não informado!')
    if (typeof arquivo !== 'string') return new Error('Arquivo deve ser uma string!')

    let escopoFuncao = { funcao: '', passos: [] }
    let funcoesList = []
    let possuiEscopo = false
    let processada = false

    let linhas = arquivo.split('\n')
    for (let i = 0; i < linhas.length; i++) {
        possuiEscopo = false
        processada = false

        for (let j = 0; j < ordemFuncoesList.length; j++) {

            if (linhas[i].indexOf(ordemFuncoesList[j]) > -1 && !possuiEscopo) {
                if (escopoFuncao.funcao) {
                    funcoesList.push(escopoFuncao)
                    escopoFuncao = { funcao: '', passos: [] }
                }
                escopoFuncao.funcao = linhas[i].trim()
                possuiEscopo = true
            }
        }

        for (let j = 0; j < palavrasReservadasList.palavrasIndicamPassos.length; j++) {
            if (linhas[i].indexOf(palavrasReservadasList.palavrasIndicamPassos[j]) > -1 && !processada) {
                escopoFuncao.passos.push(linhas[i].trim())
                processada = true
            }
            
        }

    }

    funcoesList.push(escopoFuncao)

    return funcoesList || new Error('Nenhuma palavra reservada foi encontrada')
}

const extrairCenarios = (arquivo) => {
    arquivo = fs.readFileSync(arquivo).toString()
    const arrayPalavrasReseveadas = getOrdemPalavrasReservadas(arquivo)
    const funcoesSeparadasPorEscopo = getEscopoFuncao(arquivo, arrayPalavrasReseveadas)
    return funcoesSeparadasPorEscopo || new Error('Não foram econtrados funções no arquivo indicado')
}

module.exports = {
    getOrdemPalavrasReservadas: getOrdemPalavrasReservadas,
    getEscopoFuncao: getEscopoFuncao,
    extrairCenarios: extrairCenarios
}