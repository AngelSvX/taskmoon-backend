### Crear una nueva migración
pnpx prisma migrate dev --name [nombre_de_lo_agregado]

### Hacer rollback
pnpx prisma migrate resolve --rolled-back
- Luego de ello, se procede con la eliminación de la tabla en la base de datos, y finalmente con la migración fallida en la carpeta migrations.