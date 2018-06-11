const isCenario = (cenario) => {
    return cenario.funcao.indexOf('Cenário') > -1
}

const isContexto = (cenario) => {
    return cenario.funcao.indexOf('Cenário') > -1
}

module.exports = {
    isCenario: isCenario,
    isContexto: isContexto
}