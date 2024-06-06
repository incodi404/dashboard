import { asynchandler } from "../utils/asynchandler.utils.js"
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import { Data } from "../models/data.model.js"
import { DATA_PER_PAGE } from "../constant.js"


function splitData(data, pages, limit) {
    const allData = data
    const totalPages = Math.ceil(allData.length / limit)

    const page = pages

    if (page > totalPages || page === "0") {
        return null
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const newData = allData.slice(startIndex, endIndex)

    return { newData, totalPages }
}

const intensity = asynchandler(async (req, res) => {
    if (req.params.param === "year") {
        const year_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$start_year',
                    'intensity': {
                        '$avg': '$intensity'
                    }
                }
            }, {
                '$sort': {
                    '_id': 1
                }
            }
        ])

        if (!year_data) { return res.status(500).json(ApiError(400, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiError(400, "Page number is neccessery!")) }
        const limit = DATA_PER_PAGE

        const data = splitData(year_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "country") {
        const country_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$country',
                    'intensity': {
                        '$avg': '$intensity'
                    }
                }
            }, {
                '$sort': {
                    'intensity': -1
                }
            }
        ])

        if (!country_data) { return res.status(500).json(ApiError(500), "Something went wrong!", error) }

        if (!req.params.part) {
            return res.status(400).json(ApiError(400, "Page number required!"))
        }

        const pages = req.params.part
        const limit = DATA_PER_PAGE

        const data = splitData(country_data, pages, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))

    }

    else if (req.params.param === "topic") {
        const topic_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$topic',
                    'intensity': {
                        '$avg': '$intensity'
                    }
                }
            }, {
                '$sort': {
                    'intensity': -1
                }
            }
        ])

        if (!topic_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!req.params.part) {
            return res.status(400).json(ApiError(400, "Page number required!"))
        }
        const limit = DATA_PER_PAGE

        const data = splitData(topic_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))

    }

    else if (req.params.param === "region") {
        const region_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$region',
                    'intensity': {
                        '$avg': '$intensity'
                    }
                }
            }, {
                '$sort': {
                    'intensity': -1
                }
            }
        ])

        if (!region_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiError(400, "Page number required!")) }
        const limit = DATA_PER_PAGE

        const data = splitData(region_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))


    }

    else {
        return res.status(400).json(ApiError(400, "Invalid parameter!"))
    }
})

const likelihood = asynchandler(async (req, res) => {
    if (req.params.param === "year") {
        const year_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$start_year',
                    'likelihood': {
                        '$avg': '$likelihood'
                    }
                }
            }, {
                '$sort': {
                    'likelihood': -1
                }
            }
        ])

        if (!year_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiResponse(500, "Page number is required!")) }
        const limit = 5

        const data = splitData(year_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))

    }

    else if (req.params.param === "country") {
        const country_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$country',
                    'likelihood': {
                        '$avg': '$likelihood'
                    }
                }
            }, {
                '$sort': {
                    'likelihood': -1
                }
            }
        ])

        if (!country_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiResponse(500, "Page number is required!")) }
        const limit = 5

        const data = splitData(country_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "topic") {
        const topic_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$topic',
                    'likelihood': {
                        '$avg': '$likelihood'
                    }
                }
            }, {
                '$sort': {
                    'likelihood': -1
                }
            }
        ])

        if (!topic_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiResponse(500, "Page number is required!")) }
        const limit = 5

        const data = splitData(topic_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "region") {
        const region_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$region',
                    'likelihood': {
                        '$avg': '$likelihood'
                    }
                }
            }, {
                '$sort': {
                    'likelihood': -1
                }
            }
        ])

        if (!region_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        if (!page) { return res.status(400).json(ApiResponse(500, "Page number is required!")) }
        const limit = 5

        const data = splitData(region_data, page, limit)

        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }

        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else {
        return res.status(400).json(ApiError(400, "Parameter invalid!"))
    }


})

const relevance = asynchandler(async (req, res) => {
    const limit = 5
    if (req.params.param === "year") {
        const year_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$start_year',
                    'relevance': {
                        '$avg': '$relevance'
                    }
                }
            }, {
                '$sort': {
                    'relevance': -1
                }
            }
        ])

        if (!year_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        const data = splitData(year_data, page, limit)
        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }
        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "country") {
        const country_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$country',
                    'relevance': {
                        '$avg': '$relevance'
                    }
                }
            }, {
                '$sort': {
                    'relevance': -1
                }
            }
        ])

        if (!country_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        const data = splitData(country_data, page, limit)
        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }
        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "topic") {
        const topic_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$topic',
                    'relevance': {
                        '$avg': '$relevance'
                    }
                }
            }, {
                '$sort': {
                    'relevance': -1
                }
            }
        ])

        if (!topic_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        const data = splitData(topic_data, page, limit)
        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }
        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else if (req.params.param === "region") {
        const region_data = await Data.aggregate([
            {
                '$group': {
                    '_id': '$region',
                    'relevance': {
                        '$avg': '$relevance'
                    }
                }
            }, {
                '$sort': {
                    'relevance': -1
                }
            }
        ])

        if (!region_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

        const page = req.params.part
        const data = splitData(region_data, page, limit)
        if (!data) { return res.status(400).json(ApiError(400, "Page number invalid!")) }
        return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
            data: data.newData,
            totalPages: data.totalPages,
            dataPerPage: limit
        }))
    }

    else {
        return res.status(400).json(ApiError(400, "Parameter invalid!"))
    }



})

const filter_parameters = asynchandler(async (req, res) => {
    const end_years = await Data.aggregate([
        {
            $group: {
                _id: "$end_year"
            }
        }
    ])

    const region = await Data.aggregate([
        {
            $group: {
                _id: "$region"
            }
        }
    ])

    const topic = await Data.aggregate([
        {
            $group: {
                _id: "$topic"
            }
        }
    ])

    const sector = await Data.aggregate([
        {
            $group: {
                _id: "$sector"
            }
        }
    ])

    const source = await Data.aggregate([
        {
            $group: {
                _id: "$source"
            }
        }
    ])

    return res.status(200).json(ApiResponse(200, "Data fetched successfully", {end_years, region, topic, sector, source}))


})

const filter = asynchandler(async (req, res) => {

    const limit = 15

    if (req.params.param === "year") {

        const id = req.params.id

        if (id === "year" || id === "country" || id === "topic" || id === "region") {
            const year_data = await Data.aggregate([
                {
                    '$match': {
                        'end_year': Number(req.params.filterParam)
                    }
                }, {
                    '$group': {
                        '_id': `$${String(req.params.id)}`,
                        'intensity': {
                            '$avg': '$intensity'
                        },
                        'relevance': {
                            '$avg': '$relevance'
                        },
                        'likelihood': {
                            '$avg': '$likelihood'
                        }
                    }
                }
            ])

            if (!year_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

            const page = req.params.part
            if (!page) { return res.status(400).json(ApiError(400, "Page number is required!")) }
            const data = splitData(year_data, page, limit)

            if (!data) { return res.status(400).json(ApiError(400, "Page number is invalid!")) }
            return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
                data: data.newData,
                totalPages: data.totalPages,
                dataPerPage: limit
            }))
        }
        else {
            return res.status(400).json(ApiError(400, "Id invalid!"))
        }

    }

    else if (req.params.param === "region") {

        const id = req.params.id

        if (id === "year" || id === "country" || id === "topic" || id === "region") {
            const region_data = await Data.aggregate([
                {
                    '$match': {
                        'region': req.params.filterParam
                    }
                }, {
                    '$group': {
                        '_id': `$${String(req.params.id)}`,
                        'intensity': {
                            '$avg': '$intensity'
                        },
                        'relevance': {
                            '$avg': '$relevance'
                        },
                        'likelihood': {
                            '$avg': '$likelihood'
                        }
                    }
                }
            ])

            if (!region_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

            const page = req.params.part
            if (!page) { return res.status(400).json(ApiError(400, "Page number is required!")) }
            const data = splitData(region_data, page, limit)

            if (!data) { return res.status(400).json(ApiError(400, "Page number is invalid!")) }
            return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
                data: data.newData,
                totalPages: data.totalPages,
                dataPerPage: limit
            }))
        }
        else {
            return res.status(400).json(ApiError(400, "Id invalid!"))
        }

    }

    else if (req.params.param === "topic") {

        const id = req.params.id

        if (id === "year" || id === "country" || id === "topic" || id === "region") {
            const topic_data = await Data.aggregate([
                {
                    '$match': {
                        'topic': req.params.filterParam
                    }
                }, {
                    '$group': {
                        '_id': `$${String(req.params.id)}`,
                        'intensity': {
                            '$avg': '$intensity'
                        },
                        'relevance': {
                            '$avg': '$relevance'
                        },
                        'likelihood': {
                            '$avg': '$likelihood'
                        }
                    }
                }
            ])

            if (!topic_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

            const page = req.params.part
            if (!page) { return res.status(400).json(ApiError(400, "Page number is required!")) }
            const data = splitData(topic_data, page, limit)

            if (!data) { return res.status(400).json(ApiError(400, "Page number is invalid!")) }
            return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
                data: data.newData,
                totalPages: data.totalPages,
                dataPerPage: limit
            }))
        }
        else {
            return res.status(400).json(ApiError(400, "Id invalid!"))
        }

    }

    else if (req.params.param === "sector") {

        const id = req.params.id

        if (id === "year" || id === "country" || id === "topic" || id === "region") {
            const sector_data = await Data.aggregate([
                {
                    '$match': {
                        'sector': req.params.filterParam
                    }
                }, {
                    '$group': {
                        '_id': `$${String(req.params.id)}`,
                        'intensity': {
                            '$avg': '$intensity'
                        },
                        'relevance': {
                            '$avg': '$relevance'
                        },
                        'likelihood': {
                            '$avg': '$likelihood'
                        }
                    }
                }
            ])

            if (!sector_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

            const page = req.params.part
            if (!page) { return res.status(400).json(ApiError(400, "Page number is required!")) }
            const data = splitData(sector_data, page, limit)

            if (!data) { return res.status(400).json(ApiError(400, "Page number is invalid!")) }
            return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
                data: data.newData,
                totalPages: data.totalPages,
                dataPerPage: limit
            }))
        }
        else {
            return res.status(400).json(ApiError(400, "Id invalid!"))
        }

    }

    else if (req.params.param === "source") {

        const id = req.params.id

        if (id === "year" || id === "country" || id === "topic" || id === "region") {
            const source_data = await Data.aggregate([
                {
                    '$match': {
                        'source': req.params.filterParam
                    }
                }, {
                    '$group': {
                        '_id': `$${String(req.params.id)}`,
                        'intensity': {
                            '$avg': '$intensity'
                        },
                        'relevance': {
                            '$avg': '$relevance'
                        },
                        'likelihood': {
                            '$avg': '$likelihood'
                        }
                    }
                }
            ])

            if (!source_data) { return res.status(500).json(ApiError(500, "Data fetch failed!")) }

            const page = req.params.part
            if (!page) { return res.status(400).json(ApiError(400, "Page number is required!")) }
            const data = splitData(source_data, page, limit)
            if (!data) { return res.status(400).json(ApiError(400, "Page number is invalid!")) }
            return res.status(200).json(ApiResponse(200, "Data fetched successfully!", {
                data: data.newData,
                totalPages: data.totalPages,
                dataPerPage: limit
            }))
        }
        else {
            return res.status(400).json(ApiError(400, "Id invalid!"))
        }

    }

    else {
        return res.status(400).json(ApiError(400, "Parameter invalid!"))
    }
})

export { intensity, likelihood, relevance, filter, filter_parameters }