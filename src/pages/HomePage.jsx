import React from 'react';
import Hero from '../components/Hero';
import TrustBenefits from '../components/TrustBenefits';
import CategorySection from '../components/CategorySection';
import BestSellersSection from '../components/BestSellersSection';
import VisitStore from '../components/VisitStore';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBenefits />
      <CategorySection />
      <BestSellersSection />
      <VisitStore />
    </main>
  );
}
