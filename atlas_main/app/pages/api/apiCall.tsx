
import axios from 'axios';
const cors = require('cors');

const  calltoapi = async (inputValx : string, inputValy: string ) => {



    if (!(inputValx.trim() === "" || inputValy.trim()  === "")) {
        console.log("Both are not empty");

        
        const options = {
            method: 'GET',
            url: 'https://koppen-climate-classification.p.rapidapi.com/classification',
            params: {
              lat: inputValy.trim(),
              lon: inputValx.trim()
            },
            headers: {
              'X-RapidAPI-Key': 'c9e76fab06msh035665da087710dp11a91djsn5a977ac653eb',
              'X-RapidAPI-Host': 'koppen-climate-classification.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              return response.data.classification
          } catch (error) {
              console.error(error);
              return "No Terrestrial climate classification available"
          }



        //https://climate.mapresso.com/api/koeppen/?lat=lat&lon=lon
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // const res = await axios
        //     .get('https://koppen-climate-classification.p.rapidapi.com/classification/', { 
        //         params: { lat: inputValy.trim(), lon : inputValx.trim() },
        //         headers: {
        //             'X-RapidAPI-Key': 'c9e76fab06msh035665da087710dp11a91djsn5a977ac653eb',
        //             'X-RapidAPI-Host': 'koppen-climate-classification.p.rapidapi.com'
        //           } 
        //     })
            
        // try{
        //     console.log(res.data)
        // }catch(e ){
        //     console.log("Your Coordinates are not valid")
        // }

        
    }
}
export default calltoapi

// export async function GET(request: Request) {
//     return new Response('Hello, Next.js!', {
//       status: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       }
//     });
//   }