var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let alunos;
let turmas = [];
let materias = {};
// Puxar turmas
function getTurma() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/lista-turmas");
        const turma = yield resp.json();
        // console.log(turma);
        turmas = turma;
    });
}
// Puxar materias
function getMateria() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/lista-materia");
        const materia = yield resp.json();
        console.log(materia);
        materias = materia;
    });
}
// Puxar alunos
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`http://localhost:3500/lista-alunos/${id}`);
        const aluno = yield resp.json();
        // console.log(aluno);
        alunos = aluno;
    });
}
const values = window.location.search;
const searchParams = new URLSearchParams(values);
if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id"));
    Promise.all([getMateria(), getTurma(), getStudent(id)]).then(() => {
        console.log(alunos, turmas, materias);
        // popular nome aluno
        document.querySelector("#nome").textContent = alunos.nome;
        // popular turma do aluno
        const turma = turmas.find((turma) => turma.id === alunos.turma);
        //@ts-ignore
        document.querySelector("#turma").textContent = turma === null || turma === void 0 ? void 0 : turma.turma;
        // popular materias
        const notas = document.querySelector("tbody");
        console.log(notas);
        notas.innerText = "";
        for (const materia in materias) {
            const tr = document.createElement("tr");
            const thMateria = document.createElement("th");
            thMateria.innerText = materia;
            tr.appendChild(thMateria);
            //@ts-ignore
            // popular notas
            for (const nota of alunos.notas[materia]) {
                const tdNota = document.createElement("td");
                tdNota.innerText = String(nota);
                console.log(tdNota);
                tr.appendChild(tdNota);
            }
            // popular faltas
            const tdFalta = document.createElement("td");
            //@ts-ignore
            tdFalta.innerText = String(alunos.faltas[materia]);
            tr.appendChild(tdFalta);
            notas === null || notas === void 0 ? void 0 : notas.appendChild(tr);
        }
    });
}
export {};
