import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Check if the current user has AI Pro access
 * This includes:
 * - Users with ai_basic plan
 * - Users with ai_pro plan
 * - Admin user (musicniteshagarwal@gmail.com)
 */
export async function hasProAccess(): Promise<boolean> {
  const { has } = await auth();
  const user = await currentUser();

  // Check if user is admin
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = adminEmail && userEmail === adminEmail;

  // Return true if user has a plan or is admin
  return !!(has({ plan: "ai_basic" }) || has({ plan: "ai_pro" }) || isAdmin);
}

/**
 * Check if the current user is an admin
 */
export async function isAdminUser(): Promise<boolean> {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const adminEmail = process.env.ADMIN_EMAIL;
  return adminEmail ? userEmail === adminEmail : false;
}

/**
 * Get the current user's plan
 * Returns 'free', 'ai_basic', 'ai_pro', or 'admin'
 */
export async function getUserPlan(): Promise<'free' | 'ai_basic' | 'ai_pro' | 'admin'> {
  const { has } = await auth();
  
  const isAdmin = await isAdminUser();
  if (isAdmin) return 'admin';
  
  if (has({ plan: "ai_pro" })) return 'ai_pro';
  if (has({ plan: "ai_basic" })) return 'ai_basic';
  
  return 'free';
}
