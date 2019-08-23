const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {resolve('OK') }, 2000);
});
/* forma antiga
minhaPromise().then(response => {
    console.log(response);
})*/

//const executaPromise = async () => {} da no mesmo q a forma de baixo
async function executaPromise(){
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    
    // É O MESMO QUE:
    /*minhaPromise().then(response => {
        console.log(response);
            minhaPromise().then(response => {
            console.log(response);
                minhaPromise().then(response => {
                console.log(response);
                })
        })
    })*/

}

executaPromise();