FROM nvidia/cuda:12.0.0-runtime-ubuntu22.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install System Dependencies, Python, FFmpeg, and Node.js
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp globally
RUN pip3 install --no-cache-dir --upgrade yt-dlp

WORKDIR /app

COPY package.json ./
RUN npm install

COPY src/ ./src/
RUN mkdir -p downloads

EXPOSE 5000

CMD ["npm", "start"]
