import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router';

// --- Animation Hook ---
// A custom hook to detect when an element is visible on screen
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
};

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={`transition-all duration-800 ease-out will-change-transform ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </section>
  );
};


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
    <div className="relative w-full h-screen overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
        </div>
      ))}
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl animate-fade-in-down">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-xl animate-fade-in-up">
          {slides[currentSlide].subtitle}
        </p>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center flex-col z-10">
        <div className="flex space-x-3 mb-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white'
                }`}
              ></button>
            ))}
        </div>
        <div className="text-white animate-bounce mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
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
        className="fixed bottom-8 right-8 bg-accent hover:bg-accent text-white p-4 rounded-full shadow-2xl z-50 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
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
                  <div className="bg-accent text-white py-2 px-4 rounded-lg font-bold tracking-widest">
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

// --- Compact stats strip ---
const StatsStrip = () => (
  <div className="rounded-2xl bg-base-100 shadow-xl border border-base-200">
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-base-200">
      {[
        {
          k: 'Occupancy',
          v: '92%',
          i: 'M3 12h18',
        },
        {
          k: 'Available Units',
          v: '18',
          i: 'M3 3v18h18',
        },
        {
          k: 'Residents',
          v: '420+',
          i: 'M16 7a4 4 0 11-8 0',
        },
        {
          k: 'Avg. Rating',
          v: '4.8',
          i: 'M11.48 3.499a.562.562...',
        },
      ].map((s, idx) => (
        <div key={idx} className="p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            {/* Simple icon placeholder using SVG path */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-6 h-6">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{s.v}</div>
            <div className="text-sm text-base-content/70">{s.k}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Feature grid (Amenities & Services only; no overlap with spaces) ---
const FeatureGrid = () => {
  const features = [
    {
      title: 'Smart Access',
      desc: 'Keyless entry with guest passes and audit logs.',
      icon: '🔐',
      img: 'https://images.pexels.com/photos/5592501/pexels-photo-5592501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['Keyless', '24/7', 'Secure'],
      from: 'from-secondary',
      to: 'to-accent',
    },
    {
      title: 'Concierge Desk',
      desc: 'Resident-first support, packages, reservations.',
      icon: '🤝',
      img: 'https://images.pexels.com/photos/3771832/pexels-photo-3771832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['Packages', 'Maintenance', 'Tours'],
      from: 'from-accent',
      to: 'to-primary',
    },
    {
      title: 'Parcel Lockers',
      desc: 'Self-serve deliveries with QR pickup.',
      icon: '📦',
      img: 'https://images.pexels.com/photos/6169062/pexels-photo-6169062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['24/7', 'Secure', 'Contactless'],
      from: 'from-primary',
      to: 'to-secondary',
    },
    {
      title: '1 Gbps Fiber',
      desc: 'Blazing-fast building-wide internet.',
      icon: '📡',
      img: 'https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['Wi‑Fi 6', 'Low latency', 'Unlimited'],
      from: 'from-secondary',
      to: 'to-accent',
    },
    {
      title: '24/7 Maintenance',
      desc: 'On-call technicians for quick fixes.',
      icon: '🛠️',
      img: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['Emergency', 'Reliable', 'Certified'],
      from: 'from-accent',
      to: 'to-primary',
    },
    {
      title: 'Resident App',
      desc: 'Pay rent, book amenities, get updates.',
      icon: '📱',
      img: 'https://images.pexels.com/photos/6078128/pexels-photo-6078128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      perks: ['Payments', 'Bookings', 'Alerts'],
      from: 'from-primary',
      to: 'to-secondary',
    },
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.06),transparent_60%)]" />
      </div>

      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-secondary font-semibold tracking-widest uppercase mb-2">Amenities & Services</p>
        <h2 className="text-4xl font-bold text-primary">Designed Around You</h2>
        <p className="text-base text-base-content/70 mt-2">Modern conveniences that simplify daily living.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden border border-base-200 bg-base-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
          >
            <figure className="h-40 relative">
              <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/10 to-transparent"></div>
              <div className={`absolute top-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br ${f.from} ${f.to} text-white grid place-content-center shadow-md ring-4 ring-black/10`}>
                <span className="text-xl" aria-hidden>{f.icon}</span>
              </div>
            </figure>

            <div className="p-6 flex flex-col h-[220px]">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-base-content/70">{f.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {f.perks.map((p, idx) => (
                  <span key={idx} className="badge badge-outline border-base-300 text-base-content/70">{p}</span>
                ))}
              </div>
              <div className="mt-auto pt-5 flex items-center justify-between">
                <span className="text-xs text-base-content/60">Included services</span>
                <Link to="/apartment" className="btn btn-ghost btn-sm text-primary gap-1">
                  See more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M3 12h18" />
                  </svg>
                </Link>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-30 bg-gradient-to-br from-primary/20 to-secondary/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Featured Apartments: horizontal snap slider ---
const FeaturedApartments = () => {
  const apartments = [
    {
      id: 1,
      image:
        'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Skyline Loft',
      description: '2-bed loft with panoramic city views.',
    },
    {
      id: 2,
      image:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Garden Terrace',
      description: '3-bed with private terrace & garden.',
    },
    {
      id: 3,
      image:
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Urban Studio',
      description: 'Chic studio for modern professionals.',
    },
    {
      id: 4,
      image:
        'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Corner Suite',
      description: 'Light-filled corner two-bedroom.',
    },
  ];

  const railRef = useRef(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let i = 0;
    const id = setInterval(() => {
      if (!rail) return;
      i = (i + 1) % apartments.length;
      const cardWidth = rail.firstChild?.getBoundingClientRect().width || 320;
      rail.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' });
    }, 3500);
    return () => clearInterval(id);
  }, [apartments.length]);

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-secondary font-semibold tracking-widest uppercase">Our Apartments</p>
          <h2 className="text-4xl font-bold text-primary">Featured Listings</h2>
        </div>
        <Link to="/apartment" className="btn btn-outline btn-secondary">Browse all</Link>
      </div>

      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {apartments.map((apt) => (
          <div key={apt.id} className="min-w-[320px] max-w-[320px] snap-start">
            <div className="card bg-base-100 border border-base-200 hover:shadow-xl transition-all duration-300">
              <figure className="h-48">
                <img src={apt.image} alt={apt.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{apt.title}</h3>
                <p className="text-base-content/70">{apt.description}</p>
                <div className="card-actions justify-end">
                  <Link to="/apartment" className="btn btn-secondary btn-sm">See more</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Amenities mosaic (visual impact) ---
const AmenitiesMosaic = () => {
  const items = [
    {
      label: 'Rooftop Lounge',
      img: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      span: 'col-span-2 row-span-2',
    },
    {
      label: 'Fitness Studio',
      img: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      span: '',
    },
    {
      label: 'Green Courtyard',
      img: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      span: '',
    },
    {
      label: 'Co-working Pods',
      img: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      span: 'col-span-2',
    },
  ];
  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="text-secondary font-semibold tracking-widest uppercase mb-2">Lifestyle</p>
        <h2 className="text-4xl font-bold text-primary">Spaces that Inspire</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-4">
        {items.map((it, idx) => (
          <div key={idx} className={`${it.span} relative rounded-xl overflow-hidden group`}>
            <img src={it.img} alt={it.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-3 left-3 text-white font-semibold tracking-wide">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Location (compact, clean) ---
const LocationSection = () => (
  <div className="bg-base-200 rounded-2xl p-6 md:p-8">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
      <div className="lg:col-span-2">
        <p className="text-secondary font-semibold uppercase tracking-widest mb-2">Our Location</p>
        <h3 className="text-3xl font-bold text-primary mb-3">In the Heart of the City</h3>
        <p className="text-base-content/70 mb-4">
          Steps from dining, culture, and transit. Everything you need is moments away.
        </p>
        <p className="font-semibold text-secondary">123 Nexus Avenue, Urbanopolis, 12345</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent mt-4"
        >
          Explore the neighborhood
        </a>
      </div>
      <div className="lg:col-span-3 h-72 rounded-xl overflow-hidden shadow-xl">
        <MapContainer center={[40.7128, -74.006]} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[40.7128, -74.006]}>
            <Popup>Nexus Living<br />123 Nexus Avenue</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  </div>
);

// --- Testimonials (auto-scroll, snap) ---
const TestimonialsCarousel = () => {
  const reviews = [
    {
      name: 'Jessica Miller',
      role: 'Resident',
      quote:
        'Living at Nexus has been a dream. Amenities are top-notch and the team is incredibly responsive.',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1',
    },
    {
      name: 'David Chen',
      role: 'Resident',
      quote:
        'Unbeatable location and an amazing community vibe. Highly recommended!',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1',
    },
    {
      name: 'Amelia Rose',
      role: 'Resident',
      quote: 'Beautifully maintained, secure, and truly luxurious living.',
      avatar:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1',
    },
  ];
  const rail = useRef(null);
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % reviews.length;
      const w = el.firstChild?.getBoundingClientRect().width || 340;
      el.scrollTo({ left: i * (w + 16), behavior: 'smooth' });
    }, 4200);
    return () => clearInterval(id);
  }, [reviews.length]);
  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-secondary font-semibold tracking-widest uppercase mb-2">Testimonials</p>
        <h2 className="text-4xl font-bold text-primary">What Residents Say</h2>
      </div>
      <div ref={rail} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1">
        {reviews.map((r, idx) => (
          <div key={idx} className="min-w-[340px] max-w-[340px] snap-start">
            <div className="bg-base-100 p-6 rounded-xl shadow-md h-full">
              <div className="flex items-center gap-4 mb-4">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-accent" />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-base-content/60">{r.role}</div>
                </div>
              </div>
              <p className="text-base-content/80">“{r.quote}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- FAQ (compact accordion) ---
const FAQ = () => {
  const items = [
    { q: 'How do I request an apartment?', a: 'Browse apartments, submit an agreement request, and an admin will review it.' },
    { q: 'Do you offer discounts?', a: 'Yes, admins manage coupons which apply at checkout for eligible members.' },
    { q: 'Is there on-site parking?', a: 'Yes, limited reserved parking is available for members.' },
    { q: 'Are pets allowed?', a: 'Pet-friendly units are available; terms apply.' },
  ];
  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-secondary font-semibold tracking-widest uppercase mb-2">FAQ</p>
        <h2 className="text-4xl font-bold text-primary">Good to Know</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <div key={i} className="collapse collapse-arrow border border-base-200 bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">{it.q}</div>
            <div className="collapse-content text-base-content/70">
              <p>{it.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CTA ---
const CTASection = () => (
  <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white p-10 md:p-12 shadow-2xl text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Find Your Next Home at Nexus</h2>
    <p className="opacity-90 mb-6">Discover curated apartments, flexible options, and member-first perks.</p>
    <div className="flex justify-center gap-3">
      <Link to="/apartment" className="btn btn-accent">Browse Apartments</Link>
      <Link to="/login" className="btn btn-ghost text-white border-white/70 hover:bg-white hover:text-primary">Join Now</Link>
    </div>
  </div>
);

// --- Newsletter (refined) ---
const Newsletter = () => (
  <div className="rounded-2xl bg-base-100 border border-base-200 p-8 md:p-10">
    <div className="text-center max-w-2xl mx-auto mb-6">
      <h3 className="text-3xl font-bold text-primary">Stay Updated</h3>
      <p className="text-base-content/70">Get the latest announcements and offers delivered to your inbox.</p>
    </div>
    <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
      <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required />
      <button type="submit" className="btn btn-secondary w-full sm:w-auto">Subscribe</button>
    </form>
  </div>
);

// --- Main Home ---
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Banner />
      <Coupons isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <main className="container mx-auto px-4 space-y-16 md:space-y-20 my-16 md:my-20">
        <AnimatedSection>
          <StatsStrip />
        </AnimatedSection>

        <AnimatedSection>
          <FeatureGrid />
        </AnimatedSection>

        <AnimatedSection>
          <FeaturedApartments />
        </AnimatedSection>

        <AnimatedSection>
          <AmenitiesMosaic />
        </AnimatedSection>

        <AnimatedSection>
          <LocationSection />
        </AnimatedSection>

        <AnimatedSection>
          <TestimonialsCarousel />
        </AnimatedSection>

        <AnimatedSection>
          <FAQ />
        </AnimatedSection>

        <AnimatedSection>
          <CTASection />
        </AnimatedSection>

        <AnimatedSection>
          <Newsletter />
        </AnimatedSection>
      </main>
    </div>
  );
}

export default Home;