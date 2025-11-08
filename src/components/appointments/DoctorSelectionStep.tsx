import { useNearbyDentists } from "@/hooks/use-doctors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon, Loader2Icon, Navigation2Icon, InfoIcon, MapIcon, ListIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { DentistDetailsModal } from "./DentistDetailsModal";
import dynamic from "next/dynamic";

// Dynamic import for map to avoid SSR issues
const DentistMapView = dynamic(
  () => import("./DentistMapView").then((mod) => ({ default: mod.DentistMapView })),
  { 
    ssr: false,
    loading: () => <div className="h-[600px] bg-muted animate-pulse rounded-xl" />
  }
);

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentist: { id: string; name: string; phone?: string; speciality?: string; imageUrl?: string }) => void;
  onContinue: () => void;
}

interface Dentist {
  id: string;
  name: string;
  imageUrl: string | null;
  speciality: string | null;
  appointmentCount?: number;
  phone: string;
  bio: string | null;
  address?: string;
  distance?: string;
  rating?: number;
  website?: string | null;
  openingHours?: string;
  latitude?: number;
  longitude?: number;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedDentistDetails, setSelectedDentistDetails] = useState<Dentist | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: dentists = [], isLoading } = useNearbyDentists(
    location?.lat || null,
    location?.lon || null
  );

  // Get user's location on mount
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError("Unable to get your location. Please enable location access.");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleViewDetails = (dentist: Dentist) => {
    setSelectedDentistDetails(dentist);
    setIsDetailsModalOpen(true);
  };

  const handleSelectFromModal = () => {
    if (selectedDentistDetails) {
      onSelectDentist({
        id: selectedDentistDetails.id,
        name: selectedDentistDetails.name,
        phone: selectedDentistDetails.phone,
        speciality: selectedDentistDetails.speciality || undefined,
        imageUrl: selectedDentistDetails.imageUrl || undefined,
      });
    }
  };

  if (isGettingLocation) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Choose Your Dentist
        </h2>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <Loader2Icon className="w-12 h-12 text-primary animate-spin mb-4" />
          <h3 className="text-xl font-semibold mb-2">Finding Dentists Near You</h3>
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Choose Your Dentist
        </h2>
        <DoctorCardsLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Dentists Near You
        </h2>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <ListIcon className="w-4 h-4" />
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <MapIcon className="w-4 h-4" />
              Map
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={getUserLocation}
            disabled={isGettingLocation}
            className="gap-2"
          >
            <Navigation2Icon className="w-4 h-4" />
            Refresh Location
          </Button>
        </div>
      </div>

      {locationError && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>{locationError}</span>
            <Button variant="outline" size="sm" onClick={getUserLocation}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {dentists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Dentists Available</h3>
          <p className="text-muted-foreground max-w-md">
            There are currently no dentists available for booking. Please check back later or contact support.
          </p>
        </div>
      ) : (
        <>
          {viewMode === "list" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dentists.map((dentist: Dentist) => (
              <Card
                key={dentist.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 ${
                  selectedDentistId === dentist.id 
                    ? "ring-2 ring-primary shadow-lg shadow-primary/20" 
                    : "hover:shadow-primary/10"
                }`}
                onClick={() => onSelectDentist({
                  id: dentist.id,
                  name: dentist.name,
                  phone: dentist.phone,
                  speciality: dentist.speciality || undefined,
                  imageUrl: dentist.imageUrl || undefined,
                })}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={dentist.imageUrl || "/logo.png"}
                        alt={dentist.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-border relative z-10 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {dentist.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {dentist.speciality || "General Dentistry"}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                          <span className="text-sm font-medium">
                            {dentist.rating || "5.0"}
                          </span>
                        </div>
                        {dentist.distance && (
                          <Badge variant="secondary" className="text-xs">
                            {dentist.distance} km away
                          </Badge>
                        )}
                        {dentist.appointmentCount !== undefined && (
                          <span className="text-sm text-muted-foreground">
                            ({dentist.appointmentCount} appointments)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {dentist.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="line-clamp-1">{dentist.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{dentist.phone}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {dentist.bio || "Experienced dental professional providing quality care with the latest technology and techniques."}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(dentist);
                      }}
                    >
                      <InfoIcon className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      Licensed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : (
            <DentistMapView
              dentists={dentists}
              userLocation={location}
              onSelectDentist={onSelectDentist}
              onViewDetails={handleViewDetails}
              selectedDentistId={selectedDentistId}
            />
          )}

          {selectedDentistId && (
            <div className="flex justify-end animate-in slide-in-from-bottom duration-300">
              <Button 
                onClick={onContinue}
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Continue to Time Selection</span>
                <div className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Dentist Details Modal */}
      <DentistDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        dentist={selectedDentistDetails}
        onSelect={handleSelectFromModal}
        isSelected={selectedDentistDetails?.id === selectedDentistId}
      />
    </div>
  );
}

export default DoctorSelectionStep;
