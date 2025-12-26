// js/data-fase6.js
export default {
  titulo: "🎮 Fase 6: Menú Principal Profesional",
  lecciones: [
    {
      titulo: "Menú Interactivo con Selección de Modos",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear un menú principal profesional que permita seleccionar entre todos los modos de juego creados.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page11_img1.png" alt="Menú Principal Profesional" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Estructura del proyecto final</h3>
        <div class="code-block">curso-python-games/
├── main.py
├── modos/
│   ├── entrenamiento.py
│   ├── arsenal.py
│   ├── duelo.py
│   └── ia_tactica.py
├── assets/
│   ├── imagenes/
│   ├── audio/
│   └── video/
└── menu.py</div>

        <h3>🔧 Paso 1: Crear el menú principal</h3>
        <div class="code-block">from ursina import *
import os
import sys

app = Ursina()

# Configuración
window.title = "Operación Python - Menú Principal"
window.fps_counter.enabled = False
window.exit_button.visible = False

# Fondo
Sky(texture='sky_default')

# Título
titulo = Text(
    text='OPERACIÓN PYTHON',
    origin=(0, 0),
    scale=4,
    y=0.3,
    color=color.orange
)

# Subtítulo
subtitulo = Text(
    text='Selecciona tu modo de juego',
    origin=(0, 0),
    scale=2,
    y=0.15,
    color=color.white
)</div>

        <h3>🔧 Paso 2: Crear botones interactivos</h3>
        <div class="code-block"># Funciones para cada modo
def iniciar_entrenamiento():
    os.system('python modos/entrenamiento.py')

def iniciar_arsenal():
    os.system('python modos/arsenal.py')

def iniciar_duelo():
    os.system('python modos/duelo.py')

def iniciar_ia():
    os.system('python modos/ia_tactica.py')

def salir():
    application.quit()

# Crear botones
botones = [
    {'texto': '🎯 Entrenamiento 3D', 'funcion': iniciar_entrenamiento, 'y': 0},
    {'texto': '🔫 Arsenal Táctico', 'funcion': iniciar_arsenal, 'y': -0.1},
    {'texto': '⚔️ Duelo Local', 'funcion': iniciar_duelo, 'y': -0.2},
    {'texto': '🧠 IA Táctica', 'funcion': iniciar_ia, 'y': -0.3},
    {'texto': '❌ Salir', 'funcion': salir, 'y': -0.4}
]

for boton_data in botones:
    Button(
        text=boton_data['texto'],
        scale=(0.4, 0.08),
        y=boton_data['y'],
        color=color.azure,
        highlight_color=color.blue,
        pressed_color=color.dark_blue,
        on_click=boton_data['funcion']
    )</div>

        <h3>🔧 Paso 3: Empaquetar como ejecutable</h3>
        <div class="code-block"># Empaquetar con PyInstaller
pyinstaller --onefile --windowed --add-data "modos;modos" --add-data "assets;assets" menu.py</div>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page14_img1.png" alt="Ejecutable Final" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📄 Código completo del menú principal</h3>
        <div class="code-block">from ursina import *
import os
import sys

app = Ursina()

# Configuración
window.title = "Operación Python - Menú Principal"
window.fps_counter.enabled = False
window.exit_button.visible = False

# Fondo
Sky(texture='sky_default')

# Música de fondo (opcional)
try:
    Audio('assets/audio/menu.mp3', autoplay=True, loop=True, volume=0.3)
except:
    pass

# Título
titulo = Text(
    text='OPERACIÓN PYTHON',
    origin=(0, 0),
    scale=4,
    y=0.3,
    color=color.orange
)

# Subtítulo
subtitulo = Text(
    text='Selecciona tu modo de juego',
    origin=(0, 0),
    scale=2,
    y=0.15,
    color=color.white
)

# Funciones para cada modo
def iniciar_entrenamiento():
    os.system('python modos/entrenamiento.py')

def iniciar_arsenal():
    os.system('python modos/arsenal.py')

def iniciar_duelo():
    os.system('python modos/duelo.py')

def iniciar_ia():
    os.system('python modos/ia_tactica.py')

def salir():
    application.quit()

# Crear botones
botones = [
    {'texto': '🎯 Entrenamiento 3D', 'funcion': iniciar_entrenamiento, 'y': 0},
    {'texto': '🔫 Arsenal Táctico', 'funcion': iniciar_arsenal, 'y': -0.1},
    {'texto': '⚔️ Duelo Local', 'funcion': iniciar_duelo, 'y': -0.2},
    {'texto': '🧠 IA Táctica', 'funcion': iniciar_ia, 'y': -0.3},
    {'texto': '❌ Salir', 'funcion': salir, 'y': -0.4}
]

for boton_data in botones:
    Button(
        text=boton_data['texto'],
        scale=(0.4, 0.08),
        y=boton_data['y'],
        color=color.azure,
        highlight_color=color.blue,
        pressed_color=color.dark_blue,
        on_click=boton_data['funcion']
    )

# Instrucciones
Text(
    text='Usa el mouse para seleccionar un modo',
    origin=(0, 0),
    scale=1.5,
    y=-0.5,
    color=color.gray
)

print("MENÚ PRINCIPAL CARGADO")
print("Selecciona un modo para comenzar")
app.run()</div>

        <h3>📋 Cómo organizar los archivos</h3>
        <ol>
          <li><strong>Crear carpeta <code>modos/</code></strong> en tu proyecto</li>
          <li><strong>Guardar cada fase</strong> como archivo separado:
            <ul>
              <li><code>entrenamiento.py</code> - Fase 2 básica</li>
              <li><code>arsenal.py</code> - Fase 4 con armas</li>
              <li><code>duelo.py</code> - Fase 5 multijugador</li>
              <li><code>ia_tactica.py</code> - Fase 3 con IA avanzada</li>
            </ul>
          </li>
          <li><strong>Ejecutar <code>menu.py</code></strong> para acceder al menú</li>
        </ol>

        <h3>🎨 Personalización del menú</h3>
        <ul>
          <li>Cambiar colores: modifica <code>color.azure</code>, <code>color.orange</code>, etc.</li>
          <li>Añadir fondos: reemplaza <code>Sky(texture='sky_default')</code></li>
          <li>Música: coloca <code>menu.mp3</code> en <code>assets/audio/</code></li>
          <li>Fuentes: cambia el parámetro <code>scale</code> para tamaños diferentes</li>
        </ul>

        <h3>✅ Resultado final</h3>
        <p>Tu juego ahora tiene:</p>
        <ul>
          <li>✅ Menú principal profesional</li>
          <li>✅ Selección de modos con un clic</li>
          <li>✅ Transiciones suaves</li>
          <li>✅ Fondo y música personalizables</li>
          <li>✅ Listo para compartir</li>
        </ul>

        <div class="alert alert-success">
          <strong>🎉 ¡Felicitaciones!</strong> Has completado el viaje de Zero a Héroe. La diferencia entre un script y un juego es la experiencia del usuario. Un menú claro, múltiples modos y un ejecutable simple transforman el código en un producto final.
        </div>

        <h3>🚀 Próximos pasos</h3>
        <ul>
          <li>Añade más modos de juego personalizados</li>
          <li>Implementa un sistema de puntuaciones</li>
          <li>Agrega efectos visuales y partículas</li>
          <li>Crea niveles con dificultad progresiva</li>
          <li>Comparte tu juego con amigos y familia</li>
        </ul>

        <h3>📦 Distribución del juego</h3>
        <p>Para compartir tu juego con otros que no tengan Python instalado:</p>
        <div class="code-block"># Instalar PyInstaller
pip install pyinstaller

# Crear ejecutable
pyinstaller --onefile --windowed --add-data "modos;modos" --add-data "assets;assets" --icon=icono.ico menu.py

# El ejecutable estará en la carpeta dist/</div>

        <div class="alert alert-info">
          <strong>💡 Tip Final:</strong> No se trata solo de crear un shooter. Se trata de desarrollar la lógica, la persistencia y el pensamiento computacional para construir cualquier mundo que puedas imaginar.
        </div>
      `
    }
  ]
};