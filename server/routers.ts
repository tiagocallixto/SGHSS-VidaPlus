import { COOKIE_NAME } from "./_core/cookies";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { pacientesRouter } from "./routers/pacientes";
import { consultasRouter } from "./routers/consultas";
import { telemedicinaRouter } from "./routers/telemedicina";
import { internacoesRouter } from "./routers/internacoes";
import { prontuariosRouter } from "./routers/prontuarios";
import { z } from "zod";
import { getUserById } from "./db";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = await db.query.users.findFirst({
          where: eq(users.email, input.email),
        });

        if (!user || !user.password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Email ou senha inválidos",
          });
        }

        const isValidPassword = await bcrypt.compare(input.password, user.password);
        if (!isValidPassword) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Email ou senha inválidos",
          });
        }

        await db
          .update(users)
          .set({ lastSignedIn: new Date() })
          .where(eq(users.id, user.id));

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            role: user.role,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        });

        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  pacientes: pacientesRouter,
  consultas: consultasRouter,
  telemedicina: telemedicinaRouter,
  internacoes: internacoesRouter,
  prontuarios: prontuariosRouter,
});

export type AppRouter = typeof appRouter;
