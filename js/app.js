const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // clear the value
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(phone => displayResult(phone.data));
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
            <img src="${phone.image}" class="card-img-top" alt="...">
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
    .then(phone => console.log(phone.data));
}