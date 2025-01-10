import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { refresh } from '../../assets'; // Ensure this path is correct

const HuPromo = () => {
  // Mock data to display before fetching
  const mockData = [
    {
      campus: "Addis Ababa University",
      name: null,
      packageName: "FRESHMAN PREMIUM",
      pg: "99",
      phone: "251953134956",
      price: 3,
      promoCode: "1",
      status: "SUCCESS",
    },
  ];

  const [members, setMembers] = useState(mockData); // Initialize with mock data
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('https://zegeju-1453f.uc.r.appspot.com/api/v9/student/getSuccessDataFiltered');
      setMembers(response.data.successList); // Replace mock data with fetched data
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Calculate total fees
  const totalFee = members.reduce((acc, member) => {
    const price = parseFloat(member.price || 0); // Handle potential null or undefined price
    const fee = price * 0.15; // Calculate 15% fee
    return acc + fee;
  }, 0).toFixed(2);

  return (
    <div className="min-h-screen p-4 relative">
      <div className="flex flex-col mb-4">
        <h1 className="text-2xl font-bold text-center">Member Table</h1>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-4">
          <div className="md:text-xl text-md font-bold">Freshman</div>
          <div className="md:text-xl text-md font-bold">Promoter Page</div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="focus:outline-none md:pr-12 pr-4"
        >
          <img src={refresh} alt="Refresh" className="md:w-7 w-5 md:h-7 h-5 mb-2" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[rgba(244,244,244,1)]">
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Campus</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Name</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Package Name</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Page</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Phone Number</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Price</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Promo Code</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Status</th>
              <th className="border border-gray-200 px-2 py-1 text-sm md:text-base">Fee (15%)</th>
            </tr>
          </thead>
          <tbody className="bg-[#ecf7f8]">
            {loading ? (
              <tr>
                <td colSpan="9" className="border border-gray-200 px-2 py-1 text-sm md:text-base text-center">
                  Loading members...
                </td>
              </tr>
            ) : members.length > 0 ? (
              members.map((member, index) => {
                const price = parseFloat(member.price || 0); // Handle potential null or undefined price
                const fee = (price * 0.15).toFixed(2); // Calculate 15% fee

                return (
                  <tr key={index}>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.campus || "N/A"}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.name || "N/A"}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.packageName}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.pg || "N/A"}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.phone}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.price}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.promoCode || "N/A"}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{member.status}</td>
                    <td className="border border-gray-200 px-2 py-1 text-sm md:text-base">{fee}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="border border-gray-200 px-2 py-1 text-sm md:text-base text-center">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
          {members.length > 0 && (
            <tfoot>
              <tr className="bg-gray-200">
                <td colSpan="8" className="border border-gray-200 px-2 py-1 text-sm md:text-base text-right font-bold">Total Fees:</td>
                <td className="border border-gray-200 px-2 py-1 text-sm md:text-base font-bold">{totalFee}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default HuPromo;