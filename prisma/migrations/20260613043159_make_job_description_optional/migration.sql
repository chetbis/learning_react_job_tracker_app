-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "description" TEXT,
    "statusId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "Jobs_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jobs" ("companyId", "description", "id", "role", "statusId") SELECT "companyId", "description", "id", "role", "statusId" FROM "Jobs";
DROP TABLE "Jobs";
ALTER TABLE "new_Jobs" RENAME TO "Jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
