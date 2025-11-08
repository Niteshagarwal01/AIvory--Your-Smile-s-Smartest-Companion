import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing doctors
  await prisma.doctor.deleteMany();
  console.log("✅ Cleared existing doctors");

  // Create sample doctors
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@aivory.com",
      phone: "+1 (555) 123-4567",
      imageUrl: "/logo.png",
      speciality: "General Dentistry",
      bio: "With over 15 years of experience, Dr. Johnson specializes in preventive care and cosmetic dentistry, helping patients achieve their best smile.",
    },
    {
      name: "Dr. Michael Chen",
      email: "michael.chen@aivory.com",
      phone: "+1 (555) 234-5678",
      imageUrl: "/logo.png",
      speciality: "Orthodontics",
      bio: "Dr. Chen is an expert in orthodontics and teeth alignment, using the latest technology to create beautiful, healthy smiles.",
    },
    {
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@aivory.com",
      phone: "+1 (555) 345-6789",
      imageUrl: "/logo.png",
      speciality: "Pediatric Dentistry",
      bio: "Specializing in children's dental care, Dr. Rodriguez creates a comfortable and fun environment for young patients.",
    },
    {
      name: "Dr. James Wilson",
      email: "james.wilson@aivory.com",
      phone: "+1 (555) 456-7890",
      imageUrl: "/logo.png",
      speciality: "Cosmetic Dentistry",
      bio: "Dr. Wilson is passionate about cosmetic dentistry, offering services like teeth whitening, veneers, and smile makeovers.",
    },
    {
      name: "Dr. Lisa Patel",
      email: "lisa.patel@aivory.com",
      phone: "+1 (555) 567-8901",
      imageUrl: "/logo.png",
      speciality: "Endodontics",
      bio: "As an endodontic specialist, Dr. Patel focuses on root canal treatments and saving natural teeth with advanced techniques.",
    },
    {
      name: "Dr. David Martinez",
      email: "david.martinez@aivory.com",
      phone: "+1 (555) 678-9012",
      imageUrl: "/logo.png",
      speciality: "Periodontics",
      bio: "Dr. Martinez specializes in gum health and dental implants, helping patients maintain healthy foundations for their teeth.",
    },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });
    console.log(`✅ Created doctor: ${doctor.name}`);
  }

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
