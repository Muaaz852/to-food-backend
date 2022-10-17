export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    connectionString: "mongodb+srv://muaazpk:muaaz123@cluster0.y8fxisy.mongodb.net/to-food-app"
  }
});
