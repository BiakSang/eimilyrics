const Song = require("../../models/Song")

module.exports = async (req, res, next) => {

    const query = req.params.query
    if (query.length < 3){
        return res.end()
    }

    try {
        const writers = await Song.aggregate([
            {
                $search: {
                    "autocomplete": {
                        "query": query,
                        "path": "writer"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    writer: 1
                }
            },
            {
                $group: {
                    _id: "$writer"
                }
            },
            {
                $limit: 5
            }
        ])
        
        res.status(200)
        .set("Cache-Control", "private, max-age=86400")
        .json(writers)
    }
    catch {
        next({
            status: 500,
            error: {
                code: "unexpected",
                message: "Internal server error, please try again later!"
            }
        })
    }

}