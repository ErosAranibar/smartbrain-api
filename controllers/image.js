const handleApiCall =(req, res)=>{
	 const USER_ID = '40m95179s48w';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '27a75f4cfcf6488981ab4f09b5a4d5e3';
    const APP_ID = 'FaceRecognition';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = req.body.input;
    console.log(req.body.input);

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
   
     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err=>res.status(400).json('unable to work with API'))
}
        

const handleImage=(req,res,db)=>{
	const {id}= req.body;
	db('users').where('id', '=', id)
  	.increment('entries',1).
  	returning('entries').
  	then(entries=>{
  		res.json(entries[0].entries);
  	})
  	.catch(err=>res.status(400).json('unable to get entries'))

}

module.exports = {
	handleImage:handleImage,
	handleApiCall
};