---
title: BrainBit
emoji: 🧠
colorFrom: red
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# 🧠 BrainBit — ICT Study Suite

Plataforma unificada de estudio para un examen de aptitud ICT suizo
(Informatiker/in EFZ Applikationsentwicklung): 6 categorías de entrenamiento,
tutor de IA y sincronización de progreso en la nube.

Este Space corre el backend Express de BrainBit, que sirve el frontend React
compilado y proxya las llamadas al tutor de IA a través de Hugging Face
Inference (así el token nunca se expone en el navegador).

Configuración: `Settings → Variables and secrets` de este Space.
- `HF_API_KEY` (secret, opcional): activa el tutor y el Sprint IA.
- `HF_MODEL` (variable, opcional): modelo instruct, por defecto
  `Qwen/Qwen2.5-7B-Instruct`.

El progreso de estudio y la cuenta de usuario usan Supabase directamente desde
el navegador (claves públicas ya incluidas en el build del frontend).
