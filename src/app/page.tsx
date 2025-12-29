'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const service = formData.get('service')
    const message = formData.get('message')

    const whatsappMessage = `Halo, saya ${name} (${email}, ${phone}) tertarik dengan layanan ${service}. Pesan: ${message}`
    window.open(`https://wa.me/6285285703497?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
    e.currentTarget.reset()
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const target = document.querySelector(sectionId)
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      })
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    document.querySelectorAll('section:not(#home)').forEach(section => {
      (section as HTMLElement).style.opacity = '0';
      (section as HTMLElement).style.transform = 'translateY(20px)';
      (section as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <style jsx global>{`
        .hero-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .gradient-text {
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .btn-gradient {
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          background: linear-gradient(45deg, #4ECDC4, #FF6B6B);
          transform: scale(1.05);
        }
        .section-bg {
          background-color: rgba(255, 255, 255, 0.95);
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .meta-ads-accent {
          color: #1877F2;
        }
        .meta-ads-bg {
          background-color: #1877F2;
        }
        .whatsapp-bg {
          background-color: #25D366;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        .modal {
          display: flex;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
        }
      `}</style>

      <div className="bg-gray-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold gradient-text">CV DADE PERSADATAMA</div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-gray-700 hover:text-blue-500 transition">Beranda</a>
              <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-gray-700 hover:text-blue-500 transition">Tentang Kami</a>
              <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-gray-700 hover:text-blue-500 transition">Layanan</a>
              <a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="text-gray-700 hover:text-blue-500 transition meta-ads-accent font-bold">Meta Ads</a>
              <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="text-gray-700 hover:text-blue-500 transition">Portfolio</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-gray-700 hover:text-blue-500 transition">Kontak</a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-blue-500 focus:outline-none">
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white">
              <div className="px-4 py-2 space-y-2">
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="block text-gray-700 hover:text-blue-500 transition">Beranda</a>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="block text-gray-700 hover:text-blue-500 transition">Tentang Kami</a>
                <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="block text-gray-700 hover:text-blue-500 transition">Layanan</a>
                <a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="block text-gray-700 hover:text-blue-500 transition meta-ads-accent font-bold">Meta Ads</a>
                <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="block text-gray-700 hover:text-blue-500 transition">Portfolio</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="block text-gray-700 hover:text-blue-500 transition">Kontak</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero-bg min-h-screen flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow float-animation">CV DADE PERSADATAMA</h1>
            <h2 className="text-3xl md:text-4xl mb-8 text-shadow">Konstruksi Gedung Kesehatan Profesional</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-shadow">Membangun infrastruktur kesehatan berkualitas dengan sentuhan kreatif dan strategi pemasaran digital yang efektif melalui Meta Ads</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="btn-gradient text-white font-bold py-3 px-8 rounded-full text-lg">Hubungi Kami</a>
              <a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="meta-ads-bg text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition">Meta Ads Expert</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 section-bg">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Tentang <span className="text-gray-800">CV DADE PERSADATAMA</span></h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-6 text-gray-700">
                  <strong>CV DADE PERSADATAMA</strong> adalah perusahaan konstruksi terkemuka yang berfokus pada pembangunan gedung kesehatan berkualitas tinggi. Dengan pengalaman bertahun-tahun, kami telah membantu berbagai institusi kesehatan untuk memiliki fasilitas yang memadai dan sesuai standar.
                </p>
                <p className="text-lg mb-6 text-gray-700">
                  Keunggulan kami terletak pada pendekatan kreatif dalam desain dan pemanfaatan strategi pemasaran digital melalui Meta Ads untuk mempromosikan proyek-proyek kami kepada audiens yang tepat.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
                    <div className="text-gray-600">Proyek Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
                    <div className="text-gray-600">Kepuasan Klien</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Informasi Perusahaan</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-building text-blue-500 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Nama</h4>
                      <p className="text-gray-600">CV DADE PERSADATAMA</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-red-500 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Alamat</h4>
                      <p className="text-gray-600">BUNTU, Desa/Kelurahan Tarongko, Kec. Makale, Kab. Tana Toraja, Provinsi Sulawesi Selatan</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone text-green-500 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Telepon</h4>
                      <p className="text-gray-600">085285703497</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-purple-500 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@dadepersadatama.co.id</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Layanan Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-blue-500">
                  <i className="fas fa-hospital"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Konstruksi Rumah Sakit</h3>
                <p className="text-gray-600">Perencanaan dan pembangunan rumah sakit dengan standar internasional, desain fungsional, dan infrastruktur medis yang lengkap.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-green-500">
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Klinik & Puskesmas</h3>
                <p className="text-gray-600">Pembangunan fasilitas kesehatan primer dengan desain yang efisien dan nyaman untuk pasien serta tenaga medis.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-purple-500">
                  <i className="fas fa-vial"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Laboratorium Medis</h3>
                <p className="text-gray-600">Konstruksi laboratorium dengan sistem ventilasi, keamanan, dan layout yang sesuai standar penelitian medis.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-red-500">
                  <i className="fas fa-tooth"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Klinik Gigi & Spesialis</h3>
                <p className="text-gray-600">Desain dan pembangunan klinik gigi serta fasilitas spesialis dengan peralatan medis yang terintegrasi.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-yellow-500">
                  <i className="fas fa-store-alt"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Apotek & Optik</h3>
                <p className="text-gray-600">Pembangunan ruang ritel kesehatan dengan desain modern dan nyaman untuk pelanggan.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg card-hover text-center">
                <div className="text-5xl mb-6 text-indigo-500">
                  <i className="fas fa-warehouse"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Gudang Farmasi</h3>
                <p className="text-gray-600">Konstruksi fasilitas penyimpanan obat dengan sistem pengatur suhu dan keamanan yang sesuai standar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meta Ads Section */}
        <section id="meta-ads" className="py-20 section-bg">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Keahlian <span className="meta-ads-accent">Meta Ads</span> Kami</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Strategi Pemasaran Digital untuk Konstruksi</h3>
                  <p className="text-lg mb-6 text-gray-700">
                    Di <strong>CV DADE PERSADATAMA</strong>, kami tidak hanya ahli dalam konstruksi gedung kesehatan, tetapi juga dalam mempromosikan proyek kami melalui Meta Ads. Kami memahami bahwa industri konstruksi memerlukan pendekatan pemasaran yang berbeda dan lebih tertarget.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <i className="fab fa-facebook text-blue-600 text-2xl mr-4 mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Facebook Ads</h4>
                        <p className="text-gray-600">Kampanye iklan yang tertarget untuk mencapai investor, mitra, dan klien potensial di industri kesehatan.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fab fa-instagram text-pink-600 text-2xl mr-4 mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Instagram Ads</h4>
                        <p className="text-gray-600">Visualisasi proyek yang menarik untuk membangun citra brand dan kepercayaan klien.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-chart-line text-green-600 text-2xl mr-4 mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Analitik & Optimasi</h4>
                        <p className="text-gray-600">Pemantauan kinerja iklan dan optimasi berkelanjutan untuk ROI maksimal.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Keunggulan Meta Ads Kami</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="meta-ads-bg text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-bullseye"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Targeting Presisi</h4>
                        <p className="text-gray-600">Kami menargetkan decision maker di industri kesehatan, investor properti, dan pemerintah daerah.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="meta-ads-bg text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Biaya Efektif</h4>
                        <p className="text-gray-600">Strategi bidding yang optimal untuk mendapatkan hasil maksimal dengan anggaran yang efisien.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="meta-ads-bg text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-palette"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Kreatif Berkualitas</h4>
                        <p className="text-gray-600">Konten visual yang menarik dan profesional untuk menampilkan portofolio proyek kami.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="meta-ads-bg text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-sync-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Optimasi Berkelanjutan</h4>
                        <p className="text-gray-600">Pemantauan dan penyesuaian kampanye secara berkala untuk meningkatkan performa.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="meta-ads-bg text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition">Konsultasi Meta Ads Gratis</a>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Portfolio Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="h-48 bg-blue-500 flex items-center justify-center">
                  <i className="fas fa-hospital text-white text-6xl"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Rumah Sakit Harapan Bunda</h3>
                  <p className="text-gray-600 mb-4">Pembangunan rumah sakit tipe C dengan 100 tempat tidur di Makassar.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Selesai: 2023</span>
                    <button className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="h-48 bg-green-500 flex items-center justify-center">
                  <i className="fas fa-clinic-medical text-white text-6xl"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Klinik Pratama Sehat</h3>
                  <p className="text-gray-600 mb-4">Renovasi dan ekspansi klinik dengan fasilitas laboratorium dan apotek.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Selesai: 2023</span>
                    <button className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="h-48 bg-purple-500 flex items-center justify-center">
                  <i className="fas fa-vial text-white text-6xl"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Lab Diagnostik Tora</h3>
                  <p className="text-gray-600 mb-4">Konstruksi laboratorium medis dengan standar BSL-2 di Tana Toraja.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Selesai: 2022</span>
                    <button className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="btn-gradient text-white font-bold py-3 px-8 rounded-full text-lg">Lihat Semua Portfolio</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 section-bg">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Hubungi <span className="text-gray-800">CV DADE PERSADATAMA</span></h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Kirim Pesan</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
                      <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                      <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Nomor Telepon</label>
                      <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="service" className="block text-gray-700 font-semibold mb-2">Layanan yang Dibutuhkan</label>
                      <select id="service" name="service" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        <option value="">Pilih Layanan</option>
                        <option value="rumah-sakit">Konstruksi Rumah Sakit</option>
                        <option value="klinik">Klinik & Puskesmas</option>
                        <option value="laboratorium">Laboratorium Medis</option>
                        <option value="klinik-gigi">Klinik Gigi & Spesialis</option>
                        <option value="apotek">Apotek & Optik</option>
                        <option value="gudang">Gudang Farmasi</option>
                        <option value="meta-ads">Konsultasi Meta Ads</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Pesan</label>
                      <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <button type="submit" className="btn-gradient text-white font-bold py-3 px-8 rounded-full text-lg w-full">Kirim Pesan</button>
                  </form>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <i className="fas fa-building text-blue-500 mt-1 mr-4 text-xl"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Perusahaan</h4>
                        <p className="text-gray-600">CV DADE PERSADATAMA</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt text-red-500 mt-1 mr-4 text-xl"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Alamat</h4>
                        <p className="text-gray-600">BUNTU, Desa/Kelurahan Tarongko, Kec. Makale, Kab. Tana Toraja, Provinsi Sulawesi Selatan</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-phone text-green-500 mt-1 mr-4 text-xl"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Telepon</h4>
                        <p className="text-gray-600">085285703497</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-envelope text-purple-500 mt-1 mr-4 text-xl"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800">Email</h4>
                        <p className="text-gray-600">info@dadepersadatama.co.id</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Jam Operasional</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Senin - Jumat</span>
                      <span className="font-semibold text-gray-800">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sabtu</span>
                      <span className="font-semibold text-gray-800">08:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minggu</span>
                      <span className="font-semibold text-gray-800">Tutup</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a href="https://wa.me/6285285703497" className="whatsapp-bg text-white font-bold py-3 px-8 rounded-full text-lg w-full text-center block hover:bg-green-600 transition">
                      <i className="fab fa-whatsapp mr-2"></i> Chat via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">CV DADE PERSADATAMA</h3>
                <p className="text-gray-300">Konstruksi Gedung Kesehatan Profesional dengan pendekatan kreatif dan strategi pemasaran digital yang efektif.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Layanan</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition">Konstruksi Rumah Sakit</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition">Klinik & Puskesmas</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition">Laboratorium Medis</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition">Klinik Gigi & Spesialis</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Meta Ads</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="hover:text-white transition">Facebook Ads</a></li>
                  <li><a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="hover:text-white transition">Instagram Ads</a></li>
                  <li><a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="hover:text-white transition">Analitik & Optimasi</a></li>
                  <li><a href="#meta-ads" onClick={(e) => scrollToSection(e, '#meta-ads')} className="hover:text-white transition">Konsultasi Gratis</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><i className="fas fa-phone mr-2"></i> 085285703497</li>
                  <li><i className="fas fa-envelope mr-2"></i> info@dadepersadatama.co.id</li>
                  <li><i className="fas fa-map-marker-alt mr-2"></i> Tana Toraja, Sulawesi Selatan</li>
                </ul>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-facebook text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="https://wa.me/6285285703497" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-whatsapp text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300">&copy; 2024 CV DADE PERSADATAMA. Hak Cipta Dilindungi.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button onClick={() => setPrivacyModalOpen(true)} className="text-gray-300 hover:text-white transition">Kebijakan Privasi</button>
                <button onClick={() => setTermsModalOpen(true)} className="text-gray-300 hover:text-white transition">Syarat & Ketentuan</button>
              </div>
            </div>
          </div>
        </footer>

        {/* Privacy Modal */}
        {privacyModalOpen && (
          <div className="modal" onClick={() => setPrivacyModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="float-right text-2xl font-bold text-gray-400 hover:text-black" onClick={() => setPrivacyModalOpen(false)}>&times;</button>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Kebijakan Privasi</h2>
              <div className="text-gray-700 space-y-4">
                <p>CV DADE PERSADATAMA menghargai privasi Anda. Kami mengumpulkan informasi yang Anda berikan melalui formulir kontak untuk merespons pertanyaan dan memberikan layanan terbaik.</p>
                <p>Informasi yang dikumpulkan meliputi nama, email, nomor telepon, dan pesan Anda. Data ini hanya digunakan untuk komunikasi bisnis dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.</p>
                <p>Untuk pertanyaan tentang kebijakan privasi, hubungi kami di info@dadepersadatama.co.id</p>
              </div>
            </div>
          </div>
        )}

        {/* Terms Modal */}
        {termsModalOpen && (
          <div className="modal" onClick={() => setTermsModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="float-right text-2xl font-bold text-gray-400 hover:text-black" onClick={() => setTermsModalOpen(false)}>&times;</button>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Syarat & Ketentuan</h2>
              <div className="text-gray-700 space-y-4">
                <p>Dengan menggunakan layanan CV DADE PERSADATAMA, Anda menyetujui syarat dan ketentuan berikut:</p>
                <p>1. Layanan konstruksi kami meliputi pembangunan gedung kesehatan sesuai standar yang berlaku.</p>
                <p>2. Biaya dan jadwal proyek akan disepakati dalam kontrak tertulis.</p>
                <p>3. Perubahan proyek mungkin mengakibatkan penyesuaian biaya dan waktu.</p>
                <p>4. Kami berhak menolak proyek yang tidak sesuai dengan etika dan regulasi.</p>
                <p>Untuk informasi lebih lanjut, hubungi kami di 085285703497.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
