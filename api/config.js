export default function handler(req, res) {
  res.status(200).json({
    playlist: "https://p.rapidnas.org/p12/Setuptv/hru018XOWevNI9A/BLOF/playlist.m3u8",
    epg: "http://epg.streaming-elbrus.su/xmltv/epg_lite.xml",
    pin: "1234",
    message: "Player IDATV Active"
  });
}
