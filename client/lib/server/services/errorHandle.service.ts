import { Prisma } from "@/src/generated/prisma/client";
import { BusinessError } from "../errors";

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new BusinessError(
        `Related record not found: ${error.meta?.cause || "please check the IDs in tags / techItems / roles / content"}`,
        422,
      );
    }
    if (error.code === "P2002") {
      throw new BusinessError(
        "A record with that unique value already exists",
        409,
      );
    }
    if (error.code === "P2014") {
      // The change you are trying to make would violate the required relation
      throw new BusinessError(
        `Cannot delete: related records still exist. Remove them first.`,
        409,
      );
    }
  }
  throw error; // unknown error → let global error handler handle → 500
}
