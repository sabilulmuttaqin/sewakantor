import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SuccessBooking() {
  const location = useLocation();
  const { office, booking } = location.state || {};
  const baseURL = "http://127.0.0.1:8000/storage";

  if (!office || !booking) {
    return (
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./output.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Navbar />
        <section className="flex flex-1 py-10">
          <div className="flex flex-col w-[450px] m-auto rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white text-center">
            <h1 className="font-extrabold text-[28px] leading-[38px] text-red-500">
              Data Tidak Ada
            </h1>
            <p className="font-semibold leading-[28px]">
              Silakan coba lagi atau hubungi dukungan pelanggan.
            </p>
            <Link to={"/"}>
              <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD] mt-4">
                <span>Kembali ke Beranda</span>
              </div>
            </Link>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="./output.css" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <section className="flex flex-1 py-10">
        <div className="flex flex-col w-[450px] m-auto rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <img
              src="/assets/images/icons/verify.svg"
              className="w-[50px] h-[50px] flex shrink-0"
              alt="icon"
            />
            <h1 className="font-extrabold text-[28px] leading-[38px]">
              Booking Finished
            </h1>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <img
                src={`${baseURL}/${office.thumbnail}`}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">{office.name}</p>
              <div className="flex items-center gap-[6px]">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <img
              src="/assets/images/icons/receipt-text.svg"
              className="w-[34px] h-[34px]"
              alt="icon"
            />
            <div>
              <p className="font-bold">{booking.booking_trx_id}</p>
              <p className="text-sm leading-[21px] mt-[2px]">
                Save your booking ID securely
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <p className="font-semibold leading-[28px] text-center">
            Pesanan Anda sedang kami proses, kami akan menginformasikan status
            Anda melalui SMS
          </p>
          <Link to={"/check-booking"}>
            <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]">
              <span>View Booking Details</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
