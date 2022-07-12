import mongoose from 'mongoose' 
import  URI  from '../Config/database'

async function main() {
    await mongoose.connect(`${URI.MONGODB_URI}`)
}

main()
    .then(()=> console.log("connected to database"))    
    .catch((e) => console.log(e));


module.exports = mongoose