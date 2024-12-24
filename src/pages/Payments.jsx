import Payment from "../components/Payment";

export default function Payments() {


  return (
    <div className="p-6 bg-[#F6F8FC] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Payments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <Payment />
      </div>
    </div>
  )
}

