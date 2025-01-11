import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Office } from "../types/require";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { BookingSchema } from "../types/validationBooking";
import Footer from "../components/Footer";

export default function BookOffice() {
  const { slug } = useParams<{ slug: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    started_at: "",
    office_space_id: "",
    totalAmountWithUniqueCode: 0,
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [UniqueCode, setUniqueCode] = useState<number>(0);
  const [totalAmountWithUniqueCode, setTotalAmountWithUniqueCode] =
    useState<number>(0);

  const baseURL = "http://127.0.0.1:8000/storage";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/office/${slug}`, {
        headers: {
          "X-API-KEY": "ashasjyw76wqyuasuasiu",
        },
      })
      .then((response) => {
        setOffice(response.data.data);
        const officeSpaceId = response.data.data.id;
        const generateUniqueCode = Math.floor(100 + Math.random() * 123);
        const grandTotalPrice = response.data.data.price - generateUniqueCode;

        setUniqueCode(generateUniqueCode);
        setTotalAmountWithUniqueCode(grandTotalPrice);

        setFormData((prevData) => ({
          ...prevData,
          office_space_id: officeSpaceId,
          total_amount: grandTotalPrice,
        }));

        setLoading(false);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          console.log("Error fetching data: ", error.message);
          setError(error.message);
        } else {
          console.log("Unexpected error: ", error);
          setError("Unexpected Error ");
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error Loading data: {error}</p>;
  }
  if (!office) {
    return <p>Kantor tidak di temukan</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Validating data...");
    const validation = BookingSchema.safeParse(formData);

    if (!validation.success) {
      console.log("Validating error: ", validation.error.issues);
      setFormErrors(validation.error.issues);
      return;
    }

    console.log("Vali data, Submitting... ", formData);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/booking-transaction",
        {
          ...formData,
        },
        {
          headers: {
            "X-API-KEY": "ashasjyw76wqyuasuasiu",
          },
        }
      );
      // console.log("Response dari API:", response.data);
      navigate("/success-booking", {
        state: {
          office,
          booking: response.data.data,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Error fetching data: ", error.message);
        setError(error.message);
      } else {
        console.log("Unexpected error: ", error);
        setError("Unexpected Error ");
      }
    } finally {
      setLoading(false);
    }
  };
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

      <div
        id="Banner"
        className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]"
      >
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-black mb-5 z-20">
          Start Booking Your Office
        </h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img
          src={`${baseURL}/${office.thumbnail}`}
          className="absolute w-full h-full object-cover object-top"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20"
      >
        <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
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
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Complete The Details</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Full Name
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
                <img
                  src="/assets/images/icons/security-user-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your complete name"
                />
              </div>
              {formErrors.find((error) => error.path.includes("name")) && (
                <p className="text-[#FF2D2D]">Name is required</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold">
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
                <img
                  src="/assets/images/icons/call-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  id="phone_number"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your valid number"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("phone_number")
              ) && <p className="text-[#FF2D2D]">Phone Number is required</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-semibold">
                Started At
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-primary overflow-hidden">
                <img
                  src="/assets/images/icons/calendar-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="date"
                  name="started_at"
                  value={formData.started_at}
                  onChange={handleChange}
                  id="started_at"
                  className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("started_at")
              ) && <p className="text-[#FF2D2D]">Started at is required</p>}
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-3">
            <p className="font-semibold leading-[28px]">
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
            </p>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-bold">Bonus Packages For You</h2>
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/icons/coffee.svg"
                  className="w-[34px] h-[34px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">
                    Extra Snacks
                  </p>
                  <p className="text-sm leading-[21px]">Work-Life Balance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/icons/group.svg"
                  className="w-[34px] h-[34px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">Free Move</p>
                  <p className="text-sm leading-[21px]">Anytime 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <h2 className="font-bold">Your Order Details</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Duration</p>
              <p className="font-bold">{office.duration} Days Working</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Sub Total</p>
              <p className="font-bold">
                Rp {office.price.toLocaleString("id")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Unique Code</p>
              <p className="font-bold text-[#FF2D2D]">
                -Rp {UniqueCode.toLocaleString("id")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[22px] leading-[33px] text-primary">
                Rp{" "}
                {totalAmountWithUniqueCode.toLocaleString("id", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white">
              <img
                src="/assets/images/icons/Polygon 1.svg"
                className="absolute -top-[15px] right-[10px] "
                alt=""
              />
              <p className="font-semibold text-sm leading-[24px] z-10">
                Tolong perhatikan kode unik berikut ketika melakukan pembayaran
                kantor
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">Send Payment to</h2>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/bca.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">sewakantor Official</p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>8008129839</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/mandiri.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">sewakantor Official</p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>12379834983281</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-primary font-bold text-[#F7F7FD]"
          >
            <span>{loading ? "Loading..." : "I’ve Made The Payment"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
