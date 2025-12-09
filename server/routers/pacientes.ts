import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createPaciente,
  getPacienteById,
  listPacientes,
  updatePaciente,
  deletePaciente,
  getPacienteByCpf,
  createProntuario,
  getProntuarioByPaciente,
  updateProntuario,
  logAuditoria,
} from "../db";

/**
 * Schemas de validação para Pacientes
 */
const createPacienteSchema = z.object({
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  dataNascimento: z.string().optional(),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  dataAtendimento: z.string().optional(),
});

const updatePacienteSchema = z.object({
  id: z.number().int().positive(),
  dataNascimento: z.string().optional(),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  dataAtendimento: z.string().optional(),
});

const getPacienteSchema = z.object({
  id: z.number().int().positive(),
});

const listPacientesSchema = z.object({
  limit: z.number().int().positive().default(10),
  offset: z.number().int().nonnegative().default(0),
});

/**
 * Router de Pacientes
 */
export const pacientesRouter = router({
  /**
   * Criar novo paciente
   * POST /api/trpc/pacientes.create
   */
  create: protectedProcedure
    .input(createPacienteSchema)
    .mutation(async ({ input, ctx }) => {
      // Verificar se CPF já existe
      const pacienteExistente = await getPacienteByCpf(input.cpf);
      if (pacienteExistente) {
        throw new Error("CPF já cadastrado no sistema");
      }

      // Criar paciente
      const paciente = await createPaciente({
        userId: ctx.user.id,
        cpf: input.cpf,
        dataNascimento: input.dataNascimento,
        telefone: input.telefone,
        endereco: input.endereco,
        dataAtendimento: input.dataAtendimento || new Date().toISOString().split("T")[0],
      });

      // Criar prontuário automaticamente
      if (paciente) {
        await createProntuario({
          pacienteId: paciente.id,
          historico: "",
          observacoes: "Prontuário criado automaticamente",
        });

        // Log de auditoria
        await logAuditoria({
          usuarioId: ctx.user.id,
          acao: "CREATE",
          tabela: "pacientes",
          registroId: paciente.id,
          dadosNovos: JSON.stringify(paciente),
        });
      }

      return paciente;
    }),

  /**
   * Listar pacientes
   * GET /api/trpc/pacientes.list
   */
  list: protectedProcedure
    .input(listPacientesSchema)
    .query(async ({ input, ctx }) => {
      const pacientes = await listPacientes(input.limit, input.offset);

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "READ",
        tabela: "pacientes",
      });

      return {
        data: pacientes,
        limit: input.limit,
        offset: input.offset,
        total: pacientes.length,
      };
    }),

  /**
   * Obter paciente por ID
   * GET /api/trpc/pacientes.getById
   */
  getById: protectedProcedure
    .input(getPacienteSchema)
    .query(async ({ input, ctx }) => {
      const paciente = await getPacienteById(input.id);

      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "READ",
        tabela: "pacientes",
        registroId: input.id,
      });

      return paciente;
    }),

  /**
   * Atualizar paciente
   * PUT /api/trpc/pacientes.update
   */
  update: protectedProcedure
    .input(updatePacienteSchema)
    .mutation(async ({ input, ctx }) => {
      const paciente = await getPacienteById(input.id);

      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      const dadosAntigos = JSON.stringify(paciente);

      const pacienteAtualizado = await updatePaciente(input.id, {
        dataNascimento: input.dataNascimento,
        telefone: input.telefone,
        endereco: input.endereco,
        dataAtendimento: input.dataAtendimento,
      });

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "UPDATE",
        tabela: "pacientes",
        registroId: input.id,
        dadosAntigos,
        dadosNovos: JSON.stringify(pacienteAtualizado),
      });

      return pacienteAtualizado;
    }),

  /**
   * Deletar paciente (soft delete)
   * DELETE /api/trpc/pacientes.delete
   */
  delete: protectedProcedure
    .input(getPacienteSchema)
    .mutation(async ({ input, ctx }) => {
      const paciente = await getPacienteById(input.id);

      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      // Log de auditoria antes de deletar
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "DELETE",
        tabela: "pacientes",
        registroId: input.id,
        dadosAntigos: JSON.stringify(paciente),
      });

      await deletePaciente(input.id);

      return {
        success: true,
        message: "Paciente deletado com sucesso",
      };
    }),

  /**
   * Obter prontuário do paciente
   * GET /api/trpc/pacientes.getProntuario
   */
  getProntuario: protectedProcedure
    .input(getPacienteSchema)
    .query(async ({ input, ctx }) => {
      const paciente = await getPacienteById(input.id);

      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      const prontuario = await getProntuarioByPaciente(input.id);

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "READ",
        tabela: "prontuarios",
        registroId: prontuario?.id,
      });

      return prontuario;
    }),

  /**
   * Atualizar prontuário do paciente
   * PUT /api/trpc/pacientes.updateProntuario
   */
  updateProntuario: protectedProcedure
    .input(
      z.object({
        pacienteId: z.number().int().positive(),
        historico: z.string().optional(),
        observacoes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const paciente = await getPacienteById(input.pacienteId);

      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      const prontuarioAntigo = await getProntuarioByPaciente(input.pacienteId);

      const prontuarioAtualizado = await updateProntuario(input.pacienteId, {
        historico: input.historico,
        observacoes: input.observacoes,
      });

      // Log de auditoria
      await logAuditoria({
        usuarioId: ctx.user.id,
        acao: "UPDATE",
        tabela: "prontuarios",
        registroId: prontuarioAtualizado?.id,
        dadosAntigos: JSON.stringify(prontuarioAntigo),
        dadosNovos: JSON.stringify(prontuarioAtualizado),
      });

      return prontuarioAtualizado;
    }),
});
