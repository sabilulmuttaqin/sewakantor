import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Office } from "../types/require";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/Footer";

export default function Details() {
  const baseURL = "http://127.0.0.1:8000/storage";

  const { slug } = useParams<{ slug: string }>();

  const [office, setOffice] = useState<Office | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/office/${slug}`, {
        headers: {
          "X-API-KEY": "ashasjyw76wqyuasuasiu",
        },
      })
      .then((response) => {
        setOffice(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error Loading data: {error}</p>;
  }
  if (!office) {
    return <p>Kantor tidak di termukan</p>;
  }
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="./index.css" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
      <Navbar />
      <section id="Gallery" className="-mb-[50px]">
        <div className="swiper w-full">
          <div className="swiper-wrapper">
            <Swiper
              direction="horizontal"
              spaceBetween={10}
              slidesPerView="auto"
              slidesOffsetAfter={10}
              slidesOffsetBefore={10}
            >
              <SwiperSlide className="swiper-slide !w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                  <img
                    src={`${baseURL}/${office.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              </SwiperSlide>
              {office.photos.map((office) => (
                <SwiperSlide key={office.id} className="swiper-slide !w-fit">
                  <div className="w-[700px] h-[550px] overflow-hidden">
                    <img
                      src={`${baseURL}/${office.photo}`}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section
        id="Details"
        className="relative flex max-w-[1130px] mx-auto gap-[30px] mb-20 z-10"
      >
        <div className="flex flex-col w-full rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <p className="w-fit rounded-full p-[6px_16px] bg-primary font-bold text-sm leading-[21px] text-[#F7F7FD]">
            Popular
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-extrabold text-[32px] leading-[44px]">
                {office.name}
              </h1>
              <div className="flex items-center gap-[6px] mt-[10px]">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 5.svg"
                  className="w-5 h-5"
                  alt="star"
                />
              </div>
              <p className="font-semibold text-right">4.5/5 (19,384)</p>
            </div>
          </div>
          <p className="leading-[30px]">{office.about}</p>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">You Get What You Need Most</h2>
          <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/security-user.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Privacy</p>
                <p className="text-sm leading-[21px]">For Yourself</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/cup.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Global Event</p>
                <p className="text-sm leading-[21px]">Startup Contest</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/home-trend-up.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">
                  Sustainbility
                </p>
                <p className="text-sm leading-[21px]">Long-term Goals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/coffee.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Extra Snacks</p>
                <p className="text-sm leading-[21px]">Work-Life Balance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/3dcube.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Compact</p>
                <p className="text-sm leading-[21px]">Good for Focus</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/group.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Free Move</p>
                <p className="text-sm leading-[21px]">Anytime 24/7</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[6px]">
            <h2 className="font-bold">Office Address</h2>

            {office.name}
            <br />
            {office.address}
          </div>
          <div className="overflow-hidden w-full h-[280px]">
            <div
              id="my-map-display"
              className="h-full w-full max-w-[none] bg-none"
            >
              <iframe
                className="h-full w-full border-0"
                frameBorder={0}
                src={`https://www.google.com/maps/embed/v1/place?q=${office.address},&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              />
            </div>
            <a
              className="from-embedmap-code"
              href="https://www.bootstrapskins.com/themes"
              id="enable-map-data"
            >
              premium bootstrap themes
            </a>
          </div>
        </div>
        <div className="w-[392px] flex flex-col shrink-0 gap-[30px]">
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
            <div>
              <p className="font-extrabold text-[32px] leading-[48px] text-primary">
                Rp {office.price.toLocaleString("id")}
              </p>
              <p className="font-semibold mt-1">
                For {office.duration} days working
              </p>
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-5">
              {office.benefits.map((office) => (
                <div key={office.id} className="flex items-center gap-3">
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[30px] h-[30px]"
                    alt="icon"
                  />
                  <p className="font-semibold leading-[28px]">{office.name}</p>
                </div>
              ))}
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-[14px]">
              {/* <Link to={`/office/:slug/book`}> */}
              <Link to={`/office/${office.slug}/book`}>
                <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-primary font-bold text-[#F7F7FD]">
                  <img
                    src="/assets/images/icons/slider-horizontal-white.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                  <span>Book This Office</span>
                </div>
              </Link>
              <button className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[16px_26px] gap-3 bg-white font-semibold">
                <img
                  src="/assets/images/icons/save-add.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <span>Save for Later</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[20px] bg-white">
            <h2 className="font-bold">Contact Us</h2>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/pas.jpg"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Sabilul </p>
                    <p className="text-sm leading-[21px]">Owner</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/haydar.jpg"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Haidar</p>
                    <p className="text-sm leading-[21px]">CEO </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/alpan.jpg"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Alpan</p>
                    <p className="text-sm leading-[21px]">Product Manager </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/agym.jpg"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Agym</p>
                    <p className="text-sm leading-[21px]">IT Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/eko.jpg"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Eka</p>
                    <p className="text-sm leading-[21px]">HR Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
