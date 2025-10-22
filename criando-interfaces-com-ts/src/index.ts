interface gitHubUser { // A API já retornaria esses valores, então o que a interface faz é restringir o retorno nessas propriedades
    id:number
    login:string
    name:string | null // para caso não possua nome de usuario
    bio:string | null // para caso não possua biografia
    public_repos:number
    repos_url:string
    message?:"Not Found"
}

interface gitHubRepo { // Essa interface faz a mesma coisa que a de cima (restringe o retorno só nessas propriedades)
    name:string
    description:string | null
    fork:boolean
    stargazers_count:number
}

const users: gitHubUser[] = [] // array onde os usuarios salvos vão ficar

const getUser = async (userName:string) => { // Função que retorna informações de uma conta
    const response = await fetch(`https://api.github.com/users/${userName}`) // faz o contato com a API e recebe uma promise e é resolvida
    const user:gitHubUser = await response.json() // response.json retorna uma nova promise e o await transforma ele em um json de verdade
    if (user.message) { // se possuir message, quer dizer que deu algum erro (geralmente not found)
        console.log("Usuário não encontrado!")
    } else {
        users.push(user) // coloca a conta no array de usuarios
        console.log(`O usuário "${user.name !== null ? user.name : "Não possui."}" foi salvo:\nID: ${user.id}\nLogin: ${user.login}\nNome: ${user.name}\nBio: ${user.bio !== null ? user.bio : "Não possui."}\nRepositórios públicos: ${user.public_repos}`)
    }
}

const showUserRepos = async (userName:string) => { // mostra os repositorios de uma conta
    const user = users.find(user => user.login === userName) // procura no proprio array salvos o nome de usuario

    if (typeof user === "undefined") { // se for do tipo undefined quer dizer que esse usuario ainda nao foi salvo (ou que pelo menos não foi encontrado no array)
        console.log("Usuário não encontrado!")
    } else {
        const response = await fetch(user.repos_url) // o repos_url leva para uma nova promise que é resolvida
        const repos: gitHubRepo[] = await response.json() // retorna nova promise e é resolvida, retornando o array bidimensional com todos os repositorios

        let message:string = `Repositórios da conta "${user.login}":`
        repos.forEach(r => { // Passa por cada repositorio e vai fazendo a mensagem
            message += `\n\nNome: ${r.name}\nDescrição: ${r.description !== null ? r.description : "Não possui."}\nFork?: ${r.fork ? "Sim, é." : "Não é."}\nNúmero de estrelas: ${r.stargazers_count}`
        });
        console.log(message)
    }
}

const showusers = () => { // Mostra o usuario de todos os contas salvas
    let message:string = "Usuários salvos:"
    users.forEach((user, index) => { // passa por cada um e molda mensagem
        message += `\n${index + 1} - ${user.login}`
    })
    console.log(message)
}

const showReposTotal = () => { // calcula o número total de repositorio (juntando de todos os usuarios)
    const sum = users.reduce((acc, user) => acc + user.public_repos, 0) // passa por cada usuario e soma seu nmr de repositorios
    console.log("Número total de repositórios públicos: ", sum)
}

const showTopFive = () => { // mostra o top 5 usuarios com mais repositorios do array de contas
    let topFive = users.slice() // Faz uma copia do array pra nao alterar ele
    topFive.sort((currentUser, nextUser) => nextUser.public_repos - currentUser.public_repos) // -> se o proximo usuario tem mais repositorio que o atual, sobe ele na lista (vai fazendo assim até o final)
    topFive = topFive.slice(0, 5) // pega somente o top 5 (começa do 0 e vai até o 5 (mas ele é exclusivo entao tecnicamente só pegaria até o index 4))

    let message = `Top 5 usuários salvos com mais repositórios públicos:`
    topFive.forEach((user, index) => { // molda mensagem
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios.`
    })
    console.log(message)
}
const main = async () => { // usada para testar as funções de forma sincrona
    await getUser("kevinterezadev");
    await getUser("Developer-Vini");
    await getUser("NpcTeteu");
    await getUser("Lucas-dev-dot");
    await getUser("lucasoliveiraDEV22");
    await showusers()
    await showReposTotal()
    await showTopFive()
};

main();