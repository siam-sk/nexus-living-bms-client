import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image:
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Modern Living, Unmatched Comfort',
      subtitle:
        'Experience the pinnacle of urban living with our state-of-the-art apartments.',
    },
    {
      image:
        'https://images.pexels.com/photos/6438762/pexels-photo-6438762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Your Sanctuary in the City',
      subtitle:
        'Find your perfect space to relax and unwind, away from the hustle and bustle.',
    },
    {
      image:
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Luxury Amenities at Your Fingertips',
      subtitle:
        'Enjoy exclusive access to our premium facilities, including pools, gyms, and lounges.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

const Coupons = ({ isModalOpen, setIsModalOpen }) => {
  const coupons = [
    {
      title: '10% Off First Month',
      description: 'Sign up today and enjoy 10% off your first month’s rent!',
      code: 'WELCOME10',
    },
    {
      title: 'Refer a Friend',
      description: 'Refer a friend and both of you get $100 off your rent!',
      code: 'FRIEND100',
    },
    {
      title: 'Free Gym Access',
      description: 'Sign a 12-month lease and get free gym access for a year!',
      code: 'GYMFREE',
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-primary hover:bg-accent text-white p-4 rounded-full shadow-2xl z-50 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        aria-label="View Exclusive Coupons"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z"
          />
        </svg>
      </button>

      {/* Coupons Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg shadow-lg relative max-w-4xl w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
              aria-label="Close coupons modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Exclusive Coupons</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Take advantage of these amazing offers and make your living
                experience even better!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coupons.map((coupon, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-2xl font-bold mb-2 text-primary">
                    {coupon.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{coupon.description}</p>
                  <div className="bg-primary text-white py-2 px-4 rounded-lg font-bold tracking-widest">
                    Code: {coupon.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

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
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Nexus Living</h3>
            <p className="text-gray-400">
              Experience unparalleled luxury and comfort in the heart of the
              city. Your new home is waiting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Apartments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Nexus Avenue, Urbanopolis, 12345</p>
              <p>
                <a href="tel:+1234567890" className="hover:text-primary">
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@nexusliving.com"
                  className="hover:text-primary"
                >
                  info@nexusliving.com
                </a>
              </p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Nexus Living. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Nexus Living</h2>
          <p className="text-lg text-base-content max-w-3xl mx-auto">
            Discover a new standard of living where luxury meets convenience. Our
            apartments offer breathtaking views, modern designs, and a vibrant
            community. Your new home awaits.
          </p>
        </section>

        {/* About the Building Section */}
        <section className="mt-16 bg-gray-100 p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4">
              About the Building
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nexus Living is a modern residential complex designed to provide
              unparalleled comfort and luxury. With state-of-the-art amenities,
              eco-friendly architecture, and a vibrant community, it’s more than
              just a place to live—it’s a lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Modern Architecture"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Modern Architecture</h3>
              <p className="text-gray-600 mt-2">
                Designed with sleek, contemporary lines and eco-friendly materials,
                our building stands as a beacon of modern living.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Luxury Amenities"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Luxury Amenities</h3>
              <p className="text-gray-600 mt-2">
                Enjoy access to a rooftop pool, fitness center, co-working spaces,
                and more, all designed to enhance your lifestyle.
              </p>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Prime Location
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conveniently located in the heart of the city, with easy access to
              public transport, shopping, and entertainment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-base-200 p-8 rounded-lg shadow-lg">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nexus Living</h3>
              <p className="text-lg mb-2">
                123 Nexus Avenue, Urbanopolis, 12345
              </p>
              <p className="text-gray-600 mb-4">
                Our central location means you're just minutes away from major
                business hubs, fine dining, and cultural landmarks. The nearby
                metro station and bus stops make commuting a breeze.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent text-accent-content hover:bg-accent-focus transition-colors mt-4"
              >
                Get Directions
              </a>
            </div>
            <div className={`h-80 md:h-96 rounded-lg overflow-hidden shadow-md relative ${isModalOpen ? 'z-0' : 'z-10'}`}>
              <MapContainer
                center={[40.7128, -74.006]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[40.7128, -74.006]}>
                  <Popup>
                    Nexus Living <br /> 123 Nexus Avenue
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Coupons Section */}
        <Coupons isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;