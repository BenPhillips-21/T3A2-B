import Videos from "../models/videoSchema.js";

// Function to insert multiple videos into the database
export async function insertVideos(req, res) {
    const videoData = req.body; // Get video data from the request body

    try {
        await Videos.insertMany(videoData); // Insert videos into the database
        res.json({ msg: "Video data Saved Successfully...!" }); // Send a JSON response indicating successful data insertion
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
}

// Function to retrieve all videos from the database
export async function getVideos(req, res) {
    try {
        const vids = await Videos.find(); // Retrieve all videos from the database
        res.json(vids); // Send the videos as a JSON response
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

// Function to update a specific video by its ID
export async function updateVideo(req, res) {
    const videoId = req.params.id; // Get the video ID from the request parameters
    const updateData = req.body; // Get the updated video data from the request body

    try {
        const updatedVideo = await Videos.findByIdAndUpdate(videoId, updateData, { new: true });

        // If the video is not found, return a 404 error
        if (!updatedVideo) {
            return res.status(404).json({ msg: "Video not found" });
        }

        // Return a JSON response indicating successful video update
        res.json({ msg: "Video updated successfully", updatedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

// Function to delete all videos from the database
export async function deleteVideos(req, res) {
    try {
        await Videos.deleteMany(); // Delete all videos from the database
        res.json({ msg: "Videos deleted successfully" }); // Send a JSON response indicating successful deletion
    } catch (error) {
        res.json({ error });
    }
}
