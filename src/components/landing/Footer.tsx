import Image from "next/image";

function Footer() {
  return (
    <footer className="px-4 md:px-6 py-12 border-t bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/logo.png"
                  alt="AIvory Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AIvory
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered dental assistance that actually helps.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  How it works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#help" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Help center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#status" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#privacy" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Terms
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1 transform">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AIvory. Built for real people with real dental questions.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
