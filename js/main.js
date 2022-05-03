//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

let pokeStore = []
let pokeImg = []


function getFetch(){
  const poke1 = document.querySelector('#poke1').value
  const poke2 = document.querySelector('#poke2').value
  const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1
  const url2 = 'https://pokeapi.co/api/v2/pokemon/' + poke2
  
  

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        // pokeStore.push(data.types[0].type.name)
        
        pokeStore.push(data)
        pokeImg.push(data.sprites.other["official-artwork"].front_default)
        
         return fetch(url2)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          
          
          // pokeStore.push(data.types[0].type.name)
          pokeStore.push(data)
          pokeImg.push(data.sprites.other["official-artwork"].front_default)
          
          
            document.querySelector('#pokeImg1').src = pokeImg[0]
            document.querySelector('#pokeImg2').src = pokeImg[1]
        
  
          document.querySelector('.results').textContent = "Choose your winner!"
          document.getElementById('pokeImg1').addEventListener('click',fight)
          document.getElementById('pokeImg2').addEventListener('click',fight)

        })
        .catch(err => {
            console.log(`error ${err}`)
        });


      })
      .catch(err => {
          console.log(`error ${err}`)
      });     
}

function fight(e) {
  // let pokemon1 = pokeStore[0].types[0].type.name
  // let pokemon2 = pokeStore[1].types[0].type.name
  let yourGuess = e.target
  let g = yourGuess['id'].toString()
  let guess = g[g.length - 1]
  let winner
  let resultString
  console.log(pokeStore)
  let w1 = pokeStore[0].weight
  let w2 = pokeStore[1].weight
  let h1 = pokeStore[0].height
  let h2 = pokeStore[1].height
  let bmi1 = (w1 / (h1**2)).toFixed(1)
  let bmi2 = (w2 / (h2**2)).toFixed(1)
  // console.log(pokemon1 + " bmi is " + bmi1)
  // console.log(pokemon2 + " bmi is " + bmi2)
  if (bmi1 > bmi2) {
    winner = "1"
    resultString = `With a BMI of ${bmi1}, this ${pokeStore[0].species.name} is the winner!`
    document.getElementById('pokeImg2').classList.add('hidden')
  }
  else {
    winner = "2"
    resultString = `With a BMI of ${bmi2}, this ${pokeStore[1].species.name} is the winner!`
    document.getElementById('pokeImg1').classList.add('hidden')
  }
  if (guess == winner) {
    console.log('you chose... wisely')
  }
  else {
    console.log('Sorry')
  }
  document.querySelector('.results').textContent = "The results are in!"
  let mom = document.querySelector('.results')
  let child = document.createElement('h3')
  child.textContent = resultString
  mom.appendChild(child)
}