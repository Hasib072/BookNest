// frontend/src/components/TopRatedSection.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // For prop type validation
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import React Icons for rating stars
import { FaStar } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

import Loader from './Loader'; // Ensure you have a Loader component
import { Link } from 'react-router-dom';

const TopRatedSection = ({ topRatedBooks, loading, error }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loader /> {/* Display loader while fetching */}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </section>
    );
  }

  if (!topRatedBooks || topRatedBooks.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-gray-600 text-center">
            No top-rated books available at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Section Title */}
        <h2
          className="text-4xl font-lora font-semibold text-center text-gray-600 mb-10"
          data-aos="fade-in"
        >
          Top Rated Books
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Swiper Carousel */}
          <Swiper
            slidesPerView={4}
            centeredSlides={false}
            spaceBetween={10}
            loop={true}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {topRatedBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <Link to={`/books/${book._id}`} className="w-full">
                <div className="rounded-lg p-4 flex flex-col items-center">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_BASE_URI}${book.cover}`}
                    alt={`${book.title} cover`}
                    className="w-40 h-60 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-lora text-gray-800 text-center">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 text-center">
                    by {book.author}
                  </p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {book.averageRating}
                    </span>
                  </div>
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Fade-out Gradients on Sides */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

// Prop type validation
TopRatedSection.propTypes = {
  topRatedBooks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      averageRating: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

TopRatedSection.defaultProps = {
  topRatedBooks: [],
  loading: false,
  error: null,
};

export default TopRatedSection;
