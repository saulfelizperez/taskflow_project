# Prueba y error

## Documentación 

Este documento se enfocará en almacenar los datos necesarios de los resultados de pruebas y la diferencia entre sus características.
 
## Resolución de Problemas — AI vs Humano

### 1. Número par o impar

**Problema:**  
Creación de una función que reciba un número y determine si es par o impar.

**Solución:**
```csharp
Console.WriteLine(EsParOImpar(7));

static string EsParOImpar(int numero)
{
    if (numero % 2 == 0)
    {
        return "Par";
    }
    else
    {
        return "Impar";
    }
}
```

- **Tiempo del estudiante:** 7 minutos  
- **Tiempo de la AI:** 2 segundos  
- **Calidad de código del estudiante:** Baja, porque tuvo errores que luego se repararon  
- **Calidad de código de la AI:** Buena, pero a pesar de indicar C# seguía agregando el código inicial de `main`. C# omite esto si pones `Console.WriteLine` al principio.  
- **Comprensión del estudiante:** Debido a sus conocimientos, le tomó más tiempo y estuvo pensando cómo formar el código también.  
- **Comprensión de la AI:** Lo entendió casi a la perfección.  


---

### 2. Contar vocales en un texto

**Problema:**  
Creación de una función que reciba una cadena de texto y devuelva cuántas vocales tiene.


**Las vocales son:**  
`a e i o u`

**Solución:**
```csharp
Console.WriteLine("Introduce un texto:");
string texto = Console.ReadLine();

int contador = 0;

foreach (char letra in texto.ToLower())
{
    if (letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u')
    {
        contador++;
    }
}

Console.WriteLine("El número de vocales es: " + contador);
```

- **Tiempo del estudiante:** 10 minutos  
- **Tiempo de la AI:** 3 segundos  
- **Calidad de código del estudiante:** Buena  
- **Calidad de código de la AI:** Muy buena  
- **Comprensión del estudiante:** Intermedia  
- **Comprensión de la AI:** Alta  

---

### 3. Encontrar el número mayor

**Problema:**  
Crea una función que reciba tres números y devuelva cuál es el mayor.

**Solución:**
```csharp
Console.WriteLine("Introduce el primer número:");
int num1 = int.Parse(Console.ReadLine());

Console.WriteLine("Introduce el segundo número:");
int num2 = int.Parse(Console.ReadLine());

Console.WriteLine("Introduce el tercer número:");
int num3 = int.Parse(Console.ReadLine());

int mayor = num1;

if (num2 > mayor)
{
    mayor = num2;
}

if (num3 > mayor)
{
    mayor = num3;
}

Console.WriteLine("El número mayor es: " + mayor);
```

- **Tiempo del estudiante:** 15 minutos  
- **Tiempo de la AI:** 5 segundos  
- **Calidad de código del estudiante:** Intermedia  
- **Calidad de código de la AI:** Buena  
- **Comprensión del estudiante:** Intermedia  
- **Comprensión de la AI:** Muy buena  

### Tareas relacionadas con el proyecto


1. Añadir un nuevo "Trading Widget" al dashboard


**Solución:**

Simplemente agregue el Widget como una lista.

- **Tiempo del estudiante:** 5 minutos
- **Tiempo de la AI:** 3 segundos
- **Calidad de código del estudiante:** Buena
- **Calidad de código de la AI:** Buena
- **Comprensión del estudiante:** Buena 
- **Comprensión de la AI:** Buena

2. Mejorar un pequeño detalle de accesibilidad en index.html
  
**Solución:**

Agregue Aria-

- **Tiempo del estudiante:** 5 minutos
- **Tiempo de la AI:** 2 segundos
- **Calidad de código del estudiante:** buena
- **Calidad de código de la AI:** muy buena
- **Comprensión del estudiante:**  buena
- **Comprensión de la AI:** muy buena

3. Extraer una parte pequeña del JavaScript embebido a un módulo externo
  
**Solución:**

Agregar otra carpeta con un codigo mejorado del theme

- **Tiempo del estudiante:** 5 minutos
- **Tiempo de la AI:** 3 segundos
- **Calidad de código del estudiante:** buena
- **Calidad de código de la AI:** Muy buena
- **Comprensión del estudiante:**  buena
- **Comprensión de la AI:** Muy buena