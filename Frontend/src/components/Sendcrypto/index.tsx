"use client";

type AddressProps = {
  address: string;
  amount: number;
};

export const Cryptosend = ({ address, amount }: AddressProps) => {
  return (
    <div className="max-w-sm rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-purple-400/50">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        Crypto Send Information
      </h2>
      <div className="space-y-3">
        <p className="text-lg font-semibold">
          <span className="text-gray-300">Address:</span>{" "}
          <span className="text-purple-200 break-all">{address}</span>
        </p>
        <p className="text-lg font-semibold">
          <span className="text-gray-300">Amount:</span>{" "}
          <span className="text-green-300">{amount.toLocaleString()}</span>
        </p>
      </div>
      <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
        Send Crypto
      </button>
    </div>
  );
};