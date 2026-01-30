import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductModal from '../components/ProductModal';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import heroVideo from '../assets/Thuvaalai Version 1.mp4';
import '../App.css';

const Section = ({ title, subtitle, children, id, bg = 'default' }) => (
  <section
    id={id}
    className="section"
    style={{
      backgroundColor:
        bg === 'alt' ? 'var(--color-bg-alt)' : 'var(--color-bg)',
    }}
  >
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header-row">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  </section>
);

const CategoryCard = ({ item }) => (
  <Link to={`/collection?category=${item.slug}`} className="home-category-card home-category-card--circle">
    <motion.div
      className="home-category-card-inner"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="home-category-circle-image"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <h3 className="home-category-circle-title">{item.title}</h3>
    </motion.div>
  </Link>
);

const FeaturedProductCard = ({ item, onClick }) => (
  <motion.div
    className="product-card"
    whileHover={{ y: -8 }}
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    onClick={() => onClick(item)}
  >
    <div className="product-image-wrapper">
      <div
        className="product-image-placeholder"
        style={{ backgroundImage: `url(${item.image})` }}
      />
    </div>
    <div className="product-info">
      <span className="product-tag">{item.tag}</span>
      <h3>{item.name}</h3>
      <p className="price">{item.price}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ item }) => (
  <motion.div
    className="testimonial-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="testimonial-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} fill="#FFD700" stroke="none" />
      ))}
    </div>
    <p className="testimonial-text">{item.text}</p>
    <div className="testimonial-meta">
      <span className="testimonial-author">{item.name}</span>
      <span className="testimonial-location">{item.location}</span>
    </div>
  </motion.div>
);

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef(null);
  const location = useLocation();

  const handleExploreCategories = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroSlides = [
    {
      id: 0,
      title: 'Natural fibres, everyday comfort.',
      mode: 'video',
      video: heroVideo,
    },
    {
      id: 1,
      title: 'Timeless Quality',
      image: '/images/DSCF3925.jpg',
      pill: 'Built for repeated, real-world use.',
      mode: 'full',
      textMode: 'light',
    },
    {
      id: 2,
      title: 'Everyday Luxury',
      image: '/images/DSCF3845.JPG',
      pill: 'Everyday cotton, thoughtfully woven.',
      mode: 'full',
      objectPosition: 'center 35%',
      textMode: 'light',
    },
    {
      id: 3,
      title: 'Elegant Designs',
      image: '/images/DSCF3853.JPG',
      pill: 'Soft colour stories for daily use.',
      mode: 'full',
      objectPosition: 'center 35%',
      textMode: 'light',
    },
  ];

  const categoryTiles = [
    {
      id: 1,
      slug: 'bath-towels',
      title: 'Bath Towels',
      description: 'Soft, absorbent bath towels in everyday-friendly weaves.',
      image: '/images/product_white.png',
    },
    {
      id: 2,
      slug: 'hooded-towels',
      title: 'Hooded Towels',
      description: 'Cozy wraps designed especially for little ones.',
      image: '/images/product_pink.png',
    },
    {
      id: 3,
      slug: 'washcloths',
      title: 'Washcloths & Sets',
      description: 'Gentle cloths and bundles for daily care routines.',
      image: '/images/DSCF3845.JPG',
    },
    {
      id: 4,
      slug: 'gift-boxes',
      title: 'Gift Boxes',
      description: 'Ready-to-gift combinations for special occasions.',
      image: '/images/DSCF3853.JPG',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Everyday Cotton Bath Towel',
      price: '₹1,899',
      tag: 'Best seller',
      image: '/images/product_white.png',
    },
    {
      id: 2,
      name: 'Bordered Hooded Towel',
      price: '₹2,299',
      tag: 'New arrival',
      image: '/images/product_pink.png',
    },
    {
      id: 3,
      name: 'Soft Weave Washcloth Set',
      price: '₹899',
      tag: 'Online exclusive',
      image: '/images/product_blue.png',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Customer Name 1',
      location: 'City, India',
      text: 'Lovely quality and very soft on the skin. The weave feels premium and the finish is neat.',
    },
    {
      id: 2,
      name: 'Customer Name 2',
      location: 'City, India',
      text: 'The cotton feels breathable and comfortable. Happy with the stitching and the fit.',
    },
    {
      id: 3,
      name: 'Customer Name 3',
      location: 'City, India',
      text: 'Simple, elegant designs that work well for everyday use. Planning to reorder in more colours.',
    },
  ];

  const blogTeasers = [
    {
      id: 1,
      title: 'Caring for pure cotton pieces at home',
      tag: 'Care & maintenance',
    },
    {
      id: 2,
      title: 'Picking the right towel for sensitive skin',
      tag: 'Buyer’s guide',
    },
  ];

  // Automatically advance non-video slides after a fixed duration.
  // Video slides advance only after the video has finished playing.
  useEffect(() => {
    const current = heroSlides[activeSlide];

    if (current.mode === 'video') {
      return undefined;
    }

    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // ~3s for image-based slides

    return () => clearTimeout(timer);
  }, [activeSlide]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="home-page">
      <Navbar />

      <section className="home-hero">
        <div
          className={`home-hero-media-wrapper ${currentSlide.image?.includes('hero_baby') ? 'hero-media-baby' : ''
            }`}
        >
          {currentSlide.mode === 'video' ? (
            <video
              ref={videoRef}
              key={currentSlide.id}
              className="hero-media"
              src={currentSlide.video}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.playbackRate = 1.2; // play ~20% faster
                }
              }}
              onEnded={() =>
                setActiveSlide((prev) => (prev + 1) % heroSlides.length)
              }
            />
          ) : (
            <img
              className="hero-media"
              src={currentSlide.image}
              alt="Stack of soft cotton pieces"
              style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
            />
          )}
        </div>

        <div className="home-hero-overlay">
          <div className="container">
            <motion.div
              className={`home-hero-copy ${currentSlide.mode === 'video' ? 'hero-copy-on-video' : ''} ${currentSlide.id !== 0 ? 'hero-bottom-right' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {(currentSlide.mode === 'full' ||
                (currentSlide.mode === 'video' && currentSlide.title)) && (
                  <>
                    <h1 className="home-hero-title" style={currentSlide.textMode === 'light' ? { color: '#fff' } : {}}>
                      {currentSlide.title}
                    </h1>
                    <div className="home-hero-actions">
                      <Link to="/collection" className="btn btn-primary" style={currentSlide.textMode === 'light' ? { marginTop: '1rem', background: '#fff', color: '#000', border: 'none' } : {}}>
                        Shop Now
                      </Link>
                    </div>
                    {currentSlide.id === 0 && (
                      <div className="hero-badges-row">
                        <span>Natural fibres</span>
                        <span>In-house weaving</span>
                        <span>Made in India</span>
                      </div>
                    )}
                  </>
                )}
            </motion.div>
          </div>
        </div>

        {/* Arrows and dots over the image (inside carousel) */}
        <div className="hero-carousel-controls">
          <button
            className="hero-arrow hero-arrow-left"
            onClick={() =>
              setActiveSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
              )
            }
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="hero-carousel-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-dot ${index === activeSlide ? 'active' : ''
                  }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="hero-arrow hero-arrow-right"
            onClick={() =>
              setActiveSlide((prev) => (prev + 1) % heroSlides.length)
            }
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Category tiles */}
      <Section
        id="categories"
        title="Shop by category"
        subtitle="Browse by the pieces you reach for every day."
      >
        <div className="home-category-grid">
          {categoryTiles.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Custom & made-for-you section */}
      <Section
        id="custom"
        bg="alt"
        title="Sized and styled for your space"
        subtitle="Create combinations that suit your home—from colours to textures and sets."
      >
        <div className="custom-grid">
          <div className="custom-copy">
            <h3>Made-to-order options</h3>
            <p>
              Experience the luxury of personalized home textiles. Whether you need specific dimensions for your unique furniture or a curated bundle for a complete home makeover, we are here to craft it for you.
            </p>
            <p>
              Our design team works closely with you to select the perfect weaves and colors that harmonize with your interior decor, ensuring every piece reflects your personal style and comfort needs.
            </p>
            <ul className="custom-list">
              <li>Customized sets and premium hampers perfect for gifting</li>
              <li>Coordinated colour palettes that seamlessly flow across rooms</li>
              <li>Direct support via chat or email for expert sizing advice</li>
            </ul>
          </div>
          <div className="custom-image-block">
            <img
              src="/images/design_purple.png"
              alt="Stack of folded textiles"
            />
          </div>
        </div>
      </Section>

      {/* Featured products */}
      <Section
        id="featured"
        title="Featured pieces"
        subtitle="A snapshot of what people tend to pick first."
      >
        <div className="product-grid">
          {featuredProducts.map((item) => (
            <FeaturedProductCard
              key={item.id}
              item={item}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </Section>

      {/* Cotton philosophy / story teaser */}


      {/* Testimonials */}
      <Section
        id="reviews"
        title="What customers can say here"
        subtitle="Short reviews that speak about touch, comfort and durability."
      >
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Blog / content teasers */}
      <Section
        id="content"
        bg="alt"
        title="From the journal"
        subtitle="Use this section to link to articles, guides or campaigns."
      >
        <div className="blog-grid">
          {blogTeasers.map((item) => (
            <motion.article
              key={item.id}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="blog-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <button className="link-button">
                Read more <ArrowRight size={16} />
              </button>
            </motion.article>
          ))}
        </div>
      </Section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
};

export default Home;
