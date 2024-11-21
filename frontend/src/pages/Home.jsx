// frontend/src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import TopRatedSection from '../components/TopRatedSection';
import DiscoverySection from '../components/DiscoverySection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <TopRatedSection />
      <DiscoverySection />
    </>
  );
};

export default Home;
