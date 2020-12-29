class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'notas'

    }

    adiciona(nota) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .add(nota);

            request.onsuccess = e => {
                
                resolve(console.log('Nota adicionada com sucesso.'));

            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível incluir uma nota.');
                 
            }            
        })

    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                                .transaction([this._store], 'readwrite')
                                .objectStore(this._store)
                                .openCursor()
            
            let notas = [];
            
            cursor.onsuccess = e => {
                // console.log('Lista obtida com sucesso.')
                let atual = e.target.result;

                if(atual) {
                    let dado = atual.value;
                    let key = atual.key

                    notas.push(new Nota(key, dado.corpo, dado.titulo, dado.data));
                
                    atual.continue();
                } else {
                    resolve(notas);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error.name)
                reject('Não foi possível obter a lista.');
            }

        });

    }

    altera(nota, key){
        return new Promise((resolve, reject) => {

            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .put(nota, key);

            request.onsuccess = e => {
                
                resolve(console.log('Nota alterada com sucesso.'));

            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível alterar a nota.');
                 
            }            
        })
    }

    apaga(key){
        return new Promise((resolve, reject) => {

            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .delete(key);

            request.onsuccess = e => {
                
                resolve(console.log('Nota excluída com sucesso.'));

            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível excluir a nota.');
                 
            }            
        })
    }
}