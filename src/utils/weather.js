const request = require('request')



//http://api.weatherstack.com/current?access_key=f48e489f55fa865db22d435a13a8e125&query=NewYork'
const weather = (latitude,longitude,callback)=>{

    const weatherUrl ='http://api.weatherstack.com/current?access_key=f48e489f55fa865db22d435a13a8e125&query='+latitude+','+longitude+'&units=m'
    //encodeURIComponent(location)

    request({uri:weatherUrl,json:true},(error,response)=>{

        if(error){
            callback('Unable to connect',undefined)
        }else if(response.current === 0){

            callback( 'Please specify a valid location identifier using the query parameter',undefined )
        }
        else{
            //console.log(response.body.current)
            callback(undefined,{

                    current:response.body.current.temperature,
                    weather:response.body.current.weather_descriptions[0]



            })

        }
    





    })
    


}


module.exports= weather