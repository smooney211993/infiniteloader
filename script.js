// nodes
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

// photo array
let ready = false;
let imagesLoaded = 0
let photoArray = [];
const count = 10;
//  sets attributes to created elements
const setAttributes = (element, attribute) =>{
    for(const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// check if all images are loaded

const imageLoaded = ()=>{
    console.log('image loaded')
    imagesLoaded ++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
       // if imagesloaded is equal to the total images ready is then set to true which will run the async function
        ready = true;
        loader.hidden = true;
        
        // when all the images have loaded we hide the loading bar
    }
}

const displayPhotos = () => {
    imagesLoaded =0;
     totalImages = photoArray.length;
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

        // event listener to check when the image has finished loading
        img.addEventListener('load',imageLoaded)
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

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
       ready = false;
        getRandomImages()
    }
})

getRandomImages();

