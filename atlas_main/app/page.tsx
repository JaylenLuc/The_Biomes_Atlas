import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <main>
      <h1>Biomes interactive Map</h1>
      <a href="https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/layers">base map--MapServer</a>
      <br></br>
      <a href="https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GlobalBiomes/FeatureServer/layers">base map--ServerFeature</a>
      <br></br>
      <Link href="/users">RENDER MAP</Link>
      <br></br>

    </main>
    
  )
}
