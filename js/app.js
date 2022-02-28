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