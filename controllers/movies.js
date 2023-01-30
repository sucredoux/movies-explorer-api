const Movie = require('../models/movie');
const { OK, CREATED } = require('../constants/status');
const { BadRequestErr, NotFoundErr, ForbiddenErr } = require('../errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.status(OK).send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const newMovie = await Movie.create({
      owner: ownerId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    return res.status(CREATED).send({
      owner: newMovie.owner,
      country: newMovie.country,
      director: newMovie.director,
      duration: newMovie.duration,
      year: newMovie.year,
      description: newMovie.description,
      image: newMovie.image,
      trailerLink: newMovie.trailerLink,
      nameRU: newMovie.nameRU,
      nameEN: newMovie.nameEN,
      thumbnail: newMovie.thumbnail,
      movieId: newMovie.movieId,
      like: newMovie.like,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные'));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден')
    } else if (!movie.owner._id.equals(req.user._id)) {
      throw new ForbiddenErr('У Вас нет доступа');
    } else {
      const movieToDelete = await Movie.findByIdAndDelete(req.params.id, { runValidators: true });
      return res.status(OK).send(movieToDelete);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Невалидный id'));
    }
    return next(err);
  }
};

const setLike = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { like: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден');
    }
    return res.status(OK).send({ movie });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Переданы некорректные данные '))
    }
    return next(err);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $pull: { like: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден');
    }
    return res.status(OK).send({ movie });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Переданы некорректные данные'));
    }
    return next(err);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie, setLike, deleteLike
};


/*
    "country": "США",
      "director": "Стивен Кайак",
      "duration": "61",
      "year": "2010",
       "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
      "image": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg",
      "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
      "nameRU": "«Роллинг Стоунз» в изгнании",
      "nameEN": "Stones in Exile",
      "thumbnail": "stones_in_exile_b2f1b8f4b7",
      "movieId": "1"

      "country": "v",
      "director": "Уилл Лавлейс, Дилан Сотерн",
      "duration": "6",
      "year": "2010",
       "description": "Затеянный по такому подозрительному поводу, как реюнион Blur в 2009-м году фильм начисто лишен присущего моменту пафоса и выхолощенности речей. Вернее, что-то похожее неизбежно возникает, когда ты видишь, как забитый до отказа Гайд-парк как в последний раз ревет «Song 2», но это лишь буквальное свидетельство того, что Blur — великая группа. К счастью, помимо прямых и косвенных свидетельств этого, в «No Distance Left to Run» хватает острых углов, неловких моментов и всего того сора, из которого рождаются по-настоящему отличные группы: помимо важных, но общеизвестных моментов (вроде соперничества с Oasis за первенство в том же бритпопе) визуализируются и те, что всегда оставались за кадром: наркотическая зависимость, неутихающие костры амбиций, ревность, обиды, слава — и все это блестяще снято на фоне истории того, что вообще происходило в Британии времен Блэра.No Distance Left to Run",
      "image": "https://www.youtube.com/watch?v=6iYxdghpJZY",
      "trailerLink": "https://www.youtube.com/watch?v=6iYxdghpJZY",
      "nameRU": "пути",
      "nameEN": "eft",
      "thumbnail": "https://www.youtube.com/watch?v=6iYxdghpJZYg",
      "movieId": "5"


      */