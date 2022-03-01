const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // clear the value
    searchField.value = '';
    if(searchText == ''){
        return alert('please add something');
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(phone => displayResult(phone.data.slice(0, 20)));
    // document.getElementById('show-more').addEventListener(click, function(){
    //     displayResult(phone.data.slice(21));
    // })
    }
}

const displayResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(phones.length == 0){
        return alert('No Phone found');
    }
    phones.forEach (phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick = "loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info text-white">Detail Explore</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
    console.log(phones);
}

const loadPhoneDetails = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(res => res.json())
    .then(phone => displayDetailResult(phone.data));
}

const displayDetailResult = phone => {
    const searchDetails = document.getElementById('search-detail');
    searchDetails.textContent='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">${phone.brand}</p>
            <p class="card-text"><strong>ReleaseDate: </strong>${phone?.releaseDate}</p>
            <p class="card-text"><strong>storage: </strong>${phone.mainFeatures.storage}, <strong>displaySize: </strong>${phone.mainFeatures.displaySize},<strong> chipSet: </strong>${phone.mainFeatures.chipSet},<strong> memory: </strong>${phone.mainFeatures.memory}</p>
            <p class="card-text"><strong>Sensors: </strong>${phone.mainFeatures.sensors}</p>
            <p class="card-text"><strong>WLAN: </strong>${phone?.others?.WLAN}, <strong>Bluetooth: </strong>${phone?.others?.Bluetooth},<strong>GPS: </strong> ${phone?.others?.GPS},<strong> NFC: </strong>${phone?.others?.NFC},<strong> Radio: </strong>${phone?.others?.Radio},<strong> USB: </strong>${phone?.others?.USB}</p>
        </div>
    `;
    searchDetails.appendChild(div);
}