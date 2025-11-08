"use client";

import { useState } from "react";
import { useUpcomingAppointments, usePastAppointments, useCancelAppointment } from "@/hooks/use-appointments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  XCircleIcon,
  CheckCircle2Icon,
  DownloadIcon,
  CalendarPlusIcon,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AppointmentHistoryPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);

  const { data: upcomingAppointments = [], isLoading: upcomingLoading } = useUpcomingAppointments();
  const { data: pastAppointments = [], isLoading: pastLoading } = usePastAppointments();
  const cancelMutation = useCancelAppointment();

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      await cancelMutation.mutateAsync(appointmentToCancel);
      toast.success("Appointment cancelled successfully");
      setAppointmentToCancel(null);
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  const downloadCalendarFile = (appointment: any) => {
    // We'll implement this with calendar integration
    const event = {
      title: `Dental Appointment - ${appointment.doctorName}`,
      description: appointment.reason || "Dental consultation",
      location: "Dental Clinic",
      startTime: new Date(`${appointment.date}T${appointment.time}`),
      duration: appointment.duration || 30,
    };

    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AIvory//Dental Appointments//EN
BEGIN:VEVENT
UID:${appointment.id}@aivory.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(event.startTime.getTime() + event.duration * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${appointment.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Calendar file downloaded! Open it to add to your calendar.");
  };

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: any; isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <Image
                src={appointment.doctorImageUrl || "/logo.png"}
                alt={appointment.doctorName}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{appointment.doctorName}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <UserIcon className="w-3 h-3" />
                <span>{appointment.doctor?.speciality || "General Dentistry"}</span>
              </CardDescription>
            </div>
          </div>
          <Badge variant={isPast ? "secondary" : appointment.status === "CANCELLED" ? "destructive" : "default"}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">{format(new Date(appointment.date), "PPP")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{appointment.time}</p>
            </div>
          </div>
        </div>

        {appointment.reason && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-1">Reason for visit</p>
            <p className="text-sm">{appointment.reason}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => downloadCalendarFile(appointment)}
          >
            <CalendarPlusIcon className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>

          {!isPast && appointment.status !== "CANCELLED" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setAppointmentToCancel(appointment.id)}
              disabled={cancelMutation.isPending}
            >
              <XCircleIcon className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Appointments
          </h1>
          <p className="text-muted-foreground">
            View and manage your dental appointments
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <CheckCircle2Icon className="w-4 h-4" />
              Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Appointments */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingLoading ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : upcomingAppointments.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any scheduled appointments yet
                  </p>
                  <Button asChild>
                    <a href="/appointments">Book Appointment</a>
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment: any) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Past Appointments */}
          <TabsContent value="past" className="space-y-4">
            {pastLoading ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : pastAppointments.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <CheckCircle2Icon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Past Appointments</h3>
                  <p className="text-muted-foreground">
                    Your appointment history will appear here
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pastAppointments.map((appointment: any) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} isPast />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!appointmentToCancel} onOpenChange={() => setAppointmentToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelAppointment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
