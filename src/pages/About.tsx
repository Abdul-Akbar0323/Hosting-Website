import { Link } from 'react-router-dom';
import { heroImages } from '@/data/products';
import { Leaf, Users, Globe, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.about} alt="NOVAÉ About" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="max-w-2xl text-white">
            <p className="text-sm uppercase tracking-widest mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Curated for the way you live.</h1>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-nova-900 mb-6">Our Philosophy</h2>
          <p className="text-lg text-nova-600 leading-relaxed">
            NOVAÉ was born from a simple belief: that the objects we surround ourselves with should be 
            thoughtful, beautiful, and built to last. We curate products that combine timeless design with 
            everyday functionality, creating a collection that elevates modern living without excess.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-16 lg:py-24 bg-nova-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-nova-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Quality First', desc: 'We partner with artisans and manufacturers who share our commitment to exceptional craftsmanship.' },
              { icon: Leaf, title: 'Sustainability', desc: 'From materials to packaging, we prioritize environmentally responsible choices at every step.' },
              { icon: Users, title: 'Community', desc: 'We believe in building lasting relationships with our customers and the makers behind our products.' },
              { icon: Globe, title: 'Global Curation', desc: 'We source from around the world, bringing together the best design from diverse cultures.' },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 bg-nova-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-nova-900 mb-2">{value.title}</h3>
                <p className="text-sm text-nova-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '36+', label: 'Curated Products' },
            { number: '15+', label: 'Partner Countries' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '4.9', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-nova-900">{stat.number}</p>
              <p className="text-sm text-nova-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="section-padding py-16 lg:py-24 bg-nova-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Commitment to Sustainability</h2>
          <p className="text-white/80 leading-relaxed mb-8">
            We believe luxury and responsibility go hand in hand. That is why we work exclusively with 
            partners who meet our rigorous standards for ethical production, fair labor practices, and 
            environmental stewardship. From organic cotton to recycled packaging, every decision reflects 
            our commitment to a better future.
          </p>
          <Link to="/shop" className="btn-primary bg-white text-nova-900 hover:bg-nova-100 inline-flex">
            Shop Responsibly
          </Link>
        </div>
      </section>
    </div>
  );
}
