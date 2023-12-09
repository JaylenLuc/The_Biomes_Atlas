//fetch data from endpoints
import React, { useRef } from 'react'
import { useEffect } from 'react';
import 'app/globals.css'
// import { executeQueryJSON } from '@arcgis/core/rest/query'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
// import config from '@arcgis/core/config'
// import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
// import { watch } from '@arcgis/core/core/reactiveUtils'
import Expand from '@arcgis/core/widgets/Expand'
// import LayerView from "@arcgis/core/views/layers/LayerView.js";
import Map from "@arcgis/core/Map.js";
// import { Main } from 'next/document';
// import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
// import * as widget from "@arcgis/core/widgets/support/widget.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
//import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import Compass from "@arcgis/core/widgets/Compass.js";
// import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
// import AttributeColorInfo from "@arcgis/core/renderers/support/AttributeColorInfo.js";
// import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
// import Color from "@arcgis/core/Color.js";
// import Symbol from "@arcgis/core/symbols/Symbol.js";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
// import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
// import Graphic from "@arcgis/core/Graphic.js";
// import WebMap from "@arcgis/core/WebMap.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
//import axios from 'axios';
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";
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


 
        //let biomes_renderer : __esri.UniqueValueRenderer = require('./renderer.json'); 
        let biomes_renderer_updated : __esri.UniqueValueRenderer = require('./uniquevalueinforenderer.json');
        let all_fields = require("./fields.json");
        //console.log(biomes_renderer);
        //console.log("RENDERER: ",biomes_renderer_updated);
        

        //check if climate_map json file is empty --> if true --> web scrape --> store into JSON file --> read from it --> parse it onto popup_biomes
        //if not empty --> read fromit --> then parse
        //https://en.wikipedia.org/wiki/K%C3%B6ppen_climate_classification#Group_C:_temperate/mesothermal_climates
        //could also make each group its own class 

        //1- change colors to be color coordinating by class
        var climate_mapping: { [climate: string] : string; } = {
            "ET Polar-Tundra" : "test_string"

        }; 




        //console.log(climate_mapping["ET Polar-Tundra"]);
        var custom_content =new CustomContent({
            outFields: ["*"],
            creator: (event) => {
                let biome_name =  event?.graphic.attributes.climate;
                let ret_str : string = "";
                switch(biome_name) { 
                    case "ET Polar-Tundra": { 
                       ret_str = '<strong><FONT COLOR="#aec6cf">Group E SubGroup ET</FONT></strong>: Polar Climate, Polar Tundra <br> \
                       <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Greenland_scoresby-sydkapp2_hg.jpg/1024px-Greenland_scoresby-sydkapp2_hg.jpg"><br>\
                       <strong>Classification Descriptor</strong>: Group E climates are defined by their warmest months being below 10 °C. There are two kinds of polar climates: Tundras and icecaps.\
                       In her warmest months, the average temperature lies between 0 and 10 °C. \
                       She frequently stratles the northern edges of the North American and Eurasian continents north of 70 °N however they \
                       can be found south depending on local biogeographical proximal climate conditions. She is also found on the Antartic convergence \
                       which is a marine belt encircling Antarctica, varying in latitude seasonally, where cold, northward-flowing Antarctic waters meet the relatively warmer waters of the sub-Antarctic.\
                       ';
                       break; 
                    } 
                    case "Aw Tropical-Savanna" : {
                        ret_str = '<strong><FONT COLOR="#FAA0A0">Group A SubGroup AW</FONT></strong>:  tropical/megathermal Climate, tropical Savanna Climate <br> \
                        <img src = "https://cdn.britannica.com/66/94366-050-472C4EAC/sun-savanna-African-Kenya-country.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group A climates are defined by quotidian high temperatures wherein all 12 months of the year have an \
                        average temperature of 18 °C or higher and usually have high annual precipitation.\
                        AW climates are unique because they have a pronounced dry season with the driest month having less than 2.4 inches of rain and less than 100 subtracted by 4% of the of total annual precipitation \
                        of average monthly precipitation.'
                        break; 

                    }
                    case "Af Tropical-Rainforest": {
                        ret_str = '<strong><FONT COLOR="#FAA0A0">Group A SubGroup Af</FONT></strong>:  tropical/megathermal Climate, tropical Rainforest Climate <br> \
                        <img src= "https://www.rainforest-alliance.org/wp-content/uploads/2019/11/tambopata-rainforest-fullsize.jpg.optimal.jpg">\
                        <strong>Classification Descriptor</strong>: Group A climates are defined by quotidian high temperatures wherein all 12 months of the year have an \
                        average temperature of 18 °C or higher and usually have high annual precipitation.\
                        Af climates have a year round average precipitation of at least 2.4 inches and occur within 10° latitude of the equator. Af climates have essentially no seasons with regards\
                        to thermal and moisture changes. With the changing tides of the Intertropical convergence zone, these climates can be classified as equitorial. In years\
                        where trade winds gain ascendency over most of the climate, it is considered a tropical trade-wind rainforest climate'
                        break; 

                    }
                    case "Am Tropical-Monsoon": {
                        ret_str = '<strong><FONT COLOR="#FAA0A0">Group A SubGroup Am</FONT></strong>:  tropical/megathermal Climate,  tropical monsoon Climate <br> \
                        <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Truong_Tien_bridge_%28I%29.jpg/268px-Truong_Tien_bridge_%28I%29.jpg">\
                        <strong>Classification Descriptor</strong>: Group A climates are defined by quotidian high temperatures wherein all 12 months of the year have an \
                        average temperature of 18 °C or higher and usually have high annual precipitation.\
                        The creation of the Tropical Monsoon climate is a result of monsoon winds whcih change their direction depending on the seasons. In their driest months\
                        they have rainfall less than 2.4 inches but at least 100 subtracted by 4% of the of total annual precipitation of average monthly precipitation.'
                        break; 
                    }
                    case "Cfb Temperate-Withouth_dry_season-Warm_Summer": {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cfb</FONT></strong>:  temperate/mesothermal Climate,  oceanic Climate <br> \
                        <img src = "https://geodiode.com/images/oceanic-hero.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        Cfb climates have significant precipitation in all seasons with the warmest month averaging below 22 °C but at least four months averaging above 10 °C.\
                        These cliamtes usually occur in higher middle latitudes on the western sides of the continents between latitudes of 0° and 60°; they are typically situated immediately poleward of the Mediterranean climates.\
                        These climates are dominated all year round by the polar front, leading to changeable, often overcast weather. Summers are mild due to cool ocean currents. Winters are milder than other climates in similar latitudes, but usually very cloudy, and frequently wet. Cfb climates are also encountered at high elevations in certain subtropical \
                        and tropical areas, where the climate would be that of a subtropical/tropical rainforest if not for the altitude. These climates are called "highlands".'
                        break;
                    }
                    case "EF Polar-Frost": {
                        ret_str = '<strong><FONT COLOR="#aec6cf">Group E SubGroup ET</FONT></strong>: Polar Climate, Polar Ice cap <br> \
                        <img src= "https://www.worldatlas.com/r/w960-q80/upload/fa/ad/37/ice-cap-climate-greenland.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group E climates are defined by their warmest months being below 10 °C. There are two kinds of polar climates: Tundras and icecaps.\
                        In her warmest months, the average temperature lies between 0 and 10 °C. \
                        this climate is dominant in Antarctica, inner Greenland, and summits of many high mountains, even at lower latitudes. Monthly average temperatures never exceed 0 °C. '
                        break;

                    }
                    case "Dfc Cold-Withouth_dry_season-Cold_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dfc</FONT></strong>: continental/microthermal climates, subarctic or boreal climates <br> \
                        <img src = "https://www.switchbacktravel.com/sites/default/files/images/articles/Northern%20Norway.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. These climates climates occur poleward of the other group D climates, or at higher altitudes, generally between the 55° to 65° \
                        North latitudes, occasionally reaching up to the 70°N latitude.'
                        break;

                    }
                    case "Cfa Temperate-Withouth_dry_season-Hot_Summer": {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cfb</FONT></strong>:  temperate/mesothermal Climate,  oceanic Climate <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/%E6%BC%93%E6%B1%9F%E5%B1%B1%E6%B0%B4.jpg/220px-%E6%BC%93%E6%B1%9F%E5%B1%B1%E6%B0%B4.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        Cfa climates have significant precipitation in all seasons and its warmest month average temperature is above 22 °C.\
                        These climates usually occur on the eastern coasts and eastern sides of continents, usually in the high 20s and 30s \
                        latitudes. Unlike the dry summer Mediterranean climates, humid subtropical climates have a warm and wet flow from the \
                        tropics that creates warm and moist conditions in the summer months. As such, summer (not winter as is the case in Mediterranean climates) is often the wettest season.'
                        break;
                    }
                    case "BSh Arid-Steppe-Hot" : {
                        ret_str = '<strong><FONT COLOR="#FAC898">Group B SubGroup Bsh</FONT></strong>:  arid (desert and semi-arid) Climate,  Hot semi-arid climate <br> \
                        <img src = "https://www.nps.gov/subjects/geology/images/arid_Mojave-NP_Wild-Horse-Mesa-2013-09-04-NPS-Photo-by-Dale-Pate.jpg?maxwidth=1300&autorotate=false"><br>\
                        <strong>Classification Descriptor</strong>:These climates are characterized by the amount of annual precipitation less than a threshold value that approximates the potential \
                        evapotranspiration. For BSh climates, they are low altitude climates with the average annual temperature is over 18°C and Potential evapotranspiration is greater than precipitation,\
                         but the difference is less than in a BWh climate. BSh climates have an annual precipitation in the range of 50%–100% of the threshold of potential evapostranspiration.'
                        break;
                    }
                    case "Dfb Cold-Withouth_dry_season-Warm_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dfb</FONT></strong>: continental/microthermal climates, warm summer continental or hemiboreal climates <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Vermont_fall_foliage_hogback_mountain.JPG/220px-Vermont_fall_foliage_hogback_mountain.JPG">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations.Dfb climates are immediately poleward of hot summer continental climates, generally in the high 40s and low 50s latitudes in North America and Asia, \
                        and also extending to higher latitudes in central and eastern Europe and \
                        Russia, between the maritime temperate and continental subarctic climates, where it extends up to 65 degrees latitude in places.'
                        break;
                    }
                    case "BSk Arid-Steppe-Cold": {
                        ret_str = '<strong><FONT COLOR="#FAC898">Group B SubGroup Bsk</FONT></strong>:  arid (desert and semi-arid) Climate,  Cold semi-arid <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/9/99/Tree_on_a_mountain_-_from_monastry_of_Semen_Stolbnik_near_Aleppo_-_Syria.jpg"><br>\
                        <strong>Classification Descriptor</strong>:These climates are characterized by the amount of annual precipitation less than a threshold value that approximates the potential \
                        evapotranspiration. Bsk are middle-latitude climate with the average annual temperature below 18 °C with annual precipitation that is in the range of 50%–100% of the threshold\
                        of potential evapotransipiration.'
                        break;
                    }
                    case "Csa Temperate-Dry_Summer-Hot_Summer": {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Csa</FONT></strong>:  temperate/mesothermal Climate,  mediterranean hot summer climates <br> \
                        <img src = "https://www.mindat.org/imagecache/8c/fe/08923250014951324868499.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        Csa climates have at least three times as much rain in the wettest month of winter as in the driest month of summer and has a warmest month average temperature above 22 °C.\
                        These climates usually occur on the western sides of continents between the latitudes of 30° and 45°.These climates are in the polar front region in winter, and thus have moderate temperatures and changeable, rainy weather. Summers are hot and dry, due to the domination of the subtropical high-pressure systems,\
                         except in the immediate coastal areas, where summers are milder due to the nearby presence of cold ocean currents that may bring fog but prevent rain.'
                        break;
                    }
                    case "BWh Arid-Desert-Hot": {
                        ret_str = '<strong><FONT COLOR="#FAC898">Group B SubGroup BWh</FONT></strong>:  arid (desert and semi-arid) Climate,   Hot desert <br> \
                        <img src = "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MA_00682842_kqmllh.jpg"><br>\
                        <strong>Classification Descriptor</strong>:These climates are characterized by the amount of annual precipitation less than a threshold value that approximates the potential \
                        evapotranspiration.BWh has an annual precipitation is less than 50% of the potential evapotranspiration threshold and is a low-latitude climate with the average\
                        annual temperature above 18 °C. They are typically found under the subtropical ridge in the lower middle latitudes or the subtropics, \
                        often between 20° and 33° north and south latitudes '
                        break;
                    }
                    case "Dfa Cold-Withouth_dry_season-Hot_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dfa</FONT></strong>: continental/microthermal climates, hot summer continental climates <br> \
                        <img src = "https://encyclopedia.pub/media/common/202209/mceclip0-63354b2f69df1.png">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously).Dfa climates usually occur in the high 30s and low 40s latitudes, with a qualifying average temperature in the warmest month of \
                        greater than 22 °C. In Europe, these climates tend to be much drier than in North America. Dsa exists at higher elevations adjacent to areas with hot\
                        summer Mediterranean (Csa) climates. These climates exist only in the northern hemisphere because the southern \
                        hemisphere has no large landmasses isolated from the moderating effects of the sea within the middle latitudes.'
                        break;
                    }
                    case "Csb Temperate-Dry_Summer-Warm_Summer": {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Csb</FONT></strong>:  temperate/mesothermal Climate,  mediterranean warm/cool summer climates <br> \
                        <img src = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/1a/fd/cb/out-and-about-at-silvermine.jpg?w=500&h=-1&s=1"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        Csb has at least three times as much rain in the wettest month of winter as in the driest month of summer and the warmest month averaging below 22 °C but with at least four months averaging above 10 °C\
                        '
                        break;
                    }

                    case "BWk Arid-Desert-Cold": {
                        ret_str = '<strong><FONT COLOR="#FAC898">Group B SubGroup BWk</FONT></strong>:  arid (desert and semi-arid) Climate,  Cold desert <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Leh_02.jpg"><br>\
                        <strong>Classification Descriptor</strong>:These climates are characterized by the amount of annual precipitation less than a threshold value that approximates the potential \
                        evapotranspiration. BWk has an annual precipitation is less than 50% of the potential evapotranspiration threshold and is a middle-latitude climate with the average annual temperature below 18 °C.'
                        break;
                    }
                    case "Cwa Temperate-Dry_Winter-Hot_Summer": {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cwa</FONT></strong>:  temperate/mesothermal Climate, dry-winter humid subtropical climate <br> \
                        <img src = "https://cdn.kimkim.com/files/a/content_articles/featured_photos/6f47d2330ea3d0fa427db3592b884f6ed1978325/big-79f5e2a79200eacdfef6024f7b2cd5c5.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        It has dry winters (driest winter month average precipitation less than one-tenth wettest summer month average precipitation) with the warmest month average temperature above 22 °C.\
                        Cwa is monsoonal influenced, having the classic dry winter–wet summer pattern associated with tropical monsoonal climates. They are found at similar latitudes as the Cfa climates, \
                        except in regions where monsoons are more prevalent. These regions are in the Southern Cone of South America, the Gangetic Plain of South Asia, southeastern Africa, and parts of East Asia and Mexico.'
                        break;
                    }
                    case "Cfc Temperate-Withouth_dry_season-Cold_Summer" : {
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cfc</FONT></strong>:  temperate/mesothermal Climate, subpolar oceanic climate <br> \
                        <img src = "https://cdn.britannica.com/30/156730-050-4FC76E04/Auckland-Island-view-Carnley-Harbour-New-Zealand.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        Cfc climates have significant precipitation in all seasons with one to three months averaging above 10 °C.Subpolar oceanic climates (Cfc) occur poleward of or at higher elevations than the maritime temperate climates and are mostly confined either to narrow coastal strips on the western poleward margins of the continents, \
                        or, especially in the Northern Hemisphere, to islands off such coasts. They occur in both hemispheres, most often at latitudes from 60° north and south to 70° north and south.'

                        break;
                    }
                    case "Dsb Cold-Dry_Summer-Warm_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dsb</FONT></strong>: continental/microthermal climates,  warm summer continental or hemiboreal climates <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Drass_and_Tololing_Range.jpg/250px-Drass_and_Tololing_Range.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). Dfb climates are immediately poleward of hot summer continental climates, generally in the high 40s and low 50s latitudes in North America and Asia, and also extending to \
                        higher latitudes in central and eastern Europe and Russia, between the maritime temperate and continental subarctic climates, where it extends up to 65 degrees latitude in places. All months average \
                        temperatures below 22 °C and at least four months averaging above 10 °C. Dsb arises from the same scenario as Dsa, but at even higher altitudes or latitudes, and chiefly \
                        in North America, since the Mediterranean climates extend further poleward than in Eurasia. '
                        break;
                    }

                    case "Dwb Cold-Dry_Winter-Warm_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dwb</FONT></strong>: continental/microthermal climates,  warm summer continental or hemiboreal climates <br> \
                        <img src = "https://cdn.mongolia-guide.com/generated/sum/KhfZRhd5wTnrd1X1X1RgJtFf0zdM62mCDR5064fL_1920_1000.jpeg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). Dfb climates are immediately poleward of hot summer continental climates, generally in the high 40s and low 50s latitudes in North America and Asia, and also extending to \
                        higher latitudes in central and eastern Europe and Russia, between the maritime temperate and continental subarctic climates, where it extends up to 65 degrees latitude in places. All months average \
                        temperatures below 22 °C and at least four months averaging above 10 °C. Dwb climates mostly only occur in the northern hemisphere. '
                        break;
                    }
                    case "Dsa Cold-Dry_Summer-Hot_Summer": {
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dsa</FONT></strong>: continental/microthermal climates, hot summer continental climates<br> \
                        <img src = "https://practicalwanderlust.com/wp-content/uploads/2020/08/Salt-Lake-City-Hiking.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. Dsa exists only at higher elevations adjacent to areas with hot summer Mediterranean (Csa) climates. '
                        break;
                    }
                    case "Dwa Cold-Dry_Winter-Hot_Summer": { //replace picture
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dwa</FONT></strong>: continental/microthermal climates, hot summer continental climates <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Odori_Park_Sapporo_Snow_Festival_2007.JPG/220px-Odori_Park_Sapporo_Snow_Festival_2007.JPG">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. In eastern Asia, Dwa climates extend further south due to the influence of the Siberian high-pressure system, \
                        which also causes winters there to be dry, and summers can be very wet because of monsoon circulation.'
                        break;
                    }
                    case "Cwb Temperate-Dry_Winter-Warm_Summer": { //replace
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cwb</FONT></strong>:  temperate/mesothermal Climate, dry-winter subtropical highland climate <br> \
                        <img src = "https://miro.medium.com/v2/resize:fit:1200/1*urpRra4seqBzZp1o1eXtXQ.jpeg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        It has dry winters (driest winter month average precipitation less than one-tenth wettest summer month average precipitation) and the warmest month averages below 22 °C but has \
                        at least four months averaging above 10 °C. Dry-winter subtropical highland climate (Cwb) is a type of climate mainly found in highlands inside the tropics of Central America, South America, Africa, and South and Southeast Asia or areas in the subtropics. Winters are noticeable and dry, \
                        and summers can be very rainy. In the tropics, the monsoon is provoked by the tropical air masses and the dry winters by subtropical high pressure.'
                        break;
                    }

                    case "Dsc Cold-Dry_Summer-Cold_Summer": {//replace
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dsc</FONT></strong>: continental/microthermal climates, subarctic or boreal climates <br> \
                        <img src = "https://www.mining.com/wp-content/uploads/2019/09/spi2__upload_iblock_986_exact_1600x1000_01.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations.Dfc, Dsc and Dwc climates occur poleward of the other group D climates, or at higher altitudes, generally between the 55° to 65° North latitudes,\
                         occasionally reaching up to the 70°N latitude'
                        break;
                    }

                    case "Dwc Cold-Dry_Winter-Cold_Summer": {//replace
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dwc</FONT></strong>: continental/microthermal climates, subarctic or boreal climates <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/%E4%B8%AD%E5%9B%BD%E8%A5%BF%E8%97%8F_China_Tibet_China_Xinjiang_Urumqi_Welcome_you_to_tour_the_-_panoramio_%281%29.jpg/250px-%E4%B8%AD%E5%9B%BD%E8%A5%BF%E8%97%8F_China_Tibet_China_Xinjiang_Urumqi_Welcome_you_to_tour_the_-_panoramio_%281%29.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations.Dfc, Dsc and Dwc climates occur poleward of the other group D climates, or at higher altitudes, generally between the 55° to 65° North latitudes,\
                         occasionally reaching up to the 70°N latitude'
                        break;
                    }

                    case "Cwc Temperate-Dry_Winter-Cold_Summer": { //replace
                        ret_str = '<strong><FONT COLOR="#C1E1C1">Group C SubGroup Cwc</FONT></strong>:  temperate/mesothermal Climate, dry-winter subtropical highland climate <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/4/4f/Altiplano_de_La_Paz_Bolivia.jpg"><br>\
                        <strong>Classification Descriptor</strong>: Group C climates are defined by having an avergae temperature above 0 °C, in their coldest month but below 18 °C .\
                        It has dry winters (driest winter month average precipitation less than one-tenth wettest summer month average precipitation) and has one to three months averaging above 10 °C\
                        Dry-winter cold subtropical highland climates (Cwc) exist in high-elevation areas adjacent to Cwb climates. This climate is rare and is found mainly in isolated locations mostly in the Andes in \
                        Bolivia and Peru, as well as in sparse mountain locations in Southeast Asia.'
                        break;
                    }

                    case "Dfa Cold-Withouth_dry_season-Very_Cold_Winter": { //replace
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dfa</FONT></strong>: continental/microthermal climates, hot summer continental climates <br> \
                        <img src = "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/57/d9.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. Dfa climates usually occur in the high 30s and low 40s latitudes, with a qualifying average temperature in the warmest month of greater than 22 °C'
                        break;
                    }

                    case "Dsd Cold-Dry_Summer-Very_Cold_Winter": { //replace
                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dsd</FONT></strong>: continental/microthermal climates, subarctic or boreal climates with severe winters <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Oymyakon_forests.jpg/800px-Oymyakon_forests.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. Places with this climate have severe winters, with the temperature in their coldest month lower than −38 °C. These climates occur only in eastern Siberia. \
                        The names of some of the places with this climate have become veritable synonyms for the extreme, severe winter cold'
                        break;
                    }

                    case "Dwd Cold-Dry_Winter-Very_Cold_Winter": { //replace

                        ret_str = '<strong><FONT COLOR="#C3B1E1">Group D SubGroup Dsd</FONT></strong>: continental/microthermal climates, subarctic or boreal climates with severe winters <br> \
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Oymyakon_forests.jpg/800px-Oymyakon_forests.jpg">\
                        <strong>Classification Descriptor</strong>: These climates have an average temperature above 10 °C (50 °F) in their warmest months, and the coldest month average below 0 \
                        °C (or −3 °C (27 °F), as noted previously). These usually occur in the interiors of continents and on their upper east coasts, normally north of 40°N. \
                        In the Southern Hemisphere, group D climates are extremely rare due to the smaller land masses in the middle latitudes and the almost complete absence of land at 40–60°S, \
                        existing only in some highland locations. Places with this climate have severe winters, with the temperature in their coldest month lower than −38 °C. These climates occur only in eastern Siberia. \
                        The names of some of the places with this climate have become veritable synonyms for the extreme, severe winter cold'
                        break;
                    }

                    default: { 
                       //statements; 
                       break; 
                    } 
                 } 

                return ret_str;
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
        var btn_foc = document.createElement('button');
        const text = document.createTextNode("Focus Modality");
        btn_foc.style.background = "white";
        // add the text node to the newly created div
        btn_foc.appendChild(text);

        const button_foc_ref = document.querySelector("btn_foc");

        document.body.insertBefore(btn_foc, button_foc_ref);

        //console.log("all groups ",all_groups);

        //console.log("exists");
        if (btn_foc != null){
            view.ui.add(btn_foc, "top-right");
            //console.log("exists1");
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