class ListaNotas {

    constructor() {
        this._notas = [];
    }

    adiciona(nota) {
        this._notas.push(nota);
    }

    get notas() {
        // concatenando com um array vazio, tirao acesso ao array original, fornecendo uma cópia do mesmo.
        return [].concat(this._notas); 
    }

    apaga(index) {
        this._notas.splice(index, 1)
    }

    altera(index, nota) {
        this._notas[index] = nota
    }
}