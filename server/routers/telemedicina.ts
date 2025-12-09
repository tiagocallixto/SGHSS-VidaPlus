import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { telemedicinaSessoes, consultas, pacientes, profissionais } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const telemedicinaRouter = router({
  /**
   * Iniciar uma sessão de telemedicina
   */
  iniciarSessao: protectedProcedure
    .input(
      z.object({
        consultaId: z.number(),
        jitsiRoomId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verificar se a consulta existe
      const consulta = await db
        .select()
        .from(consultas)
        .where(eq(consultas.id, input.consultaId))
        .limit(1);

      if (!consulta.length) {
        throw new Error("Consulta não encontrada");
      }

      // Criar sessão de telemedicina
      const result = await db.insert(telemedicinaSessoes).values({
        consultaId: input.consultaId,
        pacienteId: consulta[0].pacienteId,
        profissionalId: consulta[0].profissionalId,
        jitsiRoomId: input.jitsiRoomId,
        status: "ativa",
      });

      return {
        success: true,
        sessaoId: result[0],
        jitsiRoomId: input.jitsiRoomId,
      };
    }),

  /**
   * Finalizar uma sessão de telemedicina
   */
  finalizarSessao: protectedProcedure
    .input(
      z.object({
        sessaoId: z.number(),
        duracao: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const dataFim = new Date();
      await db
        .update(telemedicinaSessoes)
        .set({
          status: "finalizada",
          dataFim,
          duracao: input.duracao,
        })
        .where(eq(telemedicinaSessoes.id, input.sessaoId));

      return {
        success: true,
        message: "Sessão finalizada com sucesso",
      };
    }),

  /**
   * Obter histórico de telemedicina de um paciente
   */
  obterHistorico: protectedProcedure
    .input(
      z.object({
        pacienteId: z.number().optional(),
        profissionalId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let sessoes;

      if (input.pacienteId) {
        sessoes = await db
          .select()
          .from(telemedicinaSessoes)
          .where(eq(telemedicinaSessoes.pacienteId, input.pacienteId));
      } else if (input.profissionalId) {
        sessoes = await db
          .select()
          .from(telemedicinaSessoes)
          .where(eq(telemedicinaSessoes.profissionalId, input.profissionalId));
      } else {
        sessoes = await db.select().from(telemedicinaSessoes);
      }

      return {
        sessoes,
        total: sessoes.length,
      };
    }),

  /**
   * Obter detalhes de uma sessão específica
   */
  obterDetalhes: protectedProcedure
    .input(z.object({ sessaoId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const sessao = await db
        .select()
        .from(telemedicinaSessoes)
        .where(eq(telemedicinaSessoes.id, input.sessaoId))
        .limit(1);

      if (!sessao.length) {
        throw new Error("Sessão não encontrada");
      }

      // Obter dados do paciente e profissional
      const paciente = await db
        .select()
        .from(pacientes)
        .where(eq(pacientes.id, sessao[0].pacienteId))
        .limit(1);

      const profissional = await db
        .select()
        .from(profissionais)
        .where(eq(profissionais.id, sessao[0].profissionalId))
        .limit(1);

      return {
        ...sessao[0],
        paciente: paciente[0],
        profissional: profissional[0],
      };
    }),

  /**
   * Cancelar uma sessão de telemedicina
   */
  cancelarSessao: protectedProcedure
    .input(z.object({ sessaoId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(telemedicinaSessoes)
        .set({ status: "cancelada" })
        .where(eq(telemedicinaSessoes.id, input.sessaoId));

      return {
        success: true,
        message: "Sessão cancelada com sucesso",
      };
    }),
});
