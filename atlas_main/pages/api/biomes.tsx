//fetch data from endpoints
import React from 'react'
import { executeQueryJSON } from '@arcgis/core/rest/query'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import config from '@arcgis/core/config'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import { watch } from '@arcgis/core/core/reactiveUtils'
import Expand from '@arcgis/core/widgets/Expand'

const BIOMES_LAYER = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/0"
const BIOMES_SERVICE = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer"
const BASE_MAP =  "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/0"
const BASE_SERVICE =  "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer"

const fetch_feature_server = async () => {
    const layer = new FeatureLayer({
        // Notice that the url doesn't end with /2
        url: BIOMES_LAYER

      });
    let query = layer.createQuery();
    query.where = "1=1";
    //query.outFields = ["BIOME_DESC"];

    // const res = await executeQueryJSON(BIOMES_LAYER, query);
    // const value = res.features
    // //console.log("receiving");
    // console.log(res)
      
    //   layer.load().then(function() {
    //     // table is loaded. ready to be queried.
    //   });
    layer.queryFeatures(query).then(function(results){
        // prints the array of result graphics to the console
        console.log(results.features);
      });
    //const res = await executeQueryJSON(BIOMES_LAYER)
    //construct a mapview object and perhaps export it and render it somehow 

    return (
        <>
            <title>Biomes Map</title>

        </>
    )
}

export default fetch_feature_server