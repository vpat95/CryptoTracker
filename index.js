// fetch data from api

function fetchCoins(){
    fetch (`https://api.coincap.io/v2/assets?limit=5`)
    .then ((res) => res.json())
    .then (coinData => coinData.data.forEach((coin) => fillTable(coin)))
}

fetchCoins()

//fill table contents

function fillTable(data){
    // create elements and update data/text
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerText = data.name
    const tdSymbol = document.createElement('td')
    tdSymbol.innerText = data.symbol
    const tdPrice = document.createElement('td')
    tdPrice.innerText = `${Number((Math.round(data.priceUsd*100)/100).toFixed(2)).toLocaleString('en-US', {style:'currency', currency:'USD'})}`
    const tdChange = document.createElement('td')
    tdChange.innerText = Math.round(data.changePercent24Hr*100)/100

    //mouseover event listener to highlight
    tr.addEventListener('mouseover', (e) => {
        e.target.parentNode.className = "active-row"
    })
    //mouseout event listener to remove highlight
    tr.addEventListener('mouseout', (e) => {
        e.target.parentNode.className = ""
    })
    //click event to generate summary below table
    tr.addEventListener('click', () => createSummary(data))

    //append all newly created/updated elements
    tr.appendChild(tdName)
    tr.appendChild(tdSymbol)
    tr.appendChild(tdPrice)
    tr.appendChild(tdChange)
    document.querySelector('tbody').appendChild(tr)
}

//create summary
function createSummary(data){
    if(document.querySelector(`#summary`).children.length > 0){
        document.querySelector('article').remove()
    }
    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    h2.innerText = `${data.name} Summary`
    article.appendChild(h2)
    const pSymbol = document.createElement('p')
    pSymbol.innerText = `Symbol: ${data.symbol}`
    const pPrice = document.createElement('p')
    pPrice.innerText = `${Number((Math.round(data.priceUsd*100)/100).toFixed(2)).toLocaleString('en-US', {style:'currency', currency:'USD'})}`
    const pChange = document.createElement('p')
    pChange.innerText = `Percent Change over 24 hours: ${(Math.round(data.changePercent24Hr*100)/100)}`

    article.appendChild(pSymbol)    
    article.appendChild(pPrice)    
    article.appendChild(pChange) 
    document.querySelector('#summary').appendChild(article)   
}
// class CoinObj{
//     constructor(data){
//         this.data.id = data.id
//         this.data.name = data.name
//         this.data.priceUsd = data.priceUsd
//         this.data.changePercent24Hr = data.changePercent24Hr
//     }
// }


// Create table 