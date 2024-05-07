import React, { useState } from "react";
import AdminCreateBetslip from "../../components/adminComponent/AdminCreateBetslip";
import AdminHistoricalBetslip from "../../components/adminComponent/AdminHistoricalBetslip";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div>
      {/* Tabs navigation */}
      <ul
        className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
        role="tablist"
      >
        <li role="presentation" className="flex-auto text-center">
          <a
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:isolate hover:bg-neutral-100 focus:isolate ${
              activeTab === "home"
                ? "bg-blue-500 text-white"
                : "text-neutral-500 hover:bg-blue-100"
            } dark:hover:bg-neutral-700/60`}
            onClick={() => setActiveTab("home")}
            role="tab"
          >
            Create Bet Slip
          </a>
        </li>
        <li role="presentation" className="flex-auto text-center">
          <a
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:isolate hover:bg-neutral-100 focus:isolate ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "text-neutral-500 hover:bg-blue-100"
            } dark:hover:bg-neutral-700/60`}
            onClick={() => setActiveTab("profile")}
            role="tab"
          >
            Historical Bet Slips
          </a>
        </li>
        <li role="presentation" className="flex-auto text-center">
          <a
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:isolate hover:bg-neutral-100 focus:isolate ${
              activeTab === "betslip"
                ? "bg-blue-500 text-white"
                : "text-neutral-500 hover:bg-blue-100"
            } dark:hover:bg-neutral-700/60`}
            onClick={() => setActiveTab("betslip")}
            role="tab"
          >
            Test Tab
          </a>
        </li>
      </ul>

      {/* Tabs content */}
      <div className="mb-6">
        {activeTab === "home" && (
          <div className="block opacity-100 transition-opacity duration-150 ease-linear">
            <AdminCreateBetslip />
          </div>
        )}
        {activeTab === "profile" && (
          <div className="block opacity-100 transition-opacity duration-150 ease-linear">
            <AdminHistoricalBetslip />
          </div>
        )}
        {activeTab === "betslip" && (
          <div className="block text-white opacity-100 transition-opacity duration-150 ease-linear">
            hello
            {/* This is a placeholder for whatever you decide to place here. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
