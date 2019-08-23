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

        const repoInput = this.inputEl.value;
        if(repoInput.length === 0){
            window.alert('INFORME UM USUÁRIO DO GITHUB!');
            return;
        }

        this.setLoading();

        try{
            const response = await api.get(`/users/${repoInput}`);

            const { name, bio, avatar_url, blog } = response.data;

            this.repositories.push({
                name,
                bio,
                avatar_url,
                blog,
            });

            this.render();
            //console.log(response);
                    
        } catch(err){
            window.alert('ERRO! O REPOSOTÓRIO NÃO EXISTE!!');
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
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let bioEl = document.createElement('p');
            bioEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target','_blank');
            linkEl.setAttribute('href', repo.blog);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(bioEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
            this.inputEl.value = ''; //limpando o conteudo do imput
        });
    }
}

new App();