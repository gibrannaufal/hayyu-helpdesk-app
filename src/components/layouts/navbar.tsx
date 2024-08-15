import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu , X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Tambahkan state untuk animasi

  const closeNavbar = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
  <>
    <nav className="bg-white w-full  py-8 justify-around absolute top-0  hidden md:flex ">
        <Link to="/" 
        onClick={(e) => {
          e.preventDefault();
          const faqSection = document.getElementById('faq');
          if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-[#3E3E3E] font-montserrat font-semibold text-2xl cursor-pointer no-underline"
        >
        FAQ
        </Link>
        <Link to="/"
        onClick={(e) => {
          e.preventDefault();
          const kebijakanSection = document.getElementById('kebijakan');
          if (kebijakanSection) {
            kebijakanSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-[#3E3E3E] font-montserrat font-semibold text-2xl cursor-pointer no-underline">
        KEBIJAKAN
        </Link>
        <Link to="/" 
        onClick={(e) => {
          e.preventDefault();
          const bantuanSection = document.getElementById('bantuan');
          if (bantuanSection) {
            bantuanSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-[#3E3E3E] font-montserrat font-semibold text-2xl cursor-pointer no-underline">
        BANTUAN
        </Link>
        <Link to="/hapus-akun" className="text-[#3E3E3E] font-montserrat font-semibold text-2xl cursor-pointer no-underline">
        HAPUS AKUN
        </Link>
    </nav>

   {/* Navbar untuk mobile */}
   <div className="md:hidden pt-6 pr-6 flex justify-end">
        <Menu size={38} onClick={() => setIsOpen(!isOpen)} />
        {isOpen && ( 
          <div className={`fixed top-0 right-0 w-3/4 h-full bg-[#373a47] z-50 transition-transform duration-300 ${isAnimating ? 'transform translate-x-full' : ''}`}>
              <div className="flex justify-end">
                <button onClick={closeNavbar} className="p-4 text-white"> 
                  <X size={24} />
                </button>
              </div>
              <Link to="/" className="block p-4 pl-16 text-white">FAQ</Link>
              <Link to="/" className="block p-4 pl-16 text-white">KEBIJAKAN</Link>
              <Link to="/" className="block p-4 pl-16 text-white">BANTUAN</Link>
              <Link to="/hapus-akun" className="block p-4 pl-16 text-white">HAPUS AKUN</Link>
          </div>
        )}
    </div>
  </> 
  )
}

export default Navbar