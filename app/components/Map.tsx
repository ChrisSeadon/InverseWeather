'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps{
    lat:number,
    lon:number,
    zoom:number
}

export default function Map({lat,lon,zoom}:MapProps) {
  return (
    <div id={`map ${lat} ${lon}`}>
      <MapContainer 
        center={[lat, lon]} 
        zoom={zoom} 
        className="h-32 w-64"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
    </div>
  );
}
