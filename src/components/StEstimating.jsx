import React, { useState } from 'react';
import EstimateSummary from './EstimationSum';
import FeatureCard from './Featurecard';

function StEstimating() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const features = [
    { title: "Landing Page", desc: "A responsive single page to showcase your business", price: 250, hours: 5 },
    { title: "Contact Form", desc: "Form with validation and email notifications", price: 150, hours: 3 },
    { title: "Blog System", desc: "Full blog with categories and comments", price: 450, hours: 9 },
    { title: "Authentication", desc: "User login, registration and password reset", price: 350, hours: 7 },
    { title: "Admin Dashboard", desc: "Backend interface to manage content", price: 550, hours: 11 },
    { title: "E-commerce", desc: "Product catalog, cart and checkout", price: 750, hours: 15 },
    { title: "Payment Integration", desc: "Stripe or PayPal payment processing", price: 300, hours: 6 },
    { title: "API Integration", desc: "Connect to third-party services", price: 400, hours: 8 },
    { title: "SEO Setup", desc: "Meta tags, sitemap and search optimization", price: 200, hours: 4 },
    { title: "Chatbot / Live Chat", desc: "Real-time customer support chat", price: 350, hours: 7 },
  ];

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => {
      const exists = prev.find((f) => f.title === feature.title);
      if (exists) {
        return prev.filter((f) => f.title !== feature.title);
      } else {
        return [...prev, feature];
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Plan your next freelance project</h2>
        <p className="text-gray-600 text-lg">
          Select features, get instant cost & time estimates, and generate a scope document.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Feature Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hourly Rate Input */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What do you need?</h3>
            <div className="flex items-center gap-3">
              <label htmlFor="rate" className="text-sm font-medium text-gray-700">
                Your hourly rate:
              </label>
              <input
                type="number"
                id="rate"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <span className="text-sm text-gray-500">/hour</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                onToggle={() => toggleFeature(feature)}
                isSelected={selectedFeatures.some((f) => f.title === feature.title)}
              />
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="sticky top-6 h-fit">
          <EstimateSummary
            selectedFeatures={selectedFeatures}
            hourlyRate={hourlyRate}
          />
        </div>
      </div>
    </div>
  );
}

export default StEstimating;
