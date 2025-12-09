import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  InsertPaciente,
  pacientes,
  InsertConsulta,
  consultas,
  InsertProntuario,
  prontuarios,
  profissionais,
  InsertAuditoria,
  auditoria,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Export db instance for direct use
import * as schema from "../drizzle/schema";
export const db = drizzle(process.env.DATABASE_URL || "", { schema, mode: "default" });

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const dbInstance = await getDb();
  if (!dbInstance) return undefined;
  const result = await dbInstance.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Funções de consulta para Pacientes
export async function createPaciente(data: {
  userId: number;
  cpf: string;
  dataNascimento?: string;
  telefone?: string;
  endereco?: string;
  dataAtendimento?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(pacientes)
    .values(data);
  
  const result = await db
    .select()
    .from(pacientes)
    .where(eq(pacientes.cpf, data.cpf))
    .limit(1);
  return result[0];
}

export async function getPacienteById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(pacientes)
    .where(eq(pacientes.id, id))
    .limit(1);
  return result[0];
}

export async function getPacienteByCpf(cpf: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(pacientes)
    .where(eq(pacientes.cpf, cpf))
    .limit(1);
  return result[0];
}

export async function listPacientes(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(pacientes)
    .limit(limit)
    .offset(offset);
}

export async function updatePaciente(
  id: number,
  data: Partial<InsertPaciente>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(pacientes)
    .set(data)
    .where(eq(pacientes.id, id));
  
  return await getPacienteById(id);
}

export async function deletePaciente(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(pacientes).where(eq(pacientes.id, id));
  return true;
}

// Funções de consulta para Consultas
export async function createConsulta(data: InsertConsulta) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(consultas)
    .values(data);
  
  const result = await db
    .select()
    .from(consultas)
    .orderBy((t) => t.id)
    .limit(1);
  return result[0];
}

export async function getConsultaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(consultas)
    .where(eq(consultas.id, id))
    .limit(1);
  return result[0];
}

export async function listConsultasByPaciente(pacienteId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(consultas)
    .where(eq(consultas.pacienteId, pacienteId));
}

export async function updateConsulta(
  id: number,
  data: Partial<InsertConsulta>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(consultas)
    .set(data)
    .where(eq(consultas.id, id));
  
  return await getConsultaById(id);
}

// Funções de consulta para Prontuários
export async function createProntuario(data: InsertProntuario) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(prontuarios)
    .values(data);
  
  const result = await db
    .select()
    .from(prontuarios)
    .where(eq(prontuarios.pacienteId, data.pacienteId))
    .limit(1);
  return result[0];
}

export async function getProntuarioByPaciente(pacienteId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(prontuarios)
    .where(eq(prontuarios.pacienteId, pacienteId))
    .limit(1);
  return result[0];
}

export async function updateProntuario(
  pacienteId: number,
  data: Partial<InsertProntuario>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(prontuarios)
    .set(data)
    .where(eq(prontuarios.pacienteId, pacienteId));
  
  return await getProntuarioByPaciente(pacienteId);
}

// Funções de consulta para Profissionais
export async function getProfissionalById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(profissionais)
    .where(eq(profissionais.id, id))
    .limit(1);
  return result[0];
}

export async function listProfissionais() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(profissionais);
}

// Funções de auditoria
export async function logAuditoria(data: InsertAuditoria) {
  const db = await getDb();
  if (!db) {
    console.warn("[Auditoria] Database not available");
    return;
  }

  try {
    await db.insert(auditoria).values(data);
  } catch (error) {
    console.error("[Auditoria] Failed to log:", error);
  }
}

// TODO: add more feature queries here as your schema grows.
