import axios from "axios";
import { useEffect, useState } from "react";

function useFilter(param, id, filterParam ,pageNumber) {

    const [filter_data, setFilter_Data] = useState([])
    const [filter_loading, setFilter_Loading] = useState(true)
    const [filter_error, setFilter_Error] = useState("")
    const [filter_totalPages, setFilter_TotalPages] = useState(0)

    useEffect(() => {
        async function fetchData(url) {
            try {
                const res = await axios.get(url)
                const rawData = res.data.data.data
                if(!Array.isArray(rawData)) {setError("Data fetch failed!")}
                const idArray = rawData.map((id) => id['_id'])
                const intensityArray = rawData.map((id) => id['intensity'])
                const relevanceArray = rawData.map((id) => id['relevance'])
                const likelihoodArray = rawData.map((id) => id['likelihood'])
                setFilter_TotalPages(res.data.data.totalPages)
                setFilter_Data((prev)=>{
                    return {
                        ...prev,
                        id: idArray,
                        intensity: intensityArray,
                        relevance: relevanceArray,
                        likelihood: likelihoodArray
                    }
                })
                setFilter_Loading(false)
            } catch (error) {
                setFilter_Loading(false)
                setFilter_Error(`Something is error :: ${error}`)
            }
        }

        if(param==="year" || "country" || "topic" || "region") {
            const paramPageNumber = Number(pageNumber)+1
            if(paramPageNumber>0) {
                console.log(paramPageNumber);
                fetchData(`http://localhost:4400/api/v1/dashboard/filter/${param}/${id}/${filterParam}/${paramPageNumber}`)
            }
        }

        
    }, [param, id, filterParam ,pageNumber])
    
    return {filter_data, filter_loading, filter_error, filter_totalPages}
    
}

export { useFilter }