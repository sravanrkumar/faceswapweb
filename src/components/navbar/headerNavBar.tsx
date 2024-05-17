import Link from "next/link";
import Image from "next/image";

const HeaderNavbar = () => {
  return (
  //   <header id="header" className="header d-flex align-items-center">
  //   <div className="container d-flex align-items-center justify-content-between">
  //       <Link href="/" className="logo d-flex align-items-center  me-auto me-lg-0">
  //           <i className="bi bi-camera"></i>
  //           <h1>PhotoFolio</h1>
  //       </Link>
  //       <b >Photo Lab Picture Editor & Art</b>
  //       <div className="header-social-links">
  //           <Link href="/" className="twitter"><Image src={"/assets/img/googleplay.png"} className="img-fluid" width={160} height={200} alt=""/></Link>
  //           <Link href="/" className="facebook"><Image src={"/assets/img/appstore.png"} className="img-fluid" width={150} height={200} alt=""/></Link>
  //       </div>
  //       <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
  //       <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
  //   </div>
  // </header>
  <div>
    

<nav className="p-2 w-full  border-b border-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
  <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap ">Faceswapmagic</span>
  </Link>
  <div className="flex md:order-2 space-x-3 ">
            <Link href="https://play.google.com/store/apps/details?id=com.hangoverstudios.faceswap.ai.art.avatar.generator" target="_blank" className="twitter"><Image src={"/assets/img/googleplay.png"} className="img-fluid" width={130} height={200} alt=""/></Link>
            <Link href="https://apps.apple.com/in/app/face-swap-magic-ai-avatars/id6479648021" target="_blank" className="facebook"><Image src={"/assets/img/appstore.png"} className="img-fluid" width={120} height={200} alt=""/></Link>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
  <b>Photo Lab Picture Editor & Art</b>
  </div>
  </div>
</nav>

  </div>
  
  );
};

export default HeaderNavbar;
