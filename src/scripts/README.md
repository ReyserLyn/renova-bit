# 🛍️ Scripts de RenovaBit

## Agregar Productos Interactivamente

### 🚀 Uso Rápido

```bash
npm run add-product
```

### 📋 Campos del Producto

#### ✅ **Campos Obligatorios:**
- **Nombre:** Nombre descriptivo del producto
- **Imagen URL:** URL completa de la imagen del producto (debe ser válida)
- **Descripción Corta:** Resumen breve del producto
- **Precio Web:** Precio de oferta/descuento (S/)
- **Precio Regular:** Precio normal del producto (S/)
- **Marca:** Nombre de la marca (se crea automáticamente si no existe)
- **Categoría:** Nombre de la categoría (se crea automáticamente si no existe)
- **Condición:** Estado del producto

#### 📝 **Campos Opcionales:**
- **Descripción Larga:** Descripción detallada del producto
- **Stock:** Cantidad disponible (default: 0)

### 🏷️ **Condiciones Disponibles:**
- **N** = Nuevo
- **U** = Usado  
- **R** = Reacondicionado

### 💡 **Validaciones Automáticas:**
- ✅ URLs de imagen válidas
- ✅ Precios positivos
- ✅ Precio web ≤ precio regular
- ✅ Campos obligatorios no vacíos
- ✅ Slug único automático
- ✅ Creación automática de marcas/categorías

### 🎨 **Características del Script:**
- 🌈 Interfaz colorida y fácil de usar
- 📋 Resumen antes de confirmar
- ❌ Validación en tiempo real
- 🔄 Reintentos automáticos en errores
- 👋 Cancelación con Ctrl+C
- 🎉 Confirmación visual del éxito

### 📝 **Ejemplo de Uso:**

```bash
$ npm run add-product

═══════════════════════════════════════════════════════════════
                  🛍️  AGREGAR NUEVO PRODUCTO
                      RenovaBit - Moquegua
═══════════════════════════════════════════════════════════════

📋 INFORMACIÓN DE CAMPOS:
   ✅ Obligatorios: Nombre, Imagen URL, Descripción Corta, Precio Web, Precio, Marca, Categoría, Condición
   📝 Opcionales: Descripción Larga, Stock (default: 0)
   🏷️  Condiciones: N=Nuevo, U=Usado, R=Reacondicionado

💡 Nota: El precio web debe ser menor o igual al precio regular

🚀 Iniciando proceso de creación de producto...

❓ Nombre del producto *: Laptop Gaming ASUS ROG
❓ URL de la imagen *: https://example.com/laptop.jpg
❓ Descripción corta *: Laptop gaming con RTX 4060 y 16GB RAM
❓ Descripción larga (opcional): Laptop de alto rendimiento ideal para gaming...
❓ Stock (opcional) [0]: 5
❓ Precio web (S/) *: 3500
❓ Precio regular (S/) *: 4000
❓ Marca *: ASUS
❓ Categoría *: Laptops
Opciones de condición:
  N = Nuevo
  U = Usado  
  R = Reacondicionado
❓ Condición (N/U/R) *: N

📋 RESUMEN DEL PRODUCTO A CREAR:
═══════════════════════════════════════════
📦 Nombre: Laptop Gaming ASUS ROG
🖼️  Imagen: https://example.com/laptop.jpg
📝 Descripción Corta: Laptop gaming con RTX 4060 y 16GB RAM
📄 Descripción Larga: Laptop de alto rendimiento ideal para gaming...
📦 Stock: 5
💰 Precio Web: S/ 3500
💵 Precio Regular: S/ 4000
🏷️  Marca: ASUS
📂 Categoría: Laptops
🔧 Condición: Nuevo

❓ ¿Confirmar creación del producto? (s/N): s

🔄 Creando producto...

✅ ¡PRODUCTO CREADO EXITOSAMENTE!
═══════════════════════════════════════
🆔 ID: 123e4567-e89b-12d3-a456-426614174000
📦 Nombre: Laptop Gaming ASUS ROG
🔗 Slug: laptop-gaming-asus-rog
💰 Precio Web: S/ 3500.00
💵 Precio Regular: S/ 4000.00

🎉 El producto ya está disponible en la tienda!
```

### 🔧 **Funcionalidades Técnicas:**
- Creación automática de slugs únicos
- Validación de URLs de imagen
- Manejo de marcas y categorías nuevas
- Transacciones de base de datos seguras
- Manejo robusto de errores
- Interfaz responsive en terminal 