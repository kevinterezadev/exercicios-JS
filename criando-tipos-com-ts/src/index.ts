type Planet = {
    name:string,
    coordinates: [number, number, number, number],
    status: Status,
    satellite: string[]
}

enum Status  {
    "Habitado" = 1,
    "Habitável" = 2,
    "Inabitável" = 3,
    "Inexplorado" = 4
}

const planets:Planet[] = []
let currentPlanet:Planet | undefined

const addPlanet = (name:string, cooA:number, cooB:number, cooC:number, cooD:number, status:number) => {
    const planet:Planet = {
        name,
        status:status as Status,
        coordinates: [cooA, cooB, cooC, cooD],
        satellite: []
    }
    planets.push(planet)
    alert(`✅ O Planeta "${planet.name}" foi salvo com sucesso.`)
    console.log(planets)
    return planet
}

const updatePlanetStatus = (planet:Planet, newStatus:number) => {
    if (planet.status !== newStatus) {
        planet.status = newStatus as Status
        alert(`✅ A situação do Planeta "${planet.name}" foi atualizado para "${Status[planet.status]}" com sucesso.`)
    } else {
        alert(`⚠️ O Planeta "${planet.name}" já está nessa situação.`)
    }
}

const addSatellite = (planet:Planet, satelliteName:string) => {
    if (satelliteName.trim() !== "s/n") {
        planet.satellite.push(satelliteName)
        alert(`✅ O satélite "${satelliteName}" foi adicionado ao Planeta "${planet.name}" com sucesso.`)
    } else {
        alert(`⚠️ O satélite precisa ter um nome para ser adicionado.`)
    }
}

const removeSatellite = (planet:Planet, satelliteName:string) => {
    if (satelliteName.trim() !== "s/n") {
        const index = planet.satellite.indexOf(satelliteName)
        if (index >= 0) {
            planet.satellite.splice(index, 1)
            alert(`✅ O satélite "${satelliteName}" foi removido do Planeta "${planet.name}" com sucesso.`)
        } else {
            alert(`❌ O satélite não foi encontrado.`)
        }
    } else {
        alert(`⚠️ O satélite precisa ter um nome para ser encontrado.`)
    }
}

const listSavedPlanets = () => {
    let planetsList = ``
    planets.forEach(p => {
        planetsList += `\n🌍 Planeta: ${p.name}\n📍 Coordenadas: [${p.coordinates.join(", ")}]\n⚡ Situação: ${Status[p.status]}\n🛰️ Satélites: ${p.satellite.length ? p.satellite.join(", ") : "Nenhum"}\n------------------`
    })
    alert("🌌 Lista de Planetas salvos:" + planetsList)
}

let userOption:number

do {
    userOption = Number(prompt(`🪐 Menu de Planetas\nEscolha uma das opções para continuar:\n1️⃣ - Salvar um novo Planeta\n2️⃣ - Atualizar situação do Planeta\n3️⃣ - Adicionar satélite ao Planeta\n4️⃣ - Remover satélite do Planeta\n5️⃣ - Listar Planetas salvos\n6️⃣ - Sair do menu`))
    switch (userOption) {
        case 1: {
            alert("🌏 Você escolheu salvar um novo Planeta.")
            const planetName:string = prompt("Informe o nome do Planeta:") ?? "Planeta sem nome"
            const planetCoordinateA:number = Number(prompt("Informe a coordenada A:")) || 0
            const planetCoordinateB:number = Number(prompt("Informe a coordenada B:")) || 0
            const planetCoordinateC:number = Number(prompt("Informe a coordenada C:")) || 0
            const planetCoordinateD:number = Number(prompt("Informe a coordenada D:")) || 0
            const planetSituation:number = Number(prompt("Informe a situação do Planeta:\n1 - Habitado\n2 - Habitável\n3 - Inabitável\n4 - Inexplorado")) || 4
            currentPlanet = addPlanet(planetName, planetCoordinateA, planetCoordinateB, planetCoordinateC, planetCoordinateD, planetSituation)
            break
        }
        case 2: {
            if (currentPlanet) {
                alert("🔄️ Você escolheu atualizar a situação do Planeta.")
                const planetSituation:number = Number(prompt("Informe a situação do Planeta:\n1 - Habitado\n2 - Habitável\n3 - Inabitável\n4 - Inexplorado")) || 4
                updatePlanetStatus(currentPlanet, planetSituation)
                break
            } else {
                alert("⚠️ Nenhum Planeta criado ainda! Primeiro salve um Planeta")
                break
            }
        }
        case 3: {
            if (currentPlanet) {
                alert("🛰️ Você escolheu adicionar um satélite ao Planeta.")
                const planetName:string = prompt("Informe o nome do satélite:") ?? "s/n"
                addSatellite(currentPlanet, planetName)
                break
            } else {
                alert("⚠️ Nenhum Planeta criado ainda! Primeiro salve um Planeta")
                break
            }
        }
        case 4: {
            if (currentPlanet) {
                alert("📡 Você escolheu remover um satélite do Planeta.")
                const satelliteName:string = prompt("Informe o nome do satélite:") ?? "s/n"
                removeSatellite(currentPlanet, satelliteName)
                break
            } else {
                alert("⚠️ Nenhum Planeta criado ainda! Primeiro salve um Planeta")
                break
            }
        }
        case 5: {
            alert("🌌 Você escolheu listar os Planetas salvos.")
            listSavedPlanets()
            break
        }
        case 6:
            alert("👋 Você escolheu sair.")
            alert("🚪 Saindo...")
            break;
        default:
            alert("⚠️ Número inválido! informe um número entre 1 e 6.")
            break;
    }
} while (userOption !== 6);