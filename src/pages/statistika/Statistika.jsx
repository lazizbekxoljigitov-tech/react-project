import HarajatChart from './ChartHead'

function Statistika() {
  return (
    <>
      <div className="w-[100%] p-[20px] gap-[20px] ">
        <div className="header__title">
          <div className="flex flex-col">
            <h2 className="font-bold text-[25px]">Statistika</h2>
            <p className="font-medium text-gray-400 font-sans">Xarajatlaringizni Statistika</p>
          </div>
          <div className="data">
            <HarajatChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistika
