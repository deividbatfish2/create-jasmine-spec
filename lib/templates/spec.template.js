module.exports = {
    criar: (cenario, arrayDePassos) => {
        if (!arrayDePassos || !cenario || arrayDePassos.length < 1) {
            return new Error('Obrigatório enviar pelo menos um cenario e um passo para a função')
        } else {
            return `
describe('${cenario}', () => {
    ${arrayDePassos.map((passo) =>`
    it('${passo}', () => {

    })
    `
    ).join('')}
})` 
        }
        
    }
}