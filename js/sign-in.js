document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sign-in-btn').addEventListener('click',(e)=>{
        e.preventDefault();

        const inputs = document.getElementsByTagName('input');
        const userData = [];
        for (let i = 0; i < inputs.length; i++) {
            userData[i] = inputs[i].value;
        }
        localStorage.setItem('user-data',userData);
        console.log(localStorage.getItem('user-data'));
    });
});