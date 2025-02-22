const Footer = () => {
  return (
    <footer className="bg-[#141718] py-10 lg:px-[100px] px-6 ">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div className="flex items-center lg:gap-8 gap-3 lg:flex-row flex-col">
          <h3 className="font-semibold text-white text-[30px]">3legant</h3>
          <span className="text-white lg:block hidden">|</span>
          <span className="text-white lg:hidden block w-8 h-[2px] bg-[#6C7275]"></span>
          <span className="text-[16px] font-medium text-[#E8ECEF]">
            Quà & Cửa hàng
          </span>
        </div>
        <ul className="flex lg:mt-0 mt-10 lg:flex-row flex-col items-center gap-8 text-white font-medium text-[15px]">
          <li>Trang chủ</li>
          <li>Sản phẩm</li>
          <li>Bài viết</li>
          <li>Liên hệ</li>
        </ul>
      </div>
      <div className="mt-10 py-4 border-t border[#6C7275]  text-white text-[13px] font-medium flex items-center justify-center lg:justify-start">
        <p>Copyright © 2025 3legant. All rights reserved</p>
      </div>
    </footer>
  );
};
export default Footer;
