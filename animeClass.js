export default class Anime {
  animes = {};
  length = 0;

  getAllAnime() {
    return this.length && this.animes;
  }

  getAnime(id) {
    const Anime = this.animes[`${id}`];
    return Anime && Anime;
  }

  putAnime(body, id) {
    const { name = "", mangaWriter = "", studio = "", rating = 0 } = body || {};
    let newAnime = {
      name: name,
      mangaWriter: mangaWriter,
      studio: studio,
      rating: rating,
    };
    const Isanime = this.animes[`${id}`];
    const result = Isanime && (this.animes[`${id}`] = newAnime) && true;
    return result;
  }

  postAnime(body) {
    const { name = "", mangaWriter = "", studio = "", rating = 0 } = body || {};

    let newAnime = {
      name: name,
      mangaWriter: mangaWriter,
      studio: studio,
      rating: rating,
    };
    this.animes[`${uid}`] = newAnime;
    uid++;
    this.length++;
    return true;
  }

  deleteAnime(id) {
    const anime = this.animes[`${id}`];
    const result = anime && delete this.animes[`${id}`] && true;
    this.length--;
    return result;
  }

  patchAnime(body, id) {
    let anime = this.animes[`${id}`];

    if (anime) {
      for (let key in body) {
        anime[key] = body[key];
      }
      return true;
    }

    return false;
  }
}
