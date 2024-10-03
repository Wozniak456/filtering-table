import { Pool } from 'pg';
import { DataRow } from '@/types/types';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'model-form',
  password: 'admin',
  port: 5433,
});

type Result = {
  Model: string,
  ModelFN: string,
  Qty: number
}

export const getMainView = async () => {
  const client = await pool.connect(); // Отримуємо клієнта з пулу
  try {
    const { rows }: { rows: Result[] } = await client.query(`
      SELECT 
        ms."ItemID" AS "Model", 
        ms."FileName" AS "ModelFN", 
        COUNT(md."ID") AS "Qty" 
      FROM public."ModelDetails" AS md 
      INNER JOIN public."Models" AS ms ON ms."ID" = md."ModelID" 
      GROUP BY ms."ItemID", ms."FileName" 
      ORDER BY ms."ItemID" ASC
    `); // Уточнено регістр
    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

type OneColor = {
 ColorID: number,
 ColorName: number,
 ColorFN: string,
 Qty: number
}




export const getColors = async (itemId: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`
      SELECT cc."ColorID" as ID, cc."ColorName" as Name, cc."FileName" as "FN",
             count(md."ID") "Qty"
      FROM public."ModelDetails" as md
      INNER JOIN public."Models" as ms ON ms."ID" = md."ModelID" 
          AND ms."ItemID" = $1
      INNER JOIN public."Colors" as cc ON cc."ID" = md."ColorID"
      GROUP BY cc."ColorID", cc."ColorName", cc."FileName"
      ORDER BY cc."ColorID" ASC
  `, [itemId]); // Pass the value as an ar // Уточнено регістр

    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

type Color = {
  ID: number,
  FileName: string,
  ColorID: string,
  ColorName: string
}

export const getAllColorsForModel = async (itemID: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`select * from (
      select ls."ColorID" as "id", ls."FileName" as "FN", alm."Qty" as "qty", case when alm."Qty" is null then 0 else 1 end "activated"  from "Colors" ls
      LEFT JOIN (SELECT  cc."ColorID", count (md."ID") "Qty"
      FROM public."ModelDetails" as md
      inner join public."Models" as ms on ms."ID"=md."ModelID" and ms."ItemID" = $1 -- модель з головної сторінки
      inner join public."Colors" as cc on cc."ID"=md."ColorID"
      group by cc."ColorID") alm 
      on alm."ColorID" = ls."ColorID") r
      ORDER BY r."activated" desc, r."id" asc`, [itemID]);
    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

type Model = {
  ID: number,
  ItemID: string,
  FileName: string
}

export const getAllModels = async () => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: Model[] } = await client.query(`select * from public."Models"`); // Pass the value as an ar // Уточнено регістр
    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

export const getAllLegsForModel = async (itemID: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`select * from (
      select ls."LegID" as id, ls."FileName" as "FN", alm."Qty" as "qty", case when alm."Qty" is null then 0 else 1 end "activated"  from public."Legs" ls
      LEFT JOIN (
      SELECT  cc."LegID", cc."FileName" as "Leg FN",
          count (md."ID") "Qty"
      FROM public."ModelDetails" as md
      inner join public."Models" as ms on ms."ID"=md."ModelID" and ms."ItemID" = $1 -- модель з головної сторінки
      inner join public."Legs" as cc on cc."ID"=md."LegID"
      group by cc."LegID", cc."FileName"
      ) alm --ActLegsForModel
      on alm."LegID" = ls."LegID"
      ) r
      ORDER BY r."activated" desc, r."id" ASC`, [itemID]); // Pass the value as an ar // Уточнено регістр

      // console.log(rows)
    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

export const getAllSizesForModel = async (itemID: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`select * from (
    select ls."SizeID" as "id", alm."Qty" as "qty", case when alm."Qty" is null then 0 else 1 end "activated" from "Sizes" ls
    LEFT JOIN (
    SELECT  cc."SizeID",
		count (md."ID") "Qty"
    FROM public."ModelDetails" as md
    inner join public."Models" as ms on ms."ID"=md."ModelID" and ms."ItemID" = $1 -- модель з головної сторінки
    inner join public."Sizes" as cc on cc."ID"=md."SizeID"
    group by cc."SizeID") alm 
    on alm."SizeID" = ls."SizeID") r
    ORDER BY r."activated" desc, r."id" asc`, [itemID]); 

    return rows; 

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack);
    } else {
      console.error('Unknown error', err); 
    }
  } finally {
    client.release();
  }
};

export const getAllEdgesForModel = async (itemID: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`select * from (
      select ls."EdgeID" as "id", alm."Qty" as "qty", case when alm."Qty" is null then 0 else 1 end "activated"  from "Edges" ls
      LEFT JOIN (SELECT  cc."EdgeID", count (md."ID") "Qty"
      FROM public."ModelDetails" as md
      inner join public."Models" as ms on ms."ID"=md."ModelID" and ms."ItemID" = $1
      inner join public."Edges" as cc on cc."ID"=md."EdgeID"
      group by cc."EdgeID") alm 
      on alm."EdgeID" = ls."EdgeID") r
      ORDER BY r."activated" desc, r."id" asc`, [itemID]); 

    return rows; 

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack);
    } else {
      console.error('Unknown error', err); 
    }
  } finally {
    client.release(); 
  }
};

export const getAllMaterialsForModel = async (itemID: string) => {
  const client = await pool.connect();
  try {
    const { rows }: { rows: DataRow[] } = await client.query(`select * from (
      select ls."Name" as "id", ls."Name" as "name", alm."Qty" as "qty", case when alm."Qty" is null then 0 else 1 end "activated"  from "Materials" ls
      LEFT JOIN (
      SELECT  cc."ID", count (md."ID") "Qty"
      FROM public."ModelDetails" as md
      inner join public."Models" as ms on ms."ID"=md."ModelID" and ms."ItemID" = $1
      inner join public."Materials" as cc on cc."ID"=md."MaterialID"
      group by cc."ID"
      ) alm 
      on alm."ID" = ls."ID") r
      ORDER BY r."activated" desc, r."id" asc`,[itemID]);

    return rows; // Повертаємо масив рядків

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Query error', err.stack); // Тепер TypeScript знає, що 'err' - це об'єкт типу Error
    } else {
      console.error('Unknown error', err); // Для випадків, коли 'err' не є об'єктом Error
    }
  } finally {
    client.release(); // Повертаємо клієнта в пул
  }
};

// Закриваємо пул при завершенні програми
process.on('exit', async () => {
  await pool.end();
  console.log('Pool closed');
});


