const request=require('request')


const geocode = (address, callback)=>{

    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFuaXNobXJpbmFsIiwiYSI6ImNram93cTlodDA5ZnAzMG41ODNqcGdvOHcifQ.xV4er7kVlwm_j2zzkYp4qQ'

    request({url:geoUrl,json:true},(error,response)=>{

        if(error){

            callback('Unable to connect',undefined)//no second value having data
        }
        else if(response.body.features.length === 0){

            callback('Unable to find location try different',undefined)

        }
        else{
            console.log('entered and failed', response.body)

            callback(undefined,{
                
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name


            })
            

        }



    })


}

module.exports = geocode