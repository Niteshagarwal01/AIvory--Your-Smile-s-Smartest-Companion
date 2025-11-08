import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";
import { getUserPlan } from "@/lib/auth-utils";
import { CrownIcon } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();
  const userPlan = await getUserPlan();
  
  const planDisplay = {
    free: "Free Plan",
    ai_basic: "AI Basic Plan",
    ai_pro: "AI Pro Plan",
    admin: "Admin Access - Full Features",
  };

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="size-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Online & Ready</span>
          </div>
          {(userPlan === 'admin' || userPlan === 'ai_pro') && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
              <CrownIcon className="size-3 text-amber-500" />
              <span className="text-sm font-medium text-amber-500">{planDisplay[userPlan]}</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
              ? "afternoon"
              : "evening"}
            , {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Your personal AI dental assistant is ready to help you maintain perfect oral health.
          </p>
        </div>
      </div>

      <div className="lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full ">
        <Image src="/logo.png" alt="AIvory" width={64} height={64} className="w-16 h-16" />
      </div>
    </div>
  );
}
