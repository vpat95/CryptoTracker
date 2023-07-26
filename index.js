// fetch data from api

function fetchCoins(){
    fetch (`https://api.coincap.io/v2/assets?limit=5`)
    .then ((res) => res.json())
    .then (coinData => coinData.data.forEach((coin) => fillTable(coin)))
}

fetchCoins()

function fetchIndCoins(coin){
    fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then((res) => res.json())
    .then (coinData => createSummary(coinData.data))
}

//event listner for submit
document.querySelector('.search').addEventListener('submit', e =>{
    e.preventDefault()
    fetchIndCoins((e.target.text.value).toLowerCase())
})

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
    //remove previous summary if exists
    if(document.querySelector(`#summary`).children.length > 0){
        document.querySelector('article').remove()
    }
    //creating summary html elements
    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    h2.innerText = `${data.name} Summary`
    article.appendChild(h2)
    const pSymbol = document.createElement('p')
    pSymbol.innerText = `Symbol: ${data.symbol}`
    const pPrice = document.createElement('p')
    pPrice.innerText = `Price: ${Number((Math.round(data.priceUsd*100)/100).toFixed(2)).toLocaleString('en-US', {style:'currency', currency:'USD'})}`
    const pChange = document.createElement('p')
    pChange.innerText = `Change (24 hours): ${(Math.round(data.changePercent24Hr*100)/100)}`
    const pVolume = document.createElement('p')
    pVolume.innerText = `Volume (24 hours): ${(Math.round(data.volumeUsd24Hr*100)/100).toLocaleString('en-US', {style:'currency', currency:'USD'})}`
    const pSupply = document.createElement('p')
    pSupply.innerText = `Supply: ${(Math.round(data.supply*100)/100).toLocaleString('en-US')} ${data.symbol}`
    const pMaxSupply = document.createElement('p')
    pMaxSupply.innerText = `Max Supply: ${(Math.round(data.maxSupply*100)/100).toLocaleString('en-US')} ${data.symbol}`
    const pMarketCap = document.createElement('p')
    pMarketCap.innerText = `Market Cap: ${Number((Math.round(data.marketCapUsd*100)/100).toFixed(2)).toLocaleString('en-US', {style:'currency', currency:'USD'})}`

    //appending html elements
    article.appendChild(pSymbol)    
    article.appendChild(pPrice)    
    article.appendChild(pChange) 
    article.appendChild(pSupply)
    article.appendChild(pMaxSupply)
    article.appendChild(pVolume)
    article.appendChild(pMarketCap)

    document.querySelector('#summary').appendChild(article)   
}

fetchIndCoins
// class CoinObj{
//     constructor(data){
//         this.data.id = data.id
//         this.data.name = data.name
//         this.data.priceUsd = data.priceUsd
//         this.data.changePercent24Hr = data.changePercent24Hr
//     }
// }


// Create table 