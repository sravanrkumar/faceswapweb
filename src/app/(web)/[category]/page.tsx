"use client"
import Gallery from "@/components/gallery";
interface AdmincategoryPageProps {
  params: {
    category:  string ;
  };
}
export default function CategoryImagesList(props: AdmincategoryPageProps) {
  const Catname = props?.params?.category;
  return (
    <>
    <div className="lg:w-[724px] m-auto">
      <Gallery categoryName={Catname}/>
    </div>
    </>
  );
}
