export default function Input({ type, label, pl }) {
  return (
    <div className="flex gap-[5px] flex-col w-full">
      <label className="text-[14px] font-[500]">{label}</label>
      <input
        type={type}
        placeholder={pl}
        className="bg-[#0000001A] p-[10px] w-full rounded-xl outline-none "
      />
    </div>
  )
}
