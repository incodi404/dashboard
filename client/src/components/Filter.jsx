import React, { useContext, useEffect, useState } from "react";
import FilterContext from "../context/FilterContext";

function Filter() {
  const [params, setParams] = useState({id: "year", pageNumber: 0});

  const {
    allFilterParams,
    contextLoading,
    contextError,
    incomingParams,
    setIncomingparams,
    filteredData,
    filter_totalPages
  } = useContext(FilterContext);


  if (contextLoading) {
    return <div>Loading</div>;
  }

  if (contextError) {
    return <div>ERROR :: {contextError}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center gap-5 mb-10 flex-wrap">
        <label htmlFor="filter">Filter</label>
        <select
          required
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, id: e.target.value };
            });
          }}
        >
          <option value="year">Year</option>
          <option value="country">Country</option>
          <option value="topic">Topic</option>
          <option value="region">Region</option>
        </select>

        <select
          id="year"
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, param: "year", filterParam: e.target.value };
            });
          }}
        >
          <option value=""> Select End Year</option>
          {allFilterParams["end_years_params"].map((year, index) => {
            return (
              <option key={index} value={`${year}`}>
                {year}
              </option>
            );
          })}
        </select>

        <select
          id="region"
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, param: "region", filterParam: e.target.value };
            });
          }}
        >
          <option value="">Select Region</option>
          {allFilterParams["region_params"].map((region, index) => {
            return (
              <option key={index} value={`${region}`}>
                {region}
              </option>
            );
          })}
        </select>

        <select
          id="sector"
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, param: "sector", filterParam: e.target.value };
            });
          }}
        >
          <option value="">Select Sector</option>
          {allFilterParams["sector_params"].map((sector, index) => {
            return (
              <option key={index} value={`${sector}`}>
                {sector}
              </option>
            );
          })}
        </select>

        <select
          id="source"
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, param: "source", filterParam: e.target.value };
            });
          }}
        >
          <option value="">Select Source</option>
          {allFilterParams["source_params"].map((source, index) => {
            return (
              <option key={index} value={`${source}`}>
                {source}
              </option>
            );
          })}
        </select>

        <select
          id="topic"
          className="px-3 py-3 rounded-xl bg-transparent border-2 focus:outline-none shadow-none"
          onChange={(e) => {
            setParams((prev) => {
              return { ...prev, param: "topic", filterParam: e.target.value };
            });
          }}
        >
          <option value="">Select Topic</option>
          {allFilterParams["topic_params"].map((topic, index) => {
            return (
              <option key={index} value={`${topic}`}>
                {topic}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            setIncomingparams(params);
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default Filter;
