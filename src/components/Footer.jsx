import { Link } from 'react-router';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 0C9.81 0 9.448.01 8.378.058c-1.11.05-1.9.226-2.594.48a6.897 6.897 0 00-2.52 1.61 6.897 6.897 0 00-1.61 2.52c-.254.694-.43 1.483-.48 2.594C.01 9.448 0 9.81 0 12s.01 2.552.058 3.622c.05 1.11.226 1.9.48 2.594a6.897 6.897 0 001.61 2.52 6.897 6.897 0 002.52 1.61c.694.254 1.483.43 2.594.48C9.448 23.99 9.81 24 12 24s2.552-.01 3.622-.058c1.11-.05 1.9-.226 2.594-.48a6.897 6.897 0 002.52-1.61 6.897 6.897 0 001.61-2.52c.254-.694.43-1.483.48-2.594C23.99 14.552 24 14.19 24 12s-.01-2.552-.058-3.622c-.05-1.11-.226-1.9-.48-2.594a6.897 6.897 0 00-1.61-2.52A6.897 6.897 0 0018.216.538c-.694-.254-1.483-.43-2.594-.48C14.552.01 14.19 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-primary text-primary-content mt-16 border-t-4 border-accent">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Nexus Living</h3>
            <p className="text-primary-content/80">
              Experience unparalleled luxury and comfort in the heart of the
              city. Your new home is waiting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/apartment"
                  className="hover:text-accent transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors"
                >
                  Amenities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <address className="not-italic text-primary-content/80 space-y-2">
              <p>123 Nexus Avenue, Urbanopolis, 12345</p>
              <p>
                <a
                  href="tel:+1234567890"
                  className="hover:text-accent transition-colors"
                >
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@nexusliving.com"
                  className="hover:text-accent transition-colors"
                >
                  info@nexusliving.com
                </a>
              </p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-primary-content/80 hover:text-accent transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-content/20 pt-8 text-center text-primary-content/60">
          <p>
            &copy; {new Date().getFullYear()} Nexus Living. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;