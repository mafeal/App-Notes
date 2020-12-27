class NotaController {
    
    constructor() {
        let $ = document.querySelector.bind(document);
    
        this._inputTitulo = $('#note-title')
        this._inputCorpo = $('#note-body');
        this._listaNotas = new ListaNotas();

        this._editaTitulo = "";
        this._editaCorpo = "";
        this._editaForm = $('#form-edit');
        
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(notas => {
                notas.forEach(nota => {
                    console.log(nota)
                    this._listaNotas.adiciona(nota)
                    this._notasView = new NotasView($('[notes-container]'));
                    this._notasView.update(this._listaNotas);
                })})
    }

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let nota = this._criaNota();

                new NegociacaoDao(connection)
                    .adiciona(nota)
                    .then(() => {
                        this._listaNotas.adiciona(nota);
                        this._limpaFormulario();
                        this._notasView.update(this._listaNotas);
                    })

            })
            .catch(erro => {
                console.log("Não foi possível inserir nova nota. - " + erro)
            });

    }

    edita(event, index) {
        event.preventDefault()

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let nota = this._alteraNota(index);

                new NegociacaoDao(connection)
                    .adiciona(nota)
                    .then(() => {
                        this._listaNotas.altera(index, nota);
                        this._limpaFormulario();
                        this._notasView.update(this._listaNotas);
                    })

            })
            .catch(erro => {
                console.log("Não foi possível inserir nova nota. - " + erro)
            });


        // this._listaNotas.altera(index, this._alteraNota(index));
        // this._limpaFormulario();
        // this._notasView.update(this._listaNotas);   
    }

    exibeFormEdita(index) {

        let $ = document.querySelector.bind(document);
        $(`#form-edit-${index}`).classList.remove('hidden')

    }

    remove(index) {
        
        if(confirm('Realmente deseja excluir esta nota?')) this._listaNotas.apaga(index) 
        this._notasView.update(this._listaNotas)
    }

    _alteraNota(index) {
        let data = DateHelper.dataParaTexto(new Date())

        let $ = document.querySelector.bind(document);

        this._editaTitulo = $(`#edit-title-${index}`);
        this._editaCorpo = $(`#edit-body-${index}`);
        this._notaTitulo = $(`#note-title-${index}`)
        this._notaCorpo = $(`#note-body-${index}`);
        
        return new Nota(
            this._editaCorpo.value, 
            this._editaTitulo.value,
            data
            
        );
    }

    _criaNota() {
        let data = DateHelper.dataParaTexto(new Date())
        
        return new Nota(
            this._inputCorpo.value,
            this._inputTitulo.value,
            data
        );
    }

    _limpaFormulario() {
        this._inputCorpo.value = "";
        this._inputTitulo.value = "";
        this._inputTitulo.focus();
    }
}