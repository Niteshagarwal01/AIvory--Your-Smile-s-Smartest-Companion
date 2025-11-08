"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Navigation2Icon, PhoneIcon } from "lucide-react";
import Image from "next/image";

// Fix for default marker icon
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Dentist {
  id: string;
  name: string;
  imageUrl: string | null;
  speciality: string | null;
  phone: string;
  bio: string | null;
  address?: string;
  distance?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

interface DentistMapViewProps {
  dentists: Dentist[];
  userLocation: { lat: number; lon: number } | null;
  onSelectDentist: (dentist: { id: string; name: string; phone?: string; speciality?: string; imageUrl?: string }) => void;
  onViewDetails: (dentist: Dentist) => void;
  selectedDentistId: string | null;
}

// Component to recenter map when user location changes
function RecenterMap({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function DentistMapView({
  dentists,
  userLocation,
  onSelectDentist,
  onViewDetails,
  selectedDentistId,
}: DentistMapViewProps) {
  if (!userLocation) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-muted rounded-xl">
        <div className="text-center">
          <p className="text-muted-foreground">Enable location to see map view</p>
        </div>
      </div>
    );
  }

  const center: LatLngExpression = [userLocation.lat, userLocation.lon];

  // Filter dentists with valid coordinates
  const validDentists = dentists.filter(
    (d) => d.latitude !== undefined && d.longitude !== undefined
  );

  return (
    <div className="h-[600px] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} />

        {/* User location marker */}
        <Marker position={center}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-semibold">Your Location</p>
              <p className="text-sm text-muted-foreground">You are here</p>
            </div>
          </Popup>
        </Marker>

        {/* Dentist markers */}
        {validDentists.map((dentist) => (
          <Marker
            key={dentist.id}
            position={[dentist.latitude!, dentist.longitude!]}
            eventHandlers={{
              click: () => onSelectDentist({
                id: dentist.id,
                name: dentist.name,
                phone: dentist.phone,
                speciality: dentist.speciality || undefined,
                imageUrl: dentist.imageUrl || undefined,
              }),
            }}
          >
            <Popup className="min-w-[250px]">
              <div className="p-2 space-y-3">
                <div className="flex items-start gap-3">
                  <Image
                    src={dentist.imageUrl || "/logo.png"}
                    alt={dentist.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{dentist.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {dentist.speciality || "General Dentistry"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{dentist.rating || "5.0"}</span>
                  </div>
                  {dentist.distance && (
                    <Badge variant="secondary" className="text-xs h-5">
                      {dentist.distance} km away
                    </Badge>
                  )}
                </div>

                {dentist.address && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {dentist.address}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs"
                    onClick={() => onViewDetails(dentist)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => onSelectDentist({
                      id: dentist.id,
                      name: dentist.name,
                      phone: dentist.phone,
                      speciality: dentist.speciality || undefined,
                      imageUrl: dentist.imageUrl || undefined,
                    })}
                  >
                    Select
                  </Button>
                </div>

                {dentist.latitude && dentist.longitude && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full h-8 text-xs"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${dentist.latitude},${dentist.longitude}`,
                        "_blank"
                      );
                    }}
                  >
                    <Navigation2Icon className="w-3 h-3 mr-1" />
                    Get Directions
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
