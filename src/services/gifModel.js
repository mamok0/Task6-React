class GifModel {
  constructor(gif) {
    this.title = gif.title;
    this.datetime = gif.import_datetime;
    this.original = gif.images.original.mp4;
    this.id = gif.id;
    this.preview = gif.images.fixed_height_small.url;
  }
}

export default GifModel;
