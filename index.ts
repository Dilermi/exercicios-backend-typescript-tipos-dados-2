const fs = require('fs')

const escreverArquivo = (conteudo: any): void => {
    fs.writeFileSync('../bd.json', JSON.stringify(conteudo))
}

const lerArquivo = (): unknown => {
    const arquivo = JSON.parse(fs.readFileSync('../bd.json'))
    return arquivo
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (usuario: Usuario): Usuario => {
    const arquivo = lerArquivo() as Usuario[]
    arquivo.push(usuario)
    escreverArquivo(arquivo)
    return usuario
}

const listarUsuarios = (): Usuario[] => {
    return lerArquivo() as Usuario[]
}

const detalharUsuario = (cpf: string): Usuario => {
    const arquivo = lerArquivo() as Usuario[]
    const usuario = arquivo.find(usuario => usuario.cpf === cpf)

    if (!usuario) {
        throw new Error("Usuario não encontrado.")
    }

    return usuario
}

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
    const arquivo = lerArquivo() as Usuario[]
    const usuario = arquivo.find(usuario => usuario.cpf === cpf)

    if (!usuario) {
        throw new Error("Usuario não encontrado.")
    }

    Object.assign(usuario, dados)

    escreverArquivo(arquivo)

    return dados
}

const excluirUsuario = (cpf: string): Usuario => {
    const arquivo = lerArquivo() as Usuario[]
    const usuario = arquivo.find(usuario => usuario.cpf === cpf)

    if (!usuario) {
        throw new Error("Usuario não encontrado.")
    }

    const outroUsuarios = arquivo.filter(usuario => usuario.cpf !== cpf)

    escreverArquivo(outroUsuarios)

    return usuario
}

const filtrarUsuarios = (profissao: string): Usuario[] => {
    const arquivo = lerArquivo() as Usuario[]
    const usuariosFiltrados = arquivo.filter(usuario => {
        return usuario.profissao?.toLocaleLowerCase() === profissao.toLocaleLowerCase()
    })
    if (usuariosFiltrados.length === 0) {
        throw new Error("Nenhum usuario encontrado")
    }

    return usuariosFiltrados
}


console.log(filtrarUsuarios('string'))