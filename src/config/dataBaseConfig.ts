export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456789',
  database: 'nestinit',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
}