var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const filtro = {
    id: "0",
    nome: "",
};
let listaTurmas = [];
// filtro nome
document.querySelector("#name").addEventListener('search', (ev) => {
    const busca = ev.target.value;
    console.log('valor busca', busca);
    filtro.nome = busca;
    getAlunos(filtro);
});
// puxar turmas
function getTurma() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3500/lista-turmas");
        const turmas = yield resp.json();
        // console.log("turmas", turmas);
        listaTurmas = turmas;
        populateSelect(turmas);
        getAlunos(filtro);
    });
}
// popular o select de turma
function populateSelect(lista) {
    const select = document.querySelector("#turma");
    if (select && lista.length > 0) {
        for (const turma of lista) {
            const opt = document.createElement("option");
            opt.setAttribute("value", String(turma.id));
            opt.textContent = turma.turma;
            select.appendChild(opt);
        }
        select.addEventListener("change", handleSelect);
    }
}
getTurma();
// funcao com select alterado com a turma
function handleSelect(event) {
    const turmaID = event.target.value;
    filtro.id = turmaID;
    getAlunos(filtro);
}
// puxar alunos
function getAlunos({ id, nome }, page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `http://localhost:3500/lista-alunos?_sort=nome&_limit=7&_page=${page}`;
        if (id !== "0") {
            url += `&turma=${id}`;
        }
        if (nome) {
            url += `&nome_like=${nome}`;
        }
        const resp = yield fetch(url);
        const totalCount = parseInt(resp.headers.get("X-Total-Count") || "0");
        const alunos = yield resp.json();
        // console.log("alunos", alunos);
        listaAlunos(alunos);
        pagination(totalCount, page);
    });
}
// popular lista na tela
function listaAlunos(alunos) {
    const list = document.querySelector(".lista-alunos");
    let students = "";
    if (list) {
        for (const nomes of alunos) {
            const turma = listaTurmas.find((t) => t.id === nomes.turma);
            students += `
      <li>
          <span class="id">${nomes.id}</span>
          <a href="details.html?id=${nomes.id}"><span class="nome">${nomes.nome} </a> </span>
          <span class="turma"> <b> Turma </b> ${turma === null || turma === void 0 ? void 0 : turma.turma}</span>
        </li>
      `;
        }
        list.querySelector("ul").innerHTML = students;
    }
}
// paginacao com API
function pagination(totalCount, actualPage) {
    // quantidade de paginas baseada no total de data / quantidade de data que eu quero por pg
    const totalPages = Math.ceil(totalCount / 7);
    // criar ul para paginacao
    const ul = document.createElement("ul");
    // criar link para pagina anterior
    const liPrev = document.createElement("li");
    const aPrev = document.createElement("a");
    aPrev.setAttribute("href", "#");
    aPrev.textContent = "Anterior";
    if (actualPage > 1) {
        aPrev.onclick = () => getAlunos(filtro, actualPage - 1);
    }
    liPrev.appendChild(aPrev);
    ul.appendChild(liPrev);
    // criar link para as paginas
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        a.textContent = String(i);
        if (i === actualPage) {
            a.classList.add("active");
        }
        else {
            a.onclick = () => getAlunos(filtro, i);
        }
        li.appendChild(a);
        ul.appendChild(li);
    }
    // criar link para pagina seguinte
    const liNext = document.createElement("li");
    const aNext = document.createElement("a");
    aNext.setAttribute("href", "#");
    aNext.textContent = "Próxima";
    if (actualPage < totalPages) {
        aNext.onclick = () => getAlunos(filtro, actualPage + 1);
    }
    liNext.appendChild(aNext);
    ul.appendChild(liNext);
    const pagination = document.querySelector(".paginacao");
    if (pagination) {
        pagination.innerHTML = "";
        pagination.appendChild(ul);
    }
}
export {};
