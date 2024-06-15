const class__HYP = [
    {classroom: "", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "1A3", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "1A2", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "2A4", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 

    {classroom: "1A2", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]},
    {classroom: "1A4", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: " P1", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "2A3", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 

    {classroom: "", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]},
    {classroom: "1A5", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: " P2", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "2A1", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
]
const class__RLHC = [
    {classroom: "3A7", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A8", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A2", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "1A1", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A5", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A6", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "2A5", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A1", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A3", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}, 
    {classroom: "3A4", prefect: ["Frankie Wong Yun Kai (3A1)", "Prefect #2 (3A1)", "Prefect #3 (2A1)"]}
].reverse()

const container__class__HYP = document.querySelectorAll('#HYP > g > text > tspan')
const container__class__RLHC = document.querySelectorAll('#RLHC > g > text > tspan')


for (let i = 0; i < class__HYP.length; i++) {
    let { classroom, prefect } = class__HYP[i]
    container__class__HYP[i].innerHTML = classroom
    container__class__HYP[i].setAttribute('data-class', classroom || "NAN")
    container__class__HYP[i].setAttribute('data-prefect', prefect)
}

for (let i = 0; i < class__RLHC.length; i++) {
    let { classroom, prefect } = class__RLHC[i]
    container__class__RLHC[i].innerHTML = classroom
    container__class__RLHC[i].setAttribute('data-class', classroom || "NAN")
    container__class__RLHC[i].setAttribute('data-prefect', prefect)
}

const container__class__general = document.querySelectorAll('#HYP > g, #RLHC > g')
const class__tooltip = document.querySelector('.tooltip')
container__class__general.forEach(c => {
    c.addEventListener('mousemove', e => {
        class__tooltip.style.display = 'block'
        class__tooltip.style.left = `${e.offsetX+5}px`
        class__tooltip.style.top = `${e.offsetY+5}px`
        let currentClass = c.children[1].children[0].getAttribute('data-class')
        let currentPrefect = c.children[1].children[0].getAttribute('data-prefect').replaceAll(',', '<br>')
        class__tooltip.innerHTML = `
        <h2>${currentClass}</h2>
        <h4>${currentPrefect}</h4>
        `
    })

    c.addEventListener('mouseleave', e => {
        class__tooltip.style.display = 'none'
    })
})