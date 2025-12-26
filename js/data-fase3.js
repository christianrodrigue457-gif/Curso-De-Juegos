// js/data-fase3.js
export default {
  titulo: "🧠 Fase 3: IA Táctica de Enemigos",
  descripcion: "De perseguidores simples a soldados tácticos. Aprende a programar enemigos que patrullan, te detectan solo si estás en su campo de visión y buscan cobertura al ser atacados.",
  
  lecciones: [
    {
      titulo: "IA Avanzada: Patrullaje, Detección y Cobertura",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Crear enemigos inteligentes que patrullan áreas, te detectan si estás en su campo de visión y buscan cobertura al ser atacados.</p>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page8_img1.png" alt="La IA Despierta: De Perseguidores a Soldados Tácticos" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>🧠 Estados de la IA</h3>
        <p>Los enemigos tendrán 3 comportamientos diferentes según la situación:</p>
        <ul>
          <li><strong>🚶 PATRULLANDO:</strong> Sigue una ruta predefinida, vigilando el entorno</li>
          <li><strong>👁️ PERSIGUIENDO:</strong> Te detecta y te persigue activamente</li>
          <li><strong>🛡️ CUBRIÉNDOSE:</strong> Se esconde detrás del obstáculo más cercano cuando pierde contacto visual</li>
        </ul>

        <div class="alert alert-info">
          <strong>💡 Máquina de Estados:</strong> Es un patrón de programación donde un objeto 
          cambia su comportamiento según su "estado" actual. Es la base de la IA en videojuegos profesionales.
        </div>

        <h3>📁 Archivo: <code>ia_tactica.py</code></h3>

        <h3>🔧 Paso 1: Crear enemigos con rutas de patrulla</h3>
        <div class="code-block"># Clase Enemigo Táctico
class EnemigoTactico(Entity):
    def __init__(self, waypoints):
        super().__init__(
            model='cube',
            color=color.orange,
            scale=(1, 2, 1),
            collider='box'
        )
        self.waypoints = waypoints  # Puntos de patrulla
        self.current_waypoint = 0   # Punto actual
        self.speed = 2.0
        self.state = "patrullando"  # Estado inicial
        self.detection_range = 20   # Rango de detección
        self.vision_angle = 90      # Ángulo de visión (grados)
        self.cover_position = None
        self.health = 100
        self.last_shot = 0
        self.shoot_cooldown = 1.5</div>

        <h3>👁️ Paso 2: Sistema de visión realista</h3>
        <p>Los enemigos solo te ven si estás dentro de su campo de visión (como en la vida real):</p>
        <div class="code-block">def can_see_player(self):
    # Calcular ángulo de visión
    direction_to_player = (player.position - self.position).normalized()
    angle = math.degrees(math.acos(max(-1, min(1, direction_to_player.dot(self.forward)))))
    
    # ¿Está dentro del ángulo de visión?
    if angle > self.vision_angle / 2:
        return False
    
    # ¿Está dentro del rango?
    if distance(self.position, player.position) > self.detection_range:
        return False
    
    # Raycast para verificar línea de visión (¿hay obstáculos?)
    hit_info = raycast(
        origin=self.position + Vec3(0, 1.5, 0),
        direction=direction_to_player,
        distance=distance(self.position, player.position),
        ignore=[self, ground, player]
    )
    
    return not hit_info.hit  # True si no hay obstáculos</div>

        <div class="alert alert-success">
          <strong>🎯 Concepto clave:</strong> Usamos <code>raycast</code> para simular "línea de visión". 
          Si hay un muro entre el enemigo y tú, no puede verte aunque estés cerca.
        </div>

        <h3>🛡️ Paso 3: Sistema de cobertura</h3>
        <p>Cuando el enemigo te pierde de vista, busca el obstáculo más cercano para protegerse:</p>
        <div class="code-block">def find_cover(self):
    # Encontrar el obstáculo más cercano
    closest_obstacle = None
    min_distance = float('inf')
    
    for obstacle in obstaculos:
        dist = distance(self.position, obstacle.position)
        if dist < min_distance and dist < 15:
            min_distance = dist
            closest_obstacle = obstacle
    
    if closest_obstacle:
        # Calcular posición de cobertura (lado opuesto al jugador)
        direction_from_player = (closest_obstacle.position - player.position).normalized()
        self.cover_position = closest_obstacle.position + direction_from_player * 3</div>

        <h3>🔄 Paso 4: Lógica de cambio de estados</h3>
        <div class="code-block">def update(self):
    if self.state == "patrullando":
        # Seguir ruta de patrulla
        target = Vec3(self.waypoints[self.current_waypoint][0], 1, 
                     self.waypoints[self.current_waypoint][1])
        if distance(self.position, target) < 2:
            self.current_waypoint = (self.current_waypoint + 1) % len(self.waypoints)
        else:
            self.look_at(target)
            self.position += self.forward * self.speed * time.dt
        
        # Verificar si ve al jugador
        if self.can_see_player():
            self.state = "persiguiendo"
            
    elif self.state == "persiguiendo":
        # Perseguir al jugador
        self.look_at(player.position)
        self.position += self.forward * self.speed * time.dt
        
        # Disparar si tiene línea de visión
        if self.can_see_player() and time.time() - self.last_shot > self.shoot_cooldown:
            self.last_shot = time.time()
            # Aquí iría la lógica de disparo
            
        # Si pierde de vista al jugador, busca cobertura
        if not self.can_see_player():
            self.find_cover()
            self.state = "cubriendose"
            
    elif self.state == "cubriendose":
        # Moverse a la posición de cobertura
        if self.cover_position:
            if distance(self.position, self.cover_position) > 1:
                direction = (self.cover_position - self.position).normalized()
                self.position += direction * self.speed * time.dt
            else:
                # Desde cobertura, verificar si puede ver al jugador
                if self.can_see_player():
                    self.state = "persiguiendo"
    
    self.y = 1  # Mantener en el suelo</div>

        <h3>📄 Código completo de IA táctica</h3>
        <div class="code-block">from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random
import math

app = Ursina()

# Escenario
ground = Entity(model='plane', scale=80, texture='grass', collider='mesh')

# Obstáculos para cobertura
obstaculos = []
for i in range(15):
    x = random.uniform(-30, 30)
    z = random.uniform(-30, 30)
    caja = Entity(
        model='cube',
        color=color.dark_gray,
        scale=(2.5, 3, 2.5),
        position=(x, 1.5, z),
        collider='box'
    )
    obstaculos.append(caja)

# Clase Enemigo Táctico
class EnemigoTactico(Entity):
    def __init__(self, waypoints):
        super().__init__(
            model='cube',
            color=color.orange,
            scale=(1, 2, 1),
            collider='box'
        )
        self.waypoints = waypoints
        self.current_waypoint = 0
        self.speed = 2.0
        self.state = "patrullando"
        self.detection_range = 20
        self.vision_angle = 90
        self.cover_position = None
        self.health = 100
        self.last_shot = 0
        self.shoot_cooldown = 1.5
        
    def can_see_player(self):
        # Calcular ángulo de visión
        direction_to_player = (player.position - self.position).normalized()
        angle = math.degrees(math.acos(max(-1, min(1, direction_to_player.dot(self.forward)))))
        
        if angle > self.vision_angle / 2:
            return False
            
        if distance(self.position, player.position) > self.detection_range:
            return False
            
        # Raycast para verificar línea de visión
        hit_info = raycast(
            origin=self.position + Vec3(0, 1.5, 0),
            direction=direction_to_player,
            distance=distance(self.position, player.position),
            ignore=[self, ground, player]
        )
        
        return not hit_info.hit
    
    def find_cover(self):
        # Encontrar el obstáculo más cercano
        closest_obstacle = None
        min_distance = float('inf')
        
        for obstacle in obstaculos:
            dist = distance(self.position, obstacle.position)
            if dist < min_distance and dist < 15:
                min_distance = dist
                closest_obstacle = obstacle
        
        if closest_obstacle:
            # Calcular posición de cobertura (lado opuesto al jugador)
            direction_from_player = (closest_obstacle.position - player.position).normalized()
            self.cover_position = closest_obstacle.position + direction_from_player * 3
    
    def update(self):
        if self.state == "patrullando":
            # Seguir ruta de patrulla
            target = Vec3(self.waypoints[self.current_waypoint][0], 1, 
                         self.waypoints[self.current_waypoint][1])
            if distance(self.position, target) < 2:
                self.current_waypoint = (self.current_waypoint + 1) % len(self.waypoints)
            else:
                self.look_at(target)
                self.position += self.forward * self.speed * time.dt
            
            # Verificar si ve al jugador
            if self.can_see_player():
                self.state = "persiguiendo"
                
        elif self.state == "persiguiendo":
            # Perseguir al jugador
            self.look_at(player.position)
            self.position += self.forward * self.speed * time.dt
            
            # Disparar si tiene línea de visión
            if self.can_see_player() and time.time() - self.last_shot > self.shoot_cooldown:
                self.last_shot = time.time()
                
            # Si pierde de vista al jugador, busca cobertura
            if not self.can_see_player():
                self.find_cover()
                self.state = "cubriendose"
                
        elif self.state == "cubriendose":
            # Moverse a la posición de cobertura
            if self.cover_position:
                if distance(self.position, self.cover_position) > 1:
                    direction = (self.cover_position - self.position).normalized()
                    self.position += direction * self.speed * time.dt
                else:
                    # Desde cobertura, verificar si puede ver al jugador
                    if self.can_see_player():
                        self.state = "persiguiendo"
        
        self.y = 1

# Crear enemigos con rutas de patrulla
enemigos = []
rutas = [
    [(-20, -20), (-20, 20), (20, 20), (20, -20)],
    [(-30, 0), (0, 30), (30, 0), (0, -30)],
    [(-15, -15), (15, -15), (15, 15), (-15, 15)]
]

for ruta in rutas:
    enemigos.append(EnemigoTactico(ruta))

# Jugador
player = FirstPersonController(speed=6)

# Sistema de disparo
def input(key):
    if key == 'left mouse down':
        hit_info = raycast(
            origin=player.position + Vec3(0, 1.6, 0),
            direction=player.forward,
            distance=50,
            ignore=[player, ground] + obstaculos
        )
        
        if hit_info.hit:
            for enemigo in enemigos[:]:
                if hit_info.entity == enemigo:
                    enemigo.health -= 25
                    if enemigo.health <= 0:
                        destroy(enemigo)
                        enemigos.remove(enemigo)
                    break

# Interfaz
info = Text(text='Enemigos restantes: 3', origin=(-0.5, 0.5), scale=2)

def update():
    info.text = f'Enemigos restantes: {len(enemigos)}'
    
    if len(enemigos) == 0:
        Text(text='¡MISIÓN CUMPLIDA!', origin=(0, 0), scale=3, color=color.green)

app.run()</div>

        <h3>🎮 Cómo jugar</h3>
        <ul>
          <li><kbd>WASD</kbd>: Moverte</li>
          <li><kbd>Mouse</kbd>: Apuntar</li>
          <li><kbd>Clic izquierdo</kbd>: Disparar (25 daño por impacto)</li>
          <li>Los enemigos te persiguen <strong>solo si te ven</strong></li>
          <li>Se esconden detrás de obstáculos cuando pierden línea de visión</li>
        </ul>

        <div class="alert alert-success">
          <strong>🎉 ¡Increíble!</strong> Has programado IA táctica comparable a juegos AAA. 
          Esta es la misma lógica que usan enemigos en Call of Duty, The Last of Us y PUBG.
        </div>

        <h3>🔍 Conceptos avanzados</h3>
        <ul>
          <li><strong>Raycast para visión:</strong> Simula línea de visión real, detectando obstáculos</li>
          <li><strong>Máquina de estados:</strong> Cambia entre patrullar, perseguir y cubrirse</li>
          <li><strong>Pathfinding básico:</strong> Calcula rutas de cobertura</li>
          <li><strong>Dot product:</strong> Matemática vectorial para calcular ángulos</li>
          <li><strong>Vision cone:</strong> Campo de visión limitado (90 grados)</li>
        </ul>

        <h3>📊 Comparación de comportamientos</h3>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #667eea; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd;">Tipo de IA</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Dificultad</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Realismo</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Perseguidor Simple</strong><br>(Fase 2)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Fácil - Te ve siempre</td>
            <td style="padding: 10px; border: 1px solid #ddd;">⭐⭐</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>IA Táctica</strong><br>(Fase 3)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Medio - Detección realista</td>
            <td style="padding: 10px; border: 1px solid #ddd;">⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>IA Profesional</strong><br>(Juegos AAA)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Difícil - Comunicación en equipo</td>
            <td style="padding: 10px; border: 1px solid #ddd;">⭐⭐⭐⭐⭐</td>
          </tr>
        </table>

        <h3>🎯 Desafíos avanzados</h3>
        <ul>
          <li>Añade diferentes rutas de patrulla para cada enemigo</li>
          <li>Haz que los enemigos disparen cuando te detectan</li>
          <li>Añade "alerta" - si un enemigo te ve, alerta a los demás</li>
          <li>Implementa "última posición conocida" - van donde te vieron por última vez</li>
          <li>Añade sonido de pasos - los enemigos te detectan si haces ruido</li>
          <li>Crea enemigos "francotiradores" que se quedan en cobertura</li>
        </ul>

        <h3>💡 Mejora profesional: Comunicación entre enemigos</h3>
        <div class="code-block"># Al detectar al jugador, alertar a enemigos cercanos
def alert_nearby_enemies(self):
    for enemigo in enemigos:
        if enemigo != self and distance(self.position, enemigo.position) < 15:
            enemigo.state = "persiguiendo"
            enemigo.alert_position = player.position</div>

        <div class="alert alert-warning">
          <strong>⚠️ Nota:</strong> Esta IA es la base para juegos tácticos. 
          En la siguiente fase, añadirás sistemas de armas realistas con munición y recarga.
        </div>
      `
    }
  ]
};