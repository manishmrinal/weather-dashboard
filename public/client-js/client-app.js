console.log('client side js is up')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne= document.querySelector('#msg1')
const msgTwo= document.querySelector('#msg2')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    

    msgOne.textContent= 'Loading.....'
   

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{

    response.json().then((data)=>{

        if(data.error){
            console.log(data.error)
            msgOne.textContent= data.error
        }
        else{
            msgOne.textContent=data.location
            msgTwo.textContent=data.forecast.current
            console.log(data.location)
            console.log(data.forecast.current)
        }
       // console.log(data)
    })

})



})