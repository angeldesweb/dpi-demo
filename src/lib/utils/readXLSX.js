const makeBody = (acc,arr) => {
    let arg = arr[0].split('');
    arg.shift()
    let label = arg.join('');
    label = label - 2;
    if(!acc[label]) {
        acc = {...acc,[label]:[arr[1].v]}
    } else {
        acc[label].push(arr[1].v)
    };
    return acc
}

export const handleFile = (file) => {
    const headers = file
    .filter(arr => arr[0].split('').length === 2)
    .filter(arr => arr[0].split('')[1] === '1')
    .map(arr => arr[1].v);

    if(headers.length !== 3) return { error: 'Formulario inválido' };

    const body = file
    .filter(arr => arr[0].split('')[1] !== '1')
    .reduce(makeBody,{})

    const data = Object.values(body)
    .map((arr) => arr.reduce((acc,item,index) => ({...acc,[headers[index]]:item})) ,{})
    return {headers,body:Object.values(body),data};
}
