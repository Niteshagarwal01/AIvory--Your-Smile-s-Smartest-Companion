"use client";

import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
  const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });

  return result;
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while  creating a doctor"),
  });

  return result;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
    },
    onError: (error) => console.error("Failed to update doctor:", error),
  });
}

// get available doctors for appointments
export function useAvailableDoctors() {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });

  return result;
}

// Fetch nearby dentists based on user location
export function useNearbyDentists(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ["nearbyDentists", latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) {
        throw new Error("Location not available");
      }

      const response = await fetch(
        `/api/nearby-dentists?lat=${latitude}&lon=${longitude}&radius=10000`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nearby dentists");
      }

      const data = await response.json();
      return data.dentists || [];
    },
    enabled: !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
