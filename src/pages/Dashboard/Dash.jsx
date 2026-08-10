import { ArrowDownRight, ArrowUpRight, Calendar, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../hooks/useAxios'

function Dashboard() {
  const [data, setData] = useState([])

  async function getApi() {
    try {
      const { data } = await apiClient.get('/harajat')
      setData(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getApi()
  }, [])
  const result = data.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += Number(item.amount)
      } else if (item.type === 'expense') {
        acc.expense += Number(item.amount)
      }

      return acc
    },
    {
      income: 0,
      expense: 0,
    }
  )

  console.log(result.income)
  console.log(result.expense)
  const limit = 1000000

  const categories = [
    ...new Set(data.filter((item) => item.type === 'expense').map((item) => item.category)),
  ]

  const total = data.reduce((sum, item) => sum + Number(item.amount), 0)

  return (
    <>
      <div className="w-[100%] lg:justify-center   flex flex-col gap-[20px] p-[20px] gap-[20px] ">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="font-bold text-[25px]">Dashboard</h2>
            <p className="font-medium text-gray-400 font-sans">Xarajatlaringizni boshqaring</p>
          </div>
          <div className="data">
            <h1 className="flex gap-[5px]">
              <Calendar /> may 2026
            </h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[20px]">
          <div className="w-full border border-gray-900 flex grow rounded-xl p-[10px]">
            <div className="flex flex-col">
              <p>Balans</p>
              <p className="text-[30px] font-bold">{total}</p>
              <p className="text-gray-600 font-medium">Umumiy balans</p>
            </div>
          </div>
          <div className="w-full border border-gray-900 flex grow rounded-xl p-[10px]">
            <div className="flex flex-col">
              <p>Daromat</p>
              <p className="text-[30px] font-bold text-green-500">{result.income}</p>
              <p className="text-gray-600 font-medium">Ushbu Oy</p>
            </div>
          </div>
          <div className="w-full border border-gray-900 flex grow rounded-xl p-[10px]">
            <div className="flex flex-col">
              <p>Harajat</p>
              <p className="text-[30px] font-bold text-red-500">{result.expense}</p>
              <p className="text-gray-600 font-medium">Ushbu Oy</p>
            </div>
          </div>
        </div>

        <div className=" lg:flex lg:gap-[30px] justify-center">
          <div className="flex  flex-col grow  border border-gray-500 rounded-xl">
            <div className="w-full lg:flex lg:gap-[10px]  justify-between border-b border-gray-500 p-[20px]">
              <div className="flex">
                <p className="text-[27px]">So'nggi tranzaksiyalar</p>
              </div>
              <div className="flex flex-col">
                <Link to={'/otkazma'} className="text-[19px] flex items-center gap-[7bpx]">
                  <Eye /> Barchasni Ko'rish
                </Link>
              </div>
            </div>

            <div className="overflow-y-auto  h-[300px] scrollbar-none">
              {data.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 p-[20px]">
                  <div className="flex gap-[10px]">
                    <div className="">
                      {item.type == 'expense' ? (
                        <ArrowUpRight
                          className=" p-[10px] bg-red-200 rounded-[50%] text-red-500 "
                          size={50}
                        />
                      ) : (
                        <ArrowDownRight
                          className=" p-[10px] bg-green-200 rounded-[50%] text-green-500 "
                          size={50}
                        />
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-gray-500">{item.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h2
                      className={`font-bold text-xl ${
                        item.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.type === 'income' ? '+' : '-'}
                      {item.amount.toLocaleString()} so'm
                    </h2>

                    <p className="text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex grow flex-col mt-[30px]">
            <div className="head">
              <p className="text-[28px] font-medium">Kategoriyalar bo'yicha</p>
            </div>

            <div className="flex flex-col gap-6 mt-5">
              {categories.map((category) => {
                const total = data
                  .filter((item) => item.type === 'expense' && item.category === category)
                  .reduce((sum, item) => sum + item.amount, 0)

                const progress = (total / limit) * 100

                const colors = {
                  Ovqat: 'bg-blue-500',
                  Transport: 'bg-green-500',
                  "To'lovlar": 'bg-orange-500',
                  Shopping: 'bg-purple-500',
                }

                return (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <p className="text-lg font-medium">{category}</p>

                      <p className="font-bold">{total.toLocaleString()} so'm</p>
                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${
                          colors[category] || 'bg-gray-500'
                        } h-full rounded-full transition-all duration-500`}
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
