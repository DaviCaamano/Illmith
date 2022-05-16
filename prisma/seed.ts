//Function is called by prisma and thus cannot use typescript aliases.
import { PrismaClient, Role } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

async function main() {
  findOrCreateRole(0, 'admin');
  findOrCreateRole(1, 'user');
}

const findOrCreateRole = (id: number, name: string) => {
  prisma.role.findUnique({ where: { id } }).then((role: Role | null) => {
    if (!role) {
      prisma.role.create({ data: { id, name } }).catch(console.log);
    } else if (role.name !== name) {
      prisma.role.update({ where: { id }, data: { name } });
    }
  });
};
main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
