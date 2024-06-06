import React, { useEffect, useState, useId, useContext } from "react";
import { useIntensity } from "../hooks/useIntensity.hook";
import LineChart from "../chart-components/LineChart";
import FilterContext from "../context/FilterContext";

function Intensity() {
  const [dropdown, setDropdown] = useState("year");
  const [intensityParameter, setIntensityParameter] = useState("year");
  const [pageNumber, setPageNumber] = useState(0);

  const {
    parameter,
    intensity,
    loading,
    error,
    totalPages,
    setIntensity,
    setParameter,
  } = useIntensity(intensityParameter, pageNumber);

  const pageArray = new Array();

  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(`dataset-${i}`);
  }

  const { allFilterParams, contextLoading, contextError, filteredData } =
    useContext(FilterContext);

  useEffect(() => {
    setParameter(filteredData.id);
    setIntensity(filteredData.intensity);
  }, [filteredData]);

  useEffect(() => {
    setIntensityParameter(dropdown);
  }, [dropdown]);

  if (contextLoading) {
    return <div>Loading</div>;
  }

  if (contextError) {
    return <div>ERROR :: {contextError}</div>;
  }

  if (error) {
    return <div>"Something is wrong!"</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 px-3 py-5">
        <div className="w-[61rem] flex flex-col items-center justify-center gap-2 px-3 py-5 border-2 rounded-xl">
          <div className="w-[50rem] h-[29rem]">
            <div className="text-right w-full flex justify-between items-center">
              <h2 className="font-medium text-3xl">INTENSITY</h2>
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
              <LineChart param1={parameter} param2={intensity} />
            </div>
          </div>
          <div className={`my-1 ${totalPages > 1 ? `visible` : `invisible`}`}>
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

export default Intensity;
