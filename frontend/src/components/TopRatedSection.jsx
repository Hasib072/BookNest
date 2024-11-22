// frontend/src/components/TopRatedSection.jsx
import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import React Icons for navigation arrows and rating stars
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

import AOS from 'aos';


const TopRatedSection = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  // Placeholder JSON data for top-rated books
  const topRatedBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: 4.8,
      cover: 'https://placehold.co/260x409', // Placeholder image
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      rating: 4.9,
      cover: 'https://placehold.co/260x409',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      rating: 4.7,
      cover: 'https://placehold.co/260x409',
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      rating: 4.6,
      cover: 'https://placehold.co/260x409',
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      rating: 4.5,
      cover: 'https://placehold.co/260x409',
    },
    // Add more books as needed
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Section Title */}
        <h2 className="text-4xl font-lora font-semibold text-center text-gray-600 mb-10" data-aos="fade-in">
          Top Rated Books
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Swiper Carousel */}
          <Swiper
            onSwiper={setSwiperRef}
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
              <SwiperSlide key={book.id}>
                <div className="rounded-lg p-4 flex flex-col items-center">
                  <img
                    src={book.cover}
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
                      {book.rating}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Fade-out Gradients on Sides */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[white] pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[white] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default TopRatedSection;
