import Link from "next/link";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="container"  style={{ marginTop: '-50px', paddingBottom: '20px' }}>
    <div className="banner-layout">
      <ul className="element-shape">
        <li>
          <Image width={37} height={35} src={"https://www.radiustheme.com/demo/wordpress/themes/sasby/wp-content/uploads/2024/01/banner-2.svg"} className="attachment-full size-full"  alt=""/>
        </li>
      </ul>
      <div className="row align-items-center">
        <div className="col-xl-5 col-lg-6">
          <div className="item-img position-relative flex">
            <Image className="wow fadeInUp animated animated" data-wow-delay=".1s" data-wow-duration="1s" width={500} height={500} src={"https://www.radiustheme.com/demo/wordpress/themes/sasby/wp-content/themes/sasby//assets/img/iPhone-1.png"} alt={"iphone"} style={{visibility: 'visible', animationDuration: '1s', animationDelay: '0.1s', animationName: 'fadeInUp'}} />
            <div className="small-img">
              <Image className="wow fadeInUp animated animated" data-wow-delay=".4s" data-wow-duration="1s" width={500} height={500} src={"https://www.radiustheme.com/demo/wordpress/themes/sasby/wp-content/themes/sasby//assets/img/iPhone-2.png"} alt={"iphone"} style={{visibility: 'visible', animationDuration: '1s', animationDelay: '0.4s',animationName: 'fadeInUp'}} />
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-lg-6">
          <div className="banner-text">
            <div className="text-box">
            <p className="mb-0">READY TO GET STARTED?</p>
            <h2 className="heading-title">Helping people organise online businesses</h2>
            <div className="button-list mt-3 mt-lg-0 flex">
              <Image src={"/assets/img/googleplay.png"} className="img-fluid" width={200} height={200} alt=""/>
              <Image src={"/assets/img/appstore.png"} className="img-fluid" width={200} height={200} alt="" style={{ marginLeft:'10px'}}/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Banner;
