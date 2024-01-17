//1-add rainfall and temperature featurelayer. 
//2 - perhaps change feature colors
//3 - more webscraped data
"use client"
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import 'app/globals.css'
import calltoapi from '../pages/api/apiCall';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'

import Expand from '@arcgis/core/widgets/Expand'

import Map from "@arcgis/core/Map.js";

import Legend from "@arcgis/core/widgets/Legend.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

import Compass from "@arcgis/core/widgets/Compass.js";

import LayerList from "@arcgis/core/widgets/LayerList.js";

import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";

import styles from './mapdiv.module.css'
import content_switch from './content_switch'

import styles_dropdown from './input_dropdown.module.css'

import axios from 'axios';
const BIOMES_LAYER = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/0"
const BIOMES_SERVICE = "https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer"
const BASE_MAP =  "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/0"
const KOPPEN_LAYER = "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/other_climate_2007_koppen_geiger/FeatureServer/0"

  const MapComponent = () => {


    const mapref = useRef<HTMLInputElement>(null);
    const loadMap = () => {
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
        container: styles.mapview,
        zoom: 3,

    });
    let layerlist = new LayerList({
        view: view
        
      });



    view.constraints = {
        minZoom: 2,
        maxZoom: 6
    };
    




    
    let biomes_renderer_updated : __esri.UniqueValueRenderer = require('./uniquevalueinforenderer.json');
    let all_fields = require("./fields.json");


    //1- change colors to be color coordinating by class
    var climate_mapping: { [climate: string] : string; } = {
        "ET Polar-Tundra" : "test_string"

    }; 




    //console.log(climate_mapping["ET Polar-Tundra"]);
    var custom_content =new CustomContent({
        outFields: ["*"],
        creator: (event) => {
            let biome_name =  event?.graphic.attributes.climate;
            
    

            return content_switch(biome_name);
        }
        
      });


    var popup_biomes = new PopupTemplate({
        title : "{climate}",
        content: [custom_content]
    });





    const biomeslayer = new FeatureLayer({
        url: KOPPEN_LAYER,
        //id : "df762d5b783a4cbea211227b173bd7b3",
        title : "Köppen–Geiger climate Groups",
        //geometryType : "polygon",
        fields: all_fields,
        renderer : biomes_renderer_updated,
        opacity: 0.75,
        popupEnabled : true,
        popupTemplate : popup_biomes,
        
        //blendMode: 'vivid-light'
    });
    
    //console.log(biomeslayer.fields);
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
    // var btn_foc = document.createElement('button');
    // const text = document.createTextNode("Search by Coordinates");
    // btn_foc.style.background = "white";
    // add the text node to the newly created div
    // btn_foc.appendChild(text);

    // const button_foc_ref = document.querySelector("btn_foc");

    // document.body.insertBefore(btn_foc, button_foc_ref);
    console.log(styles_dropdown.inputdropdown);
    const Inputdropdown = document.getElementById("input-wrap")!;
    const expand = new Expand({
        content: Inputdropdown,
        expanded: false
    })
    view.ui.add(expand, "top-right")
    // view.when(() => {
    //     view.ui.add(expand, "top-right")
    // })
    //console.log("all groups ",all_groups);

    //console.log("exists");

    // if (btn_foc != null){
    //     view.ui.add(btn_foc, "top-right");
    //     //console.log("exists1");
    //     btn_foc.addEventListener("click", async (evt) => {
    //         console.log("clicked");
    //         //handleClick();
    //         view.ui.add(expand, "top-right")

    //     });
    
    // }

    view.when(() => {
        view.ui.add(expand, "top-right")
      })

    }


    useEffect(() => {
        
        if (mapref.current){
            loadMap();
        }

        
    }, [mapref]);
//Inputdropdown

    function sendQuery() {
      

    }

    const[inputValx, setInputValx] = useState("");
    const[inputValy, setInputValy] = useState("");
    const[display, setDisplay] = useState("");
    function handleInputChangex(e: React.FormEvent<HTMLInputElement>){
        let inputvalue = e.currentTarget.value;
        setInputValx(inputvalue);
        setDisplay("")
        
    }
    function handleInputChangey(e: React.FormEvent<HTMLInputElement>){
        let inputvalue = e.currentTarget.value;
        setInputValy(inputvalue);
        console.log(inputvalue);
        setDisplay("")
        
    }

    const  handleSubmit =  async (event : React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        // console.log(inputValx.trim());
        // console.log(inputValy.trim());
        var display_val = await calltoapi(inputValx,inputValy)
        setDisplay(display_val)
        }
      
    

    return  (
    
        <>
            <div ref = {mapref} id={styles.mapview}></div>
            <div id="input-wrap" onSubmit={handleSubmit}>
                <form id={styles_dropdown.inputdropdown}>
                    <p>Find Biome by Coordinates</p>
                    <label>Latitude</label>
                    <input type="text" name= "Latitude"  onChange={handleInputChangey}/>
                    <label>Longitude</label>
                    <input type="text" name= "Longitude" onChange={handleInputChangex}/>
                    <button> Search </button>
                    <br></br>
                    {
                        display? display : null
                    }
                </form>

            </div>

        </>
    )

}



export default MapComponent;