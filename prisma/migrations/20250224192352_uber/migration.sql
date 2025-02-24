-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('LIVRE', 'OCUPADO', 'OFFLINE');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('PENDENTE', 'ACEITA', 'CONCLUIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "status" "DriverStatus" NOT NULL DEFAULT 'OFFLINE',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    "marca" VARCHAR(50) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "cor" VARCHAR(20),
    "capacidade" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "motoristaId" INTEGER,
    "origemLat" DOUBLE PRECISION NOT NULL,
    "origemLong" DOUBLE PRECISION NOT NULL,
    "destinoLat" DOUBLE PRECISION NOT NULL,
    "destinoLong" DOUBLE PRECISION NOT NULL,
    "distanciaKm" DOUBLE PRECISION,
    "preco" DOUBLE PRECISION,
    "status" "RideStatus" NOT NULL DEFAULT 'PENDENTE',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telefone_key" ON "User"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_telefone_key" ON "Driver"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_motoristaId_key" ON "Vehicle"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_placa_key" ON "Vehicle"("placa");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
