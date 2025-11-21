import jwt from "jsonwebtoken"

const genToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
        console.log(token)
        
        // Return the token (assuming the function is meant to return it)
        return token
    } catch (error) {
        console.log(error) 
    }
}

export default genToken