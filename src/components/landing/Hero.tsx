import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12 md:pb-0">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      {/* ANIMATED GRADIENT ORBS */}
      <div className="absolute top-20 left-1/4 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-20 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: "1s" }} 
      />

      <div className="relative z-10 w-full px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-4 md:space-y-6">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                  <span className="text-xs md:text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                    AI-Powered Dental Assistant
                  </span>
                </div>

                {/* MAIN HEADING */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                  <span 
                    className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom duration-700" 
                    style={{ animationDelay: "100ms" }}
                  >
                    Your dental
                  </span>
                  <br />
                  <span 
                    className="relative inline-block animate-in fade-in slide-in-from-bottom duration-700" 
                    style={{ animationDelay: "200ms" }}
                  >
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      questions
                    </span>
                    <div className="absolute -inset-2 bg-primary/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                  </span>
                  <br />
                  <span 
                    className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom duration-700" 
                    style={{ animationDelay: "300ms" }}
                  >
                    answered instantly
                  </span>
                </h1>

                {/* SUBTITLE */}
                <p 
                  className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium animate-in fade-in slide-in-from-bottom duration-700" 
                  style={{ animationDelay: "400ms" }}
                >
                  Chat with our AI dental assistant for instant advice, book smart appointments, and
                  get personalized care recommendations. Available 24/7.
                </p>
              </div>

              {/* CTA BUTTONS */}
              <div 
                className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom duration-700" 
                style={{ animationDelay: "500ms" }}
              >
                <SignUpButton mode="modal">
                  <Button size={"lg"} className="relative overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 w-full sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <MicIcon className="mr-2 size-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">Try voice agent</span>
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size={"lg"} variant={"outline"} className="group hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto">
                    <CalendarIcon className="mr-2 size-5 group-hover:scale-110 transition-transform duration-300" />
                    Book appointment
                  </Button>
                </SignUpButton>
              </div>

              {/* USER TESTIMONIALS */}
              <div 
                className="pt-4 md:pt-8 animate-in fade-in slide-in-from-bottom duration-700" 
                style={{ animationDelay: "600ms" }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* USER AVATARS */}
                  <div className="flex -space-x-3 hover:-space-x-2 transition-all duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                      alt="Jessica Davis"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-4 ring-background hover:scale-110 transition-transform duration-300 hover:z-10"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                      alt="Sam Miller"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-4 ring-background hover:scale-110 transition-transform duration-300 hover:z-10"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                      alt="Anna Lopez"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-4 ring-background hover:scale-110 transition-transform duration-300 hover:z-10"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                      alt="Mike Rodriguez"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-4 ring-background hover:scale-110 transition-transform duration-300 hover:z-10"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                      alt="Katie Lee"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-4 ring-background hover:scale-110 transition-transform duration-300 hover:z-10"
                    />
                  </div>

                  {/* RATING AND STATS */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-amber-400 text-amber-400 hover:scale-125 transition-transform duration-200" />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm font-bold text-foreground">4.9/5</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Trusted by{" "}
                      <span className="font-semibold text-foreground">1,200+ patients</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT - HERO IMAGE */}
            <div 
              className="relative lg:pl-8 animate-in fade-in slide-in-from-right duration-700" 
              style={{ animationDelay: "300ms" }}
            >
              {/* ANIMATED GRADIENT ORBS */}
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl rotate-45 blur-xl animate-pulse"></div>
              <div 
                className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl animate-pulse" 
                style={{ animationDelay: "500ms" }}
              ></div>

              <div className="relative group">
                {/* GLOW EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Image
                  src={"/hero.png"}
                  alt="AIvory AI Assistant"
                  width={600}
                  height={600}
                  className="w-full h-auto relative z-10 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
