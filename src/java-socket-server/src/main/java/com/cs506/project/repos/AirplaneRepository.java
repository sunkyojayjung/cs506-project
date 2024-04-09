package com.cs506.project.repos;

import com.cs506.project.JDBCConnection;
import com.cs506.project.interfaces.ISQLRepository;
import com.cs506.project.schemas.AirplaneSchema;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * SQL Repository used to query the Airplane table in the 506 database.
 */
public class AirplaneRepository implements ISQLRepository<AirplaneSchema> {

    private Connection connection;

    public AirplaneRepository (JDBCConnection jdbcConnection){
        // Run jdbcConnection.createConnection(): Each method will be responsible for closing the connection
    }

    /**
     * Fetches all rows in the Airplane table, however only certain predetermined 'basic info' columns.
     *
     * @return List of Airplane Java Objects.
     */
    @Override
    public List<AirplaneSchema> getAllWithBasicDetails(int limit) {
        return null;
    }

    /**
     * Fetches all rows and columns in the Airplane table.
     *
     * @return List of Airplane Java Objects.
     */
    @Override
    public List<AirplaneSchema> getAllWithAllDetails(int limit) throws SQLException {
        List<AirplaneSchema> airplanes = new ArrayList<>();
        String query = "SELECT * FROM Airplane";

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {
            while (resultSet.next()) {

                AirplaneSchema airplaneSchema = new AirplaneSchema();

                airplaneSchema.airplaneId = resultSet.getInt("AirplaneId");
                airplaneSchema.name = resultSet.getString("Name");
                airplaneSchema.productionStageName = resultSet.getString("ProductionStageName");
                airplaneSchema.cost = resultSet.getDouble("Cost");
                airplaneSchema.dateStarted = resultSet.getDate("DateStarted");
                airplaneSchema.dateFinished = resultSet.getDate("DateFinished");
                airplaneSchema.customerId = resultSet.getInt("CustomerId");
                airplaneSchema.size = resultSet.getString("Size");
                airplaneSchema.hasFirstClass = resultSet.getBoolean("HasFirstClass");

                airplanes.add(airplaneSchema);
            }
        }

        return airplanes;
    }

    /**
     * Fetches an all data for Airplane based on the id passed.
     *
     * @param airplaneId : Id of the Airplane queried.
     * @return Airplane Java Object.
     */
    @Override
    public List<AirplaneSchema> getById(int airplaneId) throws SQLException{
        List<AirplaneSchema> airplane = new ArrayList<>();
        String query = "SELECT * FROM Airplane WHERE AirplaneId = " + airplaneId;
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query);){

            while (resultSet.next()) {

                AirplaneSchema airplaneSchema = new AirplaneSchema();

                airplaneSchema.airplaneId = resultSet.getInt("AirplaneId");
                airplaneSchema.name = resultSet.getString("Name");
                airplaneSchema.productionStageName = resultSet.getString("ProductionStageName");
                airplaneSchema.cost = resultSet.getDouble("Cost");
                airplaneSchema.dateStarted = resultSet.getDate("DateStarted");
                airplaneSchema.dateFinished = resultSet.getDate("DateFinished");
                airplaneSchema.customerId = resultSet.getInt("CustomerId");
                airplaneSchema.size = resultSet.getString("Size");
                airplaneSchema.hasFirstClass = resultSet.getBoolean("HasFirstClass");

                airplane.add(airplaneSchema);

            }
        }

        return airplane;
    }

    /**
     * Takes a Create query and funnels it to the appropriate method within class.
     *
     * @param requestEntities : List of Airplanes to create in database.
     * @return
     */
    @Override
    public List<AirplaneSchema> handleCreateQuery(List<AirplaneSchema> requestEntities) throws SQLException {

        closeConnection();
        return null;
    }

    /**
     * Takes a Read query and funnels it to the appropriate method within class.
     *
     * @param limit          : If not equal to -1, then adds a limit operator to final query.
     * @param readAllDetails : Specifies whether all columns are requested from database.
     * @return List of E read from database;
     */
    @Override
    public List<AirplaneSchema> handleReadQuery(int limit, boolean readAllDetails, List<AirplaneSchema> airplanes)
            throws SQLException {

        List<AirplaneSchema> result = new ArrayList<>();

        if (airplanes.size() != 0){
            for ( AirplaneSchema airplane: airplanes  ){
                result.addAll(getById(airplane.airplaneId));
            }
        }

        if (!readAllDetails){
            result = getAllWithBasicDetails(limit);
        } else{
            result = getAllWithAllDetails(limit);
        }

        closeConnection();

        return result;
    }

    /**
     * Takes a Update query and funnels it to the appropriate method within class.
     *
     * @param request : List of Airplanes to update database with.
     * @return List of updated Es
     */
    @Override
    public List<AirplaneSchema> handleUpdateQuery(List<AirplaneSchema> request) throws SQLException {

        closeConnection();
        return null;
    }

    /**
     * Takes a Delete query and funnels it to the appropriate method within class.
     *
     * @param request : List of Airplanes to delete from database.
     * @return List of deleted Airplanes
     */
    @Override
    public List<AirplaneSchema> handleDeleteQuery(List<AirplaneSchema> request) throws SQLException {

        closeConnection();
        return null;
    }

    /**
     * Closes connection to the database. Must be run after every query method.
     */
    @Override
    public void closeConnection() throws SQLException {
        connection.close();
    }

}
