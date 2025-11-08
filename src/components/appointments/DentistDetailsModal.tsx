"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  GlobeIcon,
  Navigation2Icon,
  CheckCircle2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DentistDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dentist: {
    id: string;
    name: string;
    imageUrl: string | null;
    speciality: string | null;
    phone: string;
    bio: string | null;
    address?: string;
    distance?: string;
    rating?: number;
    website?: string | null;
    openingHours?: string;
    latitude?: number;
    longitude?: number;
  } | null;
  onSelect: () => void;
  isSelected: boolean;
}

export function DentistDetailsModal({
  isOpen,
  onClose,
  dentist,
  onSelect,
  isSelected,
}: DentistDetailsModalProps) {
  if (!dentist) return null;

  const openInMaps = () => {
    if (dentist.latitude && dentist.longitude) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${dentist.latitude},${dentist.longitude}`,
        "_blank"
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">Dentist Details</DialogTitle>
          <DialogDescription>
            Complete information about this dental practice
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={dentist.imageUrl || "/logo.png"}
                alt={dentist.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover ring-2 ring-border relative z-10"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">{dentist.name}</h3>
              <p className="text-primary font-medium mb-2">
                {dentist.speciality || "General Dentistry"}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{dentist.rating || "5.0"}</span>
                </div>
                {dentist.distance && (
                  <Badge variant="secondary" className="gap-1">
                    <Navigation2Icon className="w-3 h-3" />
                    {dentist.distance} km away
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio Section */}
          {dentist.bio && (
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">About</h4>
              <p className="text-muted-foreground leading-relaxed">{dentist.bio}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Contact Information</h4>
            
            {dentist.address && (
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <MapPinIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Address</p>
                  <p className="text-sm">{dentist.address}</p>
                </div>
                {dentist.latitude && dentist.longitude && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openInMaps}
                    className="shrink-0"
                  >
                    <Navigation2Icon className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <PhoneIcon className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">Phone</p>
                <a
                  href={`tel:${dentist.phone}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {dentist.phone}
                </a>
              </div>
            </div>

            {dentist.website && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <GlobeIcon className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Website</p>
                  <a
                    href={dentist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Opening Hours */}
          {dentist.openingHours && (
            <div className="space-y-2">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                Opening Hours
              </h4>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">{dentist.openingHours}</p>
              </div>
            </div>
          )}

          {/* Features/Benefits */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">What to Expect</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2Icon className="w-4 h-4 text-primary" />
                <span>Licensed Professional</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2Icon className="w-4 h-4 text-primary" />
                <span>Modern Equipment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2Icon className="w-4 h-4 text-primary" />
                <span>Experienced Staff</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2Icon className="w-4 h-4 text-primary" />
                <span>Quality Care</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 flex-shrink-0 sticky bottom-0 bg-background pt-4 pb-2">
            <Button
              onClick={() => {
                onSelect();
                onClose();
              }}
              className="flex-1 relative overflow-hidden group"
              variant={isSelected ? "secondary" : "default"}
            >
              {isSelected ? (
                <>
                  <CheckCircle2Icon className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                "Select & Continue"
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
