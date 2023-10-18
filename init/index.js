const mongoose = require('mongoose');
const initData = require('./sampledata');
const listing = require('../models/listing');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}
main()
    .then(() => { console.log('DB connected'); })
    .catch((err)=>{ console.log(err); })


const initDB = async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log('Data Was Saved!');
}

initDB();