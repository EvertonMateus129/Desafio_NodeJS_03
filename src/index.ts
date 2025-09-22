/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  const readline = require("readline");
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let qntAlunos: number = 0;
  let contagem = 0;

  let alunos: { nome: string; nota: number }[] = [];

  r1.question(
    "Quantos alunos estão presentes no momento?\n",
    (quantidade: string) => {
      qntAlunos = parseInt(quantidade);

      function perguntaAoAluno() {
        if (contagem < qntAlunos) {
          r1.question("Qual o nome do aluno?\n", (nome: string) => {
            r1.question("Qual a nota do aluno?\n", (nota: string) => {
              alunos.push({ nome, nota: parseFloat(nota) });
              contagem++;
              perguntaAoAluno();
            });
          });
        } else {
          console.log(
            `A quantidade de alunos e a notas deles são: ${qntAlunos} e o nome deles são: `
          );
          console.log(alunos);

          const maiorNota = alunos.reduce((maior, atual) => 
            atual.nota > maior.nota ? atual : maior
        );

        console.log(`Alunos com a melhor nota é ${maiorNota.nome} com a nota ${maiorNota.nota}`)

          r1.close();
        }
      }

      perguntaAoAluno();
    }
  );

  // CÓDIGO PARA ATENDER OS REQUERIMENTOS
  // R01, R02, R03, R04, R05
});
