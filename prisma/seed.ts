import { db } from "~/server/db";

import { memberships, partners, portfolio, praxis } from "./data-seed";

const seed = async () => {
  await db.praxis.create({ data: praxis });
  for (const membership of memberships) {
    await db.membership.create({ data: membership });
  }
  for (const partner of partners) {
    await db.partner.create({ data: partner });
  }
  for (const portfolioService of portfolio) {
    await db.portfolio.create({ data: portfolioService });
  }
};

seed().catch(console.log);
