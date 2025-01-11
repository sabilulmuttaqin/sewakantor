import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white navbar">
      <div className="flex items-center justify-between w-full max-w-[1130px] py-[22px] mx-auto">
        <Link to={`/`}>
          <div>
            <img
              src="/assets/images/logos/Logo2.png"
              alt="logo"
              className="max-w-[120px]" // Atur ukuran maksimal logo di sini
            />
          </div>
        </Link>
        <ul className="flex items-center gap-[50px] w-fit">
          <li>
            <Link to={`/`}>
              <p>Browse</p>
            </Link>
          </li>
          <li>
            <Link to={`/check-booking`}>
              <div>My Booking</div>
            </Link>
          </li>
        </ul>
        <a
          href="#"
          className="flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5"
        >
          <img
            src="/assets/images/icons/call.svg"
            className="w-6 h-6"
            alt="icon"
          />
          <span className="font-semibold">Contact Us</span>
        </a>
      </div>
    </nav>
  );
}
