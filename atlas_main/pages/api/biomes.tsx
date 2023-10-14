//fetch data from endpoints
import React, { useRef } from 'react'
import { useEffect } from 'react';
import 'app/globals.css'
import { executeQueryJSON } from '@arcgis/core/rest/query'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import config from '@arcgis/core/config'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import { watch } from '@arcgis/core/core/reactiveUtils'
import Expand from '@arcgis/core/widgets/Expand'
import LayerView from "@arcgis/core/views/layers/LayerView.js";
import Map from "@arcgis/core/Map.js";
import { Main } from 'next/document';
import { loadModules } from "esri-loader";
const BIOMES_LAYER = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/0"
const BIOMES_SERVICE = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer"
const BASE_MAP =  "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/0"

 const MapComponent = () => {
   
    const loadMap = () => {
        console.log("not null")
        const map = new Map({
            basemap: "terrain"
        });

        const view = new MapView({
            map: map,
            container: 'mapview',
            center: [137.8239,36.2068],
            zoom: 5,
        });

    }

    useEffect(() => {
        loadMap();

    }, []);
  
    return  <div style={{ height : 1500, width: 1500 }} id='mapview'></div>

}

// const fetch_feature_server = async () => {
//     const layer = new FeatureLayer({
//         // Notice that the url doesn't end with /2
//         url : BIOMES_SERVICE

//       });

//     const myMap = new Map({
//         basemap: "terrain"
//     });

//     const myMapView = new MapView({
//         container: "viewDiv",
//         map : myMap,
       
//     });


//     let query = layer.createQuery();
//     query.where = "1=1";
 
//     // layer.queryFeatures(query).then(function(results){
//     //     // prints the array of result graphics to the console
//     //     console.log(results.features);
//     //   });
//     //const res = await executeQueryJSON(BIOMES_LAYER)
//     //construct a mapview object and perhaps export it and render it somehow 

//     return (
//         <main>
           

//         </main>
//     )
// }

export default MapComponent;