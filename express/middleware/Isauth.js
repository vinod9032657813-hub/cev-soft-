import jwt from 'jsonwebtoken'

const Isauth = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: "user does not have token" })
        }
        let verifytoken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifytoken) {
            return res.status(400).json({ message: "user does not have a valid token" })
        }
        req.userId = verifytoken.userId
        next()
    } catch (error) {
        console.error("error in isauth", error);
        return res.status(500).json({ message: `isauth error ${error.message}` })
    }
}

export default Isauth;