import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { internacoes, leitos, pacientes, profissionais } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const internacoesRouter = router({
  /**
   * Criar uma nova internação
   */
  criar: protectedProcedure
    .input(
      z.object({
        pacienteId: z.number(),
        motivo: z.string(),
        diagnostico: z.string().optional(),
        leitoId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Criar internação
      const result = await db.insert(internacoes).values({
        pacienteId: input.pacienteId,
        motivo: input.motivo,
        diagnostico: input.diagnostico,
        status: "internado",
      });

      // Atualizar leito
      const internacaoId = (result[0] as unknown) as number;
      await db
        .update(leitos)
        .set({
          status: "ocupado",
          internacaoId: internacaoId as any,
        })
        .where(eq(leitos.id, input.leitoId));

      return {
        success: true,
        internacaoId: internacaoId,
      };
    }),

  /**
   * Listar internações ativas
   */
  listar: protectedProcedure
    .input(
      z.object({
        status: z.enum(["internado", "alta", "transferido", "obito"]).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let result;
      if (input.status) {
        result = await db
          .select()
          .from(internacoes)
          .where(eq(internacoes.status, input.status));
      } else {
        result = await db.select().from(internacoes);
      }

      return {
        internacoes: result,
        total: result.length,
      };
    }),

  /**
   * Obter detalhes de uma internação
   */
  obterDetalhes: protectedProcedure
    .input(z.object({ internacaoId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const internacao = await db
        .select()
        .from(internacoes)
        .where(eq(internacoes.id, input.internacaoId))
        .limit(1);

      if (!internacao.length) {
        throw new Error("Internação não encontrada");
      }

      // Obter dados do paciente
      const paciente = await db
        .select()
        .from(pacientes)
        .where(eq(pacientes.id, internacao[0].pacienteId))
        .limit(1);

      // Obter leito atual
      const leitoAtual = await db
        .select()
        .from(leitos)
        .where(eq(leitos.internacaoId, input.internacaoId))
        .limit(1);

      return {
        ...internacao[0],
        paciente: paciente[0],
        leitoAtual: leitoAtual[0],
      };
    }),

  /**
   * Registrar alta de paciente
   */
  alta: protectedProcedure
    .input(z.object({ internacaoId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Atualizar internação
      await db
        .update(internacoes)
        .set({
          status: "alta",
          dataAlta: new Date(),
        })
        .where(eq(internacoes.id, input.internacaoId));

      // Liberar leito
      await db
        .update(leitos)
        .set({
          status: "disponivel",
          internacaoId: null,
        })
        .where(eq(leitos.internacaoId, input.internacaoId));

      return {
        success: true,
        message: "Alta registrada com sucesso",
      };
    }),

  /**
   * Listar leitos disponíveis
   */
  leitosDisponiveis: protectedProcedure.query(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const result = await db
      .select()
      .from(leitos)
      .where(eq(leitos.status, "disponivel"));

    return {
      leitos: result,
      total: result.length,
    };
  }),

  /**
   * Registrar acompanhamento de internação
   */
  registrarAcompanhamento: protectedProcedure
    .input(
      z.object({
        internacaoId: z.number(),
        observacoes: z.string(),
        prescricoes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Obter profissional do usuário (assumindo que está logado)
      const profissional = await db
        .select()
        .from(profissionais)
        .where(eq(profissionais.userId, ctx.user?.id || 0))
        .limit(1);

      if (!profissional.length) {
        throw new Error("Profissional não encontrado");
      }

      // Registrar acompanhamento (será implementado em próxima versão)

      return {
        success: true,
        acompanhamentoId: 0,
      };
    }),
});
