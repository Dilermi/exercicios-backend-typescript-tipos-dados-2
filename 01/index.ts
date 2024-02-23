const fs = require('fs')

type Arquivo = string | Buffer

const conteudo = [1, 2, 3, [{ nome: 'Joao' }]]

const escreverArquivo = (conteudo: Arquivo): void => {
    fs.writeFileSync('../bd.json', conteudo)

}

const lerArquivo = (): Arquivo => {
    const conteudo = fs.readFileSync('../bd.json').toString()
    return conteudo
}

escreverArquivo(JSON.stringify(conteudo))
console.log(lerArquivo())