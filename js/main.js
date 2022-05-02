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
        
        pokeStore.push(data.types[0].type.name)
        pokeImg.push(data.sprites.other["official-artwork"].front_default)
        
         return fetch(url2)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          
          
          pokeStore.push(data.types[0].type.name)
          pokeImg.push(data.sprites.other["official-artwork"].front_default)
          
          if((pokeStore[0] === "grass" && pokeStore[1] === 'water')){
            document.querySelector('#pokeImg1').src = pokeImg[0]
            document.querySelector('#pokeImg2').src = pokeImg[1]
            document.querySelector('h2').innerText = " 2x > "
          }
          else {
            document.querySelector('#pokeImg1').src = pokeImg[0]
            document.querySelector('#pokeImg2').src = pokeImg[1]
        
          }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });


      })
      .catch(err => {
          console.log(`error ${err}`)
      });



      
}