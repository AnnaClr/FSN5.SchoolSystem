-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "turma" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boletim" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "disciplina1" DOUBLE PRECISION NOT NULL,
    "disciplina2" DOUBLE PRECISION NOT NULL,
    "disciplina3" DOUBLE PRECISION NOT NULL,
    "disciplina4" DOUBLE PRECISION NOT NULL,
    "disciplina5" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Boletim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlunoToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AlunoToProfessor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AlunoToProfessor_B_index" ON "_AlunoToProfessor"("B");

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
