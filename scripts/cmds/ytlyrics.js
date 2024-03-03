const ytdl = require('ytdl-core');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  config: {
    name: "ytlyrics",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const youtubeUrl = args[0] || ''; // Mengambil URL YouTube dari argumen

      const videoId = ytdl.getURLVideoID(youtubeUrl); // Mendapatkan video ID dari URL YouTube

      // Mengambil halaman HTML video YouTube
      const response = await axios.get(youtubeUrl);
      const $ = cheerio.load(response.data);

      // Mengambil judul video dari halaman HTML dengan menggunakan selector yang tepat
      const videoTitle = $('title').text().split(' - YouTube')[0].trim();

      // Mendapatkan link audio dari video YouTube
      const audioUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Menggunakan ytdl untuk mendownload audio dari video YouTube
      const audioStream = ytdl(audioUrl, { filter: 'audioonly' });

      // Inisialisasi variabel untuk menyimpan teks lirik
      let lyrics = '';

      // Event saat data audio telah tersedia
      audioStream.on('info', (info) => {
        console.log(`Downloading audio: ${info.title}...`);
      });

      // Event saat ada data audio yang baru siap didengarkan
      audioStream.on('data', (chunk) => {
        // Proses teks lirik dengan memanfaatkan data audio
        lyrics += chunk.toString();
      });

      // Event saat proses download selesai
      audioStream.on('end', () => {
        // Mengirim teks lirik ke chat
        api.sendMessage(`Lirik untuk lagu *${videoTitle}*:\n\n${lyrics}`, event.threadID);
        console.log('Lyrics sent!');
      });

      // Event saat terjadi kesalahan download
      audioStream.on('error', (error) => {
        console.error('Error occurred while downloading audio:', error);
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
};