const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}
main()
    .then(() => { console.log('DB connected'); })
    .catch((err)=>{ console.log(err); })
