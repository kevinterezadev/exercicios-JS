const spaceships: { name: string; pilot: string; crewLimit: number; crew: string[]; inMission: boolean }[] = []

const saveSpaceship = ( spaceship: {name:string, pilot:string, crewLimit:number}) => {
    const savedSpaceship = {
        name: spaceship.name,
        pilot: spaceship.pilot,
        crewLimit: spaceship.crewLimit,
        crew: [] as string[],
        inMission: false
    }
    spaceships.push(savedSpaceship)
    alert(`✅ A nave espacial "${savedSpaceship.name}" comandada por "${savedSpaceship.pilot}" foi salva.`)
    return savedSpaceship
}

function addCrewmate(crewmateName:string, spaceship: {name:string, crewLimit:number, crew:string[]}) {
    if (spaceship.crewLimit > spaceship.crew.length) {
        spaceship.crew.push(crewmateName)
        alert(`✅ "${crewmateName}" foi adicionado como tripulante na nave espacial "${spaceship.name}".`)
    } else {
        alert(`❌ A nave espacial "${spaceship.name}" não possui espaço para mais tripulantes.`)
    }
}

function sendToMission(spaceship: {name:string, pilot:string, crewLimit:number, crew:string[], inMission:boolean}) {
    if (spaceship.inMission === false) {
        if (spaceship.crew.length > (Math.floor(spaceship.crewLimit / 3))) {
            spaceship.inMission = true
            alert(`✅ "${spaceship.name}" foi enviada em missão.`)
        } else {
            alert(`❌ A nave espacial "${spaceship.name}" não possui tripulantes suficientes para embarcar em missão.`)
        }
    } else {
        alert(`⚠️ A nave espacial "${spaceship.name}" já está em missão.`)
    }
}

function showSpaceships() {
    let spaceshipsList = ""
    spaceships.forEach((s) => {
        spaceshipsList += `🚀 ${s.name} | 👨‍✈️ ${s.pilot} | 👥 ${s.crew.length}/${s.crewLimit} | 🛰️ ${s.inMission ? "Em missão" : "Parada"}\n`
    })
    alert(spaceshipsList || "Nenhuma nave salva.")
}

let userOption:number
let currentSpaceship: { name: string; pilot: string; crewLimit: number; crew: string[]; inMission: boolean } | undefined
do {
    userOption = Number(prompt(`🚀 Menu de naves espaciais\n\n1 - Salvar nave espacial\n2 - Adicionar tripulante a nave\n3 - Enviar nave em missão\n4 - Mostrar naves salvas\n5 - Sair do menu\n\nEscolha uma opção (1-4):`))

    switch (userOption) {
        case 1: {
            const name:string = prompt("Informe o nome da nave espacial:") ?? "Sem nome."
            const pilot:string = prompt("Informe o piloto da nave espacial:") ?? "Sem piloto."
            const crewLimit:number = Number(prompt("Informe o número máximo de tripulantes da nave espacial:")) ?? 2
            currentSpaceship = saveSpaceship({name, pilot, crewLimit})
            break;
        }
        case 2: {
            if (!currentSpaceship) {
                alert("⚠️ Nenhuma nave criada ainda! Primeiro salve uma nave.")
                break;
            }
            const name:string = prompt(`Informe o nome do tripulante que deseja adicionar nave espacial "${currentSpaceship.name}":`) ?? "Sem nome."
            addCrewmate(name, currentSpaceship)
            break;
        }
        case 3: {
            if (!currentSpaceship) {
                alert("⚠️ Nenhuma nave criada ainda! Primeiro salve uma nave.")
                break;
            }
            sendToMission(currentSpaceship)
            break;
        }
        case 4: {
            showSpaceships()
            break;
        }
        case 5: {
            alert("🚪 Você saiu do menu.")
            break;
        }
        default:
            alert("⚠️ Opção inválida! Por favor, digite um número entre 1 e 4.")
            break
    }
} while (userOption !== 5)
