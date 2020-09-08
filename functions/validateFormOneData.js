module.exports = ({ title, writer, dialect }) => {

    // validate title
    if (!title){
        return {
            status: 406,
            error: {
                code: "title",
                message: "Please enter a title!"
            }
        }
    }
    if (title.length < 4){
        return {
            status: 406,
            error: {
                code: "title",
                message: "Title too short, it should be at least 2 characters!"
            }
        }
    }
    else if (title.length > 300){
        return {
            status: 406,
            error: {
                code: "title",
                message: "Title too long, it should be at most 300 characters!"
            }
        }
    }

    // validate writer
    if (writer && writer.length < 4){
        return {
            status: 406,
            error: {
                code: "writer",
                message: "Writer's name is too short, it should be at least 2 characters!"
            }
        }
    }
    else if (writer && writer.length > 100){
        return {
            status: 406,
            error: {
                code: "writer",
                message: "Writer's name is too long, it should be at most 100 characters!"
            }
        }
    }

    // validate dialect
    if (!dialect){
        return {
            status: 406,
            error: {
                code: "dialect",
                message: "Please specify a dialect!"
            }
        }
    }
    const dialects = process.env.DIALECTS.split("-")
    let dialectIsValid = false
    for (let i = 0; i < dialects.length; i++){
        if (dialects[i] === dialect){
            dialectIsValid = true
            break
        }
    }
    if (!dialectIsValid){
        return {
            status: 406,
            error: {
                code: "dialect",
                message: "Please specify a valid dialect!"
            }
        }
    }

    return {
        status: 200
    }

}