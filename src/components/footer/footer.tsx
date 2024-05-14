import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer" className="footer">
    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>Photo Lab</span></strong>. All Rights Reserved
      </div>
      <div className="footer_links text-center">
        <Link href="#"> Privacy policy </Link>
        <Link href="#">Terms of service</Link>
        <Link href="#">Contact us</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
