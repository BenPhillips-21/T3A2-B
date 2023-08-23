import mongoose from 'mongoose'

export default async function connect(){
   await mongoose.connect(process.env.ATLAS_DB_URI)
    .then(goose => console.log(goose.connection.readyState === 1 ? 'Mongoose Connected' : 'Moongoose failed to connect.'))
    .catch(err => console.log(err))
}