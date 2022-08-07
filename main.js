let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tBody = document.getElementById('tBody');
let btnDelete = document.getElementById('deleteAll');
let mode = 'create';
let temp ;
let searchMood = 'title';


// get total

function getTotal()
{
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = "";
        total.style.background = '#ca1616';
    }
};

// create product

let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{dataPro = [];
};

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };
    // // count products
    if(title.value != '' && price.value != '' && taxes.value != ''&& category.value != '')
    {
        if(mode == 'create')
        {
            if(newPro.count>0 && newPro.count<100)
            {
                for(let i=0;i< newPro.count;i++)
                {
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            };
        }
        else
        {
            dataPro[temp]= newPro;
            count.style.display = 'block';
            submit.innerHTML = 'Create';
            mode = 'create';
        };
        clearData();
    };
    
    
    

    // save on local storage

    localStorage.setItem('product',JSON.stringify(dataPro));


    showData();
};


// clear data inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

// read
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onClick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    tBody.innerHTML = table;
    if(dataPro.length>0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `;
    }else{
        btnDelete.innerHTML='';
    };

}
showData()


// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
};


// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    category.value = dataPro[i].category;
    mode = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    });
}
// search

function getSearchMood(id){
    let searchBox = document.getElementById('search');
    if(id == 'saerchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    };
    searchBox.placeholder = `search by  ${searchMood}` ;
    

    searchBox.focus();
    searchBox.value ='';
    showData();
};

function searchData(value){
    let table = '';
    for(let i=0;i < dataPro.length;i++){
    if(searchMood == 'title'){
        if(dataPro[i].title.includes(value)){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onClick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
            }
    }else{
        if(dataPro[i].category.includes(value)){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onClick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
            };
        };
    };
    tBody.innerHTML = table;
};
// clean data