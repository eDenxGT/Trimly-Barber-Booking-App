// import Logo from "@/assets/logo.png"; 
import Logo from "/logo.svg"; 

export const PublicHeader = ({className}: {className?: string}) => {
  return (
    <header className={`bg-[var(--header)] text-white py-4.5 px-6 flex justify-center items-center ${className}`}>
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl font-young">Trimly</h1>
      </div>

      {/* Mobile Menu Button */}
      {/* <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button> */}

      {/* Navigation Links */}
      {/* <nav
        className={`lg:flex gap-6 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-black lg:bg-transparent p-4 lg:p-0 transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <a href="#" className="block lg:inline-block text-white hover:text-yellow-400">
          Home
        </a>
        <a href="#" className="block lg:inline-block text-white hover:text-yellow-400">
          About
        </a>
        <a href="#" className="block lg:inline-block text-white hover:text-yellow-400">
          Contact
        </a>
      </nav> */}
    </header>
  );
};

// export default Header;
