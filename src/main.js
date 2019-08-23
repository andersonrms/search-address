import api from './api';

//classe de controle de aplicação
class App{
    constructor(){
        this.repositories = []; //array q vai gardar tudo q for buscado do github

        this.inputEl = document.querySelector('input[name=repository]');
        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');
        this.registerHanrlers();
         
    }

    registerHanrlers(){
        //registra eventos
        this.formEl.onsubmit = event => this.addRepository(event); 
    }
    
    async addRepository(event){
        //funcao para add repositorio
        event.preventDefault();//previni recarregar a pag

        const cepInput = this.inputEl.value;
        if(cepInput.length === 0){
            window.alert('INFORME O CEP!');
            return;
        }

        this.setLoading();
        //https://viacep.com.br/ws/21011110/json/

        try{
            const response = await api.get(`/ws/${cepInput}/json/`);

            const { logradouro, bairro, uf, localidade, cep } = response.data;

            this.repositories.push({
                logradouro,
                bairro,
                uf,
                localidade,
                cep,
                
            });

            this.render();
            console.log(response);
                    
        } catch(err){
            window.alert('ERRO!! - CEP NÃO EXISTE!');
            this.inputEl.value = ''; //limpando o conteudo do imput
        }     
        
        this.setLoading(false);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('img');
            loadingEl.setAttribute('src', 'img/giphy.gif');
            loadingEl.setAttribute('id','loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    render(){
        this.listEl.innerHTML = '';//limpantando a tela

        //percorrendo o repositorio com o foreach() diferente do map()
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', 'img/location_map.jpg');

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.localidade));

            let logEl = document.createElement('p');
            logEl.appendChild(document.createTextNode(repo.logradouro));
            
            let baiEl = document.createElement('p');
            baiEl.appendChild(document.createTextNode(`${repo.bairro} - ${repo.uf}`));

            let cepEl = document.createElement('p');
            cepEl.appendChild(document.createTextNode(repo.cep));
            
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(logEl);
            listItemEl.appendChild(baiEl);
            listItemEl.appendChild(cepEl);

            this.listEl.appendChild(listItemEl);
            this.inputEl.value = ''; //limpando o conteudo do imput
        });
    }
}

new App();