// js/data-semana1.js
export default {
  titulo: "📅 Semana 1-2: Fundamentos con PyGame",
  descripcion: "Domina el control, las colisiones y la lógica del juego con PyGame. Aprende los pilares de todo videojuego: el bucle principal (game loop), la gestión de estados y la interacción jugador-entorno.",
  
  lecciones: [
    {
      titulo: "Introducción: El Plano 2D con PyGame",
      contenido: `
        <div class="intro-section">
          <h3>🎯 Objetivo de esta fase</h3>
          <p>Crear tu primer juego funcional desde cero. Al final de estas dos semanas, tendrás un juego completo de "Esquivar Obstáculos" con puntaje y colisiones.</p>

          <div class="alert alert-info">
            <strong>📚 Lo que aprenderás:</strong> El punto de partida. PyGame es una librería gratuita y popular para crear videojuegos en 2D con Python, ideal para principiantes.
          </div>
        </div>
        
        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page3_img1.png" alt="La Primera Chispa: Dominando el Plano 2D con PyGame" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>🧩 Evolución del juego</h3>
        <p>Todo comienza con un cuadrado estático y evoluciona hasta convertirse en un juego completo.</p>
        
        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page4_img1.png" alt="De un Cuadrado Estático a un Juego Funcional" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>🧩 Habilidades que desbloquearás</h3>
        
        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page5_img1.png" alt="Fundamentos de Game Design 2D" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <ul>
          <li><strong>Control del jugador:</strong> Manejo de entradas de teclado (WASD, flechas) y mouse</li>
          <li><strong>Físicas y colisiones:</strong> Detección de interacciones entre objetos para crear un mundo con reglas</li>
          <li><strong>IA básica:</strong> Programación de comportamientos enemigos simples, como movimiento predecible y persecución</li>
          <li><strong>Gestión de recursos:</strong> Carga y uso de imágenes (.png), sonidos (.wav) y música (.mp3)</li>
        </ul>
      `
    },
    {
      titulo: "Día 1: Instalar PyGame y Primera Ventana",
      contenido: `
        <h3>🎯 Objetivo del día</h3>
        <p>Tener una ventana de juego funcionando en menos de 10 minutos.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page3_img1.png" alt="Terminal y primer código" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📋 Requisitos previos</h3>
        <ul>
          <li>✅ Python 3.11 o superior instalado</li>
          <li>✅ Windows 10 o superior</li>
          <li>✅ Conexión a internet (solo para instalar PyGame)</li>
          <li>✅ Editor de texto (Bloc de notas, Thonny, VS Code o similar)</li>
        </ul>

        <h3>🔧 Paso 1: Abrir la terminal</h3>
        <p>Presiona <kbd>Windows + R</kbd>, escribe <code>cmd</code> y pulsa <kbd>Enter</kbd>.</p>

        <h3>🔍 Paso 2: Verificar Python</h3>
        <p>Escribe este comando y asegúrate de ver <code>Python 3.11.x</code> o superior:</p>
        <div class="code-block">python --version</div>

        <h3>📥 Paso 3: Instalar PyGame</h3>
        <p>Ejecuta este comando y espera a que termine:</p>
        <div class="code-block">pip install pygame</div>
        <p>⏱️ Puede tardar 1-2 minutos. Verás <code>Successfully installed pygame</code></p>

        <h3>💻 Paso 4: Crear tu primer archivo</h3>
        <p>Abre el <strong>Bloc de notas</strong> o <strong>Thonny</strong> y crea un archivo llamado <code>mi_primer_juego.py</code></p>
        
        <h3>📝 Paso 5: Escribir el código completo</h3>
        <div class="code-block">import pygame
import sys

# Inicializar Pygame
pygame.init()

# Configurar la pantalla
pantalla = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Mi primer juego")

# Bucle principal
ejecutando = True
while ejecutando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    # Rellenar la pantalla con color azul claro
    pantalla.fill((100, 150, 255))

    # Actualizar la pantalla
    pygame.display.flip()

# Salir de Pygame
pygame.quit()
sys.exit()</div>

        <h3>▶️ Paso 6: Ejecutar el juego</h3>
        <p>En la terminal, navega a la carpeta donde guardaste el archivo:</p>
        <div class="code-block">cd Documentos
python mi_primer_juego.py</div>

        <h3>✅ Resultado esperado</h3>
        <p>Debes ver una ventana azul de 800×600 píxeles. ¡Felicidades, acabas de crear tu primer motor de juego!</p>

        <div class="alert alert-success">
          <strong>🎉 ¡Logro desbloqueado!</strong> Has creado tu primera ventana de juego. Este es el lienzo donde pintarás todos tus juegos futuros.
        </div>

        <h3>🎯 Desafíos extra</h3>
        <ul>
          <li>Cambia el color de fondo a <code>(255, 0, 0)</code> (rojo)</li>
          <li>Cambia el título a "Mi super juego"</li>
          <li>Aumenta el tamaño a 1024×768</li>
          <li>Investiga otros colores usando valores RGB</li>
        </ul>

        <h3>📚 Conceptos clave</h3>
        <ul>
          <li><strong>pygame.init():</strong> Inicializa todos los módulos de PyGame</li>
          <li><strong>set_mode((ancho, alto)):</strong> Crea la ventana del juego</li>
          <li><strong>Bucle while ejecutando:</strong> El corazón del juego, se ejecuta 60+ veces por segundo</li>
          <li><strong>pygame.display.flip():</strong> Actualiza lo que se ve en pantalla</li>
        </ul>
      `
    },
    {
      titulo: "Día 2: Jugador Móvil con Teclado",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear un cuadrado rojo que se mueva con las flechas del teclado.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page4_img1.png" alt="Progresión del control del jugador" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Nuevo archivo: <code>jugador_movil.py</code></h3>
        
        <h3>🔧 Paso 1: Añadir el jugador</h3>
        <p>Después de configurar la pantalla, agrega estas líneas:</p>
        <div class="code-block"># Posición inicial del jugador
x_jugador = 400
y_jugador = 500
velocidad = 5</div>

        <h3>🔍 Paso 2: Detectar teclas presionadas</h3>
        <p>Dentro del bucle principal, antes de <code>pantalla.fill()</code>:</p>
        <div class="code-block"># Detectar teclas presionadas
teclas = pygame.key.get_pressed()
if teclas[pygame.K_LEFT]:
    x_jugador -= velocidad
if teclas[pygame.K_RIGHT]:
    x_jugador += velocidad
if teclas[pygame.K_UP]:
    y_jugador -= velocidad
if teclas[pygame.K_DOWN]:
    y_jugador += velocidad</div>

        <h3>🛡️ Paso 3: Limitar al jugador dentro de la pantalla</h3>
        <div class="code-block"># Limitar al jugador dentro de la pantalla
x_jugador = max(0, min(x_jugador, 780))
y_jugador = max(0, min(y_jugador, 580))</div>

        <h3>🎨 Paso 4: Dibujar al jugador</h3>
        <p>Después de <code>pantalla.fill()</code>:</p>
        <div class="code-block"># Dibujar al jugador (un cuadrado rojo)
pygame.draw.rect(pantalla, (255, 0, 0), (x_jugador, y_jugador, 20, 20))</div>

        <h3>📄 Código completo</h3>
        <div class="code-block">import pygame
import sys

pygame.init()
pantalla = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Jugador móvil")

# Posición inicial del jugador
x_jugador = 400
y_jugador = 500
velocidad = 5

ejecutando = True
while ejecutando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    # Detectar teclas presionadas
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_LEFT]:
        x_jugador -= velocidad
    if teclas[pygame.K_RIGHT]:
        x_jugador += velocidad
    if teclas[pygame.K_UP]:
        y_jugador -= velocidad
    if teclas[pygame.K_DOWN]:
        y_jugador += velocidad

    # Limitar al jugador dentro de la pantalla
    x_jugador = max(0, min(x_jugador, 780))
    y_jugador = max(0, min(y_jugador, 580))

    pantalla.fill((100, 150, 255))

    # Dibujar al jugador (un cuadrado rojo)
    pygame.draw.rect(pantalla, (255, 0, 0), (x_jugador, y_jugador, 20, 20))

    pygame.display.flip()

pygame.quit()
sys.exit()</div>

        <h3>🎮 Controles</h3>
        <ul>
          <li><kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> : Mover el cuadrado</li>
        </ul>

        <h3>🔍 Explicación línea por línea</h3>
        <ul>
          <li><strong>x_jugador, y_jugador:</strong> Posición actual del jugador en pantalla</li>
          <li><strong>velocidad = 5:</strong> Cuántos píxeles se mueve por frame</li>
          <li><strong>pygame.key.get_pressed():</strong> Detecta qué teclas están siendo presionadas</li>
          <li><strong>max(0, min(...)):</strong> Técnica para mantener valores dentro de un rango</li>
          <li><strong>pygame.draw.rect():</strong> Dibuja un rectángulo en las coordenadas especificadas</li>
        </ul>

        <div class="alert alert-info">
          <strong>💡 Tip:</strong> Prueba cambiar <code>velocidad = 10</code> y observa cómo se mueve más rápido.
        </div>

        <h3>🎯 Desafíos</h3>
        <ul>
          <li>Haz que el jugador sea un círculo azul (usa <code>pygame.draw.circle()</code>)</li>
          <li>Añade límites más estrictos (margen de 50 píxeles)</li>
          <li>Crea un segundo jugador con teclas WASD</li>
          <li>Añade velocidad diagonal (cuando presionas dos teclas)</li>
        </ul>
      `
    },
    {
      titulo: "Día 3-4: Obstáculos y Colisiones",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear obstáculos que caen y detectar colisiones con el jugador. Este es el núcleo de la mayoría de los videojuegos.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page5_img1.png" alt="Sistema de colisiones" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Nuevo archivo: <code>juego_completo.py</code></h3>
        
        <h3>🔧 Paso 1: Importar random para posiciones aleatorias</h3>
        <div class="code-block">import pygame
import sys
import random</div>

        <h3>🔴 Paso 2: Añadir obstáculo</h3>
        <p>Después de definir al jugador:</p>
        <div class="code-block"># Obstáculo
x_obstaculo = random.randint(0, 780)
y_obstaculo = -20
velocidad_obstaculo = 4</div>

        <h3>⬇️ Paso 3: Mover obstáculo</h3>
        <p>En el bucle principal, después del movimiento del jugador:</p>
        <div class="code-block"># Mover obstáculo
y_obstaculo += velocidad_obstaculo

# Si el obstáculo sale de la pantalla, reaparece arriba
if y_obstaculo > 600:
    y_obstaculo = -20
    x_obstaculo = random.randint(0, 780)
    puntaje += 1  # ¡Evitó uno más!</div>

        <h3>💥 Paso 4: Detectar colisión</h3>
        <div class="code-block">def hay_colision(x1, y1, x2, y2, ancho=20, radio=15):
    """Detecta si dos objetos se tocan usando distancia"""
    # Distancia entre centros
    dx = x1 + ancho//2 - x2
    dy = y1 + ancho//2 - y2
    distancia = (dx**2 + dy**2)**0.5
    return distancia < (ancho//2 + radio)</div>

        <h3>📊 Paso 5: Sistema de puntaje</h3>
        <p>Antes del bucle principal:</p>
        <div class="code-block"># Sistema de puntaje
puntaje = 0
fuente = pygame.font.SysFont(None, 36)</div>

        <h3>📄 Código completo</h3>
        <div class="code-block">import pygame
import sys
import random

pygame.init()
pantalla = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Evita los obstáculos")

# Jugador
x_jugador = 400
y_jugador = 500
velocidad_jugador = 6

# Obstáculo
x_obstaculo = random.randint(0, 780)
y_obstaculo = -20
velocidad_obstaculo = 4

# Sistema de puntaje
puntaje = 0
fuente = pygame.font.SysFont(None, 36)

ejecutando = True
reloj = pygame.time.Clock()

while ejecutando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    # Movimiento del jugador
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_LEFT]:
        x_jugador -= velocidad_jugador
    if teclas[pygame.K_RIGHT]:
        x_jugador += velocidad_jugador

    # Limitar jugador
    x_jugador = max(0, min(x_jugador, 780))

    # Mover obstáculo
    y_obstaculo += velocidad_obstaculo

    # Si el obstáculo sale de la pantalla, reaparece arriba
    if y_obstaculo > 600:
        y_obstaculo = -20
        x_obstaculo = random.randint(0, 780)
        puntaje += 1

    # Detectar colisión
    def hay_colision(x1, y1, x2, y2, ancho=20, radio=15):
        dx = x1 + ancho//2 - x2
        dy = y1 + ancho//2 - y2
        distancia = (dx**2 + dy**2)**0.5
        return distancia < (ancho//2 + radio)

    if hay_colision(x_jugador, y_jugador, x_obstaculo, y_obstaculo):
        print(f"¡Perdiste! Puntaje final: {puntaje}")
        pygame.time.wait(1000)
        ejecutando = False

    # Dibujar todo
    pantalla.fill((100, 150, 255))
    
    # Dibujar jugador (verde)
    pygame.draw.rect(pantalla, (0, 255, 0), (x_jugador, y_jugador, 20, 20))
    
    # Dibujar obstáculo (rojo)
    pygame.draw.circle(pantalla, (255, 0, 0), (x_obstaculo, y_obstaculo), 15)
    
    # Mostrar puntaje
    texto = fuente.render(f"Puntaje: {puntaje}", True, (0, 0, 0))
    pantalla.blit(texto, (10, 10))

    pygame.display.flip()
    reloj.tick(60)

pygame.quit()
sys.exit()</div>

        <h3>🎮 Cómo jugar</h3>
        <ul>
          <li>Usa <kbd>←</kbd> y <kbd>→</kbd> para moverte</li>
          <li>Evita los círculos rojos que caen</li>
          <li>Cada vez que un obstáculo llega abajo, ¡sumas 1 punto!</li>
        </ul>

        <h3>🔍 Conceptos clave</h3>
        <ul>
          <li><strong>random.randint(0, 780):</strong> Genera posición aleatoria del obstáculo</li>
          <li><strong>reloj.tick(60):</strong> Limita a 60 FPS para juego fluido y consistente</li>
          <li><strong>Función hay_colision():</strong> Detecta si dos objetos se tocan usando el teorema de Pitágoras</li>
          <li><strong>pantalla.blit():</strong> Dibuja texto o imágenes en la pantalla</li>
        </ul>

        <div class="alert alert-warning">
          <strong>⚠️ Importante:</strong> La función de colisión usa el teorema de Pitágoras 
          (distancia = √(dx² + dy²)) para calcular si dos objetos están lo suficientemente cerca.
        </div>

        <h3>🎯 Desafíos avanzados</h3>
        <ul>
          <li>Añade múltiples obstáculos que caigan al mismo tiempo</li>
          <li>Haz que la velocidad aumente con el puntaje</li>
          <li>Añade vidas (3 intentos antes de perder)</li>
          <li>Crea power-ups que den puntos extra</li>
          <li>Añade niveles de dificultad</li>
        </ul>

        <div class="alert alert-success">
          <strong>🎉 ¡Felicidades!</strong> Has completado los fundamentos de PyGame. 
          Ahora tienes todas las herramientas para crear tu propio juego desde cero.
        </div>
      `
    }
  ]
};