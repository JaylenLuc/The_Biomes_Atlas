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
            basemap: "topo-vector"
        });

        const view = new MapView({
            map: map,
            container: 'mapview',
            center: [137.8239,36.2068],
            zoom: 4,
        });

        const biomeslayer = new FeatureLayer({
            url: KOPPEN_LAYER,
            title : "Köppen–Geiger climate Groups",
            objectIdField: "climate",
            geometryType : "polygon",
            outFields: ["climate"],
            //renderer: break_renderer

            //blendMode: 'vivid-light'
        });
        //console.log("biomeslayer.renderer: ",biomeslayer.fields);


        view.constraints = {
            minZoom: 2,
            maxZoom: 6
        };
        
        const query = {
            outFields : ["climate"],
            returnDistinctValues : true,
            where : "1=1"
        };
        var climate_color_mapping: { [climate: string] : string; } = {
            "Cfa Temperate-Withouth_dry_season-Hot_Summer" : "rgba(0, 255, 0, 0.5)",
            "ET Polar-Tundra" : "rgba(115, 155, 208, .5)",
            "Cfb Temperate-Withouth_dry_season-Warm_Summer" : "rgba(193, 225, 193,0.5)",
            "Dfc Cold-Withouth_dry_season-Cold_Summer" : "rgba(194, 215, 242,0.5)",
            //"Dwb Cold-Dry_Winter-Warm_Summer" : 



        }; //rgb(195, 177, 225)
        
        const colored_features = executeQueryJSON(KOPPEN_LAYER, query ).then( feature =>{
            const all_features = feature.features;
            for (let i = 0; i < all_features.length; i++){
                var current_f = all_features[i];
                //console.log(current_f);
                if (current_f.attributes.climate in climate_color_mapping){
                    var color = new Color(climate_color_mapping[current_f.attributes.climate])
                    current_f.symbol = new Symbol({
                        color: color,
                    
                      });
                }
                    console.log(current_f.symbol);
                    //current_f.symbol.color = color;
            }
        });

        // biomeslayer.renderer = {
        //     type: 'simple',
        //     symbol: {
        //        type: 'simple-fill',
        //        color: [195, 177,225, .7]
        //     }
        // };
        map.add(biomeslayer);

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
        view.ui.add(legend, "bottom-right");
        //console.log(biomeslayer);
        const comp = new Compass({
            view: view

        }); 
        view.ui.add(comp, "top-right");




        view.map.layers.forEach((biomeslayer) => {
            //console.log("layer info: ", biomeslayer);
            

            //console.log(biomeslayer);
            //if (layer.title)

        });
        // let btn_foc =  useRef<HTMLInputElement>(null);
        var btn_foc = document.createElement('button');
        const text = document.createTextNode("Focus Modality");

        // add the text node to the newly created div
        btn_foc.appendChild(text);

        const currentDiv = document.getElementById("btn_foc");

        document.body.insertBefore(btn_foc, currentDiv);

        //console.log("all groups ",all_groups);

        let seen : string[] = [];

        if (btn_foc != null){
            view.ui.add(btn_foc, "top-right");

            btn_foc.addEventListener("click", async () => {
                let biomes_query = biomeslayer.createQuery();
                biomes_query.where = "1=1";
                //biomes_query.outFields = ["climate"],
                biomes_query.returnDistinctValues = true;
                const {features} = await biomeslayer.queryFeatures(biomes_query);
                
                console.log(features.forEach((entry) => {
                    const current = entry.attributes['climate'];
                    if (! seen.includes(current) ){
                        seen.push(current);

                    }
                }));
                console.log("all climates: ", seen);
                console.log(climate_color_mapping[ "Cfa Temperate-Withouth_dry_season-Hot_Summer"]);
            });
        
        }

        biomeslayer.on("layerview-create", function(event){
            console.log("renderer", biomeslayer.renderer);
          });
        // view.when(async () => { //view is rendered
        //    // console.log("renderer", biomeslayer.renderer);
        //     let biomes_query = biomeslayer.createQuery();
        //     biomes_query.where = "1=1";
        //     //outFields : ["climate"],
        //     //returnDistinctValues : true,
        //     const {features} = await biomeslayer.queryFeatures(biomes_query);
        //     console.log(features);

        
    }, []);

    return  (
        <body>
            
            <div id='mapview'>
                
            </div>
        </body>
    )

}



export default MapComponent;