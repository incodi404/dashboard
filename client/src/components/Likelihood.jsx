import React, { useContext, useEffect, useState } from "react";
import PieChart from "../chart-components/PieChart";
import { useLikelihood } from "../hooks/useLikelihood.hooks";
import FilterContext from "../context/FilterContext";

function Likelihood() {
  const [param, setParam] = useState("year");
  const [dropdown, setDropdown] = useState("year");
  const [pageNumber, setPageNumber] = useState(0);

  const { parameter, data, loading, error, totalPages, setParameter, setData} = useLikelihood(
    param,
    pageNumber
  );

  const pageArray = new Array();

  for (let index = 1; index <= totalPages; index++) {
    pageArray.push(`dataset-${index}`);
  }

  const { allFilterParams, contextLoading, contextError, filteredData } =
    useContext(FilterContext);

  useEffect(() => {
    setParam(dropdown);
  }, [dropdown]);

  useEffect(()=>{
    setParameter(filteredData.id)
    setData(filteredData.likelihood)
  }, [filteredData])

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 px-3 py-5">
        <div className="w-[30rem] flex flex-col items-center justify-center gap-2 px-3 py-5 border-2 rounded-xl">
          <div className="w-[25rem] h-[25rem] mb-[10rem]">
            <div className="text-right w-full flex justify-between items-center">
              <h2 className="font-medium text-3xl">LIKELIHOOD</h2>
              <select
                className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
                onChange={(e) => {
                  setDropdown(e.target.value);
                }}
              >
                <option className="shadow-none" value="year">
                  Year
                </option>
                <option value="country">Country</option>
                <option value="topic">Topic</option>
                <option value="region">Region</option>
              </select>
            </div>
            <div>
              <PieChart param1={parameter} param2={data} lebel={"Likelihood"} />
            </div>
          </div>
          <div className={`${totalPages > 1 ? `visible` : `invisible`}`}>
            <select
              className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none"
              onChange={(e) => {
                setPageNumber(e.target.value);
              }}
            >
              {pageArray.map((page, index) => {
                return (
                  <option key={index} value={index}>
                    {page}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Likelihood;
