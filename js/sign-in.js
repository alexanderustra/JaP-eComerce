document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sign-in-btn').addEventListener('click',(e)=>{
        e.preventDefault();

        let empty = false;
        let logueado = localStorage.setItem('logueado','true');
        const inputs = document.getElementsByTagName('input');
        const userData = [];
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].value === '') {
                alert('complete todos los campos')
                empty = true;
                break;
            }
        }
        if (!empty) {
            for (let i = 0; i < inputs.length; i++) {
              userData[i] = inputs[i].value;
            }
          
            localStorage.setItem('user-data', userData);
            window.location.href = 'https://alexanderustra.github.io/workspace-inicial/';
          }
    });
});