import { useState } from "react";

const categories = ["DEVS", "INFRASTRUCTURE"];

const RANDOM_GRANT = {
  org: "FTX",
  name: "FTX Future Fund",
  tags: ["Researchers", "Devs", "Public Goods", "Academics"],
  amountMin: 50,
  amountMax: 1000,
};

const GrantCard: React.FC<{ x: any }> = ({ x }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-primary">
      <div className="p-2 bg-primary text-gray-900">
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-bold">{x.name}</span>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 opacity-50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs ml-0.5">{x.org}</span>
            </div>
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 opacity-50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs ml-0.5">{`$${x.amountMin} - $${x.amountMax}`}</span>
            </div>{" "}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="p-2 flex flex-col">
          <div className="px-2">
            <p className="text-sm opacity-80">This is a description</p>
          </div>
          <div className="flex flex-row items-center self-end space-x-2">
            <a className="text-sm bg-dark text-white px-4 py-2" href="#">
              APPLY
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 flex flex-col items-start p-4 bg-primary">
          <h1 className="font-bold">Search</h1>
          <h1 className="font-bold">Filters</h1>
          <div className="flex flex-col space-y-0.5">
            {categories.map((category, i) => (
              <div className="flex flex-row items-center space-x-1">
                <div
                  className={`w-3 h-3 border-4 border-dark ${
                    i % 2 ? "bg-primary" : "bg-dark"
                  }`}
                ></div>
                <span className="tracking-wider">{category}</span>
              </div>
            ))}
          </div>
          <button className="text-sm px-4 py-2 bg-dark text-white outline-none self-end">
            APPLY
          </button>
        </div>
        <div className="col-span-8 flex flex-col space-y-4">
          <input
            className="bg-dark text-white outline-none pb-2 border-b-4 border-primary"
            type="text"
            placeholder="Search..."
          />
          <div className="flex flex-col space-y-4">
            {new Array(10).fill(RANDOM_GRANT).map((x) => (
              <GrantCard x={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
