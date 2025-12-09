import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createConsulta,
  getConsultaById,
  listConsultasByPaciente,
  updateConsulta,
  getPacienteById,
  getProfissionalById,
  logAuditoria,
} from "../db";

/**
 * Schemas de validação para Consultas
 */
const createConsultaSchema = z.object({
  pacienteId: z.number().int().positive(),
  profissionalId: z.number().int().positive(),
  dataConsulta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
  horaConsulta: z.string().regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)"),
  tipo: z.enum(["presencial", "telemedicina"]).default("presencial"),
  motivo: z.string().optional(),
});

const updateConsultaSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["agendada", "realizada", "cancelada"]).optional(),
  motivo: z.string().optional(),
});

const getConsultaSchema = z.object({
  id: z.number().int().positive(),
});

const listConsultasSchema = z.object({
  pacienteId: z.number().int().positive(),
  status: z.enum(["agendada", "realizada", "cancelada"]).optional(),
});

/**
 * Router de Consultas
 */
export const consultasRouter = router({
  /**
   * Criar nova consulta (agendar)
   * POST /api/trpc/consultas.create
   */
  create: protectedProcedure
    .input(createConsultaSchema)
    .mutation(async ({ input, ctx }) => {
      // Validar se paciente existe
      const paciente = await getPacienteById(input.pacienteId);
      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      // Validar se profissional existe
      const profissional = await getProfissionalById(input.profissionalId);
      if (!profissional) {
        throw new Error("Profissional não encontrado");
      }

      // Criar consulta
      const consulta = await createConsulta({
        pacienteId: input.pacienteId,
        profissionalId: input.profissionalId,
        dataConsulta: input.dataConsulta,
        horaConsulta: input.horaConsulta,
        tipo: input.tipo,
        status: "agendada",
        motivo: input.motivo,
      });

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "CREATE",
        tabela: "consultas",
        registroId: consulta?.id,
        dadosNovos: JSON.stringify(consulta),
      });

      return consulta;
    }),

  /**
   * Obter consulta por ID
   * GET /api/trpc/consultas.getById
   */
  getById: protectedProcedure
    .input(getConsultaSchema)
    .query(async ({ input, ctx }) => {
      const consulta = await getConsultaById(input.id);

      if (!consulta) {
        throw new Error("Consulta não encontrada");
      }

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "READ",
        tabela: "consultas",
        registroId: input.id,
      });

      return consulta;
    }),

  /**
   * Listar consultas de um paciente
   * GET /api/trpc/consultas.listByPaciente
   */
  listByPaciente: protectedProcedure
    .input(listConsultasSchema)
    .query(async ({ input, ctx }) => {
      // Validar se paciente existe
      const paciente = await getPacienteById(input.pacienteId);
      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      let consultas = await listConsultasByPaciente(input.pacienteId);

      // Filtrar por status se fornecido
      if (input.status) {
        consultas = consultas.filter((c) => c.status === input.status);
      }

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "READ",
        tabela: "consultas",
      });

      return {
        data: consultas,
        total: consultas.length,
      };
    }),

  /**
   * Atualizar consulta
   * PUT /api/trpc/consultas.update
   */
  update: protectedProcedure
    .input(updateConsultaSchema)
    .mutation(async ({ input, ctx }) => {
      const consulta = await getConsultaById(input.id);

      if (!consulta) {
        throw new Error("Consulta não encontrada");
      }

      const dadosAntigos = JSON.stringify(consulta);

      const consultaAtualizada = await updateConsulta(input.id, {
        status: input.status,
        motivo: input.motivo,
      });

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "UPDATE",
        tabela: "consultas",
        registroId: input.id,
        dadosAntigos,
        dadosNovos: JSON.stringify(consultaAtualizada),
      });

      return consultaAtualizada;
    }),

  /**
   * Cancelar consulta
   * PUT /api/trpc/consultas.cancel
   */
  cancel: protectedProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        motivoCancelamento: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const consulta = await getConsultaById(input.id);

      if (!consulta) {
        throw new Error("Consulta não encontrada");
      }

      if (consulta.status === "cancelada") {
        throw new Error("Consulta já foi cancelada");
      }

      const dadosAntigos = JSON.stringify(consulta);

      const consultaCancelada = await updateConsulta(input.id, {
        status: "cancelada",
        motivo: input.motivoCancelamento || "Cancelada pelo usuário",
      });

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "UPDATE",
        tabela: "consultas",
        registroId: input.id,
        dadosAntigos,
        dadosNovos: JSON.stringify(consultaCancelada),
      });

      return consultaCancelada;
    }),
});
