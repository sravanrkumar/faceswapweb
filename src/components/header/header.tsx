import Link from "next/link";
import categoryData from "@/constants/categoryData";
const keys = Object.keys(categoryData);

const Header = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 mb-6"> 
      <div className="rounded-md shadow-sm items-center justify-center flex" role="group">
          {keys.map(key => {
              const catlink = key.replace(/\s/g, '_');
              return (
                <button type="button" className="active px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:text-blue-100 focus:z-10" key={key}>
                  <Link href={`/${catlink}`}>
                    {key}
                  </Link>
                </button>
              );
          })}
      </div>
   </div>
  );
};

export default Header;
