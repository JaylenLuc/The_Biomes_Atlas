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
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import * as widget from "@arcgis/core/widgets/support/widget.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";


const BIOMES_LAYER = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/0"
const BIOMES_SERVICE = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer"
const BASE_MAP =  "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/0"
 const MapComponent = () => {
    
    const loadMap = () => {
        console.log("not null")
        const map = new Map({
            basemap: "topo-vector"
        });

        const view = new MapView({
            map: map,
            container: 'mapview',
            center: [137.8239,36.2068],
            zoom: 4,
        });

        const biomeslayer = new FeatureLayer({
            url: BIOMES_LAYER
        });

        view.constraints = {
            minZoom: 2,
            maxZoom: 6
        };

        map.add(biomeslayer);

        const legend = new Legend({
            view: view
            
          });
        const scaleBar = new ScaleBar({
            view: view,
            unit : "dual"
          });
          // Add widget to the bottom left corner of the view
        view.ui.add(scaleBar, {
            position: "bottom-left"
          });
        view.ui.add(legend, "bottom-right");
        
        // legend.when(legend.zo(){
        //     // This function will execute once the promise is resolved
        //   }, function(error){
        //     // This function will execute if the promise is rejected due to an error
        //   });
        
        
    }

    useEffect(() => {
        loadMap();


    }, []);
  
    return  (
        <body>
            
            <div id='mapview'></div>
        </body>
    )

}



export default MapComponent;