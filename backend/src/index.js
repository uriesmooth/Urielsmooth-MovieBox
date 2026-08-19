const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const downloadsDir = path.join(__dirname, '../downloads');

if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

app.post('/api/process', async (req, res) => {
    const { url, action, format, startTime, duration } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const outputFileName = `smooth_${Date.now()}.${format === 'mp3' ? 'mp3' : (format || 'mp4')}`;
    const outputPath = path.join(downloadsDir, outputFileName);

    let command = '';

    // GPU-accelerated handling via NVIDIA hardware encoder (h264_nvenc)
    if (action === 'download') {
        if (format === 'mp3') {
            command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;
        } else {
            command = `yt-dlp -f "bv*+ba/b" --merge-output-format ${format || 'mp4'} "${url}" -o "${outputPath}"`;
        }
    } else if (action === 'trim') {
        command = `yt-dlp -f "bv*+ba/b" -o - "${url}" \vert{} ffmpeg -y -i pipe:0 -ss ${startTime || 0} -t ${duration \vert{}\vert{} 10} -c:v h264_nvenc -preset fast -c:a aac "${outputPath}"`;
    } else {
        return res.status(400).json({ error: 'Invalid action specified' });
    }

    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to process media stream using GPU pipeline.' });
        }

        res.json({
            success: true,
            message: 'Media processed successfully with GPU acceleration',
            downloadUrl: `/downloads/${outputFileName}`
        });
    });
});

app.use('/downloads', express.static(downloadsDir));

app.listen(PORT, () => {
    console.log(`Smooth-Moviebox Engine running on port ${PORT}`);
});
