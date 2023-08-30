import Videos from "../models/videoSchema.js";

export async function insertVideos(req, res){
    const videoData = req.body

    try {
        await Videos.insertMany( videoData );
        res.json({ msg: "Video data Saved Successfully...!" });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
}

export async function getVideos(req, res) {
    try {
        const vids = await Videos.find()
        res.json(vids)
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}

export async function updateVideo(req, res) {
    const videoId = req.params.id
    const updateData = req.body

    try {
        const updatedVideo = await Videos.findByIdAndUpdate(videoId, updateData, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ msg: "Video not found" });
        }

        res.json({ msg: "Video updated successfully", updatedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export async function deleteVideos(req, res) {
    try {
        await Videos.deleteMany()
        res.json({msg: "Videos deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}
