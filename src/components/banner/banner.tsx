import Link from "next/link";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="">
    <div className="banner-layout">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="text-end">
          <div className="item-img position-relative flex justify-end">
            <Image className="wow fadeInUp animated animated"  width={250} height={500} src={"https://www.radiustheme.com/demo/wordpress/themes/sasby/wp-content/themes/sasby//assets/img/iPhone-1.png"} alt={"iphone"} style={{visibility: 'visible', animationDuration: '1s', animationDelay: '0.1s', animationName: 'fadeInUp'}} />
            <Image className="wow fadeInUp animated animated"  width={250} height={500} src={"https://www.radiustheme.com/demo/wordpress/themes/sasby/wp-content/themes/sasby//assets/img/iPhone-1.png"} alt={"iphone"} style={{visibility: 'visible', animationDuration: '1s', animationDelay: '0.1s', animationName: 'fadeInUp'}} />
          </div>
        </div>
        <div className="">
          <div className="banner-text">
            <div className="text-box">
            <p className="mb-0">READY TO GET STARTED?</p>
            <h2 className="heading-title">Helping people organise online businesses</h2>
            <div className="button-list mt-3 mt-lg-0 flex">
              <Image src={"/assets/img/googleplay.png"} className="img-fluid" width={150} height={200} alt=""/>
              <Image src={"/assets/img/appstore.png"} className="img-fluid" width={150} height={200} alt="" style={{ marginLeft:'10px'}}/>
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
