import {ITurma , IAlunos} from "./type";


const values = window.location.search;
const searchParams = new URLSearchParams(values);



async function getStudent (id:number){
    const resp =  await fetch (`http://localhost:3500/lista-alunos/${id}`);
    const data = await resp.json();    
    console.log(data);   
    
    function dataStudent (id2:number) {    
    const cont = document.querySelector(".container");
    if (id2 === id){            
    
    cont!.innerHTML = 
        `<span>Nome: ${data.nome}</span><br />
        <span>Turma: ${data.turma}</span><br />`  
        } 
        
        else {
           cont!.innerHTML = `Página Invalida` 
        }

    }

    dataStudent(data.id) 
}
    
  if (searchParams.has("id")){
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id")!);
    getStudent(id);
} 



   

