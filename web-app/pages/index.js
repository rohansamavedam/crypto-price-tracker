import { useState } from "react";
import { useCryptoPrices } from "../hooks/useCryptoPrices";
import CryptoCard from "../components/CryptoCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const { data, isLoading, isError, refetch, error, isFetching } = useCryptoPrices();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data
    ? Object.entries(data).filter(([key]) =>
        key.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full lg:w-2/4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Crypto Price Tracker</h1>
          <button
            className={`p-2 bg-gray-600 text-white rounded cursor-pointer ${
              isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Refresh
          </button>
        </div>
        <div className="mt-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="mt-4">
          {isFetching ? (
            <p className="text-center">Loading prices...</p>
          ) : isError ? (
            <p className="text-center text-red-500">
              Error fetching data
            </p>
          ) : (
            <div className="space-y-4">
              {filteredData.map(([id, price]) => (
                <CryptoCard key={id} id={id} price={price.usd} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
