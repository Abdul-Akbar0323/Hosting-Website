import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Star, ChevronRight } from 'lucide-react';
import { heroImages, categories, collections, getFeaturedProducts, getBestsellers, getNewArrivals, getSaleProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } })
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featured = getFeaturedProducts().slice(0, 8);
  const bestsellers = getBestsellers().slice(0, 5);
  const newArrivals = getNewArrivals().slice(0, 6);
  const saleItems = getSaleProducts().slice(0, 4);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollTrending = (dir: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* HERO — Cinematic full-bleed with parallax */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[640px] flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={heroImages.hero} alt="NOVAÉ" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative section-padding pb-16 md:pb-24 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mb-5 font-medium"
            >
              Curated for the way you live
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            >
              Objects with<br />
              <span className="text-white/90">intention.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-white/75 max-w-lg leading-relaxed"
            >
              Premium essentials designed to fit beautifully into modern life. No excess. Only what matters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-white text-nova-950 px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-nova-100 transition-colors duration-300"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-white/90 text-sm font-medium hover:text-white transition-colors underline underline-offset-4"
              >
                Explore Lookbook
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
          <div className="w-px h-8 bg-white/30 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute w-full h-1/2 bg-white/80"
            />
          </div>
        </motion.div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="border-y border-nova-200 bg-nova-50 overflow-hidden py-5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="flex whitespace-nowrap gap-12"
        >
          {Array(2).fill(null).map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12">
              {['Timeless Design', 'Sustainable Materials', 'Artisan Crafted', 'Free Shipping over $100', '30-Day Returns', 'Curated in NYC'].map((text) => (
                <span key={text} className="text-xs uppercase tracking-[0.2em] text-nova-500 font-medium flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-nova-300" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* CATEGORIES — Editorial asymmetric grid */}
      <section className="section-padding py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Browse</p>
            <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">Shop by Category</h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-sm font-medium text-nova-700 hover:text-nova-950 transition-colors">
            View all categories
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`group relative overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <Link to={`/shop?category=${cat.id}`} className="block h-full">
                <div className={`relative overflow-hidden bg-nova-100 ${i === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[3/4]'}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className={`font-semibold text-white ${i === 0 ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
                      {cat.name}
                    </h3>
                    <p className={`text-white/70 mt-1 ${i === 0 ? 'text-sm' : 'text-xs'}`}>{cat.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS — Horizontal scroll with editorial feel */}
      <section className="py-20 lg:py-28 bg-nova-50">
        <div className="section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Fresh Drops</p>
              <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">New Arrivals</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollTrending('left')}
                disabled={!canScrollLeft}
                className="w-11 h-11 border border-nova-300 bg-white flex items-center justify-center hover:border-nova-900 hover:bg-nova-900 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => scrollTrending('right')}
                disabled={!canScrollRight}
                className="w-11 h-11 border border-nova-300 bg-white flex items-center justify-center hover:border-nova-900 hover:bg-nova-900 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide section-padding pb-4"
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[320px]">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="flex-shrink-0 w-[200px] flex flex-col items-center justify-center text-center">
            <Link to="/shop?filter=new" className="group">
              <div className="w-16 h-16 rounded-full border border-nova-300 flex items-center justify-center mb-4 group-hover:bg-nova-900 group-hover:border-nova-900 group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-nova-700 group-hover:text-nova-900">View all new arrivals</p>
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS — Full-bleed editorial cards */}
      <section className="section-padding py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Curated</p>
          <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">The Collections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link to={`/shop?collection=${col.id}`} className="group block relative aspect-[4/3] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{col.name}</h3>
                  <p className="text-sm text-white/80 mt-2 max-w-xs">{col.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                    Discover <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS — Editorial staggered grid */}
      <section className="section-padding py-20 lg:py-28 bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Most Loved</p>
            <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">Best Sellers</h2>
          </div>
          <Link to="/shop?filter=bestsellers" className="group inline-flex items-center gap-2 text-sm font-medium text-nova-700 hover:text-nova-950 transition-colors">
            See all bestsellers
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
          {bestsellers.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROMO — Split editorial banner */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-[600px]">
            <img src={heroImages.promo} alt="Lifestyle" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="bg-nova-950 text-white flex items-center p-10 md:p-16 lg:p-20">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-6">The Philosophy</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Less, but better.
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                We believe the objects you surround yourself with should be chosen with care. Each piece in our collection is selected for its quality, longevity, and quiet confidence.
              </p>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold">36+</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Products</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Countries</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-3xl font-bold">4.9</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Rating</p>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-white/80 hover:text-white transition-colors underline underline-offset-4"
              >
                Read our story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED — Asymmetric editorial grid */}
      <section className="section-padding py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Handpicked</p>
          <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">Selected for You</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border border-nova-900 text-nova-900 px-10 py-3.5 text-sm font-semibold tracking-wide hover:bg-nova-900 hover:text-white transition-colors duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SALE SECTION */}
      {saleItems.length > 0 && (
        <section className="section-padding py-20 lg:py-28 bg-nova-50">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-medium mb-3">Limited Time</p>
              <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">On Sale</h2>
            </div>
            <Link to="/offers" className="group inline-flex items-center gap-2 text-sm font-medium text-nova-700 hover:text-nova-950 transition-colors">
              View all offers
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {saleItems.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">Community</p>
            <h2 className="text-3xl md:text-4xl font-bold text-nova-950 tracking-tight">What People Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', text: 'The quality is outstanding. Every piece feels intentional and well-made. This is how online shopping should feel.', rating: 5 },
              { name: 'James K.', text: 'Finally found a store that understands modern minimalism without the pretension. Fast shipping, beautiful packaging.', rating: 5 },
              { name: 'Emily R.', text: 'I have ordered three times now. The curation is impeccable and the customer service is genuinely helpful.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-nova-50 p-8 md:p-10"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-nova-700 leading-relaxed text-[15px]">"{review.text}"</p>
                <p className="mt-6 text-sm font-semibold text-nova-900">{review.name}</p>
                <p className="text-xs text-nova-400 mt-0.5">Verified Buyer</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER — Full-bleed dark */}
      <section className="bg-nova-950 text-white">
        <div className="section-padding py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Stay in the loop</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Join the inner circle</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Be the first to access new drops, exclusive offers, and stories behind the products.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-white text-nova-950 text-sm font-semibold tracking-wide hover:bg-nova-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-[11px] text-white/30">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}