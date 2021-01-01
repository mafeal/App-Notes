class NotaController {
   constructor() {
      let $ = document.querySelector.bind(document);

      this._id = "";
      this._inputTitulo = $("#note-title");
      this._inputCorpo = $("#note-body");
      this._listaNotas = new ListaNotas();

      this._pegaId = "";
      this._editaTitulo = "";
      this._editaCorpo = "";
      this._editaForm = $("#form-edit");

      this._initialState = () => {
         ConnectionFactory.getConnection()
            .then((connection) => new NegociacaoDao(connection))
            .then((dao) => dao.listaTodos())
            .then((notas) => {
               notas.forEach((nota) => {
                  // console.log(nota)
                  this._listaNotas.adiciona(nota);
                  this._notasView = new NotasView($("[notes-container]"));
                  this._notasView.update(this._listaNotas);
               });
            });
      };
      this._initialState();
   }

   adiciona(event) {
      event.preventDefault();

      ConnectionFactory.getConnection()
         .then((connection) => {
            let nota = this._criaNota();
            new NegociacaoDao(connection).adiciona(nota).then(() => {
               this._limpaFormulario();
               this._listaNotas.zeraNotas();
               this._initialState();
               this._notasView.update(this._listaNotas);
            });
         })
         .catch((erro) => {
            console.log("Não foi possível inserir nova nota. - " + erro);
         });
   }

   edita(event, index, id) {
      event.preventDefault();

      ConnectionFactory.getConnection()
         .then((connection) => {
            let nota = this._alteraNota(index, id);
            new NegociacaoDao(connection).altera(nota, id).then(() => {
               this._listaNotas.altera(index, nota);
               this._limpaFormulario();
               this._notasView.update(this._listaNotas);
            });
         })
         .catch((erro) => {
            console.log("Não foi possível inserir nova nota. - " + erro);
         });
   }

   exibeFormEdita(index) {
      let $ = document.querySelector.bind(document);
      $(`#form-edit-${index}`).classList.remove("hidden");
   }

   remove(index, key) {
      if (confirm("Realmente deseja excluir esta nota?")) {
         ConnectionFactory.getConnection()
            .then((connection) => {
               new NegociacaoDao(connection).apaga(key).then(() => {
                  this._listaNotas.apaga(index);
                  this._notasView.update(this._listaNotas);
               });
            })
            .catch((erro) => {
               console.log("Não foi possível excluir a nota. - " + erro);
            });
      }
   }

   _alteraNota(index, id) {
      let data = DateHelper.dataParaTexto(new Date());

      let $ = document.querySelector.bind(document);

      this._editaTitulo = $(`#edit-title-${index}`);
      this._editaCorpo = $(`#edit-body-${index}`);
      this._notaTitulo = $(`#note-title-${index}`);
      this._notaCorpo = $(`#note-body-${index}`);

      return new Nota(
         id,
         this._editaCorpo.value,
         this._editaTitulo.value,
         data
      );
   }

   _criaNota() {
      let data = DateHelper.dataParaTexto(new Date());

      return new Nota(
         this._id,
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

   _filtra() {
      // retirado da aplicação C:\web-coding\Alura\Front-End\JavaScript

      var campoFiltro = document.querySelector("#search-input");

      campoFiltro.addEventListener("input", function () {
         var notas = document.querySelectorAll(".note-details");

         if (this.value.length > 0) {
            notas.forEach((nota) => {
               var title = nota.querySelector(".title");
               var titleContente = title.textContent;
               var expressao = new RegExp(this.value, "i");

               // Adição aqui
               if (expressao.test(titleContente)) {
                  nota.classList.remove("hidden");
               } else {
                  nota.classList.add("hidden");
               }
            });
         } else {
            notas.forEach((nota) => {
               nota.classList.remove("hidden");
            });
         }
      });
   }
}
