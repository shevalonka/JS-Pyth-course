function aloFilter (array, somefun){
    const filterArr = [];
for(let i = 0; i < array.length; i++){
    if (somefun(array[i]) == true)
    filterArr.push(array[i]);
}
return filterArr;
}

function prueba (num){
    return num > 12;
}
