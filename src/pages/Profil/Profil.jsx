import { Lock, Shield, Smartphone, User } from 'lucide-react'
import Input from './Input'

function Profile() {
  return (
    <div className="w-full flex justify-start flex-col gap-[50px]">
      <div className="flex flex-col">
        <p className="text-[30px] font-[600]">Profil</p>
        <p className="text-[#717182] text-[16px]">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>
      <div className="flex w-full h-full p-[15px]">
        <div className="flex  w-full flex-col gap-[20px]">
          <div className="profile w-full flex gap-[20px] items-center border border-[0.4px] border-gray-200 p-[20px] rounded-2xl">
            <div className="flex relative">
              <img src="./public/info.png" alt="profile-Photo" width={70} />
            </div>
            <div className="flex flex-col gap-[10px] ">
              <div className="flex flex-col">
                <p className="text-[24px] font-bold ">Foydalanuvchi</p>
                <p className="text-[#717182]">user@example.com</p>
              </div>
              <div className="flex gap-[10px]">
                <p className="bg-[#DBEAFE] p-[5px] text-[#1447E6] rounded-4xl">
                  Premium foydalanuvchi
                </p>
                <p className="bg-[#DCFCE7] p-[5px] text-[#008236] rounded-4xl">Faol</p>
              </div>
            </div>
          </div>
          <div className="shax w-full flex flex-col items-start gap-[20px] items-center border border-[0.4px] border-gray-200 p-[20px] rounded-2xl">
            <div className="head flex items-end">
              <User />
              <p>Shaxsiy ma'lumotlar</p>
            </div>
            <div className="w-full flex flex-col gap-[20px]">
              <form className="w-full flex flex-col gap-[20px]">
                <div className="flex gap-[20px]">
                  <div className="flex flex-col gap-[20px] w-full">
                    <Input label={'Ism'} pl={'Foydalanuvchi'} type={'text'} />
                    <Input label={'Telefon'} pl={'+998 90 123 45 67'} type={'number'} />
                  </div>
                  <div className="flex flex-col gap-[20px] w-full">
                    <Input label={'Email'} pl={'user@example.com'} type={'email'} />
                    <Input label={'Manzil'} pl={"Toshkent, O'zbekiston"} type={'text'} />
                  </div>
                </div>
                <button className="w-full bg-black text-white p-[13px] rounded-xl">
                  O'zgarishlarni saqlash
                </button>
              </form>
            </div>
          </div>
          <div className="shax w-full flex flex-col items-start gap-[20px] items-center border border-[0.4px] border-gray-200 p-[20px] rounded-2xl">
            <div className="head flex items-end gap-[10px]">
              <Shield />
              <p className="font-bold">Xavfsizlik sozlamalari</p>
            </div>
            <div className="shax w-full flex flex-col items-start gap-[20px] items-center border border-[0.4px] border-gray-200 p-[20px] rounded-2xl">
              <div className="head flex items-center gap-[10px]">
                <Lock />
                <div className="flex flex-col">
                  <p className="font-bold text-[16px]">Parolni o'zgartirish</p>
                  <p className="text-[14px]">Oxirgi o'zgarish: 30 kun oldin</p>
                </div>
              </div>
              <div className="input w-full flex flex-col gap-[10px]">
                <form className="flex flex-col gap-[20px]">
                  <Input pl={'Eski parol'} />
                  <Input pl={'Yangi parol'} />
                  <button className="border-gray-950 border-1 rounded-xl p-[10px] w-full">
                    Parolni yangilash
                  </button>
                </form>
              </div>

              <div className="shax w-full flex  items-center justify-between gap-[20px] border border-[0.4px] border-gray-200 p-[20px] rounded-2xl">
                <div className="flex gap-[20px] items-center">
                  <Smartphone />
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[16px] font-medium">Ikki bosqichli autentifikatsiya</p>
                    <p className="text-[#717182] text-[14px] ">Qo'shimcha xavfsizlik qatlami</p>
                  </div>
                </div>
                <button className='p-[10px] border rounded-xl border-gray-400'>Yoqish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
