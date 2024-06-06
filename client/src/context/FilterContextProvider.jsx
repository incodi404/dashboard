import React, { useEffect, useState } from "react";
import FilterContext from "./FilterContext";
import axios from "axios";
import { useFilter } from "../hooks/useFilter.hooks";

function FilterContextProvider({ children }) {
  const [allFilterParams, setAllFilterParams] = React.useState([]);
  const [contextLoading, setContextLoading] = useState(true);
  const [contextError, setContextError] = useState("");

  const [incomingParams, setIncomingparams] = useState({})
  const [filteredData, setFilteredData] = useState({})


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:4400/api/v1/dashboard/all-filter-parameters"
        );
        const rawData = res.data.data;
        const end_years_params = rawData["end_years"].map((e) => e["_id"]);
        const region_params = rawData["region"].map((e) => e["_id"]);
        const sector_params = rawData["sector"].map((e) => e["_id"]);
        const source_params = rawData["source"].map((e) => e["_id"]);
        const topic_params = rawData["topic"].map((e) => e["_id"]);
        setAllFilterParams((prev) => ({ ...prev, end_years_params, region_params, sector_params, source_params, topic_params }));
        setContextLoading(false);
      } catch (error) {
        setContextError(error);
        setContextLoading(false);
      }
    }
    fetchData();
  }, []);

  const param = incomingParams['param']
  const id = incomingParams['id']
  const filterParam = incomingParams['filterParam']
  const pageNumber = incomingParams['pageNumber']

  const {filter_data, filter_loading, filter_error, filter_totalPages} =
  useFilter(param, id, filterParam, pageNumber)

  useEffect(()=>{
    setFilteredData(filter_data)
  }, [filter_data])

  return (
    <FilterContext.Provider
      value={{ allFilterParams, contextLoading, contextError, incomingParams, setIncomingparams, filteredData, filter_totalPages }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
