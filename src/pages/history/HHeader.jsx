import React, { useEffect, useState } from "react";

const HHeader = ({retrive}) => {
  const [transaction, setTransaction] = useState([]);
  const [totalSend, setTotalSend] = useState(0);

  const [totalDeposite, setTotalDeposite] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:7000/api/transaction/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransaction(data);

        const depositTotal = data
          .filter((transaction) => transaction.type === "deposit")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

          const sendTotal = data
          .filter((transaction) => transaction.type === "send")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

          setTotalDeposite(depositTotal)
          setTotalSend(sendTotal)

          retrive(depositTotal,sendTotal)
      } catch (error) {
        console.error(error?.response?.data);
      }
    };
    fetchTransaction();
  }, [token, retrive]);

  return <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 my-3 bg-white rounded-2xl shadow-sm">

  {/* Left Title */}
  <p className="text-gray-500 text-sm md:text-base font-medium">
    All Transactions - All Time
  </p>

  {/* Center Stats */}
  <div className="hidden md:flex items-center gap-6">

    {/* Deposit */}
    <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-xl">
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span className="text-gray-500 text-sm">Deposit</span>
      <h6 className="font-semibold text-green-600">
        ${totalDeposite.toLocaleString()}
      </h6>
    </div>

    {/* Sent */}
    <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl">
      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
      <span className="text-gray-500 text-sm">Sent</span>
      <h6 className="font-semibold text-blue-600">
        ${totalSend.toLocaleString()}
      </h6>
    </div>

  </div>

  {/* Right Icons */}
  {/* <div className="flex items-center gap-3">

    <button
      onClick={downloadPDF}
      className="p-2 rounded-xl bg-gray-100 hover:bg-blue-100 text-blue-600 transition"
    >
      <IoMdCloudDownload size={24} />
    </button>

    <button
      className="p-2 rounded-xl bg-gray-100 hover:bg-blue-100 text-blue-600 transition"
    >
      <IoFilterSharp size={24} />
    </button>

  </div> */}

</section>
};

export default HHeader;
