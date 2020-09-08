const Song = require("../../models/Song")

module.exports = async (req, res, next) => {

    const title = "Amah muan ding"
    const dialect = "paite"
    const category = "gospel"
    const writer = "Pumkhothang Tonsing"
    const lyrics = "Simlei tomkal hinsung in\nhou lung kumkhawm in\nlungtuak leng diamdiam leng\nEi a din manpha...\nSimlei in tangtawn daihlou\nSianmang liim beel ni\n\nSimlei khuam bang luah den din\nmimbang i piang lou\nlungtuak leng diamdiam ni\ndamlai hun leh ni\nTuibang kiam mualliam zel\nlenlai i nun nuam\nSian Siam a tangbang i damlai ni\nAw aw.. aam ni nun aam ni\nAw aw.. aam ni nun aam ni......\n\nSimlei laigil sung ah kua a lianpen diam..?\nLenna i vangkhua ah kua a lunpen diam?\nsimlei in tangtawn daih lou\nSianmang liim bel ni\n\nSimlei khuam bang luah den din\nmimbang i piang lou\nlungtuak leng diamdiam ni\ndamlai hun leh ni\nTuibang kiam mualliam zel\nlenlai i nun nuam\nSian Siam a tangbang i damlai ni\nAw aw.. aam ni nun aam ni\nAw aw.. aam ni nun aam ni......\n\nKei lun ing/hun chiken maw tomkal i hin sung in\nKei ka mang chiken maw phamnan ei hon ngak\nsimlei in tangtawn daih lou\nSianmang liim beel ni\n\nSimlei khuam bang luah den din\nmimbang i piang lou\nlungtuak leng diamdiam ni\ndamlai hun leh ni\nTuibang kiam mualliam zel\nlenlai i nun nuam\nSian Siam a tangbang i damlai ni\nAw aw.. aam ni nun aam ni\nAw aw.. aam ni nun aam ni......"
    const youtube = []
    const popularity = "0{1098736287546}{paite}{pumkhothang-tonsing}{amah-muan-ding}"
    
    try {
        // make sure song doesn't exist
        let songExist = await Song.findOne({
            title: new Regexp(title, "i"),
            writer: new Regexp(writer, "i"),
            dialect: new Regexp(dialect, "i")
        })
        if (songExist){
            return next({
                status: 409,
                error: {
                    code: "song-already-exist",
                    song: {
                        _id: songExist._id.toString(),
                        title: songExist.title,
                        writer: songExist.writer,
                        dialect: songExist.dialect,
                        lyrics: songExist.lyrics
                    }
                }
            })
        }

        let newSong = new Song({
            title,
            writer,
            category,
            dialect,
            lyrics,
            youtube,
            popularity
        })
        newSong = await newSong.save()

        res
        .status(200)
        .send(newSong._id.toString())
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