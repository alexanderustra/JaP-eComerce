document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sign-in-btn').addEventListener('click',(e)=>{
        e.preventDefault();

        let logueado = localStorage.setItem('logueado','true');
        const inputs = document.getElementsByTagName('input');
        const userData = [];
        for (let i = 0; i < inputs.length; i++) {
            userData[i] = inputs[i].value;
        }
        localStorage.setItem('user-data',userData);
        console.log(localStorage.getItem('user-data'));
        //es posible que haya un error y no redirija correctamente.
        window.location.href = '../index.html';
    });
});