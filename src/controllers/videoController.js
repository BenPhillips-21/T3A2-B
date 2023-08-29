import Videos from "../models/videoSchema.js";
import videos from '../database/videoData.js'

export async function insertVideos(req, res){
    try {
        await Videos.insertMany( videos );
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

export async function deleteVideos(req, res) {
    try {
        await Videos.deleteMany()
        res.json({msg: "Videos deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}
