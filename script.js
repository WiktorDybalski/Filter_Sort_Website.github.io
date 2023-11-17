document.addEventListener('DOMContentLoaded', function () {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData.products;

            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function toggleSortOptions() {
    var sortOptions = document.getElementById('sort-options');
    sortOptions.style.display = (sortOptions.style.display === 'block') ? 'none' : 'block';
}

function toggleFilterOptions() {
    var sortOptions = document.getElementById('insideFilterOptions');
    sortOptions.style.display = (sortOptions.style.display === 'block') ? 'none' : 'block';
}

function closeSortOptions() {
    document.getElementById('sort-options').style.display = 'none';

}

function closeFilterOptions() {
    document.getElementById('insideFilterOptions').style.display = 'none';
}

function resetFilter() {
    closeSortOptions();
    closeFilterOptions();
    renderTable(data);
}

function sortData(column, order) {
    var sortedData = [...data];

    sortedData.sort((a, b) => {
        var aValue = a[column];
        var bValue = b[column];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            var aFirstLetter = aValue.charAt(0).toLowerCase();
            var bFirstLetter = bValue.charAt(0).toLowerCase();

            if (aFirstLetter < bFirstLetter) {
                return order === 'asc' ? -1 : 1;
            } else if (aFirstLetter > bFirstLetter) {
                return order === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        } else {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });

    renderTable(sortedData);
    closeSortOptions();
}


function applyFilters() {
    const selectedCategory = document.getElementById('category').value;
    const priceRange = document.getElementById('priceRange').value;

    let filteredProducts = data;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    filteredProducts = filteredProducts.filter(product => product.price <= priceRange);
    if (filteredProducts.length === 0) {
        alert('Nie ma artykułów spełniających podane kryteria.');
    } else {
        renderTable(filteredProducts);
    }
}


function renderTable(dataArray) {
    var tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    dataArray.forEach(item => {
        var row = tableBody.insertRow();
        var idCell = row.insertCell(0);
        var imageCell = row.insertCell(1);
        var titleCell = row.insertCell(2);
        var priceCell = row.insertCell(3);
        var descriptionCell = row.insertCell(4);

        idCell.innerHTML = item.id;
        imageCell.innerHTML = `<img src="${item.images[0]}" alt="Product Image">`;
        titleCell.innerHTML = item.title;
        priceCell.innerHTML = item.price;
        descriptionCell.innerHTML = item.description;
    });
}

renderTable(data);