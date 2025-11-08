"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserAppointments,
  getUpcomingAppointments,
  getPastAppointments,
  cancelAppointment,
} from "@/lib/actions/appointments";

export function useUserAppointments() {
  return useQuery({
    queryKey: ["userAppointments"],
    queryFn: getUserAppointments,
  });
}

export function useUpcomingAppointments() {
  return useQuery({
    queryKey: ["upcomingAppointments"],
    queryFn: getUpcomingAppointments,
  });
}

export function usePastAppointments() {
  return useQuery({
    queryKey: ["pastAppointments"],
    queryFn: getPastAppointments,
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      // Invalidate all appointment queries
      queryClient.invalidateQueries({ queryKey: ["userAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["pastAppointments"] });
    },
  });
}
