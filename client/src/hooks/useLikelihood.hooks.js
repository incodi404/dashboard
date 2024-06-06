import axios from "axios";
import { useEffect, useState } from "react";

function useLikelihood(param, pageNumber) {

    const [parameter, setParameter] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        async function fetchData(url) {
            try {
                const res = await axios.get(url)
                const rawData = res.data.data.data
                setTotalPages(res.data.data.totalPages)
                if(!Array.isArray(rawData)) {setError("Data fetch failed!")}
                const paramArray = rawData.map((p) => p['_id'])
                const likelihoodArray = rawData.map((p) => p['likelihood'])
                setParameter(paramArray)
                setData(likelihoodArray)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(`Something is error :: ${error}`)
            }
        }

        if(param==="year" || "country" || "topic" || "region") {
            const paramPageNumber = Number(pageNumber)+1
            if(paramPageNumber>0) {
                fetchData(`http://localhost:4400/api/v1/dashboard/likelihood/${param}/${paramPageNumber}`)
            }
        }

        
    }, [param, pageNumber])
    
    return {parameter, data, loading, error, totalPages, setData, setParameter}
    
}

export { useLikelihood }