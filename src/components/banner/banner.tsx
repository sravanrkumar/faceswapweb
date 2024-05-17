import Link from "next/link";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="">
    <div className="banner-layout">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="text-end">
          <div className="item-img position-relative flex justify-end">
            <Image className="wow fadeInUp animated animated" width={450} height={500} src={"/assets/img/photolab2.png"} alt={"iphone"} />
           
          </div>
        </div>
        <div className="">
          <div className="banner-text">
            <div className="text-box">
            <p className="mb-2">READY TO GET STARTED?</p>
            <h2 className="heading-title">Helping people organise online businesses</h2>
            <div className="button-list mt-3 mt-lg-0 flex">
            <Link href="https://play.google.com/store/apps/details?id=com.hangoverstudios.faceswap.ai.art.avatar.generator" target="_blank" className="twitter"><Image src={"/assets/img/googleplay.png"} className="img-fluid" width={150} height={200} alt=""/></Link>
            <Link href="https://apps.apple.com/in/app/face-swap-magic-ai-avatars/id6479648021" className="facebook" target="_blank"> <Image src={"/assets/img/appstore.png"} className="img-fluid" width={150} height={200} alt="" style={{ marginLeft:'10px'}}/></Link>
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
