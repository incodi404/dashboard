import axios from "axios";
import { useEffect, useState } from "react";

function useIntensity(param, pageNumber) {
  const [parameter, setParameter] = useState([]);
  const [intensity, setIntensity] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await axios.get(url);

        const rawData = res.data.data.data
        const pages = res.data.data.totalPages
        setTotalPages(pages)

        if (!rawData) {
          setError("Data not found!")
        }
        const parameterData = rawData.map((e) => e['_id']);
        const intensityData = rawData.map((e) => e['intensity']);
        setParameter(parameterData);
        setIntensity(intensityData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error)
        setLoading(false);
      }
    };

    if (param === "year") {
      const yearPageNumber = Number(pageNumber) + 1
      if (yearPageNumber > 0) {
        fetchData(`http://localhost:4400/api/v1/dashboard/intensity/year/${yearPageNumber}`)
      }
    }
    else if (param === "country") {
      const countryPageNumber = Number(pageNumber) + 1
      if (countryPageNumber > 0) {
        fetchData(`http://localhost:4400/api/v1/dashboard/intensity/country/${countryPageNumber}`)
      }
    }
    else if (param === "topic") {
      const topicPageNumber = Number(pageNumber) + 1
      if (topicPageNumber > 0) {
        fetchData(`http://localhost:4400/api/v1/dashboard/intensity/topic/${topicPageNumber}`)
      }
    }
    else if (param === "region") {
      const regionPageNumber = Number(pageNumber) + 1
      if (regionPageNumber > 0) {
        fetchData(`http://localhost:4400/api/v1/dashboard/intensity/region/${regionPageNumber}`)
      }
    }
    else {
      console.log("Parameter invalid!");
    }
  }, [param, pageNumber]);

  return { parameter, intensity, loading, error, totalPages, setIntensity, setParameter };
}

export { useIntensity };
