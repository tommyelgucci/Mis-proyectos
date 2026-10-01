FROM python:3.12-slim

# HF Spaces ejecuta el contenedor como uid 1000
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

RUN pip install --no-cache-dir --user fastapi "uvicorn[standard]" huggingface_hub

COPY --chown=user server.py alodeutsch.html index.html l11-quick-review.js ALOdeutsch_TELC_B1_Trainer.html ./

EXPOSE 7860
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "7860"]
