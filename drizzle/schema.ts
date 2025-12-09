import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  /** Senha hash para autenticação customizada */
  password: varchar("password", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "professional"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de Pacientes - Armazena informações clínicas e pessoais dos pacientes
 */
export const pacientes = mysqlTable("pacientes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  dataNascimento: varchar("dataNascimento", { length: 10 }),
  telefone: varchar("telefone", { length: 20 }),
  endereco: text("endereco"),
  dataAtendimento: varchar("dataAtendimento", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Paciente = typeof pacientes.$inferSelect;
export type InsertPaciente = typeof pacientes.$inferInsert;

/**
 * Tabela de Profissionais de Saúde - Médicos, enfermeiros, técnicos
 */
export const profissionais = mysqlTable("profissionais", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  crm: varchar("crm", { length: 20 }).notNull().unique(),
  especialidade: varchar("especialidade", { length: 100 }),
  telefone: varchar("telefone", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Profissional = typeof profissionais.$inferSelect;
export type InsertProfissional = typeof profissionais.$inferInsert;

/**
 * Tabela de Consultas - Agendamentos e consultas realizadas
 */
export const consultas = mysqlTable("consultas", {
  id: int("id").autoincrement().primaryKey(),
  pacienteId: int("pacienteId").notNull().references(() => pacientes.id),
  profissionalId: int("profissionalId").notNull().references(() => profissionais.id),
  dataConsulta: varchar("dataConsulta", { length: 10 }).notNull(),
  horaConsulta: varchar("horaConsulta", { length: 5 }).notNull(),
  tipo: mysqlEnum("tipo", ["presencial", "telemedicina"]).default("presencial").notNull(),
  status: mysqlEnum("status", ["agendada", "realizada", "cancelada"]).default("agendada").notNull(),
  motivo: text("motivo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Consulta = typeof consultas.$inferSelect;
export type InsertConsulta = typeof consultas.$inferInsert;

/**
 * Tabela de Prontuários - Histórico clínico eletrônico dos pacientes
 */
export const prontuarios = mysqlTable("prontuarios", {
  id: int("id").autoincrement().primaryKey(),
  pacienteId: int("pacienteId").notNull().unique().references(() => pacientes.id),
  dataCriacao: timestamp("dataCriacao").defaultNow().notNull(),
  historico: text("historico"),
  observacoes: text("observacoes"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Prontuario = typeof prontuarios.$inferSelect;
export type InsertProntuario = typeof prontuarios.$inferInsert;

/**
 * Tabela de Receitas Digitais - Receitas emitidas pelos profissionais
 */
export const receitasDigitais = mysqlTable("receitasDigitais", {
  id: int("id").autoincrement().primaryKey(),
  consultaId: int("consultaId").references(() => consultas.id),
  pacienteId: int("pacienteId").notNull().references(() => pacientes.id),
  profissionalId: int("profissionalId").notNull().references(() => profissionais.id),
  medicamentos: text("medicamentos"),
  dosagem: text("dosagem"),
  assinatura: text("assinatura"),
  dataEmissao: timestamp("dataEmissao").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReceitaDigital = typeof receitasDigitais.$inferSelect;
export type InsertReceitaDigital = typeof receitasDigitais.$inferInsert;

/**
 * Tabela de Logs de Auditoria - Registra todas as operações críticas
 */
export const auditoria = mysqlTable("auditoria", {
  id: int("id").autoincrement().primaryKey(),
  usuarioId: int("usuarioId").references(() => users.id),
  acao: varchar("acao", { length: 100 }).notNull(),
  tabela: varchar("tabela", { length: 50 }).notNull(),
  registroId: int("registroId"),
  dadosAntigos: text("dadosAntigos"),
  dadosNovos: text("dadosNovos"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Auditoria = typeof auditoria.$inferSelect;
export type InsertAuditoria = typeof auditoria.$inferInsert;

/**
 * Tabela de Sessoes de Telemedicina
 */
export const telemedicinaSessoes = mysqlTable("telemedicinaSessoes", {
  id: int("id").autoincrement().primaryKey(),
  consultaId: int("consultaId").notNull().references(() => consultas.id),
  pacienteId: int("pacienteId").notNull().references(() => pacientes.id),
  profissionalId: int("profissionalId").notNull().references(() => profissionais.id),
  jitsiRoomId: varchar("jitsiRoomId", { length: 255 }).notNull(),
  dataInicio: timestamp("dataInicio").defaultNow().notNull(),
  dataFim: timestamp("dataFim"),
  duracao: int("duracao"),
  status: mysqlEnum("status", ["ativa", "finalizada", "cancelada"]).default("ativa").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TelemedicinaSessao = typeof telemedicinaSessoes.$inferSelect;
export type InsertTelemedicinaSessao = typeof telemedicinaSessoes.$inferInsert;

/**
 * Tabela de Internacoes
 */
export const internacoes = mysqlTable("internacoes", {
  id: int("id").autoincrement().primaryKey(),
  pacienteId: int("pacienteId").notNull().references(() => pacientes.id),
  dataAdmissao: timestamp("dataAdmissao").defaultNow().notNull(),
  dataAlta: timestamp("dataAlta"),
  motivo: text("motivo").notNull(),
  diagnostico: text("diagnostico"),
  status: mysqlEnum("status", ["internado", "alta", "transferido", "obito"]).default("internado").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Internacao = typeof internacoes.$inferSelect;
export type InsertInternacao = typeof internacoes.$inferInsert;

/**
 * Tabela de Leitos
 */
export const leitos = mysqlTable("leitos", {
  id: int("id").autoincrement().primaryKey(),
  numero: varchar("numero", { length: 20 }).notNull().unique(),
  tipo: mysqlEnum("tipo", ["enfermaria", "uti", "isolamento", "semi-privativo"]).notNull(),
  unidade: varchar("unidade", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["disponivel", "ocupado", "manutencao"]).default("disponivel").notNull(),
  internacaoId: int("internacaoId").references(() => internacoes.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leito = typeof leitos.$inferSelect;
export type InsertLeito = typeof leitos.$inferInsert;

/**
 * Tabela de Prontuarios Completos
 */
export const prontuariosCompletos = mysqlTable("prontuariosCompletos", {
  id: int("id").autoincrement().primaryKey(),
  pacienteId: int("pacienteId").notNull().references(() => pacientes.id),
  profissionalId: int("profissionalId").notNull().references(() => profissionais.id),
  conteudo: text("conteudo").notNull(),
  versao: int("versao").default(1).notNull(),
  assinado: mysqlEnum("assinado", ["nao", "sim"]).default("nao").notNull(),
  hashAssinatura: varchar("hashAssinatura", { length: 255 }),
  dataAssinatura: timestamp("dataAssinatura"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProntuarioCompleto = typeof prontuariosCompletos.$inferSelect;
export type InsertProntuarioCompleto = typeof prontuariosCompletos.$inferInsert;