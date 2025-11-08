import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 md:px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image src={"/logo.png"} alt="AIvory Logo" width={32} height={32} className="w-10 md:w-11 relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
            AIvory
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            How it Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <SignInButton mode="modal">
            <Button variant={"ghost"} size={"sm"} className="hover:bg-primary/10 transition-all duration-200">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size={"sm"} className="relative overflow-hidden group">
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
}
export default Header;
