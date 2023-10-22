import {mySQLDatabase} from "../main/bot.js";

export class Admin
{
    static adminData;
    static product_id = 0;

    static async perform(ctx)
    {
        const getQuery = `SELECT id FROM products_product ORDER BY id DESC LIMIT 1`;

         await mySQLDatabase.executeQuery(getQuery, async (err, result) => {
            if (err)
            {
                console.error('Помилка запиту getProduct до таблиці product', err);
                ctx.reply('Помилка запиту getProduct до таблиці product');
            }
            else
            {
                if (result.length > 0)
                {
                    this.product_id = result[0].id;
                    console.log("getProductID" + this.product_id );
                    ctx.reply(`Останній ID товару: ${this.product_id}`);
                    if( this.product_id !== 0)
                    {
                         await Admin.initAdminData(ctx);
                    }
                }
                else
                {
                    console.log('Таблиця products_product пуста');
                    ctx.reply('Таблиця products_product пуста');
                }
                console.error('Успішно збережено до таблиці з getProduct ', err);
                ctx.reply('Успішно збережено до таблиці з getProduct');
            }
        });
    }

    static async initAdminData(ctx)
   {
       this.adminData = {
           tg_id: ctx.chat.id,
           product_id: this.product_id,
           first_name: ctx.chat.first_name || 'N/A',
           last_name: ctx.chat.last_name || 'N/A',
       }
       if( this.adminData)
       {
           await Admin.uploadAdminDataToDB(this.adminData, ctx);
       }
   }


    static async uploadAdminDataToDB(adminData, ctx)
    {
        const insertQuery = `INSERT INTO 
        tg_admin (tg_id, product_id, first_name, last_name) 
        VALUES ('${adminData.tg_id}', '${adminData.product_id}', '${adminData.first_name}' , 
        '${adminData.last_name}')`;

         mySQLDatabase.executeQuery(insertQuery, (err, result) => {
            if (err)
            {
                console.error('Помилка запиту до бази даних: tg_admin', err);
                ctx.reply('Сталася помилка при отриманні даних з бази даних tg_admin');
            }
            else
            {
                console.error('Успішно збережено до бази даних tg_admin', err);
                ctx.reply('Успішно збережено до бази даних tg_admin');
            }
        });
    }
}