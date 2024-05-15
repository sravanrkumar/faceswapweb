import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer" className="footer">
    <div className="text-center">
      <div className="text-sm mt-12 mb-3">
        &copy; Copyright <strong className="text-sm"><span>Photo Lab</span></strong>. All Rights Reserved
      </div>
      <div className="footer_links text-xs space-x-6 mb-6">
        <Link href="#"> Privacy policy </Link>
        <Link href="#">Terms of service</Link>
        <Link href="#">Contact us</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
