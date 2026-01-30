import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductModal from '../components/ProductModal';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import '../App.css';

/* -------------------- SECTION WRAPPER -------------------- */
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

/* -------------------- CATEGORY CARD -------------------- */
const CategoryCard = ({ item }) => (
  <Link
    to={`/collection?category=${item.slug}`}
    className="home-category-card home-category-card--circle"
  >
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
      {item.description && (
        <p className="home-category-description">{item.description}</p>
      )}
    </motion.div>
  </Link>
);

/* -------------------- PRODUCT CARD -------------------- */
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

/* -------------------- TESTIMONIAL CARD -------------------- */
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

/* ========================== HOME ========================== */
const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const location = useLocation();

  const handleExploreCategories = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document
        .getElementById('categories')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* -------------------- HERO SLIDES -------------------- */
  const heroSlides = [
    {
      id: 0,
      title: 'Natural fibres, everyday comfort.',
      image: '/images/DSCF4055.jpg',
      mode: 'full',
      textMode: 'light',
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

  /* -------------------- DATA -------------------- */
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
      text:
        'Lovely quality and very soft on the skin. The weave feels premium and the finish is neat.',
    },
    {
      id: 2,
      name: 'Customer Name 2',
      location: 'City, India',
      text:
        'The cotton feels breathable and comfortable. Happy with the stitching and the fit.',
    },
    {
      id: 3,
      name: 'Customer Name 3',
      location: 'City, India',
      text:
        'Simple, elegant designs that work well for everyday use. Planning to reorder in more colours.',
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

  /* -------------------- AUTO SLIDE -------------------- */
  useEffect(() => {
    const current = heroSlides[activeSlide];
    if (current.mode === 'video') return;

    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  const currentSlide = heroSlides[activeSlide];

  /* ========================== RENDER ========================== */
  return (
    <div className="home-page">
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <section className="home-hero">
        <div className="home-hero-media-wrapper">
          <img
            className="hero-media"
            src={currentSlide.image}
            alt="Hero slide"
            style={{
              objectPosition:
                currentSlide.objectPosition || 'center center',
            }}
          />
        </div>

        <div className="home-hero-overlay">
          <div className="container">
            <motion.div
              className={`home-hero-copy ${
                currentSlide.id !== 0 ? 'hero-bottom-right' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="home-hero-title">{currentSlide.title}</h1>

              <div className="home-hero-actions">
                <Link to="/collection" className="btn btn-primary">
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
            </motion.div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="hero-carousel-controls">
          <button
            className="hero-arrow hero-arrow-left"
            onClick={() =>
              setActiveSlide(
                (prev) =>
                  (prev - 1 + heroSlides.length) %
                  heroSlides.length
              )
            }
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
              />
            ))}
          </div>

          <button
            className="hero-arrow hero-arrow-right"
            onClick={() =>
              setActiveSlide(
                (prev) => (prev + 1) % heroSlides.length
              )
            }
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
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

      {/* ---------------- CUSTOM ---------------- */}
      <Section
        id="custom"
        bg="alt"
        title="Sized and styled for your space"
        subtitle="Create combinations that suit your home."
      >
        <div className="custom-grid">
          <div className="custom-copy">
            <h3>Made-to-order options</h3>
            <p>
              Experience the luxury of personalized home textiles,
              tailored for your space and lifestyle.
            </p>
            <ul className="custom-list">
              <li>Customized sets and hampers</li>
              <li>Coordinated colour palettes</li>
              <li>Direct sizing support</li>
            </ul>
          </div>
          <div className="custom-image-block">
            <img
              src="/images/design_purple.png"
              alt="Custom textiles"
            />
          </div>
        </div>
      </Section>

      {/* ---------------- FEATURED ---------------- */}
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

      {/* ---------------- TESTIMONIALS ---------------- */}
      <Section
        id="reviews"
        title="What customers can say here"
        subtitle="Short reviews about touch and comfort."
      >
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* ---------------- BLOG ---------------- */}
      <Section
        id="content"
        bg="alt"
        title="From the journal"
        subtitle="Articles, guides and campaigns."
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
