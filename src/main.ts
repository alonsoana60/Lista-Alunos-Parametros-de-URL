interface ITurma {
  id: number,
  turma: string,
}

interface INotas {
  matematica: number [],
  portugues: number [],
  historia: number [],
  geografia: number [],
  fisica: number [],
  quimica: number [],
  linguas: number [],
}

interface IFaltas {
  matematica: number,
  portugues: number,
  historia: number,
  geografia: number,
  fisica: number,
  quimica: number,
  linguas: number,
}

interface IAlunos {
    id: number,
    nome: string,
    turma: number,
    notas: INotas, 
    faltas: IFaltas,
}

interface IFiltro {
  id:string,
  nome:string,
}

const filtro: IFiltro = {
  id: "0",
  nome: "",
};

let listaTurmas: ITurma[] = [];

// filtro nome
document.querySelector("#name")!.addEventListener('search', (ev: Event)=> {
  const busca = (ev.target as HTMLInputElement).value;
  console.log('valor busca', busca);
  filtro.nome = busca;
  getAlunos(filtro);
})

// puxar turmas
async function getTurma (){
    const resp = await fetch ("http://localhost:3500/lista-turmas");
    const turmas = await resp.json();
    // console.log("turmas", turmas);
    listaTurmas = turmas;
    populateSelect(turmas);
    getAlunos(filtro);
}

// popular o select de turma
function populateSelect (lista: ITurma[]){
  const select = document.querySelector("#turma");

  if (select && lista.length > 0){
    for (const turma of lista){
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
function handleSelect (event: Event){
  const turmaID = (event.target as HTMLInputElement).value;
 filtro.id = turmaID;
 getAlunos(filtro)
}

// puxar alunos
async function getAlunos ({id, nome}:IFiltro, page = 1){
  let url = `http://localhost:3500/lista-alunos?_sort=nome&_limit=7&_page=${page}`;
    if (id !== "0") {
      url += `&turma=${id}`;
    }
    if (nome){
      url += `&nome_like=${nome}`;
    }
    const resp = await fetch (url);
    const totalCount = parseInt(resp.headers.get("X-Total-Count") || "0")
    const alunos = await resp.json();
    // console.log("alunos", alunos);
    listaAlunos(alunos as IAlunos[]);
    pagination(totalCount, page);
}

// popular lista na tela
function listaAlunos(alunos: IAlunos[]){
  const list = document.querySelector(".lista-alunos");
  let students = "";

  if (list){
    for (const nomes of alunos){
      const turma = listaTurmas.find((t)=> t.id === nomes.turma);
      students += `
      <li>
          <span class="id">${nomes.id}</span>
          <a href="details.html?id=${nomes.id}"><span class="nome">${nomes.nome} </a> </span>
          <span class="turma"> <b> Turma </b> ${turma?.turma}</span>
        </li>
      `;
    } list.querySelector("ul")!.innerHTML = students;
  }
}

// paginacao com API
function pagination (totalCount:number, actualPage:number){
  // quantidade de paginas baseada no total de data / quantidade de data que eu quero por pg
  const totalPages = Math.ceil(totalCount/7);

  // criar ul para paginacao
  const ul = document.createElement("ul");

  // criar link para pagina anterior
  const liPrev = document.createElement("li");
  const aPrev = document.createElement("a");
  aPrev.setAttribute("href","#");
  aPrev.textContent = "Anterior";

  if (actualPage > 1){
    aPrev.onclick = () => getAlunos(filtro, actualPage -1);
  }

  liPrev.appendChild(aPrev);
  ul.appendChild(liPrev);

  // criar link para as paginas
  for (let i=1; i<=totalPages; i++){
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href","#");
  a.textContent = String(i);

  if (i === actualPage){
    a.classList.add("active");
  } else {
    a.onclick = () => getAlunos(filtro, i)
  }
  li.appendChild(a);
  ul.appendChild(li); 
  } 


  // criar link para pagina seguinte
  const liNext = document.createElement("li");
  const aNext = document.createElement("a");
  aNext.setAttribute("href","#");
  aNext.textContent = "Próxima";

  if (actualPage < totalPages){
    aNext.onclick = () => getAlunos(filtro, actualPage +1);
  }

  liNext.appendChild(aNext);
  ul.appendChild(liNext); 

  const pagination = document.querySelector(".paginacao");
  if (pagination){
    pagination.innerHTML = "";
    pagination.appendChild(ul);
  }
}

