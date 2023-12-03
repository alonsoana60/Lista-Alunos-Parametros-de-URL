import {ITurma , IAlunos} from "./type";

let alunos: IAlunos
let turmas: ITurma[] = []
let materias:any = {}


// Puxar turmas
async function getTurma (){
    const resp = await fetch ("http://127.0.0.1:3500/lista-turmas");
    const turma = await resp.json();
    // console.log(turma);
    turmas = turma;
}

// Puxar materias
async function getMateria(){
    const resp = await fetch ("http://127.0.0.1:3500/lista-materia");
    const materia = await resp.json();
    console.log(materia);
    materias = materia;
}

// Puxar alunos
async function getStudent (id:number){
    const resp =  await fetch (`http://localhost:3500/lista-alunos/${id}`);
    const aluno = await resp.json();    
    // console.log(aluno);
    alunos = aluno;     
} 


const values = window.location.search;
const searchParams = new URLSearchParams(values);

  if (searchParams.has("id")){
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id")!);

    Promise.all ([getMateria(), getTurma(), getStudent(id)]).then(() =>{
        console.log(alunos, turmas, materias);
        
        // popular nome aluno
        document.querySelector("#nome")!.textContent = alunos.nome;
        
        // popular turma do aluno
        const turma = turmas.find ((turma)=> turma.id === alunos.turma);
        document.querySelector("#turma")!.textContent = turma?.turma;

        // popular materias
        const notas = document.querySelector("tbody");
        console.log(notas);
        notas!.innerText="";

        for (const materia in materias){
            
            const tr = document.createElement("tr");
            const thMateria = document.createElement("th");
            thMateria.innerText = materia;
            tr.appendChild(thMateria);
            
            
            // for (const nota of alunos.notas[materia]){
            //     const tdNota = document.createElement("td");
            //     tdNota!.innerText = String(nota);
            //     console.log(tdNota);
            //     tr.appendChild(tdNota);
            
                // for (const faltas of alunos.faltas[materia]){
                //     const tdFalta = document.createElement("td");
                //     tdFalta!.innerText = String(faltas);
                //     console.log(tdFalta);
                //     tr.appendChild(tdFalta);
                // }
            // }
            notas?.appendChild(tr)
        }    
    })
  }
