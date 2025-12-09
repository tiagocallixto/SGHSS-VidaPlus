CREATE TABLE `internacoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pacienteId` int NOT NULL,
	`dataAdmissao` timestamp NOT NULL DEFAULT (now()),
	`dataAlta` timestamp,
	`motivo` text NOT NULL,
	`diagnostico` text,
	`status` enum('internado','alta','transferido','obito') NOT NULL DEFAULT 'internado',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `internacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leitos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`numero` varchar(20) NOT NULL,
	`tipo` enum('enfermaria','uti','isolamento','semi-privativo') NOT NULL,
	`unidade` varchar(100) NOT NULL,
	`status` enum('disponivel','ocupado','manutencao') NOT NULL DEFAULT 'disponivel',
	`internacaoId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leitos_id` PRIMARY KEY(`id`),
	CONSTRAINT `leitos_numero_unique` UNIQUE(`numero`)
);
--> statement-breakpoint
CREATE TABLE `prontuariosCompletos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pacienteId` int NOT NULL,
	`profissionalId` int NOT NULL,
	`conteudo` text NOT NULL,
	`versao` int NOT NULL DEFAULT 1,
	`assinado` enum('nao','sim') NOT NULL DEFAULT 'nao',
	`hashAssinatura` varchar(255),
	`dataAssinatura` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prontuariosCompletos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `telemedicinaSessoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultaId` int NOT NULL,
	`pacienteId` int NOT NULL,
	`profissionalId` int NOT NULL,
	`jitsiRoomId` varchar(255) NOT NULL,
	`dataInicio` timestamp NOT NULL DEFAULT (now()),
	`dataFim` timestamp,
	`duracao` int,
	`status` enum('ativa','finalizada','cancelada') NOT NULL DEFAULT 'ativa',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `telemedicinaSessoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `internacoes` ADD CONSTRAINT `internacoes_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leitos` ADD CONSTRAINT `leitos_internacaoId_internacoes_id_fk` FOREIGN KEY (`internacaoId`) REFERENCES `internacoes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prontuariosCompletos` ADD CONSTRAINT `prontuariosCompletos_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prontuariosCompletos` ADD CONSTRAINT `prontuariosCompletos_profissionalId_profissionais_id_fk` FOREIGN KEY (`profissionalId`) REFERENCES `profissionais`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `telemedicinaSessoes` ADD CONSTRAINT `telemedicinaSessoes_consultaId_consultas_id_fk` FOREIGN KEY (`consultaId`) REFERENCES `consultas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `telemedicinaSessoes` ADD CONSTRAINT `telemedicinaSessoes_pacienteId_pacientes_id_fk` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `telemedicinaSessoes` ADD CONSTRAINT `telemedicinaSessoes_profissionalId_profissionais_id_fk` FOREIGN KEY (`profissionalId`) REFERENCES `profissionais`(`id`) ON DELETE no action ON UPDATE no action;