const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Rotas para Alunos
app.get("/alunos", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

app.post("/alunos", async (req, res) => {
  const { nome, idade, turma } = req.body;
  try {
    const aluno = await prisma.aluno.create({
      data: { nome, idade, turma },
    });
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
});

app.put("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, turma } = req.body;
  try {
    const aluno = await prisma.aluno.update({
      where: { id: parseInt(id) },
      data: { nome, idade, turma },
    });
    res.json(aluno);
  } catch (error) {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.aluno.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

// Rota para buscar aluno e seu boletim
app.get("/alunos/:id/boletim", async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: parseInt(id) },
      include: { boletins: true },
    });
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno e boletim" });
  }
});

// Rotas para Professores
app.get("/professores", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
});

app.post("/professores", async (req, res) => {
  const { nome, disciplina } = req.body;
  try {
    const professor = await prisma.professor.create({
      data: { nome, disciplina },
    });
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar professor" });
  }
});

app.put("/professores/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, disciplina } = req.body;
  try {
    const professor = await prisma.professor.update({
      where: { id: parseInt(id) },
      data: { nome, disciplina },
    });
    res.json(professor);
  } catch (error) {
    res.status(404).json({ error: "Professor não encontrado" });
  }
});

app.delete("/professores/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.professor.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ error: "Professor não encontrado" });
  }
});

// Rotas para Boletins
app.get("/boletins", async (req, res) => {
  try {
    const boletins = await prisma.boletim.findMany({
      include: { aluno: true },
    });
    res.json(boletins);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar boletins" });
  }
});

app.post("/boletins", async (req, res) => {
  const {
    alunoId,
    disciplina1,
    disciplina2,
    disciplina3,
    disciplina4,
    disciplina5,
  } = req.body;
  try {
    const boletim = await prisma.boletim.create({
      data: {
        alunoId: parseInt(alunoId),
        disciplina1,
        disciplina2,
        disciplina3,
        disciplina4,
        disciplina5,
      },
    });
    res.json(boletim);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar boletim" });
  }
});

app.put("/boletins/:id", async (req, res) => {
  const { id } = req.params;
  const {
    alunoId,
    disciplina1,
    disciplina2,
    disciplina3,
    disciplina4,
    disciplina5,
  } = req.body;
  try {
    const boletim = await prisma.boletim.update({
      where: { id: parseInt(id) },
      data: {
        alunoId: parseInt(alunoId),
        disciplina1,
        disciplina2,
        disciplina3,
        disciplina4,
        disciplina5,
      },
    });
    res.json(boletim);
  } catch (error) {
    res.status(404).json({ error: "Boletim não encontrado" });
  }
});

app.delete("/boletins/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.boletim.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Boletim deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ error: "Boletim não encontrado" });
  }
});

// Servir arquivos estáticos
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
