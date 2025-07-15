-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('acoustic', 'electro', 'ukulele');

-- CreateEnum
CREATE TYPE "GuitarStrings" AS ENUM ('four', 'six', 'seven', 'twelve');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "guitars" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "image" VARCHAR(24) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "GuitarType" NOT NULL,
    "string_count" "GuitarStrings" NOT NULL,
    "article" VARCHAR(40) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guitars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "role" "Role" DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh-sessions" (
    "id" TEXT NOT NULL,
    "token_id" CHAR(36) NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh-sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh-sessions_token_id_key" ON "refresh-sessions"("token_id");

-- AddForeignKey
ALTER TABLE "refresh-sessions" ADD CONSTRAINT "refresh-sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
