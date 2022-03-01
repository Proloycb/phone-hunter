// toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
toggleSpinner('none');
// toggle search detail
const toggleSearchDetail = displayStyle => {
    document.getElementById('search-detail').style.display = displayStyle;
}
// show all 
const showAllButton = displayStyle => {
    document.getElementById('show-all').style.display = displayStyle;
}
showAllButton('none');
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // clear the value
    searchField.value = '';
    toggleSpinner('block');
    toggleSearchDetail('none');
    if(searchText == ''){
        toggleSpinner('none');
        return alert('please add something');
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(phone => {
            displayResult(phone.data.slice(0, 20));
            document.getElementById('show-all').addEventListener('click', function(){
                displayResult(phone.data);
            });
        });
    }
}

// error message show

const errorMessage = document.getElementById('error-show').style.display = 'none';

// display result
const displayResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(phones.length == 0){
        const errorMessage = document.getElementById('error-show');
        errorMessage.style.display ='block';
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
        showAllButton('block');
    });
    toggleSpinner('none');
}

// load details
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(phone => displayDetailResult(phone.data));
}

// detail result
const displayDetailResult = phone => {
    const searchDetails = document.getElementById('search-detail');
    searchDetails.textContent='';
    toggleSearchDetail('block');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">${phone.brand}</p>
            <p class="card-text"><strong>ReleaseDate: </strong>${phone?.releaseDate||'Releasedate upcoming'}</p>
            <p class="card-text"><strong>Storage: </strong>${phone.mainFeatures.storage}, <strong>DisplaySize: </strong>${phone.mainFeatures.displaySize},<strong> ChipSet: </strong>${phone.mainFeatures.chipSet},<strong> Memory: </strong>${phone.mainFeatures.memory}</p>
            <p class="card-text"><strong>Sensors: </strong>${phone.mainFeatures.sensors}</p>
            <p class="card-text"><strong>WLAN: </strong>${phone?.others?.WLAN|| 'no data found!'}, <strong>Bluetooth: </strong>${phone?.others?.Bluetooth|| 'no data found!'},<strong>GPS: </strong> ${phone?.others?.GPS|| 'no data found!'},<strong> NFC: </strong>${phone?.others?.NFC|| 'no data found!'},<strong> Radio: </strong>${phone?.others?.Radio|| 'no data found!'},<strong> USB: </strong>${phone?.others?.USB|| 'no data found!'}</p>
        </div>
    `;
    searchDetails.appendChild(div);
}