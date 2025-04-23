const fs = require('fs');
const path = require('path');

const deleteImage = (filePath)=>{
    const fullPath = path.join(__dirname,"../../",filePath);
    fs.unlink(fullPath,(err)=>{
        if(err){
            console.log('Failed to delete image',err);
        }
    })
}

module.exports = deleteImage 