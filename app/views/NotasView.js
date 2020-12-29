class NotasView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {
        return model.notas.map((note, index) => {
            return `
                
                <details id="${index}" class="note-details">
                    <summary class="note-title">${note.titulo} - ${note.data}</summary>
                    <p id="note-body-${index}" note-body class="note-body">${note.corpo}</p>
                    <p id="note-title-${index}" class="hidden">${note.titulo} - ${note.data}</p>

                    <div id="form-edit-${index}" class="hidden" >
                        <form id="edit-form" class="form-field">
                        <div class="form-note-title">
                            <div class="label">Título:</div>
                            <input  
                                id="edit-title-${index}" 
                                name="title" type="text" 
                                class="input" 
                                value="${note.titulo}"
                            />
                        </div>
                        <div class="form-note-details">
                            <div class="label">Descrição:</div>
                            <textarea
                                id="edit-body-${index}"
                                name="description"
                                class="input textarea"
                            >${note.corpo}</textarea>
                        </div>
                        <button id="edit-salvar" onclick="notaController.edita(event, ${index}, ${note.id})">Salvar</button>
                    </div>
                    <button id="editar" onclick="notaController.exibeFormEdita(${index})" class="btn">Editar</button>
                    <button id="excluir" onclick="notaController.remove(${index}, ${note.id})" class="btn">Excluir</button>
                </details>
                
            `}).join('');
    }

    update(model) {
        this._elemento.innerHTML = this._template(model);
    }


}

