const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const mockData = {
  musics: [
    {
      id: '0',
      title: 'AMALGAM',
      genre: 'R&B',
      public_date: '2021-11-19T17:56:55.311551',
      url: 'https://cdn.pixabay.com/download/audio/2024/06/14/audio_0e2636099d.mp3?filename=amalgam-217007.mp3',
      album_image:
        'https://cdn.pixabay.com/audio/2024/06/17/18-00-00-760_200x200.jpg',
    },
    {
      id: '1',
      title: 'Night walk in Paris',
      genre: 'R&B',
      public_date: '2021-11-03T17:56:55.311551',
      url: 'https://cdn.pixabay.com/download/audio/2023/03/23/audio_05744cb26f.mp3?filename=night-walk-in-paris-143712.mp3"',
      album_image:
        'https://cdn.pixabay.com/audio/2023/08/27/16-24-45-382_200x200.jpg',
    },
    {
      id: '2',
      title: 'Sky Wind',
      genre: 'POP',
      public_date: '2021-11-22T17:56:55.311551',
      url: 'https://cdn.pixabay.com/download/audio/2023/02/22/audio_7e5869383e.mp3?filename=sky-wind-140223.mp3',
      album_image:
        'https://cdn.pixabay.com/audio/2024/03/04/18-31-07-537_200x200.jpeg',
    },
    {
      id: '3',
      title: 'Better Day',
      genre: 'POP',
      public_date: '2021-12-03T17:56:55.311551',
      url: 'https://cdn.pixabay.com/download/audio/2024/01/16/audio_e2b992254f.mp3?filename=better-day-186374.mp3',
      album_image:
        'https://cdn.pixabay.com/audio/2024/01/29/13-19-29-218_200x200.png',
    },
    {
      id: '4',
      title: 'Comedy Detective',
      genre: 'JAZZ',
      public_date: '2021-03-11T17:56:55.311551',
      url: 'https://cdn.pixabay.com/download/audio/2022/11/26/audio_0052d925c3.mp3?filename=comedy-detective-127185.mp3',
      album_image:
        'https://cdn.pixabay.com/audio/2023/04/19/09-36-20-866_200x200.jpg',
    },
  ],
};

// GET /musics
app.get('/musics', (req, res) => {
  res.json({
    total: mockData.musics.length,
    items: mockData.musics.map((data) => ({
      id: data.id,
      title: data.title,
      genre: data.genre,
      public_date: data.public_date,
      album_image: data.album_image,
    })),
  });
});

// GET /musics/:musicId
app.get('/musics/:musicId', (req, res) => {
  const { musicId } = req.params;
  const music = mockData.musics.find((data) => data.id === musicId);

  if (!music) {
    return res.status(404).json({ message: 'Music not found' });
  }

  setTimeout(() => {
    res.json({ url: music.url });
  }, 2000);
});

const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
