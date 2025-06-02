# 🛍️ Scripts de RenovaBit

## Agregar Productos Interactivamente

### 🚀 Uso Rápido

```bash
npm run add-product
```

## 🚀 **NUEVO: Importar Productos Masivamente**

### 🎯 Uso Rápido

```bash
npm run import-products
```

### 📋 ¿Para qué sirve?
- ✅ **Importar múltiples productos** de una sola vez desde scraping
- 🔄 **Transformación automática** de datos externos a formato interno
- 🎨 **Para testing y desarrollo** - poblar BD rápidamente
- 📊 **Procesamiento en lote** con reportes detallados

### 🛠️ Cómo usar:

#### **Paso 1: Editar el archivo**
Abre `src/scripts/import-products.ts` y configura:

**1. Categoría (una sola vez):**
```typescript
const CATEGORY_NAME = 'Monitores' // ← Cambia por: "Monitores", "Accesorios", "Laptops", etc.
```

**2. Productos scraped:**
```typescript
const SCRAPED_PRODUCTS = [
    {
        "id": "8396",
        "title": "MOCHILA, TEROS, NBACTE9012BG", 
        "price": 29,              // → priceWeb (precio oferta)
        "normalPrice": 29,        // → price (precio regular)
        "image": "https://...",   // → imageUrl
        "stock": "6",            // → stock (si ">10" = 15)
        "url": "https://..."     // (no se usa)
    },
    // ... más productos
]
```

#### **Paso 2: Ejecutar el script**
```bash
npm run import-products
```

#### **Paso 3: Configurar marca**
El script te preguntará solo:
- **Marca**: Se aplicará a TODOS los productos

#### **Paso 4: Confirmar y procesar**
- ✅ Ve el resumen de importación
- 🔄 Confirma para procesar todos los productos
- 📊 Observa el progreso en tiempo real

### 🔄 **Transformaciones Automáticas:**

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|-----------------|
| `title` | `name` + `shortDescription` | Directo |
| `price` | `priceWeb` | Directo |
| `normalPrice` | `price` | Directo |
| `image` | `imageUrl` | Directo |
| `stock` | `stock` | `">10"` → `15`, otros: número |
| - | `longDescription` | Texto por defecto (memoria RAM) |
| - | `conditionId` | `"N"` (Nuevo) |
| - | `brandName` | Lo ingresas interactivamente |
| - | `categoryName` | Configurado en `CATEGORY_NAME` |

### 📊 **Ejemplo de Ejecución:**

```bash
$ npm run import-products

═══════════════════════════════════════════════════════════════
                🚀  IMPORTAR PRODUCTOS MASIVAMENTE
                      RenovaBit - Moquegua
═══════════════════════════════════════════════════════════════

📊 DATOS DETECTADOS:
✅ Productos encontrados: 38

📝 EJEMPLO DEL PRIMER PRODUCTO:
Título: MOCHILA, TEROS, NBACTE9012BG
Precio Web: S/ 29
Precio Normal: S/ 29  
Stock Original: 6 → 6

❓ Marca para TODOS los productos: TEROS

📋 RESUMEN DE IMPORTACIÓN:
═══════════════════════════════════════════
📦 Total de productos: 38
🏷️ Marca (para todos): TEROS
📂 Categoría (configurada): Monitores
🔧 Condición: Nuevo
📄 Descripción larga: Texto por defecto (memoria RAM)

📝 PRIMEROS 5 PRODUCTOS:
1. MOCHILA, TEROS, NBACTE9012BG
   💰 S/ 29 → S/ 29
   📦 Stock: 6

2. RACK MONITOR, KLIP XTREME, KPM-300 MONITOR hasta 32P
   💰 S/ 98 → S/ 99
   📦 Stock: 15

... y 33 productos más

❓ ¿Confirmar importación masiva? (s/N): s

🔄 INICIANDO IMPORTACIÓN...
────────────────────────────────────────────────────────────
[1/38] MOCHILA, TEROS, NBACTE9012BG... ✅
[2/38] RACK MONITOR, KLIP XTREME, KPM-300 MONITOR ha... ✅
[3/38] RACK MONITOR, KLIP XTREME, KPM-310 DOBLE MON... ✅
...

🎉 IMPORTACIÓN COMPLETADA
═══════════════════════════════════════
✅ Productos creados: 37
❌ Errores: 1
📊 Total procesados: 38

📋 ERRORES DETALLADOS:
1. SMART TV, INNOS, 24P A14 S3201KU: Slug ya existe

🚀 ¡Los productos están listos para testing!
```

### 🎯 **Ventajas del Script de Importación:**
- ⚡ **Súper rápido** - 38 productos en segundos
- 🛡️ **Validaciones automáticas** - usando las mismas del sistema
- 📊 **Reportes detallados** - éxitos y errores 
- 🔄 **Manejo de errores** - continúa aunque falle uno
- 🎨 **Interfaz intuitiva** - progreso visual en tiempo real
- 🏗️ **Para desarrollo** - poblar BD rápidamente para testing

### ⚠️ **Nota Importante:**
Este script es ideal para **desarrollo y testing**. Para producción usa el panel admin que desarrollarás más adelante.

---

## Agregar Productos Individualmente

### 🔄 **NUEVA FUNCIONALIDAD: Flujo Continuo**

### 🚀 Uso Rápido

```bash
npm run add-product
```

### 🔄 **NUEVA FUNCIONALIDAD: Flujo Continuo**
- ✅ **Agregar múltiples productos** en una sola sesión
- 🔄 **Pregunta automática** después de cada producto exitoso
- 🛠️ **Manejo inteligente de errores** con opciones de reintento
- 🎨 **Interfaz limpia** que se renueva entre productos

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
- **🆕 Flujo continuo para múltiples productos**
- **🆕 Limpieza automática de pantalla**
- **🆕 Manejo inteligente de errores**

### 📝 **Ejemplo de Uso Completo:**

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

──────────────────────────────────────────────────
❓ ¿Desea agregar otro producto? (s/N): s

🔄 Iniciando nuevo producto...

[Nueva pantalla limpia - proceso se repite]

❓ ¿Desea agregar otro producto? (s/N): n

👋 ¡Gracias por usar RenovaBit!
🎉 Todos los productos han sido agregados exitosamente.
```

### 🎯 **Flujos Disponibles:**

#### ✅ **Producto Exitoso:**
1. Crear producto → ✅ Éxito
2. `¿Desea agregar otro producto? (s/N)`
   - **s** → Nueva pantalla limpia, agregar otro
   - **n** → Mensaje de despedida, salir

#### ❌ **Error en Producto:**
1. Crear producto → ❌ Error
2. `¿Desea intentar crear otro producto? (s/N)`
   - **s** → Nueva pantalla limpia, reintentar
   - **n** → Mensaje de despedida, salir

### 🔧 **Funcionalidades Técnicas:**
- Creación automática de slugs únicos
- Validación de URLs de imagen
- Manejo de marcas y categorías nuevas
- Transacciones de base de datos seguras
- Manejo robusto de errores
- Interfaz responsive en terminal
- **🆕 Bucle inteligente para múltiples productos**
- **🆕 Limpieza y renovación de interfaz**
- **🆕 Gestión de estado entre productos** 