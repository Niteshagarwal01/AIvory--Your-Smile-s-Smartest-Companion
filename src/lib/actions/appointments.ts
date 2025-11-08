"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}

export async function getUserAppointments() {
  try {
    // get authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    // find user by clerkId from authenticated session
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}

export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");

    // these calls will run in parallel, instead of waiting each other
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user appointment stats:", error);
    return { totalAppointments: 0, completedAppointments: 0 };
  }
}

export async function getBookedTimeSlots(doctorId: string, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["CONFIRMED", "COMPLETED"], // consider both confirmed and completed appointments as blocking
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment: any) => appointment.time);
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    return []; // return empty array if there's an error
  }
}

interface BookAppointmentInput {
  doctorId: string;
  doctorName: string;
  doctorPhone?: string;
  doctorSpeciality?: string;
  doctorImageUrl?: string;
  date: string;
  time: string;
  reason?: string;
}

export async function bookAppointment(input: BookAppointmentInput) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to book an appointment");

    if (!input.doctorId || !input.date || !input.time || !input.doctorName) {
      throw new Error("Doctor information, date, and time are required");
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

    // Check if doctor exists in database, if not create them
    let doctor = await prisma.doctor.findFirst({
      where: {
        OR: [
          { id: input.doctorId },
          { name: input.doctorName, phone: input.doctorPhone || "" }
        ]
      }
    });

    // If doctor doesn't exist (from OpenStreetMap), create them
    if (!doctor) {
      doctor = await prisma.doctor.create({
        data: {
          id: input.doctorId,
          name: input.doctorName,
          email: null, // No email for OpenStreetMap dentists
          phone: input.doctorPhone || "+91 000-000-0000",
          speciality: input.doctorSpeciality || "General Dentistry",
          imageUrl: input.doctorImageUrl || "/logo.png",
          gender: "MALE", // Default gender
          isActive: true,
        }
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: doctor.id,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true, phone: true, speciality: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment. Please try again later.");
  }
}
export async function updateAppointmentStatus(input: { id: string; status: string }) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}

export async function getUpcomingAppointments() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          gte: now,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true, phone: true, speciality: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw new Error("Failed to fetch upcoming appointments");
  }
}

export async function getPastAppointments() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          lt: now,
        },
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true, phone: true, speciality: true } },
      },
      orderBy: [{ date: "desc" }, { time: "desc" }],
      take: 20, // Limit to last 20 appointments
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching past appointments:", error);
    throw new Error("Failed to fetch past appointments");
  }
}

export async function cancelAppointment(appointmentId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    // Verify the appointment belongs to the user
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: user.id,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Update appointment status to CANCELLED
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "CANCELLED",
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(updatedAppointment);
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw new Error("Failed to cancel appointment");
  }
}
