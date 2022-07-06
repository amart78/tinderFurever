const clientId = 'zVG6DsX603GwGs6IHVDzR3L4KrEMrk3vz5vAeL0omod1fjGbv9' //This is a free API Key
const clientSecret = 'fKxNZfQrxPLXR3Xo8dNVFGRCQ8lRH7PWAdE2lQwe' //This is a free API Key

//curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}" https://api.petfinder.com/v2/oauth2/token
//curl -d "grant_type=client_credentials&client_id=zVG6DsX603GwGs6IHVDzR3L4KrEMrk3vz5vAeL0omod1fjGbv9&client_secret=fKxNZfQrxPLXR3Xo8dNVFGRCQ8lRH7PWAdE2lQwe" https://api.petfinder.com/v2/oauth2/token

//fetch (`https://api.petfinder.com/v2/oauth2/token?grant_type=client_credentials&client_id=${CLIENT-ID}&client_secret=${//-SECRET}`)
fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials&client_id=zVG6DsX603GwGs6IHVDzR3L4KrEMrk3vz5vAeL0omod1fjGbv9&client_secret=fKxNZfQrxPLXR3Xo8dNVFGRCQ8lRH7PWAdE2lQwe",
})
.then(a => a.json())
.then(creds => {
    const accessToken = 'Bearer ' + creds.access_token;
    
    fetch('https://api.petfinder.com/v2/animals', {
   
        headers: {
                "Authorization": accessToken
            }
        })
        .then (response => response.json() )
        .then ( (petData) => {
            allPets = petData.animals
            randomPet = Math.floor(Math.random() * (allPets.length-1) ) 
            renderPetCards(randomPet);
        })
})



let allPets;

function renderPetCards(petId){
    
    const pet = allPets[petId];

    //pet name
    const name = document.querySelector('.name')

    const petName = document.createElement('div')
    petName.textContent = pet.name

    petName.className = name.className

    name.replaceWith(petName)

    //image
    const image = document.querySelector('#pet-image')
    const petImage = document.createElement('img')
    petImage.id = 'pet-image'
    
    if (pet.photos[0] && pet.photos[0].full) {
        petImage.src = pet.photos[0].full
        petImage.className = image.className
        image.replaceWith(petImage)

    } else {
        petImage.src = 'https://scalebranding.com/wp-content/uploads/2021/05/Fire-Paw-Logo.jpg'
        petImage.className = image.className

        image.replaceWith(petImage)
    }
    //location 
    // - need to rename to ASL
    const ASL = document.querySelector('#pet-ASL')
    const petASL = document.createElement('span')
    petASL.id = 'pet-ASL'
    petASL.textContent = `${pet.contact.address.city}, ${pet.contact.address.state} || 🎂 ${pet.age} || ⚤ ${pet.gender}`
    petASL.className = ASL.className
    
    ASL.replaceWith(petASL)

    renderInfoOverlay(petId)
}

 //Heart & No buttons (click events to show next pet)
document.querySelector('.heart').addEventListener('click', function (e) {
    renderPetCards(Math.floor(Math.random() * (allPets.length-1) ))
});

document.querySelector('.no').addEventListener('click', function (e) {
    renderPetCards(Math.floor(Math.random() * (allPets.length-1) ) )
})

//Press left or right key to go to next card (similar to pressing 'no' & 'love' button)
document.addEventListener('keydown', function(e) {
    const key = e.key;
    switch (key) {
        case 'ArrowRight':
            renderPetCards(Math.floor(Math.random() * (allPets.length-1) ) ); 
            break;
        case 'ArrowLeft':
                renderPetCards(Math.floor(Math.random() * (allPets.length-1) ) );
            break;
        }
    })


//infoOverlay function
function renderInfoOverlay(petId){
    const pet = allPets[petId];

    //Description
    const description = document.querySelector('.description')
    const petDescription = document.createElement('p')
    petDescription.textContent = pet.description
    // Breed: ${pet.breeds.primary} "\n"
    // Size: ${pet.size} '\n'
    // Attributes: ${pet.attributes} '\n'
    // Environment: ${pet.environment} '\n'
    // Tags:${pet.tags} '\n' `
    petDescription.className = description.className

    description.replaceWith(petDescription)

    // const link = document.querySelector('.pfLink')

    // const petLink = document.createElement('h3')
    // petLink.textContent = pet.url
    // petLink.className = link.className
    // link.replaceWith(petLink)
}
// Hover over infoButton to reveal details about the current pet
document.querySelector('.info').addEventListener('mouseover', function() {
    document.querySelector('.infoOverlay').style.display = 'block';   
});

document.querySelector('.info').addEventListener('mouseleave', function() {
    document.querySelector('.infoOverlay').style.display = 'none';
});
