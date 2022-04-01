import Cliente from "../../core/Cliente";
import firebase from "../config";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

    // converter a classe CLIENTE em objeto para  ser atribuido no banco de dados do firebase
    // o laravel faz isso sozinho graças o ORM que transforma classe em tabelas e metodos de classes como (create,update, delete, show) em querys
    #conversor = {
        /** Lembrete os nomes precisam ser exatamentes iguais */
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        },

        //reber do firestore e converter para o classe  CLIENTE
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente);
        } else {
            const docRef = await this.colecao().add(cliente);
            const doc = await docRef.get();
            return doc.data();
        }
        return null;
    }

    async excluir(cliente: Cliente): Promise<void> {
        return await this.colecao().doc(cliente.id).delete();
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get(); // retorna promessa uma query feita do lado do firestore
        return query.docs.map(doc => doc.data()) ?? []; // executa a query e rorta os resultados obtidos
    }

    private colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor);
    }
}