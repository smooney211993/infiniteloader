// nodes
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

// photo array

let photoArray = [];
const count = 10;
//  
const setAttributes = (element, attribute) =>{
    for(const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

const displayPhotos = () => {
    photoArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.link,
            target: '_blank'
        })
        
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.imageUrl,
            alt: photo.description,
            title: photo.description
        })

        item.appendChild(img);
        imageContainer.appendChild(item)

    })
}




// Api Url and apikey
const url = "https://api.unsplash.com/photos/random/?count=" +count;
const apiKey = "3DHCWCEiH1w5jI04pxX01jRLQDqz0_2a3c2Y7Z5TvJ8"
// async function to fetch random images from the Unsplash api
const getRandomImages = async () =>{
    try {
        const response =  await fetch(url, {headers: {Authorization: `Client-ID ${apiKey}`}});
        if(response.ok){
            const jsonResponse = await response.json();
             photoArray = jsonResponse.map((image)=>{
                return {
                    link : image.links.html,
                    imageUrl:image.urls.small,
                    description: image.description
                };
            })
            console.log(photoArray);
            displayPhotos()
        } else {
            throw new Error('unable to retrieve images')
        }
        
    } catch(error){
        console.log("Error fetching from unsplash apl", error)
    }
}


getRandomImages();
console.log(photoArray)