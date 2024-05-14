import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/assets/css/main.css';
const HeaderNavbar = () => {
  return (
    <header id="header" className="header d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center  me-auto me-lg-0">
            <i className="bi bi-camera"></i>
            <h1>PhotoFolio</h1>
        </Link>
        <b style={{fontSize:'24px'}}>Photo Lab Picture Editor & Art</b>
        <div className="header-social-links">
            <Link href="/" className="twitter"><Image src={"/assets/img/googleplay.png"} className="img-fluid" width={160} height={200} alt=""/></Link>
            <Link href="/inner-page" className="facebook"><Image src={"/assets/img/appstore.png"} className="img-fluid" width={150} height={200} alt=""/></Link>
        </div>
        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
  );
};

export default HeaderNavbar;
