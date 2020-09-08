const Song = require("../../models/Song")
const validateFormOneData = require("../../functions/validateFormOneData")

module.exports = async (req, res, next) => {

    // check if req.body exist
    if (!req.body){
        return next({
            status: 406,
            error: {
                code: "title",
                message: "Please enter a title!"
            }
        })
    }

    let title = req.body.title
    let writer = req.body.writer
    let dialect = req.body.dialect
    const strict = (req.body.strict !== undefined && typeof(req.body.strict) === "boolean") ? req.body.strict : true

    // first validate data
    const validation = validateFormOneData({
        title,
        writer,
        dialect
    })
    if (validation.status !== 200){
        return next({
            status: validation.status,
            error: validation.error
        })
    }

    // check if song already exist
    try {
        let query = {}
        if (strict){
            title = title.split(" ").join("").toLowerCase()
            query = [
                {
                    $project: {
                        titleOriginal: "$title",
                        title: {
                            $toLower: "$title"
                        },
                        writer: 1,
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: {
                            $split: [ "$title", " " ]
                        },
                        writer: 1,
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: {
                            $reduce: {
                                input: "$title",
                                initialValue: "",
                                in: {
                                    $concat: [ "$$value", "$$this"]
                                }
                            }
                        },
                        writer: 1,
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $match: {
                        title,
                        dialect
                    }
                },
                {
                    $project: {
                        title: "$titleOriginal",
                        writer: 1,
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $limit: 1
                }
            ]
        }
        else {
            title = title.toLowerCase()
            writer = writer.split(".").join("").split(" ").join("").toLowerCase()
            query = [
                {
                    $project: {
                        titleOriginal: "$title",
                        title: {
                            $toLower: "$title"
                        },
                        writerOriginal: "$writer",
                        writer: {
                            $toLower: "$writer"
                        },
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: 1,
                        writerOriginal: 1,
                        writer: {
                            $split: [ "$writer", "." ]
                        },
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: 1,
                        writerOriginal: 1,
                        writer: {
                            $reduce: {
                                input: "$writer",
                                initialValue: "",
                                in: {
                                    $concat: [ "$$value", "$$this"]
                                }
                            }
                        },
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: 1,
                        writerOriginal: 1,
                        writer: {
                            $split: [ "$writer", " " ]
                        },
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $project: {
                        titleOriginal: 1,
                        title: 1,
                        writerOriginal: 1,
                        writer: {
                            $reduce: {
                                input: "$writer",
                                initialValue: "",
                                in: {
                                    $concat: [ "$$value", "$$this"]
                                }
                            }
                        },
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $match: {
                        title,
                        writer,
                        dialect
                    }
                },
                {
                    $project: {
                        title: "$titleOriginal",
                        writer: "$writerOriginal",
                        dialect: 1,
                        lyrics: 1,
                        youtube: 1
                    }
                },
                {
                    $limit: 1
                }
            ]
        }
        const songExist = await Song.aggregate(query)
        if (songExist.length > 0){
            // return "song-already-exist" error
            return next({
                status: 409,
                error: {
                    code: "song-already-exist",
                    song: songExist[0],
                    strict
                }
            })
        }

        res
        .status(200)
        .send("ok")
    }
    catch (err) {
        console.log(err)
        return next({
            status: 500,
            error: {
                code: "unexpected",
                message: "Internal server error, please try again later!"
            }
        })
    }

}