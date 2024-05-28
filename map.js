function map (array, somefun) {
let result = [];
for (let i = 0; i < array.length; i++);
{
    result[i] = somefun(array [i]);    
}
return result;
}

let personas = [
{nombre: 'Alona', edad: 80},
{nombre: 'Ekaitz', edad: 33},
{nombre: 'Olatz', edad: 37},
]

map(personas, function(el){return['nombre']});
