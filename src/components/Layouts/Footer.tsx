import Logo from "@/assets/icons/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 items-start">
          {/* Logo */}
          <div className="col-span-2 lg:col-span-1 flex items-center space-x-3">
            <Logo/>
            <span className="text-2xl font-bold text-foreground">Envilo</span>
          </div>

          {/* Product */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Integrations</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3">
              Developers
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Public API</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Guides</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 ..." />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093 ..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          © {year} Envilo Courier. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
