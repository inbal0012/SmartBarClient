export default interface DatabaseConnection {
    connectToDatabase(): boolean  
    fetchData() : any  
    updateDatabase() : boolean
}
