// Importing the 'mysql' library to work with a MySQL database.
import mysql from 'mysql';

// Defining a class for handling MySQL database operations.
export class MYSQL_Database
{
    // Class constructor.
    constructor()
    {
        // Creating a new connection to the database with the specified parameters.
        this.dbConnection = mysql.createConnection({
            host: 'localhost',       // server address
            user: 'root',            // username
            password: '',            // password (empty in this case)
            database: 'niko'         // name of the database
        });

        // Establishing the connection to the database.
        this.dbConnection.connect((err) => {
            if (err)
            {
                // If there's an error during connection, log it to the console.
                console.error('Error connecting to the database:', err);
            }
            else
            {
                // If the connection is successful, log the success message.
                console.log('Connected to the SQL database');
            }
        });
    }

    // Method for executing SQL queries.
    executeQuery(sql, values, callback)
    {
        // Execute a query on the database.
        // SQL is the SQL query text, values are the values to be inserted into the query (if any),
        // and callback is a function to be called after the query completes.
        this.dbConnection.query(sql, values, callback);
    }
}
