// js/data-fase2.js
export default {
  titulo: "🚀 Fase 2: Juegos en 3D con Ursina",
  descripcion: "Da el salto de 2D a 3D. Ursina es una librería gratuita sobre Python que simplifica radicalmente la creación de juegos 3D. Lo que requería cálculos complejos en 2D se resuelve con una sola línea en 3D.",
  
  lecciones: [
    {
      titulo: "Instalación de Ursina Engine",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Instalar y configurar Ursina para crear juegos 3D con Python.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page6_img1.png" alt="El Salto a 3D: Menos Código, Más Inmersión con Ursina" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <div class="alert alert-info">
          <strong>🎮 ¿Por qué Ursina?</strong> Ursina simplifica la creación de juegos 3D. 
          Lo que requería cálculos complejos en PyGame (rotaciones, cámara 3D, colisiones) 
          se resuelve con una sola línea en Ursina.
        </div>

        <h3>🔧 Paso 1: Instalar Ursina</h3>
        <p>Abre CMD y ejecuta:</p>
        <div class="code-block">pip install ursina</div>
        <p>⏱️ La instalación puede tardar 2-3 minutos.</p>

        <h3>✅ Verificación</h3>
        <p>Para comprobar que se instaló correctamente, ejecuta:</p>
        <div class="code-block">python -c "import ursina; print('Ursina instalado correctamente')"</div>

        <p>Si ves el mensaje <code>"Ursina instalado correctamente"</code>, ¡estás listo!</p>

        <h3>🎮 Paso 2: Tu primer mundo 3D</h3>
        <p>Crea un archivo <code>mi_mundo_3d.py</code> con este código:</p>
        <div class="code-block">from ursina import *

app = Ursina()

# Crear el suelo
ground = Entity(
    model='plane',
    scale=50,
    texture='grass',
    collider='mesh'
)

# Jugador en primera persona
from ursina.prefabs.first_person_controller import FirstPersonController
player = FirstPersonController()

app.run()</div>

        <h3>🎮 Controles</h3>
        <ul>
          <li><kbd>WASD</kbd>: Moverse</li>
          <li><kbd>Mouse</kbd>: Mirar alrededor</li>
          <li><kbd>Espacio</kbd>: Saltar</li>
          <li><kbd>ESC</kbd>: Salir</li>
        </ul>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page7_img1.png" alt="Perspectiva en Primera Persona" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <div class="alert alert-success">
          <strong>🎉 ¡Increíble!</strong> Con solo 12 líneas de código has creado un mundo 3D navegable. 
          Esto en PyGame requeriría cientos de líneas y conocimientos avanzados de matemáticas 3D.
        </div>

        <h3>🔍 Comparación: PyGame vs Ursina</h3>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #667eea; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd;">Tarea</th>
            <th style="padding: 10px; border: 1px solid #ddd;">PyGame (2D)</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Ursina (3D)</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Rotar jugador</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Cálculos trigonométricos complejos</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>player.rotation_y = 45</code></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Control 3D</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">No soportado nativamente</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>FirstPersonController()</code></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Colisiones</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Manual con distancias</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>collider='box'</code></td>
          </tr>
        </table>

        <h3>🎯 Conceptos básicos de Ursina</h3>
        <ul>
          <li><strong>Entity:</strong> Todo en Ursina es una Entity (jugador, enemigo, suelo, obstáculo)</li>
          <li><strong>model:</strong> La forma del objeto ('cube', 'sphere', 'plane', 'cylinder')</li>
          <li><strong>scale:</strong> El tamaño del objeto</li>
          <li><strong>position:</strong> Dónde está en el mundo (x, y, z)</li>
          <li><strong>color:</strong> El color del objeto</li>
          <li><strong>collider:</strong> Para detectar colisiones ('box', 'sphere', 'mesh')</li>
        </ul>

        <h3>🔧 Añadir obstáculos al mundo</h3>
        <p>Añade este código antes de <code>app.run()</code>:</p>
        <div class="code-block"># Crear algunos cubos
for i in range(10):
    Entity(
        model='cube',
        color=color.gray,
        scale=(2, 2, 2),
        position=(i*3, 1, 5),
        collider='box'
    )</div>

        <div class="alert alert-info">
          <strong>💡 Tip:</strong> Experimenta cambiando los valores de <code>position</code>, 
          <code>scale</code> y <code>color</code> para ver cómo afectan al mundo.
        </div>

        <h3>🎯 Desafíos de práctica</h3>
        <ul>
          <li>Crea una torre de 5 cubos apilados</li>
          <li>Añade esferas de diferentes colores</li>
          <li>Crea un laberinto simple con cubos</li>
          <li>Cambia la textura del suelo a 'brick'</li>
          <li>Añade un cielo con <code>Sky()</code></li>
        </ul>
      `
    },
    {
      titulo: "Shooter 3D: Disparos y Enemigos",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear un shooter 3D básico con enemigos que te persiguen y un sistema de disparo usando raycast.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page7_img1.png" alt="Shooter 3D con enemigos" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <div class="alert alert-info">
          <strong>🎯 Raycast:</strong> Es como lanzar un rayo invisible desde la cámara. 
          Si toca algo, sabemos qué objeto fue. Perfecto para disparos instantáneos.
        </div>

        <h3>📁 Archivo: <code>shooter_3d.py</code></h3>

        <h3>🔧 Paso 1: Crear el escenario</h3>
        <div class="code-block">from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random

app = Ursina()

# Suelo
ground = Entity(
    model='plane', 
    scale=50, 
    texture='grass', 
    collider='mesh'
)

# Obstáculos
for i in range(10):
    Entity(
        model='cube',
        color=color.gray,
        scale=(2, 2, 2),
        position=(random.randint(-20, 20), 1, random.randint(-20, 20)),
        collider='box'
    )</div>

        <h3>🔧 Paso 2: Crear enemigos que persiguen</h3>
        <div class="code-block"># Lista de enemigos
enemigos = []

class Enemigo(Entity):
    def __init__(self, position):
        super().__init__(
            model='cube',
            color=color.red,
            scale=(1, 2, 1),
            position=position,
            collider='box'
        )
        self.velocidad = 1.5

    def update(self):
        # Perseguir al jugador si está cerca
        if distance(self.position, player.position) < 20:
            self.look_at(player.position)
            self.position += self.forward * self.velocidad * time.dt
        self.y = 1  # Mantener en el suelo

# Crear enemigos
for i in range(5):
    enemigos.append(
        Enemigo(
            position=(random.uniform(-15, 15), 1, random.uniform(-15, 15))
        )
    )</div>

        <h3>🔧 Paso 3: Sistema de disparo</h3>
        <div class="code-block"># Jugador
player = FirstPersonController(speed=5)

# Sistema de disparo
def input(key):
    if key == 'left mouse down':
        # Disparar un rayo desde la cámara
        hit_info = raycast(
            origin=player.position,
            direction=player.forward,
            distance=30,
            ignore=[player, ground]
        )
        if hit_info.hit:
            # Si tocó un enemigo, destruirlo
            for enemigo in enemigos[:]:
                if hit_info.entity == enemigo:
                    destroy(enemigo)
                    enemigos.remove(enemigo)
                    break</div>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page10_img1.png" alt="Sistema de detección por raycast" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📄 Código completo</h3>
        <div class="code-block">from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random

app = Ursina()

# Escenario
ground = Entity(model='plane', scale=50, texture='grass', collider='mesh')

# Obstáculos
for i in range(10):
    Entity(
        model='cube',
        color=color.gray,
        scale=(2, 2, 2),
        position=(random.randint(-20, 20), 1, random.randint(-20, 20)),
        collider='box'
    )

# Lista de enemigos
enemigos = []

class Enemigo(Entity):
    def __init__(self, position):
        super().__init__(
            model='cube',
            color=color.red,
            scale=(1, 2, 1),
            position=position,
            collider='box'
        )
        self.velocidad = 1.5

    def update(self):
        # Perseguir al jugador si está cerca
        if distance(self.position, player.position) < 20:
            self.look_at(player.position)
            self.position += self.forward * self.velocidad * time.dt
        self.y = 1  # Mantener en el suelo

# Crear enemigos
for i in range(5):
    enemigos.append(
        Enemigo(
            position=(random.uniform(-15, 15), 1, random.uniform(-15, 15))
        )
    )

# Jugador
player = FirstPersonController(speed=5)

# Sistema de disparo
def input(key):
    if key == 'left mouse down':
        # Disparar un rayo desde la cámara
        hit_info = raycast(
            origin=player.position,
            direction=player.forward,
            distance=30,
            ignore=[player, ground]
        )
        if hit_info.hit:
            # Si tocó un enemigo, destruirlo
            for enemigo in enemigos[:]:
                if hit_info.entity == enemigo:
                    destroy(enemigo)
                    enemigos.remove(enemigo)
                    break

# Interfaz
text = Text(text='Enemigos restantes: 5', origin=(-0.5, 0.5), scale=2)

def update():
    text.text = f'Enemigos restantes: {len(enemigos)}'
    if len(enemigos) == 0:
        text.text = '¡MISIÓN CUMPLIDA! Presiona R para reiniciar'
        if held_keys['r']:
            # Reiniciar enemigos
            global enemigos
            for e in scene.entities:
                if isinstance(e, Enemigo):
                    destroy(e)
            enemigos = []
            for i in range(5):
                enemigos.append(
                    Enemigo(
                        position=(random.uniform(-15, 15), 1, random.uniform(-15, 15))
                    )
                )

app.run()</div>

        <h3>🎮 Cómo jugar</h3>
        <ul>
          <li><kbd>WASD</kbd>: Moverte</li>
          <li><kbd>Mouse</kbd>: Apuntar</li>
          <li><kbd>Clic izquierdo</kbd>: Disparar</li>
          <li><kbd>Espacio</kbd>: Saltar</li>
          <li><kbd>R</kbd>: Reiniciar al ganar</li>
        </ul>

        <div class="alert alert-success">
          <strong>🎉 ¡Felicidades!</strong> Has creado tu primer shooter 3D. 
          Este es el fundamento de juegos como Counter-Strike, Call of Duty y DOOM.
        </div>

        <h3>🔍 Conceptos avanzados explicados</h3>
        <ul>
          <li><strong>raycast():</strong> Lanza un rayo invisible para detectar qué hay enfrente</li>
          <li><strong>hit_info.entity:</strong> El objeto que fue tocado por el rayo</li>
          <li><strong>look_at():</strong> Hace que un objeto mire hacia otro (para persecución)</li>
          <li><strong>self.forward:</strong> La dirección hacia donde mira el objeto</li>
          <li><strong>time.dt:</strong> Delta time - hace que el movimiento sea consistente en cualquier PC</li>
        </ul>

        <h3>🎯 Desafíos</h3>
        <ul>
          <li>Añade más enemigos (10-15)</li>
          <li>Crea diferentes tipos de enemigos (rápidos, lentos, grandes)</li>
          <li>Añade un sistema de puntuación</li>
          <li>Implementa diferentes armas (pistola, rifle, escopeta)</li>
          <li>Añade efectos visuales al disparar (muzzle flash)</li>
          <li>Crea un mini-mapa en la esquina</li>
          <li>Añade vida al jugador</li>
        </ul>

        <h3>💡 Tip profesional</h3>
        <p>Para hacer el juego más desafiante, haz que los enemigos sean más inteligentes:</p>
        <div class="code-block"># En el método update() del Enemigo:
if distance(self.position, player.position) < 3:
    # Si está muy cerca, ataca al jugador
    player.health -= 1 * time.dt</div>

        <div class="alert alert-warning">
          <strong>⚠️ Nota:</strong> Este código es la base. En la Fase 3 aprenderás 
          a crear IA táctica avanzada con patrullaje, detección y cobertura.
        </div>
      `
    }
  ]
};