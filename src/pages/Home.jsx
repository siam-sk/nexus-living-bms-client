import { useState, useEffect } from 'react';

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

function Home() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Nexus Living</h2>
          <p className="text-lg text-base-content max-w-3xl mx-auto">
            Discover a new standard of living where luxury meets convenience. Our
            apartments offer breathtaking views, modern designs, and a vibrant
            community. Your new home awaits.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;