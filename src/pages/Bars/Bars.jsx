import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  ArrowLeftRight,
  ChartColumn,
  FolderKanban,
  LayoutDashboard,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Bars({ setOpense }) {
  const menuRef = useRef();
  const [ie, setIe] = useState(false);

  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    gsap.fromTo(menuRef.current, { x: "100%" }, { x: "0%", duration: 0.6 });
  }, []);

  const handleClose = () => {
    gsap.to(menuRef.current, {
      x: "100%",
      duration: 0.2,
      onComplete: () => {
        setTimeout(() => {
          setOpense(false);
        }, 200);
      },
    });
  };

  useGSAP(() => {
    gsap.from("#NavLink", {
      x: 100,
      duration: 0.4,
      stagger: 0.07,
    });
  });

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm z-50 transition duration-200 flex justify-end"
      >
        <div className="w-[70%] shadow-xl/30  rounded-1-[20px]" ref={menuRef}>
          <div className="w-[100%] h-[100px] flex  bg-linear-[-25deg,_#4ade80,_#60a5fa] justify-center  justify-center items-center p-[20px] ">
            <div
              className="flex items-center gap-[20px] text-white"
              id="Navbar__main--header"
            >
              <Wallet color="white" />
              <div className="flex flex-col ">
                <h2 className="text-[20px] font-bold">Xarajatlar</h2>
                <p className="">Boshqaruv tizimi</p>
              </div>
            </div>
          </div>
          <div
            onClick={handleClose}
            className="p-[10px] rounded-4xl bg-red-300 w-[45px] mt-[10px] absolute left-[10px]"
          >
            <X onClick={handleClose} />
          </div>
          <div className="flex flex-col absolute top-[170px] p-[20px] w-[100%] gap-[20px]">
            <NavLink
              id="NavLink"
              onClick={() => {
                handleClose;

                setIe(true);
              }}
              to={"/dashboard"}
              className={`text-[20px] font-bold w-[100%] p-[20px] rounded-2xl flex items-center gap-[10px] ${ie ? "bg-blue-400" : "bg-green-400"}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink
              id="NavLink"
              onClick={handleClose}
              to={"/otkazma"}
              className="text-[20px] font-bold bg-green-400 w-[100%] p-[20px] rounded-2xl flex items-center gap-[10px] "
            >
              <ArrowLeftRight size={20} /> Tranzaksiyalar
            </NavLink>
            <NavLink
              id="NavLink"
              onClick={handleClose}
              to={"/kategoria"}
              className="text-[20px] font-bold bg-green-400 w-[100%] p-[20px] rounded-2xl flex items-center gap-[10px] "
            >
              <FolderKanban size={20} /> Kategoria
            </NavLink>
            <NavLink
              id="NavLink"
              onClick={handleClose}
              to={"/statistika"}
              className="text-[20px] font-bold bg-green-400 w-[100%] p-[20px] rounded-2xl flex items-center gap-[10px]  "
            >
              <ChartColumn size={20} /> Statistika
            </NavLink>
            <NavLink
              id="NavLink"
              onClick={handleClose}
              to={"/info"}
              className="text-[20px] font-bold bg-green-400 w-[100%] p-[20px] rounded-2xl flex items-center gap-[10px] l"
            >
              <User size={20} /> Profile
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bars;
