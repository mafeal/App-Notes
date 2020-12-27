const submit = document.getElementById("salvar");
const limpar = document.getElementById("limpar");
const notes = [];

submit.onclick = function (e) {
   e.preventDefault();

   const titulo = document.getElementById('title')
   const descricao = document.getElementById('description')
   const notaContainer = document.querySelector("[notes-container]");
   notaContainer.innerHTML = "";

   const data = new Date();
   const dia = data.getDate();
   const mes = data.getMonth();
   const ano = data.getFullYear();
   const hora = data.getHours();
   const minutos = data.getMinutes();

   notes.push({
      titulo: `${titulo.value} - <span note-date class="note-date">${dia}/${
         mes + 1
      }/${ano} - ${hora}:${minutos}h</span>`,
      corpo: descricao.value,
   });

   notes.forEach((note) => {
      const details = document.createElement("details");
      details.classList.add("note-details");

      details.innerHTML = `
                <summary class="note-title">${note.titulo}</summary>
                <p note-body class="note-body">${note.corpo}</p>
                <button id="editar" class="btn">Editar</button>
                <button id="excluir" class="btn">Excluir</button>
    `;

      notaContainer.append(details);

      titulo.value = ""
      descricao.value = ""

   });
};

limpar.onclick = function (e) {
    e.preventDefault();
    const titulo = document.getElementById('title')
    const descricao = document.getElementById('description')
    
    titulo.value = ""
    descricao.value = ""
    
}


