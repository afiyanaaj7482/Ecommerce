




import User from "../Model/userModel.js"; // This model is imported in one of your snippets

export const getCurrentUser = async (req, res) => {
    try {
        // req.userId should be set by your isAuth middleware
        const userId = req.userId;

        if (!userId) {
            // This case should be handled by isAuth, but it's a good safety check
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Fetch the user data from the database (excluding sensitive fields like password)
        const user = await User.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user data back to the client
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        // The 500 error you are seeing is likely from an unhandled exception here
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

export const getAdmin = async (req,res) => {
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"Admin is not found"}) 
        }
        return res.status(201).json({
            email:adminEmail,
            role:"admin"
        })
    } catch (error) {
        console.log(error)
    return res.status(500).json({message:`getAdmin error ${error}`})
    }
}