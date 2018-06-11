const isCenario = (cenario) => {
    if (!cenario) return new Error('Parâmetro não informado')
    return cenario.funcao.indexOf('Cenário') > -1
}

const isContexto = (contexto) => {
    if (!contexto) return new Error('Parâmetro não informado')
    return contexto.funcao.indexOf('Contexto') > -1
}

module.exports = {
    isCenario: isCenario,
    isContexto: isContexto
}