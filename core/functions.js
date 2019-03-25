//function to save file to file system
const saveFile = async (req) => {
    let uploadFiles = [];   //array of new filenames for uploaded files

    if (req.files) {
        //check whether req.files contains an Array or  Object and get the count
        let file_count = req.files.pictures instanceof Array ? req.files.pictures.length : 1;
        if (file_count > 1) {
            //if an array, for each array element(file) save under new name
            req.files.pictures.forEach((file)=>{
                let filename = `p_${Math.round(Math.random() * (1000 - 0))}_${file_count}_${Math.round(Math.random() * (1000 - 0))}${file.name.substr(file.name.lastIndexOf('.'))}`;
                file.mv(`${__dirname}/../uploads/${filename}`, (error) => {
                    if (error) {
                        throw new Error(`Unable to save file`);
                    }
                });
                //add new name to array of filenames
                uploadFiles.push(filename);
            });
        } else {
            //if an object, save the single object
            let file = req.files.pictures;
            let filename = `p_${Math.round(Math.random() * (1000 - 0))}_${file_count}_${Math.round(Math.random() * (1000 - 0))}${file.name.substr(file.name.lastIndexOf('.'))}`;
            file.mv(`${__dirname}/../uploads/${filename}`, (error) => {
                if (error) {
                    throw new Error(`Unable to save file`);
                } 
            });
            //add new name to array of filenames
            uploadFiles.push(filename);
        }
    }
    return uploadFiles;
}

module.exports = {saveFile};