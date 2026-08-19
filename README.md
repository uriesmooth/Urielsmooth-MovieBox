# Urielsmooth-MovieBox
# 🎬 Urielsmooth-moviebox

**Urielsmooth-moviebox** is a high-performance, GPU-accelerated multimedia toolkit platform inspired by modern media extraction workflows. It enables users to seamlessly download, merge, convert, and trim online audio and video streams using a responsive web interface backed by a containerized Node.js, Python (`yt-dlp`), and FFmpeg stack.

---

## 🚀 Key Features

* **GPU-Accelerated Transcoding:** Leverages NVIDIA CUDA (`h264_nvenc`) via Docker container passthrough for rapid video rendering and trimming.
* **Dual-Engine Pipeline:** Combines the stream extraction speed of `yt-dlp` with the deep manipulation power of `FFmpeg`.
* **Flexible Action Toolkit:** Supports full stream merging (Video + Audio), custom segment trimming with precise timestamps, and audio extraction (`.mp3`).
* **Modern UI:** Built with **React** and **Tailwind CSS** inside a sleek dark-mode dashboard.
* **Fully Containerized:** Zero local dependency setup nightmares—runs out of the box via Docker Compose.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Core Processing:** Python (`yt-dlp`), FFmpeg with NVIDIA NVENC support
* **Infrastructure:** Docker, Docker Compose, NVIDIA Container Toolkit

---

## 📂 Project Structure

```text
Urielsmooth-moviebox/
├── docker-compose.yml        # Multi-container orchestration (GPU passthrough)
├── backend/                  # Node.js backend & media processing script
│   ├── Dockerfile            # CUDA-enabled runtime environment
│   ├── package.json
│   └── src/
│       └── index.js          # Express server & execution wrapper
└── frontend/                 # React dashboard interface
    ├── Dockerfile (or local)
    ├── package.json
    └── src/
        ├── App.js            # Main dashboard UI
        └── index.js
