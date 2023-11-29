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
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import Compass from "@arcgis/core/widgets/Compass.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import AttributeColorInfo from "@arcgis/core/renderers/support/AttributeColorInfo.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import Color from "@arcgis/core/Color.js";
import Symbol from "@arcgis/core/symbols/Symbol.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import Graphic from "@arcgis/core/Graphic.js";
import WebMap from "@arcgis/core/WebMap.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";


const BIOMES_LAYER = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/0"
const BIOMES_SERVICE = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer"
const BASE_MAP =  "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/0"
const KOPPEN_LAYER = "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/other_climate_2007_koppen_geiger/FeatureServer/0"

// async function query_res(){
//     const query = {
//         outFields : ["climate"],
//         returnDistinctValues : true,
//         where : "1=1"
//     };
//     let res = await executeQueryJSON(KOPPEN_LAYER, query )
//     //console.log("all features: ",res);

//     return res;

    

// }


// function get_all_biomes (featureset : Promise<__esri.FeatureSet>) {
//     return featureset;


// }



  const MapComponent = () => {

    useEffect(() => {
        //console.log("not null")
        const map = new Map({
            basemap: "topo-vector",
            
        });

        const new_extent = new Extent({
            ymin : -90,
            ymax : 90,
            xmin : -180,
            xmax : 180

        });

        const view = new MapView({
            map: map,
            container: 'mapview',
            zoom: 3,

        });
        let layerlist = new LayerList({
            view: view
            
          });

        //console.log("biomeslayer.renderer: ",biomeslayer.fields);

        view.constraints = {
            minZoom: 2,
            maxZoom: 6
        };
        

        // let graphicslayer = new GraphicsLayer({visible: true});
        // //let new_renderer = new SimpleRenderer();
        // let all_features : __esri.Graphic[] = [];
        // let features_to_del : __esri.Graphic[] = [];
        // let addEdits_remove = {
        //     deleteFeatures: features_to_del
        // }


 
        let biomes_renderer : __esri.UniqueValueRenderer = require('./renderer.json'); 
        let biomes_renderer_updated : __esri.UniqueValueRenderer = require('./uniquevalueinforenderer.json');
        let all_fields = require("./fields.json");
        //console.log(biomes_renderer);
        console.log("RENDERER: ",biomes_renderer_updated);
        const biomeslayer = new FeatureLayer({
            url: KOPPEN_LAYER,
            //id : "df762d5b783a4cbea211227b173bd7b3",
            title : "Köppen–Geiger climate Groups",
            //geometryType : "polygon",
            fields: all_fields,
            renderer : biomes_renderer_updated,
            opacity: 0.75
            //blendMode: 'vivid-light'
        });
        
        console.log(biomeslayer.fields);
        biomeslayer.editingEnabled = true;

       
        map.add(biomeslayer);
        //map.add(graphicslayer);

        //console.log("source: ", biomeslayer.source);

        const legend = new Legend({
            view: view
            //style: 'card'
            });
        const scaleBar = new ScaleBar({
            view: view,
            unit : "dual"
            });
            // Add widget to the bottom left corner of the view
        view.ui.add(scaleBar, {
            position: "bottom-left"
            });
        //console.log(biomeslayer);
        const comp = new Compass({
            view: view

        }); 
        view.ui.add(comp, "top-right");

        let legend_expand = new Expand({
            view: view,
            content: legend,
            expandIcon: "legend",
            group: "bottom-right"
          });
          let layer_expand = new Expand({
            view: view,
            content: layerlist,
            expandIcon: "layer",
            group: "top-left"
          });
          
          view.ui.add(legend_expand, "bottom-right");
          view.ui.add(layer_expand, "top-left");

        // let btn_foc =  useRef<HTMLInputElement>(null);
        var btn_foc = document.createElement('button');
        const text = document.createTextNode("Focus Modality");
        btn_foc.style.background = "white";
        // add the text node to the newly created div
        btn_foc.appendChild(text);

        const currentDiv = document.getElementById("btn_foc");

        document.body.insertBefore(btn_foc, currentDiv);

        //console.log("all groups ",all_groups);


        if (btn_foc != null){
            view.ui.add(btn_foc, "top-right");

            btn_foc.addEventListener("click", async () => {

            });
        
        }

        

        
    }, []);

    return  (
        <body>
            
            <div id='mapview'>
                
            </div>
        </body>
    )

}



export default MapComponent;