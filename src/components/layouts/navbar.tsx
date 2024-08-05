import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white w-full flex py-8 justify-around absolute top-0 ">
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
  )
}

export default Navbar