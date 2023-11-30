var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const values = window.location.search;
const searchParams = new URLSearchParams(values);
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`http://localhost:3500/lista-alunos/${id}`);
        const data = yield resp.json();
        console.log(data);
        function dataStudent(id2) {
            const cont = document.querySelector(".container");
            if (id2 === id) {
                cont.innerHTML =
                    `<span>Nome: ${data.nome}</span><br />
        <span>Turma: ${data.turma}</span><br />`;
            }
            else {
                cont.innerHTML = `Página Invalida`;
            }
        }
        dataStudent(data.id);
    });
}
if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id"));
    getStudent(id);
}
export {};
