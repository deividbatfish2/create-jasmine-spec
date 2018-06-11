module.exports = {
    criarContexto: (arrayDePassos) => {
        if (!arrayDePassos || arrayDePassos.length < 1) {
            return new Error('Obrigatório enviar pelo menos um passo para a função')
        }

        return `
beforeAll(() => {
    ${arrayDePassos.map((passo) => `
    // ${passo}`).join('')}
})`

    },
    criarCenario: (cenario, arrayDePassos) => {
        if (!arrayDePassos || !cenario || arrayDePassos.length < 1) {
            return new Error('Obrigatório enviar pelo menos um cenario e um passo para a função')
        }
        return `
describe('${cenario}', () => {
    ${arrayDePassos.map((passo) => `
    it('${passo}', () => {

    })
    `).join('')}
})`

    }
}