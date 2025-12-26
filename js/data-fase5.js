// js/data-fase5.js
export default {
  titulo: "💥 Fase 5: Multijugador Local",
  lecciones: [
    {
      titulo: "Duelo 1v1 en Pantalla Dividida",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear un modo multijugador donde dos jugadores compiten en la misma computadora.</p>

        <h3>🎮 Características</h3>
        <ul>
          <li>✅ Dos jugadores en una sola pantalla</li>
          <li>✅ Controles separados</li>
          <li>✅ Cámara dinámica que sigue a ambos</li>
          <li>✅ Sistema de vidas independiente</li>
          <li>✅ Victoria al eliminar al oponente</li>
        </ul>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page12_img1.png" alt="Duelo Local - Experiencia Multijugador" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Archivo: <code>duelo_local.py</code></h3>

        <h3>🔧 Paso 1: Crear jugadores con controles separados</h3>
        <div class="code-block">class Jugador(Entity):
    def __init__(self, color_jugador, teclas, posicion):
        super().__init__(
            model='cube',
            color=color_jugador,
            scale=(1, 2, 1),
            position=posicion,
            collider='box'
        )
        self.teclas = teclas
        self.velocidad = 5
        self.vida = 100
        self.angulo = 0
        self.y = 1
    
    def update(self):
        # Movimiento
        movimiento = Vec3(0, 0, 0)
        if held_keys[self.teclas['adelante']]:
            movimiento.z -= 1
        if held_keys[self.teclas['atras']]:
            movimiento.z += 1
        if held_keys[self.teclas['izq']]:
            movimiento.x -= 1
        if held_keys[self.teclas['der']]:
            movimiento.x += 1
            
        if movimiento.length() > 0:
            movimiento = movimiento.normalized() * self.velocidad * time.dt
            self.position += movimiento
            
        # Limitar al mapa
        self.x = max(-24, min(self.x, 24))
        self.z = max(-24, min(self.z, 24))
        
        # Rotación con mouse
        if self.teclas['mouse'] == 'left':
            self.angulo -= mouse.velocity[0] * 60
        else:
            self.angulo -= mouse.velocity[0] * 60
            
        self.rotation_y = self.angulo
        self.y = 1</div>

        <h3>🔧 Paso 2: Cámara dinámica que sigue a ambos jugadores</h3>
        <div class="code-block">def update_camera():
    centro = (jugador1.position + jugador2.position) / 2
    distancia = distance(jugador1.position, jugador2.position)
    camera.position = centro + Vec3(0, 5 + distancia * 0.3, -10 - distancia * 0.2)
    camera.look_at(centro)</div>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page13_img1.png" alt="Cámara dinámica y controles" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>🔧 Paso 3: Sistema de disparo con balas</h3>
        <div class="code-block"># Sistema de disparo
balas = []

def disparar(jugador, direccion):
    bala = Entity(
        model='sphere',
        color=color.yellow if jugador == jugador1 else color.red,
        scale=0.3,
        position=jugador.position + Vec3(0, 1, 0),
        collider='sphere'
    )
    bala.velocidad = direccion * 30
    bala.disparador = jugador
    balas.append(bala)

# Controles de disparo
def input(key):
    if key == 'left mouse down':
        direccion = Vec3(
            math.sin(math.radians(jugador1.angulo)),
            0,
            math.cos(math.radians(jugador1.angulo))
        )
        disparar(jugador1, direccion)
        
    if key == 'right mouse down':
        direccion = Vec3(
            math.sin(math.radians(jugador2.angulo)),
            0,
            math.cos(math.radians(jugador2.angulo))
        )
        disparar(jugador2, direccion)</div>

        <h3>📄 Código completo del duelo local</h3>
        <div class="code-block">from ursina import *
import math
import random

app = Ursina()

# Configuración
window.title = "Duelo Local - Fase 5"
window.fps_counter.enabled = False

# Escenario
ground = Entity(model='plane', scale=50, texture='grass', collider='mesh')

# Obstáculos
for i in range(10):
    Entity(
        model='cube',
        color=color.dark_gray,
        scale=(2, 3, 2),
        position=(random.uniform(-20, 20), 1.5, random.uniform(-20, 20)),
        collider='box'
    )

# Clase Jugador
class Jugador(Entity):
    def __init__(self, color_jugador, teclas, posicion):
        super().__init__(
            model='cube',
            color=color_jugador,
            scale=(1, 2, 1),
            position=posicion,
            collider='box'
        )
        self.teclas = teclas
        self.velocidad = 5
        self.vida = 100
        self.angulo = 0
        self.y = 1
    
    def update(self):
        # Movimiento
        movimiento = Vec3(0, 0, 0)
        if held_keys[self.teclas['adelante']]:
            movimiento.z -= 1
        if held_keys[self.teclas['atras']]:
            movimiento.z += 1
        if held_keys[self.teclas['izq']]:
            movimiento.x -= 1
        if held_keys[self.teclas['der']]:
            movimiento.x += 1
            
        if movimiento.length() > 0:
            movimiento = movimiento.normalized() * self.velocidad * time.dt
            self.position += movimiento
            
        # Limitar al mapa
        self.x = max(-24, min(self.x, 24))
        self.z = max(-24, min(self.z, 24))
        
        # Rotación con mouse
        if self.teclas['mouse'] == 'left':
            self.angulo -= mouse.velocity[0] * 60
        else:
            self.angulo -= mouse.velocity[0] * 60
            
        self.rotation_y = self.angulo
        self.y = 1

# Crear jugadores
jugador1 = Jugador(
    color_jugador=color.azure,
    teclas={'adelante': 'w', 'atras': 's', 'izq': 'a', 'der': 'd', 'mouse': 'left'},
    posicion=(-10, 1, 0)
)

jugador2 = Jugador(
    color_jugador=color.orange,
    teclas={'adelante': 'up arrow', 'atras': 'down arrow', 'izq': 'left arrow', 'der': 'right arrow', 'mouse': 'right'},
    posicion=(10, 1, 0)
)

# Cámara dinámica
def update_camera():
    centro = (jugador1.position + jugador2.position) / 2
    distancia = distance(jugador1.position, jugador2.position)
    camera.position = centro + Vec3(0, 5 + distancia * 0.3, -10 - distancia * 0.2)
    camera.look_at(centro)

# Sistema de disparo
balas = []

def disparar(jugador, direccion):
    bala = Entity(
        model='sphere',
        color=color.yellow if jugador == jugador1 else color.red,
        scale=0.3,
        position=jugador.position + Vec3(0, 1, 0),
        collider='sphere'
    )
    bala.velocidad = direccion * 30
    bala.disparador = jugador
    balas.append(bala)

# Controles de disparo
def input(key):
    if key == 'left mouse down':
        direccion = Vec3(
            math.sin(math.radians(jugador1.angulo)),
            0,
            math.cos(math.radians(jugador1.angulo))
        )
        disparar(jugador1, direccion)
        
    if key == 'right mouse down':
        direccion = Vec3(
            math.sin(math.radians(jugador2.angulo)),
            0,
            math.cos(math.radians(jugador2.angulo))
        )
        disparar(jugador2, direccion)

# Actualización
mensaje = Text(text='', origin=(0, 0), scale=3)

def update():
    update_camera()
    
    # Actualizar jugadores
    jugador1.update()
    jugador2.update()
    
    # Mover balas
    for bala in balas[:]:
        bala.position += bala.velocidad * time.dt
        
        # Eliminar si sale del mapa
        if abs(bala.x) > 30 or abs(bala.z) > 30:
            destroy(bala)
            balas.remove(bala)
            continue
            
        # Colisión con jugadores
        if bala.disparador != jugador1 and distance(bala.position, jugador1.position) < 1.5:
            jugador1.vida -= 20
            destroy(bala)
            balas.remove(bala)
            
        elif bala.disparador != jugador2 and distance(bala.position, jugador2.position) < 1.5:
            jugador2.vida -= 20
            destroy(bala)
            balas.remove(bala)
    
    # Mostrar vidas
    Text(text=f'J1: {jugador1.vida}', origin=(0.5, 0.5), scale=2, x=0.7, y=0.45, background=True)
    Text(text=f'J2: {jugador2.vida}', origin=(0.5, 0.5), scale=2, x=-0.7, y=0.45, background=True)
    
    # Verificar victoria
    if jugador1.vida <= 0:
        mensaje.text = '¡Jugador 2 GANA!\nR: Reiniciar'
        mensaje.color = color.orange
    elif jugador2.vida <= 0:
        mensaje.text = '¡Jugador 1 GANA!\nR: Reiniciar'
        mensaje.color = color.azure
    
    # Reiniciar
    if held_keys['r'] and (jugador1.vida <= 0 or jugador2.vida <= 0):
        jugador1.vida = 100
        jugador2.vida = 100
        jugador1.position = (-10, 1, 0)
        jugador2.position = (10, 1, 0)
        mensaje.text = ''
        
        # Eliminar balas
        for bala in balas:
            destroy(bala)
        balas.clear()

# Iniciar
print("DUELO LOCAL ACTIVADO")
print("Jugador 1: WASD + Mouse izquierdo")
print("Jugador 2: Flechas + Mouse derecho")
print("¡Elimina a tu oponente!")
app.run()</div>

        <h3>🎮 Controles</h3>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f0f0f0;">
            <th style="padding: 10px; border: 1px solid #ddd;">Jugador</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Movimiento</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Disparo</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Jugador 1 (Azul)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">W, A, S, D</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Clic izquierdo</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Jugador 2 (Naranja)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Flechas</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Clic derecho</td>
          </tr>
        </table>

        <h3>🎯 Características del modo duelo</h3>
        <ul>
          <li>✅ Cámara dinámica que se ajusta automáticamente</li>
          <li>✅ Balas con colores distintos para cada jugador</li>
          <li>✅ Sistema de reinicio instantáneo</li>
          <li>✅ Compatible con mouse y teclado</li>
        </ul>

        <div class="alert alert-success">
          <strong>🎉 ¡Excelente!</strong> Implementar multijugador local enseña conceptos fundamentales sobre la gestión de múltiples entidades controladas por humanos, un pilar del diseño de juegos de consola.
        </div>

        <h3>💡 Conceptos aprendidos</h3>
        <ul>
          <li><strong>Controles independientes:</strong> Cada jugador tiene su propio conjunto de teclas</li>
          <li><strong>Cámara adaptativa:</strong> Se ajusta según la distancia entre jugadores</li>
          <li><strong>Sistema de colisiones:</strong> Detecta impactos de balas en tiempo real</li>
          <li><strong>Gestión de estado:</strong> Victoria, derrota y reinicio del juego</li>
        </ul>
      `
    }
  ]
};