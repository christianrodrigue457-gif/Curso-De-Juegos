// js/data-fase4.js
export default {
  titulo: "🔫 Fase 4: Sistema de Armas Realista",
  lecciones: [
    {
      titulo: "Arsenal Completo: Pistola y Fusil con Munición",
      contenido: `
        <h3>🎯 Objetivo</h3>
        <p>Implementar un sistema de armas completo con munición limitada, recarga y diferentes características.</p>

        <h3>🔧 Características del sistema</h3>
        <ul>
          <li>✅ Dos armas: Pistola (alto daño, poca munición) y Fusil (bajo daño, mucha munición)</li>
          <li>✅ Munición limitada (cargador + reserva)</li>
          <li>✅ Recarga con tecla R</li>
          <li>✅ Cambio de armas con teclas 1 y 2</li>
          <li>✅ Retroceso visual</li>
        </ul>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page9_img1.png" alt="Sistema de Armas - Pistola y Fusil" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>📁 Archivo: <code>arsenal_completo.py</code></h3>

        <h3>🔧 Paso 1: Configurar armas</h3>
        <div class="code-block">armas = {
    1: {
        'nombre': 'Pistola',
        'daño': 30,
        'municion_cargador': 8,
        'municion_reserva': 24,
        'cadencia': 0.5,
        'recarga_tiempo': 1.5,
        'color': color.yellow
    },
    2: {
        'nombre': 'Fusil',
        'daño': 20,
        'municion_cargador': 30,
        'municion_reserva': 60,
        'cadencia': 0.1,
        'recarga_tiempo': 2.5,
        'color': color.orange
    }
}</div>

        <h3>🔧 Paso 2: Sistema de recarga</h3>
        <div class="code-block">def recargar():
    global recargando, tiempo_recarga, municion_actual, municion_reserva
    
    if recargando or municion_actual == armas[arma_actual]['municion_cargador']:
        return
    
    if municion_reserva <= 0:
        recarga_text.text = '¡Sin munición!'
        invoke(setattr, recarga_text, 'text', '', delay=1)
        return
    
    recargando = True
    tiempo_recarga = time.time()
    recarga_text.text = 'Recargando...'</div>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page10_img1.png" alt="Sistema de detección por raycast" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <h3>🔧 Paso 3: Sistema de disparo completo</h3>
        <div class="code-block">def disparar():
    global municion_actual, ultimo_disparo
    
    if recargando:
        return
    
    if municion_actual <= 0:
        recarga_text.text = '¡Sin balas! Presiona R'
        invoke(setattr, recarga_text, 'text', '', delay=1)
        return
    
    ahora = time.time()
    if ahora - ultimo_disparo < armas[arma_actual]['cadencia']:
        return
    
    # Disparar
    municion_actual -= 1
    ultimo_disparo = ahora
    
    # Efecto visual de disparo
    flash = Entity(parent=camera.ui, model='quad', color=armas[arma_actual]['color'], scale=(0.1, 0.2), position=(0.3, -0.1))
    invoke(destroy, flash, delay=0.05)
    
    # Raycast de disparo
    hit_info = raycast(
        origin=player.position + Vec3(0, 1.6, 0),
        direction=player.forward,
        distance=50,
        ignore=[player, ground]
    )
    
    if hit_info.hit:
        for enemigo in enemigos[:]:
            if hit_info.entity == enemigo:
                enemigo.health -= armas[arma_actual]['daño']
                if enemigo.health <= 0:
                    destroy(enemigo)
                    enemigos.remove(enemigo)
                break</div>

        <h3>📄 Código completo del sistema de armas</h3>
        <div class="code-block">from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random
import time

app = Ursina()

# Configuración de armas
armas = {
    1: {
        'nombre': 'Pistola',
        'daño': 30,
        'municion_cargador': 8,
        'municion_reserva': 24,
        'cadencia': 0.5,
        'recarga_tiempo': 1.5,
        'color': color.yellow
    },
    2: {
        'nombre': 'Fusil',
        'daño': 20,
        'municion_cargador': 30,
        'municion_reserva': 60,
        'cadencia': 0.1,
        'recarga_tiempo': 2.5,
        'color': color.orange
    }
}

# Variables globales
arma_actual = 1
municion_actual = armas[arma_actual]['municion_cargador']
municion_reserva = armas[arma_actual]['municion_reserva']
recargando = False
tiempo_recarga = 0
ultimo_disparo = 0

# Escenario
ground = Entity(model='plane', scale=60, texture='grass', collider='mesh')

# Obstáculos
for i in range(12):
    Entity(
        model='cube',
        color=color.dark_gray,
        scale=(2, 3, 2),
        position=(random.uniform(-25, 25), 1.5, random.uniform(-25, 25)),
        collider='box'
    )

# Enemigos
class Enemigo(Entity):
    def __init__(self, pos):
        super().__init__(
            model='cube',
            color=color.red,
            scale=(1, 2, 1),
            position=pos,
            collider='box'
        )
        self.health = 100
    
    def recibir_daño(self, daño):
        self.health -= daño
        if self.health <= 0:
            destroy(self)
            return True
        return False

enemigos = []
for i in range(5):
    enemigos.append(Enemigo((random.uniform(-20, 20), 1, random.uniform(-20, 20))))

# Jugador
player = FirstPersonController(speed=5)

# Interfaz
arma_text = Text(text='Pistola', origin=(-0.5, 0.5), scale=2, x=-0.85, y=0.45)
municion_text = Text(text='8/24', origin=(-0.5, 0.5), scale=2, x=-0.85, y=0.40)
recarga_text = Text(text='', origin=(0, 0), scale=2, color=color.yellow)

# Función de recarga
def recargar():
    global recargando, tiempo_recarga, municion_actual, municion_reserva
    
    if recargando or municion_actual == armas[arma_actual]['municion_cargador']:
        return
    
    if municion_reserva <= 0:
        recarga_text.text = '¡Sin munición!'
        invoke(setattr, recarga_text, 'text', '', delay=1)
        return
    
    recargando = True
    tiempo_recarga = time.time()
    recarga_text.text = 'Recargando...'

# Función de disparo completa
def disparar():
    global municion_actual, ultimo_disparo
    
    if recargando:
        return
    
    if municion_actual <= 0:
        recarga_text.text = '¡Sin balas! Presiona R'
        invoke(setattr, recarga_text, 'text', '', delay=1)
        return
    
    ahora = time.time()
    if ahora - ultimo_disparo < armas[arma_actual]['cadencia']:
        return
    
    # Disparar
    municion_actual -= 1
    ultimo_disparo = ahora
    
    # Efecto visual de disparo
    flash = Entity(parent=camera.ui, model='quad', color=armas[arma_actual]['color'], scale=(0.1, 0.2), position=(0.3, -0.1))
    invoke(destroy, flash, delay=0.05)
    
    # Raycast de disparo
    hit_info = raycast(
        origin=player.position + Vec3(0, 1.6, 0),
        direction=player.forward,
        distance=50,
        ignore=[player, ground]
    )
    
    if hit_info.hit:
        for enemigo in enemigos[:]:
            if hit_info.entity == enemigo:
                enemigo.health -= armas[arma_actual]['daño']
                if enemigo.health <= 0:
                    destroy(enemigo)
                    enemigos.remove(enemigo)
                break

# Cambiar de arma
def cambiar_arma(nueva_arma):
    global arma_actual, municion_actual, municion_reserva, recargando
    
    if recargando:
        return
    
    arma_actual = nueva_arma
    municion_actual = armas[arma_actual]['municion_cargador']
    municion_reserva = armas[arma_actual]['municion_reserva']
    arma_text.text = armas[arma_actual]['nombre']
    recargando = False

# Controles
def input(key):
    if key == 'left mouse down':
        disparar()
    elif key == 'r':
        recargar()
    elif key == '1':
        cambiar_arma(1)
    elif key == '2':
        cambiar_arma(2)

# Actualización
def update():
    global municion_actual, municion_reserva, recargando
    
    # Procesar recarga
    if recargando and time.time() - tiempo_recarga >= armas[arma_actual]['recarga_tiempo']:
        # Calcular cuánta munición recargar
        espacio = armas[arma_actual]['municion_cargador'] - municion_actual
        carga = min(espacio, municion_reserva)
        
        municion_actual += carga
        municion_reserva -= carga
        recargando = False
        recarga_text.text = ''
    
    # Actualizar HUD
    municion_text.text = f'{municion_actual}/{municion_reserva}'
    
    # Mostrar estado de recarga
    if recargando:
        recarga_text.text = 'Recargando...'

# Iniciar
print("ARSENAL TÁCTICO ACTIVADO")
print("1: Pistola | 2: Fusil | R: Recargar")
app.run()</div>

        <h3>📊 Estadísticas de armas</h3>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f0f0f0;">
            <th style="padding: 10px; border: 1px solid #ddd;">Arma</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Daño</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Munición</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Cadencia</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Pistola</td>
            <td style="padding: 10px; border: 1px solid #ddd;">30</td>
            <td style="padding: 10px; border: 1px solid #ddd;">8/24</td>
            <td style="padding: 10px; border: 1px solid #ddd;">0.5s</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Fusil</td>
            <td style="padding: 10px; border: 1px solid #ddd;">20</td>
            <td style="padding: 10px; border: 1px solid #ddd;">30/60</td>
            <td style="padding: 10px; border: 1px solid #ddd;">0.1s</td>
          </tr>
        </table>

        <img src="assets/imagenes/Zero_to_Hero_Python_Games_page12_img1.png" alt="Sistema de armas completo en acción" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 20px 0;">

        <div class="alert alert-success">
          <strong>🎯 ¡Perfecto!</strong> Ahora tienes un sistema de armas realista con munición, recarga y cambio de armas. El comportamiento del combate no se programa, se diseña con variables simples.
        </div>
      `
    }
  ]
};