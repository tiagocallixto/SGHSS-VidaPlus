CREATE TABLE `auditoria` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usuarioId` int,
	`acao` varchar(100) NOT NULL,
	`tabela` varchar(50) NOT NULL,
	`registroId` int,
	`dadosAntigos` text,
	`dadosNovos` text,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditoria_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pacienteId` int NOT NULL,
	`profissionalId` int NOT NULL,
	`dataConsulta` varchar(10) NOT NULL,
	`horaConsulta` varchar(5) NOT NULL,
	`tipo` enum('presencial','telemedicina') NOT NULL DEFAULT 'presencial',
	`status` enum('agendada','realizada','cancelada') NOT NULL DEFAULT 'agendada',
	`motivo` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pacientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`cpf` varchar(14) NOT NULL,
	`dataNascimento` varchar(10),
	`telefone` varchar(20),
	`endereco` text,
	`dataAtendimento` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pacientes_id` PRIMARY KEY(`id`),
	CONSTRAINT `pacientes_cpf_unique` UNIQUE(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `profissionais` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`crm` varchar(20) NOT NULL,
	`especialidade` varchar(100),
	`telefone` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profissionais_id` PRIMARY KEY(`id`),
	CONSTRAINT `profissionais_crm_unique` UNIQUE(`crm`)
);
--> statement-breakpoint
CREATE TABLE `prontuarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pacienteId` int NOT NULL,
	`dataCriacao` timestamp NOT NULL DEFAULT (now()),
	`historico` text,
	`observacoes` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prontuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `prontuarios_pacienteId_unique` UNIQUE(`pacienteId`)
);
--> statement-breakpoint
CREATE TABLE `receitasDigitais` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultaId` int,
	`pacienteId` int NOT NULL,
	`profissionalId` int NOT NULL,
	`medicamentos` text,
	`dosagem` text,
	`assinatura` text,
	`dataEmissao` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `receitasDigitais_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `auditoria` ADD CONSTRAINT `auditoria_usuarioId_users_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_profissionalId_profissionais_id_fk` FOREIGN KEY (`profissionalId`) REFERENCES `profissionais`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profissionais` ADD CONSTRAINT `profissionais_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prontuarios` ADD CONSTRAINT `prontuarios_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receitasDigitais` ADD CONSTRAINT `receitasDigitais_consultaId_consultas_id_fk` FOREIGN KEY (`consultaId`) REFERENCES `consultas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receitasDigitais` ADD CONSTRAINT `receitasDigitais_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receitasDigitais` ADD CONSTRAINT `receitasDigitais_profissionalId_profissionais_id_fk` FOREIGN KEY (`profissionalId`) REFERENCES `profissionais`(`id`) ON DELETE no action ON UPDATE no action;