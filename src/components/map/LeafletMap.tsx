"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DESTINATIONS = [
  { slug: "delhi", name: "Delhi", lat: 28.6139, lng: 77.2090, state: "Delhi" },
  { slug: "jaipur", name: "Jaipur", lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  { slug: "varanasi", name: "Varanasi", lat: 25.3176, lng: 82.9739, state: "Uttar Pradesh" },
  { slug: "leh", name: "Leh Ladakh", lat: 34.1526, lng: 77.5771, state: "Ladakh" },
  { slug: "alleppey", name: "Alleppey", lat: 9.4981, lng: 76.3388, state: "Kerala" },
  { slug: "hampi", name: "Hampi", lat: 15.3350, lng: 76.4600, state: "Karnataka" },
  { slug: "mumbai", name: "Mumbai", lat: 19.0760, lng: 72.8777, state: "Maharashtra" },
  { slug: "kolkata", name: "Kolkata", lat: 22.5726, lng: 88.3639, state: "West Bengal" },
];

const GOLDEN_TRIANGLE = [
  [28.6139, 77.2090], // Delhi
  [27.1767, 78.0081], // Agra
  [26.9124, 75.7873], // Jaipur
  [28.6139, 77.2090]  // Delhi
];

const SOUTHERN_HERITAGE = [
  [15.3350, 76.4600], // Hampi
  [12.9716, 77.5946], // Bengaluru
  [9.4981, 76.3388],  // Alleppey
  [9.9252, 78.1198]   // Madurai
];

export default function LeafletMap() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-3xl animate-pulse">
        Loading Map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      minZoom={4}
      style={{ height: "100%", width: "100%", borderRadius: "1.5rem", zIndex: 10 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Destination Markers */}
      {DESTINATIONS.map((dest) => (
        <Marker
          key={dest.slug}
          position={[dest.lat, dest.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              router.push(`/destinations/${dest.slug}`);
            },
          }}
        >
          <Popup>
            <div className="font-display">
              <h3 className="font-bold text-sm">{dest.name}</h3>
              <p className="text-xs text-slate-500">{dest.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Tourist Circuits */}
      <Polyline
        positions={GOLDEN_TRIANGLE as any}
        pathOptions={{ color: "#F97316", weight: 3, dashArray: "5, 5" }}
      >
        <Popup>The Golden Triangle</Popup>
      </Polyline>

      <Polyline
        positions={SOUTHERN_HERITAGE as any}
        pathOptions={{ color: "#10B981", weight: 3, dashArray: "5, 5" }}
      >
        <Popup>Southern Heritage Trail</Popup>
      </Polyline>
    </MapContainer>
  );
}

