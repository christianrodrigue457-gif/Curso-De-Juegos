// js/data-semana3.js
export default {
  titulo: "📅 Semana 3-4: Gráficos, Sonido y Juego Completo",
  descripcion: "Lleva tu juego al siguiente nivel añadiendo imágenes reales, efectos de sonido, música de fondo y crea un ejecutable profesional para compartir.",
  
  lecciones: [
    {
      titulo: "Semana 3: Imágenes y Sonidos Reales",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Reemplazar formas geométricas por imágenes profesionales y añadir música y efectos de sonido que den vida a tu juego.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page6_img1.png" alt="Gestión de Recursos" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Nueva estructura de carpetas</h3>
        <p>Organiza tu proyecto de forma profesional:</p>
        <div class="code-block">mi_juego/
├── juego.py
├── imagenes/
│   ├── jugador.png
│   ├── obstaculo.png
│   └── fondo.png
└── sonidos/
    ├── explosion.wav
    ├── punto.wav
    └── fondo.mp3</div>

        <div class="alert alert-info">
          <strong>📚 Recursos gratuitos:</strong> Puedes descargar sprites y sonidos gratis desde:
          <ul style="margin-top: 10px;">
            <li><strong>OpenGameArt.org</strong> - Gráficos y sprites</li>
            <li><strong>FreeSound.org</strong> - Efectos de sonido</li>
            <li><strong>Kenney.nl</strong> - Paquetes completos de assets</li>
          </ul>
        </div>

        <h3>🖼️ Paso 1: Cargar imágenes</h3>
        <p>Al inicio de tu código, después de <code>pygame.init()</code>:</p>
        <div class="code-block">import os

# Cargar imágenes
jugador_img = pygame.image.load(os.path.join("imagenes", "jugador.png"))
jugador_img = pygame.transform.scale(jugador_img, (40, 40))  # Redimensionar

obstaculo_img = pygame.image.load(os.path.join("imagenes", "obstaculo.png"))
obstaculo_img = pygame.transform.scale(obstaculo_img, (30, 30))

# Fondo
fondo_img = pygame.image.load(os.path.join("imagenes", "fondo.png"))
fondo_img = pygame.transform.scale(fondo_img, (800, 600))</div>

        <h3>🔊 Paso 2: Añadir sonidos</h3>
        <div class="code-block"># Inicializar el mixer de audio
pygame.mixer.init()

# Cargar música de fondo
pygame.mixer.music.load(os.path.join("sonidos", "fondo.mp3"))
pygame.mixer.music.set_volume(0.3)  # Volumen al 30%
pygame.mixer.music.play(-1)  # -1 = Loop infinito

# Cargar efectos de sonido
sonido_explosion = pygame.mixer.Sound(os.path.join("sonidos", "explosion.wav"))
sonido_punto = pygame.mixer.Sound(os.path.join("sonidos", "punto.wav"))</div>

        <h3>🎨 Paso 3: Dibujar con imágenes</h3>
        <p>Reemplaza los <code>pygame.draw.rect()</code> por <code>blit()</code>:</p>
        <div class="code-block"># En el bucle principal, reemplaza:
# pygame.draw.rect(pantalla, (255, 0, 0), (x_jugador, y_jugador, 20, 20))

# Por esto:
pantalla.blit(jugador_img, (x_jugador, y_jugador))
pantalla.blit(obstaculo_img, (x_obstaculo, y_obstaculo))</div>

        <h3>🎵 Paso 4: Reproducir efectos de sonido</h3>
        <div class="code-block"># Cuando el jugador suma un punto:
if y_obstaculo > 600:
    y_obstaculo = -20
    x_obstaculo = random.randint(0, 780)
    puntaje += 1
    sonido_punto.play()  # ¡Sonido de punto!

# Cuando hay colisión:
if hay_colision(x_jugador, y_jugador, x_obstaculo, y_obstaculo):
    sonido_explosion.play()  # ¡Sonido de explosión!
    pygame.time.wait(1000)
    ejecutando = False</div>

        <h3>📄 Código completo con imágenes y sonidos</h3>
        <div class="code-block">import pygame
import sys
import random
import os

pygame.init()
pygame.mixer.init()

pantalla = pygame.display.set_mode((800, 600))
pygame.display.set_caption("¡Juego Completo!")

# Cargar recursos
jugador_img = pygame.image.load(os.path.join("imagenes", "jugador.png"))
jugador_img = pygame.transform.scale(jugador_img, (40, 40))

obstaculo_img = pygame.image.load(os.path.join("imagenes", "obstaculo.png"))
obstaculo_img = pygame.transform.scale(obstaculo_img, (30, 30))

fondo_img = pygame.image.load(os.path.join("imagenes", "fondo.png"))
fondo_img = pygame.transform.scale(fondo_img, (800, 600))

# Música y sonidos
pygame.mixer.music.load(os.path.join("sonidos", "fondo.mp3"))
pygame.mixer.music.set_volume(0.3)
pygame.mixer.music.play(-1)

sonido_explosion = pygame.mixer.Sound(os.path.join("sonidos", "explosion.wav"))
sonido_punto = pygame.mixer.Sound(os.path.join("sonidos", "punto.wav"))

# Variables del juego
x_jugador = 380
y_jugador = 500
velocidad_jugador = 6

x_obstaculo = random.randint(0, 770)
y_obstaculo = -20
velocidad_obstaculo = 4

puntaje = 0
fuente = pygame.font.SysFont(None, 48)

ejecutando = True
reloj = pygame.time.Clock()

def hay_colision(x1, y1, x2, y2, ancho=40, radio=15):
    dx = x1 + ancho//2 - (x2 + 15)
    dy = y1 + ancho//2 - (y2 + 15)
    distancia = (dx**2 + dy**2)**0.5
    return distancia < (ancho//2 + radio)

while ejecutando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_LEFT]:
        x_jugador -= velocidad_jugador
    if teclas[pygame.K_RIGHT]:
        x_jugador += velocidad_jugador

    x_jugador = max(0, min(x_jugador, 760))

    y_obstaculo += velocidad_obstaculo

    if y_obstaculo > 600:
        y_obstaculo = -20
        x_obstaculo = random.randint(0, 770)
        puntaje += 1
        sonido_punto.play()

    if hay_colision(x_jugador, y_jugador, x_obstaculo, y_obstaculo):
        sonido_explosion.play()
        print(f"¡Game Over! Puntaje: {puntaje}")
        pygame.time.wait(2000)
        ejecutando = False

    # Dibujar
    pantalla.blit(fondo_img, (0, 0))
    pantalla.blit(jugador_img, (x_jugador, y_jugador))
    pantalla.blit(obstaculo_img, (x_obstaculo, y_obstaculo))
    
    texto = fuente.render(f"Puntaje: {puntaje}", True, (255, 255, 255))
    pantalla.blit(texto, (10, 10))

    pygame.display.flip()
    reloj.tick(60)

pygame.mixer.music.stop()
pygame.quit()
sys.exit()</div>

        <div class="alert alert-success">
          <strong>🎉 ¡Logro desbloqueado!</strong> Tu juego ahora tiene gráficos profesionales y sonido inmersivo.
        </div>

        <h3>🎯 Mejoras opcionales</h3>
        <ul>
          <li>Añade una imagen de fondo animada (scrolling)</li>
          <li>Crea diferentes sprites para el jugador (animación)</li>
          <li>Añade partículas cuando explota el obstáculo</li>
          <li>Implementa un sistema de combo de puntos</li>
        </ul>
      `
    },
    {
      titulo: "Semana 4: Crear Archivo Ejecutable (.exe)",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Convertir tu juego Python en un archivo ejecutable (.exe) que cualquiera pueda jugar sin tener Python instalado.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page14_img1.png" alt="Ejecutable Final" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <div class="alert alert-info">
          <strong>📦 ¿Qué es PyInstaller?</strong> Es una herramienta que empaqueta tu código Python y todas sus dependencias en un único archivo ejecutable.
        </div>

        <h3>🔧 Paso 1: Instalar PyInstaller</h3>
        <p>Abre la terminal (CMD) y ejecuta:</p>
        <div class="code-block">pip install pyinstaller</div>
        <p>⏱️ Espera 1-2 minutos hasta que termine la instalación.</p>

        <h3>📋 Paso 2: Preparar tu proyecto</h3>
        <p>Asegúrate de que tu estructura sea así:</p>
        <div class="code-block">mi_juego/
├── juego.py          ← Tu código principal
├── imagenes/
│   ├── jugador.png
│   ├── obstaculo.png
│   └── fondo.png
└── sonidos/
    ├── explosion.wav
    ├── punto.wav
    └── fondo.mp3</div>

        <h3>🚀 Paso 3: Crear el ejecutable</h3>
        <p>En la terminal, navega a la carpeta de tu proyecto:</p>
        <div class="code-block">cd ruta/a/mi_juego</div>

        <p>Luego ejecuta este comando (todo en una línea):</p>
        <div class="code-block">pyinstaller --onefile --windowed --add-data "imagenes;imagenes" --add-data "sonidos;sonidos" --name "MiJuego" juego.py</div>

        <h3>📖 Explicación del comando</h3>
        <ul>
          <li><strong>--onefile:</strong> Crea un solo archivo .exe (no una carpeta)</li>
          <li><strong>--windowed:</strong> No muestra la ventana de consola negra</li>
          <li><strong>--add-data "imagenes;imagenes":</strong> Incluye la carpeta de imágenes</li>
          <li><strong>--add-data "sonidos;sonidos":</strong> Incluye la carpeta de sonidos</li>
          <li><strong>--name "MiJuego":</strong> Nombre del archivo ejecutable</li>
          <li><strong>juego.py:</strong> Tu archivo principal de Python</li>
        </ul>

        <div class="alert alert-warning">
          <strong>⚠️ Importante para Windows:</strong> El separador es punto y coma <code>;</code>
          <br>
          En Mac/Linux usa dos puntos <code>:</code> en su lugar.
        </div>

        <h3>⏳ Paso 4: Esperar la compilación</h3>
        <p>PyInstaller creará varias carpetas:</p>
        <div class="code-block">mi_juego/
├── build/           ← Archivos temporales (puedes borrar)
├── dist/            ← ¡AQUÍ ESTÁ TU .EXE!
│   └── MiJuego.exe  ← ¡Tu juego ejecutable!
├── MiJuego.spec     ← Configuración (puedes borrar)
└── ...</div>

        <h3>✅ Paso 5: Probar el ejecutable</h3>
        <p>Navega a la carpeta <code>dist/</code> y haz doble clic en <code>MiJuego.exe</code></p>
        <p>¡Tu juego debería iniciarse sin necesidad de Python!</p>

        <div class="alert alert-success">
          <strong>🎉 ¡Felicidades!</strong> Ahora puedes compartir tu juego con amigos y familiares. Solo envíales el archivo .exe
        </div>

        <h3>🐛 Solución de problemas comunes</h3>
        
        <h4>❌ Error: "No module named 'pygame'"</h4>
        <p><strong>Solución:</strong> Asegúrate de que pygame esté instalado:</p>
        <div class="code-block">pip install pygame</div>

        <h4>❌ Las imágenes o sonidos no aparecen</h4>
        <p><strong>Solución:</strong> Verifica que usaste <code>--add-data</code> correctamente. También asegúrate de usar <code>os.path.join()</code> en tu código:</p>
        <div class="code-block">import os
# ✅ CORRECTO
imagen = pygame.image.load(os.path.join("imagenes", "jugador.png"))

# ❌ INCORRECTO
imagen = pygame.image.load("imagenes/jugador.png")</div>

        <h4>❌ El .exe es muy grande (más de 100 MB)</h4>
        <p><strong>Solución:</strong> Es normal. PyInstaller incluye todo Python y sus librerías. Para reducir el tamaño:</p>
        <ul>
          <li>Usa <code>--onefile</code> en lugar de <code>--onedir</code></li>
          <li>Comprime el .exe con UPX (opcional)</li>
          <li>Considera usar <code>--exclude-module</code> para módulos innecesarios</li>
        </ul>

        <h3>📤 Paso 6: Distribuir tu juego</h3>
        <p>Ahora puedes:</p>
        <ul>
          <li>✅ Enviarlo por correo o WhatsApp (si no es muy pesado)</li>
          <li>✅ Subirlo a Google Drive o Dropbox</li>
          <li>✅ Compartirlo en itch.io (plataforma gratuita para juegos indie)</li>
          <li>✅ Mostrárselo a tu familia y amigos</li>
        </ul>

        <h3>🎨 Personalización avanzada</h3>
        
        <h4>Añadir un ícono personalizado:</h4>
        <div class="code-block">pyinstaller --onefile --windowed --icon=icono.ico --add-data "imagenes;imagenes" --add-data "sonidos;sonidos" juego.py</div>
        <p><small>Necesitas un archivo <code>.ico</code>. Puedes convertir imágenes PNG a ICO en <strong>convertio.co</strong></small></p>

        <h4>Crear instalador profesional:</h4>
        <p>Para un instalador tipo "siguiente, siguiente, instalar", usa <strong>Inno Setup</strong> (Windows) o <strong>py2app</strong> (Mac).</p>

        <div class="alert alert-success">
          <strong>🏆 ¡Misión cumplida!</strong> Has completado las 4 semanas de fundamentos. 
          Ahora tienes un juego completo, con gráficos, sonido y empaquetado como ejecutable profesional.
          <br><br>
          <strong>📈 Próximo paso:</strong> Explora la Fase 2 para crear juegos en 3D con Ursina.
        </div>

        <h3>🎯 Desafíos finales</h3>
        <ul>
          <li>Añade un menú principal con botones "Jugar" y "Salir"</li>
          <li>Implementa un sistema de high scores guardado en archivo</li>
          <li>Crea un tutorial interactivo para nuevos jugadores</li>
          <li>Añade niveles de dificultad (fácil, normal, difícil)</li>
          <li>Diseña un sistema de logros/achievements</li>
        </ul>
      `
    }
  ]
};