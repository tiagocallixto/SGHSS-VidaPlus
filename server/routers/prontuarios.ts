import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { prontuariosCompletos, pacientes, profissionais, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export const prontuariosRouter = router({
  /**
   * Criar um novo prontuário
   */
  criar: protectedProcedure
    .input(
      z.object({
        pacienteId: z.number(),
        profissionalId: z.number(),
        conteudo: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(prontuariosCompletos).values({
        pacienteId: input.pacienteId,
        profissionalId: input.profissionalId,
        conteudo: input.conteudo,
        versao: 1,
        assinado: "nao",
      });

      return {
        success: true,
        prontuarioId: result[0],
      };
    }),

  /**
   * Obter um prontuário
   */
  obter: protectedProcedure
    .input(z.object({ prontuarioId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const prontuario = await db
        .select()
        .from(prontuariosCompletos)
        .where(eq(prontuariosCompletos.id, input.prontuarioId))
        .limit(1);

      if (!prontuario.length) {
        throw new Error("Prontuário não encontrado");
      }

      // Obter dados do paciente e profissional
      const paciente = await db
        .select()
        .from(pacientes)
        .where(eq(pacientes.id, prontuario[0].pacienteId))
        .limit(1);

      const profissional = await db
        .select()
        .from(profissionais)
        .where(eq(profissionais.id, prontuario[0].profissionalId))
        .limit(1);

      return {
        ...prontuario[0],
        paciente: paciente[0],
        profissional: profissional[0],
      };
    }),

  /**
   * Atualizar um prontuário
   */
  atualizar: protectedProcedure
    .input(
      z.object({
        prontuarioId: z.number(),
        conteudo: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Obter prontuário atual para incrementar versão
      const prontuarioAtual = await db
        .select()
        .from(prontuariosCompletos)
        .where(eq(prontuariosCompletos.id, input.prontuarioId))
        .limit(1);

      if (!prontuarioAtual.length) {
        throw new Error("Prontuário não encontrado");
      }

      const novaVersao = (prontuarioAtual[0].versao || 1) + 1;

      await db
        .update(prontuariosCompletos)
        .set({
          conteudo: input.conteudo,
          versao: novaVersao,
          assinado: "nao",
          hashAssinatura: null,
          dataAssinatura: null,
        })
        .where(eq(prontuariosCompletos.id, input.prontuarioId));

      return {
        success: true,
        novaVersao,
      };
    }),

  /**
   * Assinar um prontuário digitalmente
   */
  assinar: protectedProcedure
    .input(
      z.object({
        prontuarioId: z.number(),
        senha: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Obter prontuário
      const prontuario = await db
        .select()
        .from(prontuariosCompletos)
        .where(eq(prontuariosCompletos.id, input.prontuarioId))
        .limit(1);

      if (!prontuario.length) {
        throw new Error("Prontuário não encontrado");
      }

      // Gerar hash da assinatura (simulado com SHA256)
      const hashAssinatura = crypto
        .createHash("sha256")
        .update(prontuario[0].conteudo + input.senha + Date.now())
        .digest("hex");

      await db
        .update(prontuariosCompletos)
        .set({
          assinado: "sim",
          hashAssinatura,
          dataAssinatura: new Date(),
        })
        .where(eq(prontuariosCompletos.id, input.prontuarioId));

      return {
        success: true,
        hashAssinatura,
        dataAssinatura: new Date(),
      };
    }),

  /**
   * Exportar prontuário como PDF
   */
  exportarPDF: protectedProcedure
    .input(z.object({ prontuarioId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const prontuario = await db
        .select()
        .from(prontuariosCompletos)
        .where(eq(prontuariosCompletos.id, input.prontuarioId))
        .limit(1);

      if (!prontuario.length) {
        throw new Error("Prontuário não encontrado");
      }

      // Retornar dados para exportação (a geração de PDF será feita no frontend)
      return {
        prontuario: prontuario[0],
        pdfUrl: `/api/prontuarios/${input.prontuarioId}/pdf`,
      };
    }),

  /**
   * Obter histórico de versões de um prontuário
   */
  obterHistorico: protectedProcedure
    .input(z.object({ pacienteId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const prontuarios = await db
        .select()
        .from(prontuariosCompletos)
        .where(eq(prontuariosCompletos.pacienteId, input.pacienteId));

      return {
        prontuarios,
        total: prontuarios.length,
      };
    }),

  /**
   * Listar todos os prontuários (admin)
   */
  listar: protectedProcedure.query(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const prontuarios = await db.select().from(prontuariosCompletos);

    return {
      prontuarios,
      total: prontuarios.length,
    };
  }),
});
